import { Geist, Geist_Mono } from "next/font/google";

// v3 system: Geist for everything readable, Geist Mono for figures.
// latin-ext is required for Slovenian diacritics (č, š, ž).
export const geist = Geist({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist",
});

export const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-geist-mono",
});
