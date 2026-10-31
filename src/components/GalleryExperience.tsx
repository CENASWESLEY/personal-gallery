"use client";

import { useEffect, useRef, useState } from "react";
import { Header } from "./layout/Header";
import { CollectionNavigation } from "./layout/CollectionNavigation";
import { Hero } from "./hero/Hero";
import { Collections } from "./collections/Collections";
import { Highlights } from "./collections/Highlights";
import { About } from "./about/About";
import { PhotoViewer } from "./viewer/PhotoViewer";
import { Icon } from "./ui/Icon";
import type { ViewerSelection } from "@/types/gallery";

/** Owns shared theme and viewer state; exhibition content lives in data/gallery. */
export function GalleryExperience() {
  const [dark, setDark] = useState(false);
  const [selection, setSelection] = useState<ViewerSelection | null>(null);
  const progress = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("mark-theme");
      const value = saved === "dark";
      setDark(value);
      document.documentElement.dataset.theme = value ? "dark" : "light";
    } catch {
      /* Storage may be unavailable in private browsing. */
    }
    let scheduled = false;
    const update = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current)
          progress.current.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
        scheduled = false;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const toggleTheme = () => {
    const value = !dark;
    setDark(value);
    document.documentElement.dataset.theme = value ? "dark" : "light";
    try {
      localStorage.setItem("mark-theme", value ? "dark" : "light");
    } catch {
      /* Theme still works without persistence. */
    }
  };

  return (
    <>
      <a href="#collections" className="skip-link">
        Skip to collections
      </a>
      <div ref={progress} className="reading-progress" aria-hidden="true" />
      <Header dark={dark} onToggleTheme={toggleTheme} />
      <main>
        <Hero onOpen={setSelection} />
        <div className="marquee" aria-hidden="true">
          <div className="marquee-track">
            {Array.from({ length: 4 }, (_, index) => (
              <span key={index}>
                MARK CENAS <Icon name="spark" width="27" height="27" />
                <span className="marquee-outline">EVERY SIDE IS A STORY</span>
                <Icon name="spark" width="27" height="27" />
              </span>
            ))}
          </div>
        </div>
        <Highlights onOpen={setSelection} />
        <Collections onOpen={setSelection} />
        <About onOpen={setSelection} />
      </main>
      <CollectionNavigation />
      {selection && (
        <PhotoViewer
          key={selection.collectionId}
          selection={selection}
          onClose={() => setSelection(null)}
        />
      )}
    </>
  );
}
