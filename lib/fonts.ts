import { Archivo, Fraunces } from "next/font/google";

// Display serif: Fraunces — high-contrast, optically-sized, reads as
// heritage-with-craft rather than the default "AI luxury" serifs.
// latin-ext is required for Slovenian diacritics (č, š, ž).
export const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT", "WONK"],
});

// Body grotesk: Archivo — neutral, sturdy, with tabular figures for
// the price table. Deliberately not Inter.
export const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
});
