"use client";
import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/** Compact navigation keeps the highlight reel and archive within one click. */
export function Header({
  dark,
  onToggleTheme,
}: {
  dark: boolean;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <a className="brand" href="#home" aria-label="MARK. home">
        MARK<span>.</span>
        <small>THE PERSONAL ARCHIVE</small>
      </a>
      <nav
        id="mobile-navigation"
        aria-label="Main navigation"
        className={open ? "navigation is-open" : "navigation"}
      >
        {[
          ["#highlights", "Highlights"],
          ["#collections", "The collections"],
          ["#about", "Behind the name"],
        ].map(([href, label]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="icon-button"
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          onClick={onToggleTheme}
        >
          <Icon name={dark ? "sun" : "moon"} />
        </button>
        <a className="header-cta" href="#contact">
          Say hello <Icon name="arrow" width="15" height="15" />
        </a>
        <button
          className="icon-button mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
