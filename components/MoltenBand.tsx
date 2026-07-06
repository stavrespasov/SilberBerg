"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The film band's living surface: liquid gold flowing sideways under a
 * slow sweeping light — a fragment shader, not a video, so it weighs a
 * few KB and never buffers. Deliberately distinct from the hero's smoke
 * (horizontal caustic flow vs. rising plume) so the two don't read as
 * the same effect twice.
 *
 * Self-contained and defensive: skipped under reduced motion or when
 * WebGL is unavailable (the poster <img> behind it stays), renders at
 * reduced resolution, pauses off-screen or when the tab is hidden. Fades
 * in only once it has a frame, so there is never a flash of empty canvas.
 */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.55;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.06;

  // Domain warped, but stretched and streamed horizontally so features
  // read as wide molten veins pouring sideways, not a rising plume.
  vec2 sp = vec2(p.x * 1.25 - t, p.y * 2.6);
  vec2 q = vec2(fbm(sp), fbm(sp + vec2(3.1, 1.7)));
  float f = fbm(sp + 1.8 * q + vec2(t * 0.5, 0.0));
  float veins = smoothstep(0.34, 0.78, f);

  // A specular bar sweeping left-right on a smooth ping-pong (no wrap jump).
  float sx = abs(fract(u_time * 0.045) * 2.0 - 1.0);
  float sweep = smoothstep(0.16, 0.0, abs(uv.x - sx));

  // The light lives in a horizontal band across the upper-middle.
  float lightBand = exp(-pow((uv.y - 0.60) * 2.3, 2.0));
  float glow = veins * lightBand * 1.45 + sweep * lightBand * 0.5;

  vec3 col = vec3(0.043, 0.043, 0.051);                                   // ink
  col = mix(col, vec3(0.19, 0.13, 0.05), smoothstep(0.05, 0.62, glow));   // bronze
  col = mix(col, vec3(0.855, 0.665, 0.27), smoothstep(0.42, 1.02, glow)); // gold
  col = mix(col, vec3(0.975, 0.895, 0.70), smoothstep(0.86, 1.30, glow)); // highlight

  // Keep the left edge darker — desktop caption sits bottom-left.
  col *= mix(0.58, 1.0, smoothstep(0.0, 0.92, uv.x));
  // Soft top/bottom vignette.
  col *= mix(0.82, 1.0, smoothstep(1.15, 0.30, abs(uv.y - 0.5) * 2.0));

  gl_FragColor = vec4(col, 1.0);
}
`;

export function MoltenBand() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", {
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("band shader compile failed", {
          info: gl.getShaderInfoLog(shader),
        });
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("band shader link failed", {
        info: gl.getProgramInfoLog(program),
      });
      return;
    }
    gl.useProgram(program);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    const RES_SCALE = 0.6;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * RES_SCALE));
      const h = Math.max(1, Math.round(canvas.clientHeight * RES_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let frame = 0;
    let running = false;
    let shownFirstFrame = false;
    const start = performance.now();
    const render = () => {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!shownFirstFrame) {
        shownFirstFrame = true;
        setReady(true);
      }
      frame = requestAnimationFrame(render);
    };
    const setRunning = (on: boolean) => {
      if (on === running) return;
      running = on;
      if (on) frame = requestAnimationFrame(render);
      else cancelAnimationFrame(frame);
    };

    let intersecting = false;
    const update = () => setRunning(intersecting && !document.hidden);
    const io = new IntersectionObserver(
      ([entry]) => {
        intersecting = !!entry?.isIntersecting;
        update();
      },
      { threshold: 0.02 },
    );
    io.observe(canvas);
    const onVisibility = () => update();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      setRunning(false);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
    />
  );
}
