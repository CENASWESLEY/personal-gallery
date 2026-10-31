"use client";

import { useState } from "react";
import { photographs, profile } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";

/** A quiet interlude with editable personal copy and optional contact details. */
export function About({ onOpen }: { onOpen: () => void }) {
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <>
      <section className="interlude" aria-label="Personal perspective">
        <div className="interlude-top">
          <span>NO SINGLE FRAME TELLS THE WHOLE STORY.</span>
          <span>NEITHER DOES A SINGLE SIDE.</span>
        </div>
        <div className="interlude-main" data-reveal>
          <Icon
            name="spark"
            className="interlude-star"
            width="90"
            height="90"
          />
          <p>
            Same person.
            <br />
            <span className="serif">A thousand perspectives.</span>
          </p>
          <span className="interlude-no">( f. )</span>
        </div>
      </section>
      <section
        className="about section-padding"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="about-portrait" data-reveal>
          <button onClick={onOpen} aria-label="Open the about portrait">
            <img
              src={photographs["12"].src}
              alt={photographs["12"].alt}
              loading="lazy"
              width="800"
              height="1000"
            />
            <span>
              <Icon name="expand" /> LOOK A LITTLE CLOSER
            </span>
          </button>
          <span className="photo-note">
            A PORTRAIT. A MOMENT. A LITTLE MORE ME.
          </span>
        </div>
        <div className="about-copy" data-reveal>
          <span className="eyebrow">02 / BEHIND THE FRAME</span>
          <h2 id="about-title">
            A little style.
            <br />A little soul.
            <br />
            <span className="serif">All me.</span>
          </h2>
          <p className="about-statement">{profile.statement}</p>
          <p className="about-bio" lang="th">
            {profile.bio}
          </p>
          <div className="about-signature">
            <span className="signature">fragments.</span>
            <span>AN EVER-EVOLVING SELF-PORTRAIT</span>
          </div>
        </div>
      </section>
      <footer className="footer section-padding">
        <div className="footer-top">
          <span className="eyebrow">EVERY GOOD STORY STARTS WITH A HELLO.</span>
          <a href="#home">
            BACK TO TOP <Icon name="arrow" width="15" height="15" />
          </a>
        </div>
        <div className="footer-heading">
          <h2>
            Let’s make
            <br />
            <span className="serif">a scene.</span>
          </h2>
          <button
            className="contact-circle"
            aria-label="Show contact details"
            aria-expanded={contactOpen}
            aria-controls="contact-details"
            onClick={() => setContactOpen(!contactOpen)}
          >
            <Icon
              name={contactOpen ? "close" : "arrow"}
              width="50"
              height="50"
            />
          </button>
        </div>
        {contactOpen && (
          <div className="contact-details" id="contact-details">
            {profile.email ? (
              <a href={`mailto:${profile.email}`}>
                {profile.email}
                <Icon name="arrow" />
              </a>
            ) : (
              <p lang="th">
                ช่องทางติดต่อกำลังจะมาเร็ว ๆ นี้
                <br />
                <span lang="en">
                  A new connection. A new story. Coming soon.
                </span>
              </p>
            )}
            {profile.instagramUrl && (
              <a href={profile.instagramUrl} target="_blank" rel="noreferrer">
                Instagram <Icon name="arrow" />
              </a>
            )}
          </div>
        )}
        <div className="footer-bottom">
          <a href="#home" className="footer-wordmark">
            FRAGMENTS<span>®</span>
          </a>
          <span>A PERSONAL GALLERY. AN ONGOING STORY.</span>
          <span>© {new Date().getFullYear()} FRAGMENTS</span>
        </div>
      </footer>
    </>
  );
}
