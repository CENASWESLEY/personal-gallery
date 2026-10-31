import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    "https://fragments-personal-gallery-supav.nutmeg-bead-1672.chatgpt.site",
  ),
  title: "FRAGMENTS — A Personal Gallery",
  description:
    "Different moments. Different versions. Still me. A personal exhibition of portraits, style, and the moments in between.",
  openGraph: {
    title: "FRAGMENTS — A Personal Gallery",
    description: "Every side is a story.",
    images: [
      {
        url: "/photos/05.webp",
        width: 1400,
        height: 1400,
        alt: "Fragments personal portrait exhibition",
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
