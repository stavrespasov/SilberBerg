import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";

// v4 system: Boska carries every headline (chiseled wedge serifs — cut
// like a graver), Geist stays for body text, Geist Mono owns every number.
// latin-ext is required for Slovenian diacritics (č, š, ž).
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
});

// Self-hosted (Fontshare/ITF licence permits it); ~30 KB per weight.
export const boska = localFont({
  src: [
    { path: "../app/fonts/boska-500.woff2", weight: "500", style: "normal" },
    { path: "../app/fonts/boska-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-boska",
  display: "swap",
});
