"use client";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent,
} from "react";

/**
 * Runs a frame-budgeted elliptical mirror orbit without React rerenders.
 * Pointer drags share the same rotation state as autoplay and step controls.
 */
export function useMirrorOrbit(count: number) {
  const stage = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const drag = useRef<{ x: number; angle: number; moved: boolean } | null>(
    null,
  );
  const suppressClick = useRef(false);
  const hovering = useRef(false);
  const [playing, setPlaying] = useState(true);
  const paint = useCallback(() => {
    const element = stage.current;
    if (!element) return;
    const width = element.clientWidth;
    const radiusX = Math.min(width * 0.405, 600);
    const radiusY = width < 600 ? 145 : 175;
    element
      .querySelectorAll<HTMLElement>(".orbit-shard")
      .forEach((shard, index) => {
        const angle =
          (((index / count) * 360 + rotation.current) * Math.PI) / 180;
        shard.style.setProperty("--x", `${Math.sin(angle) * radiusX}px`);
        shard.style.setProperty("--y", `${Math.cos(angle) * radiusY}px`);
        shard.style.setProperty("--rotation", `${Math.sin(angle) * 19}deg`);
        shard.style.setProperty(
          "--scale",
          `${0.81 + (Math.cos(angle) + 1) * 0.12}`,
        );
        shard.style.zIndex = String(Math.round((Math.cos(angle) + 1) * 4) + 1);
      });
  }, [count]);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      if (preference.matches) setPlaying(false);
    };
    change();
    preference.addEventListener("change", change);
    const observer = new ResizeObserver(paint);
    if (stage.current) observer.observe(stage.current);
    paint();
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", change);
    };
  }, [paint]);
  useEffect(() => {
    if (!playing) return;
    let frame = 0,
      last = 0,
      visible = true;
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
    });
    if (stage.current) observer.observe(stage.current);
    const animate = (now: number) => {
      const delta = Math.min(now - last, 50);
      if (now - last >= 30) {
        if (visible && !document.hidden && !hovering.current && !drag.current) {
          rotation.current += delta * 0.012;
          paint();
        }
        last = now;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [playing, paint]);
  return {
    stage,
    playing,
    setPlaying,
    suppressClick,
    step: (direction: number) => {
      setPlaying(false);
      rotation.current += direction * 24;
      paint();
    },
    handlers: {
      onPointerEnter: () => {
        hovering.current = true;
      },
      onPointerLeave: () => {
        hovering.current = false;
        if (drag.current && !drag.current.moved) drag.current = null;
      },
      onPointerDown: (event: PointerEvent<HTMLDivElement>) => {
        if (event.button !== 0) return;
        drag.current = {
          x: event.clientX,
          angle: rotation.current,
          moved: false,
        };
        suppressClick.current = false;
      },
      onPointerMove: (event: PointerEvent<HTMLDivElement>) => {
        const start = drag.current;
        if (!start) return;
        const dx = event.clientX - start.x;
        if (Math.abs(dx) > 7) {
          start.moved = true;
          event.currentTarget.setPointerCapture(event.pointerId);
          setPlaying(false);
        }
        if (start.moved) {
          rotation.current = start.angle + dx * 0.28;
          paint();
        }
      },
      onPointerUp: () => {
        suppressClick.current = !!drag.current?.moved;
        drag.current = null;
      },
      onPointerCancel: () => {
        drag.current = null;
        suppressClick.current = true;
      },
      onFocusCapture: () => setPlaying(false),
    },
  };
}
