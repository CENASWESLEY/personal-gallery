"use client";
import { useEffect, useState } from "react";
import { MirrorOrbit } from "./MirrorOrbit";
import type { ViewerSelection } from "@/types/gallery";
import type { HeroMode } from "@/types/hero";

/** Identity-led entrance to Mark's chronological visual autobiography. */
export function Hero({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  const [mode, setMode] = useState<HeroMode>("orbit");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("mark-hero-style");
      if (saved === "orbit" || saved === "shatter" || saved === "rows")
        setMode(saved);
    } catch {
      /* Scene selection works without persistent storage. */
    }
  }, []);
  const choose = (next: HeroMode) => {
    setMode(next);
    try {
      localStorage.setItem("mark-hero-style", next);
    } catch {
      /* Optional persistence. */
    }
  };
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="hero-intro">
        <div className="hero-topline">
          <span>
            <i /> A PERSONAL GALLERY BY MARK CENAS
          </span>
          <span>PORTRAITS / STORIES / PERSPECTIVES</span>
        </div>
        <p className="hero-overline">MORE THAN ONE SIDE OF ME.</p>
        <h1 id="hero-title">
          Supavit <span className="serif">Mungmalee.</span>
        </h1>
        <p className="hero-identity">
          You can call me <strong>Mark Cenas.</strong>{" "}
          <span>
            The person behind <strong>Cenaswesley.</strong>
          </span>
        </p>
      </div>
      <div className="hero-style-picker" aria-label="Choose homepage style">
        {(
          [
            {
              id: "orbit",
              number: "01",
              name: "Orbit",
              caption: "กระจกวิ่งวน",
            },
            {
              id: "shatter",
              number: "02",
              name: "Shatter",
              caption: "แตกแล้วลอยขึ้น",
            },
            {
              id: "rows",
              number: "03",
              name: "Flow",
              caption: "สามแถวสลับทิศ",
            },
          ] as const
        ).map((style) => (
          <button
            key={style.id}
            aria-pressed={mode === style.id}
            onClick={() => choose(style.id)}
          >
            <span>{style.number}</span>
            <strong>{style.name}</strong>
            <small lang="th">{style.caption}</small>
          </button>
        ))}
      </div>
      <MirrorOrbit key={mode} mode={mode} onOpen={onOpen} />
    </section>
  );
}
