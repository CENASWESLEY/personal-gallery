import { profile, highlights, heroPortrait } from "@/data/gallery";
import { Icon } from "@/components/ui/Icon";
import { photoFraming } from "@/lib/photo-framing";
import type { ViewerSelection } from "@/types/gallery";

/** Identity and name origin use only facts supplied by the owner. */
export function About({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
  const aboutPhoto = highlights[3] ?? highlights[0] ?? heroPortrait;
  return (
    <>
      <section id="about" className="about section-padding">
        <div className="about-portrait" data-reveal>
          <button
            onClick={() =>
              onOpen({
                collectionId: highlights.length ? "highlights" : "black-suit",
                photoIndex: highlights.length > 3 ? 3 : 0,
              })
            }
            aria-label="Open Mark's portrait"
          >
            <img src={aboutPhoto.src} alt={aboutPhoto.alt} loading="lazy" style={photoFraming(aboutPhoto)} />
            <span>
              THE PERSON BEHIND THE FRAMES{" "}
              <Icon name="expand" width="16" height="16" />
            </span>
          </button>
        </div>
        <div className="about-copy" data-reveal>
          <span className="eyebrow">02 / BEHIND THE NAME</span>
          <h2>
            Supavit.
            <br />
            <span className="serif">Mark Cenas.</span>
            <br />
            Simply me.
          </h2>
          <p>
            My name is <strong>Supavit Mungmalee</strong>. You can call me{" "}
            <strong>Mark Cenas.</strong>
          </p>
          <p>
            Mark is my nickname. Cenas comes from my channel,{" "}
            <strong>Cenaswesley</strong> — two names, one evolving story.
          </p>
          <p className="about-signature">Different chapters. Same Mark.</p>
        </div>
      </section>
      <footer className="footer section-padding" id="contact">
        <div className="footer-top">
          <span>EVERY GOOD STORY STARTS WITH A HELLO.</span>
          <a href="#home">
            BACK TO TOP <Icon name="arrow" width="16" height="16" />
          </a>
        </div>
        <div className="footer-main">
          <h2>
            Keep in <span className="serif">touch.</span>
          </h2>
          <a
            className="contact-circle"
            href={`mailto:${profile.email}`}
            aria-label="Email Mark"
          >
            <Icon name="arrow" width="46" height="46" />
          </a>
        </div>
        <div className="contact-links">
          <a href={profile.instagramUrl} target="_blank" rel="noreferrer">
            <span>INSTAGRAM</span>@{profile.instagram}
            <Icon name="arrow" />
          </a>
          <a href={`mailto:${profile.email}`}>
            <span>EMAIL</span>
            {profile.email}
            <Icon name="arrow" />
          </a>
        </div>
        <div className="footer-bottom">
          <a href="#home" className="footer-mark">
            MARK.
          </a>
          <span>SUPAVIT MUNGMALEE / MARK CENAS</span>
          <span>© {new Date().getFullYear()} MARK.</span>
        </div>
      </footer>
    </>
  );
}
