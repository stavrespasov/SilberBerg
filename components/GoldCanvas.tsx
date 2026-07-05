"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The cinematic layer: molten-gold smoke rendered by a fragment shader —
 * an infinite film loop that weighs a few KB instead of a video file,
 * follows the pointer, and never buffers. Raw WebGL1, no library.
 *
 * Degrades deliberately: skipped under reduced motion or when WebGL is
 * unavailable (the CSS glow poster underneath stays), renders at reduced
 * resolution (smoke is low-frequency), pauses when off-screen or hidden.
 */

const VERT = `
attribute vec2 a;
void main() { gl_Position = vec4(a, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;

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
  float t = u_time * 0.03;
  vec2 par = (u_mouse - 0.5) * 0.14;

  // Domain-warped smoke (iq's q/r construction).
  vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t * 0.7));
  vec2 r = vec2(
    fbm(p + 2.2 * q + vec2(1.7, 9.2) + t * 0.6),
    fbm(p + 2.6 * q + vec2(8.3, 2.8) - t * 0.4)
  );
  float f = fbm(p + 2.5 * r + par);

  // One warm light source, upper right, nudged by the pointer.
  vec2 lightPos = vec2(0.78 * u_res.x / u_res.y, 0.85) + par;
  float d = distance(p, lightPos);
  float light = exp(-d * d * 2.1);
  float glow = f * f * light * 2.7 + light * 0.16;

  vec3 col = vec3(0.043, 0.043, 0.051);                                  // ink
  col = mix(col, vec3(0.23, 0.16, 0.06), smoothstep(0.10, 0.85, glow));  // bronze
  col = mix(col, vec3(0.886, 0.710, 0.294), smoothstep(0.45, 1.10, glow)); // gold
  col = mix(col, vec3(0.965, 0.890, 0.675), smoothstep(0.85, 1.35, glow)); // highlight

  float vig = smoothstep(1.25, 0.35, distance(uv, vec2(0.5, 0.55)));
  col *= mix(0.72, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

export function GoldCanvas() {
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
        console.error("shader compile failed", {
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
      console.error("shader link failed", {
        info: gl.getProgramInfoLog(program),
      });
      return;
    }
    gl.useProgram(program);

    // One triangle covering the viewport.
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
    const uMouse = gl.getUniformLocation(program, "u_mouse");

    // Smoke is low-frequency — render at reduced resolution and let CSS
    // stretch it. Halves fragment cost with no visible loss.
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

    // Pointer, lerped in the render loop for weight.
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const onPointer = (e: PointerEvent) => {
      mouse.tx = e.clientX / window.innerWidth;
      mouse.ty = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    let frame = 0;
    let running = false;
    let shownFirstFrame = false;
    const start = performance.now();
    const render = () => {
      resize();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
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

    // Only burn GPU while the hero is actually on screen and the tab visible.
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
      window.removeEventListener("pointermove", onPointer);
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
