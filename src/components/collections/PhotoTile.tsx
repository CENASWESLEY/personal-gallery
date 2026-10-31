import { Icon } from "@/components/ui/Icon";
import type { Photograph } from "@/types/gallery";
import { photoFraming } from "@/lib/photo-framing";

/** Reusable image trigger; colors are never filtered or altered by the UI. */
export function PhotoTile({
  photo,
  index,
  onOpen,
  className = "",
}: {
  photo: Photograph;
  index: number;
  onOpen: () => void;
  className?: string;
}) {
  return (
    <button
      className={`photo-tile ${className}`}
      onClick={onOpen}
      aria-label={`View ${photo.title}`}
    >
      <img
        src={photo.src}
        alt={photo.alt}
        width={photo.width}
        height={photo.height}
        style={photoFraming(photo)}
        loading="lazy"
        draggable={false}
      />
      <span className="tile-index">{String(index + 1).padStart(2, "0")}</span>
      <span className="tile-open">
        <Icon name="expand" width="17" height="17" />
      </span>
    </button>
  );
}
