import { FracturedPortrait } from "./FracturedPortrait";
import { Icon } from "@/components/ui/Icon";
import { totalPhotos } from "@/data/gallery";

/** Introductory exhibition composition, with a real portrait as the focal point. */
export function Hero({ onOpenPortrait }: { onOpenPortrait: () => void }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span>
          <i /> AN ONGOING EXHIBITION OF ME
        </span>
        <span>VOL. 01 / PERSONAL ARCHIVE</span>
      </div>
      <div className="hero-composition">
        <div className="hero-copy">
          <div className="eyebrow hero-eyebrow">
            <span className="small-cross">+</span> A FEW SIDES OF THE SAME STORY
          </div>
          <h1 id="hero-title">
            <span>MORE</span>
            <span>THAN A</span>
            <span className="outline-word">
              FRAME<span className="title-period">.</span>
            </span>
          </h1>
          <div className="hero-bottom">
            <span className="hero-index">
              (01 — {String(totalPhotos).padStart(2, "0")})
            </span>
            <div>
              <p>
                A collection of moments.
                <br />
                An expression of who I am.
              </p>
              <p className="thai-caption" lang="th">
                ทุกภาพมีเรื่องราว ทุกมุมคือตัวตน
              </p>
              <a className="round-link" href="#collections">
                <span className="circle-arrow">
                  <Icon name="down" />
                </span>
                <span>Discover the collections</span>
              </a>
            </div>
          </div>
        </div>
        <FracturedPortrait onOpen={onOpenPortrait} />
      </div>
      <div className="hero-footnote">
        <span>
          SCROLL TO EXPLORE <Icon name="down" width="12" height="12" />
        </span>
        <span>PORTRAITS / MOMENTS / PERSPECTIVES</span>
        <span>CURATED, NOT PERFECT.</span>
      </div>
    </section>
  );
}
