import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { heroPortrait } from "@/data/gallery";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://fragments-personal-gallery-supav.nutmeg-bead-1672.chatgpt.site",
  ),
  title: "MARK. — Supavit Mungmalee / Mark Cenas",
  description:
    "Supavit Mungmalee, also known as Mark Cenas — the person behind Cenaswesley. A personal archive of portraits, milestones, and style.",
  openGraph: {
    title: "MARK. — Supavit Mungmalee / Mark Cenas",
    description: "Every side is a story.",
    images: [
      {
        url: "/archive/c04-007.webp",
        width: heroPortrait.width,
        height: heroPortrait.height,
        alt: "Supavit Mungmalee in a black suit",
      },
    ],
    type: "website",
  },
};

/** Application shell. Local fonts keep the gallery independent of font CDNs. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
