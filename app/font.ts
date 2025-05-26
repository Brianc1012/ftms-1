// app/fonts.ts or lib/fonts.ts
import { Inter, Poppins, Geist, Geist_Mono } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});
