"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { collections } from "@/data/gallery";

interface HeaderProps {
  dark: boolean;
  onToggleTheme: () => void;
}

/** Sticky exhibition navigation with a keyboard-accessible mobile menu. */
export function Header({ dark, onToggleTheme }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="header">
      <a className="brand" href="#home" aria-label="Fragments home">
        <span className="brand-mark">
          f<span>r</span>
          <i />
        </span>
        <span>
          FRAGMENTS<span className="brand-sub">A PERSONAL GALLERY</span>
        </span>
      </a>
      <nav
        id="mobile-navigation"
        className={menuOpen ? "navigation is-open" : "navigation"}
        aria-label="Main navigation"
      >
        <a href="#collections" onClick={() => setMenuOpen(false)}>
          The collections{" "}
          <span>{String(collections.length).padStart(2, "0")}</span>
        </a>
        <a href="#about" onClick={() => setMenuOpen(false)}>
          Behind the frame
        </a>
      </nav>
      <div className="header-actions">
        <button
          className="theme-button"
          onClick={onToggleTheme}
          aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
        >
          <Icon name={dark ? "sun" : "moon"} />
        </button>
        <a className="header-cta" href="#collections">
          Enter the gallery <Icon name="arrow" width="15" height="15" />
        </a>
        <button
          className="mobile-menu icon-button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </div>
    </header>
  );
}
