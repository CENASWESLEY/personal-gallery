import { MirrorOrbit } from "./MirrorOrbit";
import type { ViewerSelection } from "@/types/gallery";

/** Identity-led entrance to Mark's chronological visual autobiography. */
export function Hero({
  onOpen,
}: {
  onOpen: (selection: ViewerSelection) => void;
}) {
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
      <MirrorOrbit onOpen={onOpen} />
    </section>
  );
}
