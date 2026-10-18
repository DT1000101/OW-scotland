import type { Metadata } from "next";
import { Newsreader, Outfit } from "next/font/google";
import "./globals.css";

const display = Newsreader({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Outfit({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Onewheel Scotland",
    template: "%s · Onewheel Scotland",
  },
  description:
    "Group rides on trail centres and paths across Scotland. New riders can come along.",
  icons: { icon: "/logo.jpg" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
