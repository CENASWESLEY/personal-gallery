"use client";
import { useEffect, useRef, useState } from "react";
import { collections } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";

/** A floating, scroll-aware chapter index on desktop and mobile. */
export function CollectionNavigation() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("collection-overview");
  const panel = useRef<HTMLElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(min-width:1280px)");
    const match = () => setExpanded(media.matches);
    match();
    media.addEventListener("change", match);
    let frame = 0;
    const update = () => {
      frame = 0;
      const overview = document.getElementById("collection-overview");
      if (!overview) return;
      setVisible(
        overview.getBoundingClientRect().top < window.innerHeight * 0.6,
      );
      const position = window.innerHeight * 0.3;
      let current = "collection-overview";
      for (const collection of collections) {
        const chapter = document.getElementById(collection.id);
        if (chapter && chapter.getBoundingClientRect().top <= position)
          current = collection.id;
      }
      setActive(current);
    };
    const scroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("resize", scroll);
    update();
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", match);
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", scroll);
    };
  }, []);
  useEffect(() => {
    panel.current?.querySelector('[aria-current="location"]')?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "instant",
    });
  }, [active, expanded]);
  useEffect(() => {
    if (!expanded) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setExpanded(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [expanded]);
  const selected = collections.find((collection) => collection.id === active);
  const follow = () => {
    if (!window.matchMedia("(min-width:1280px)").matches) setExpanded(false);
  };
  if (!visible) return null;
  return (
    <aside
      className={`floating-collection-nav ${expanded ? "is-expanded" : ""}`}
      aria-label="Collection quick navigation"
    >
      {expanded && (
        <button
          className="collection-nav-scrim"
          aria-label="Close collection navigation overlay"
          onClick={() => setExpanded(false)}
        />
      )}
      <div className="collection-nav-shell">
        <button
          className="collection-nav-trigger"
          ref={trigger}
          aria-expanded={expanded}
          aria-controls="floating-chapter-links"
          onClick={() => setExpanded(!expanded)}
        >
          <Icon name={expanded ? "close" : "list"} width="17" height="17" />
          <span>
            <small>THE COLLECTIONS</small>
            {selected
              ? `${selected.number} / ${selected.title}`
              : "All collections"}
          </span>
        </button>
        {expanded && (
          <nav
            id="floating-chapter-links"
            ref={panel}
            aria-label="Choose a chapter"
          >
            <a
              href="#collection-overview"
              aria-current={
                active === "collection-overview" ? "location" : undefined
              }
              onClick={follow}
            >
              <span>ALL</span>
              <strong>Overview</strong>
              <Icon name="grid" width="13" height="13" />
            </a>
            {collections.map((collection) => (
              <a
                href={`#${collection.id}`}
                key={collection.id}
                onClick={follow}
                aria-current={active === collection.id ? "location" : undefined}
              >
                <span>{collection.number}</span>
                <strong>
                  {collection.details.eventName || collection.title}
                </strong>
                <i>{collection.photos.length}</i>
              </a>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
