import { useEffect, useRef } from "react";
import "./TargetCursor.css";

const DEFAULT_SELECTOR = [
  ".cursor-target",
  "button",
  "a",
  "[role='button']",
  "input[type='button']",
  "input[type='submit']",
  "input[type='reset']",
  "summary",
  "label[for]",
].join(", ");

const IDLE_POSITIONS = [
  { x: -18, y: -18 },
  { x: 6, y: -18 },
  { x: 6, y: 6 },
  { x: -18, y: 6 },
];

export default function TargetCursor({
  targetSelector = DEFAULT_SELECTOR,
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true,
}) {
  const cursorRef = useRef(null);
  const orbitRef = useRef(null);
  const dotRef = useRef(null);
  const cornersRef = useRef([]);
  const stateRef = useRef({
    mouseX: 0,
    mouseY: 0,
    currentX: 0,
    currentY: 0,
    rotation: 0,
    hoverStrength: 0,
    visible: false,
    hoveredTarget: null,
    rafId: 0,
    lastTime: 0,
    cornerPositions: IDLE_POSITIONS.map((pos) => ({ ...pos })),
  });

  useEffect(() => {
    if (typeof window === "undefined" || !cursorRef.current || !orbitRef.current) {
      return undefined;
    }

    const isTouchDevice =
      ("ontouchstart" in window || navigator.maxTouchPoints > 0) &&
      window.innerWidth <= 768;

    if (isTouchDevice) return undefined;

    const cursor = cursorRef.current;
    const orbit = orbitRef.current;
    const dot = dotRef.current;
    const corners = cornersRef.current.filter(Boolean);
    const originalBodyCursor = document.body.style.cursor;
    const originalHtmlCursor = document.documentElement.style.cursor;
    const moveLerp = 0.22;
    const hoverLerp = Math.min(0.35, Math.max(0.1, 1 / (hoverDuration * 60)));
    const idleLerp = 0.28;

    const setVisible = (value) => {
      stateRef.current.visible = value;
      cursor.style.opacity = value ? "1" : "0";
    };

    const isValidTarget = (element) => {
      if (!(element instanceof HTMLElement)) return false;
      if (element.closest("[data-cursor='off']")) return false;

      const styles = window.getComputedStyle(element);
      if (
        styles.display === "none" ||
        styles.visibility === "hidden" ||
        styles.pointerEvents === "none"
      ) {
        return false;
      }

      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const getTargetFromPoint = (x, y) => {
      const element = document.elementFromPoint(x, y);
      if (!(element instanceof HTMLElement)) return null;

      const matched = element.closest(targetSelector);
      if (isValidTarget(matched)) return matched;

      const fallback = element.closest(
        "button, a, [role='button'], input, summary, label, .cursor-target"
      );
      return isValidTarget(fallback) ? fallback : null;
    };

    const handleMove = (event) => {
      const state = stateRef.current;
      state.mouseX = event.clientX;
      state.mouseY = event.clientY;

      if (!state.visible) {
        state.currentX = event.clientX;
        state.currentY = event.clientY;
        setVisible(true);
      }
    };

    const handleLeave = () => {
      stateRef.current.hoveredTarget = null;
      setVisible(false);
    };

    const handleEnter = () => {
      setVisible(true);
    };

    const handleMouseDown = () => {
      cursor.style.setProperty("--cursor-scale", "0.92");
      if (dot) {
        dot.style.transform = "translate(-50%, -50%) scale(0.72)";
      }
    };

    const handleMouseUp = () => {
      cursor.style.setProperty("--cursor-scale", "1");
      if (dot) {
        dot.style.transform = "translate(-50%, -50%) scale(1)";
      }
    };

    if (hideDefaultCursor) {
      document.body.style.cursor = "none";
      document.documentElement.style.cursor = "none";
    }

    corners.forEach((corner, index) => {
      const pos = IDLE_POSITIONS[index];
      corner.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    });

    const animate = (time) => {
      const state = stateRef.current;
      const delta = state.lastTime ? (time - state.lastTime) / 1000 : 0.016;
      state.lastTime = time;

      state.currentX += (state.mouseX - state.currentX) * moveLerp;
      state.currentY += (state.mouseY - state.currentY) * moveLerp;

      const activeTarget = getTargetFromPoint(state.mouseX, state.mouseY);
      state.hoveredTarget = activeTarget;
      state.hoverStrength +=
        ((activeTarget ? 1 : 0) - state.hoverStrength) * hoverLerp;

      if (!activeTarget && state.visible) {
        state.rotation += (360 / Math.max(spinDuration, 0.001)) * delta;
      } else {
        state.rotation += (0 - state.rotation) * 0.18;
      }

      cursor.style.left = `${state.currentX}px`;
      cursor.style.top = `${state.currentY}px`;
      cursor.style.transform = "translate(-50%, -50%) scale(var(--cursor-scale, 1))";
      orbit.style.transform = `rotate(${state.rotation}deg)`;

      let targetPositions = null;
      if (activeTarget) {
        const rect = activeTarget.getBoundingClientRect();
        const borderWidth = 3;
        const cornerSize = 12;
        targetPositions = [
          { x: rect.left - borderWidth, y: rect.top - borderWidth },
          {
            x: rect.right + borderWidth - cornerSize,
            y: rect.top - borderWidth,
          },
          {
            x: rect.right + borderWidth - cornerSize,
            y: rect.bottom + borderWidth - cornerSize,
          },
          {
            x: rect.left - borderWidth,
            y: rect.bottom + borderWidth - cornerSize,
          },
        ];
      }

      corners.forEach((corner, index) => {
        const current = state.cornerPositions[index];
        const target = targetPositions
          ? {
              x: targetPositions[index].x - state.currentX,
              y: targetPositions[index].y - state.currentY,
            }
          : IDLE_POSITIONS[index];

        const lerp = targetPositions ? (parallaxOn ? hoverLerp : 1) : idleLerp;
        current.x += (target.x - current.x) * lerp;
        current.y += (target.y - current.y) * lerp;
        corner.style.transform = `translate(${current.x}px, ${current.y}px)`;
      });

      state.rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("blur", handleLeave);

    stateRef.current.rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(stateRef.current.rafId);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("blur", handleLeave);
      document.body.style.cursor = originalBodyCursor;
      document.documentElement.style.cursor = originalHtmlCursor;
    };
  }, [hideDefaultCursor, hoverDuration, parallaxOn, spinDuration, targetSelector]);

  return (
    <div ref={cursorRef} className="target-cursor-wrapper">
      <div ref={dotRef} className="target-cursor-dot" />
      <div ref={orbitRef} className="target-cursor-orbit">
        <div
          ref={(node) => {
            cornersRef.current[0] = node;
          }}
          className="target-cursor-corner corner-tl"
        />
        <div
          ref={(node) => {
            cornersRef.current[1] = node;
          }}
          className="target-cursor-corner corner-tr"
        />
        <div
          ref={(node) => {
            cornersRef.current[2] = node;
          }}
          className="target-cursor-corner corner-br"
        />
        <div
          ref={(node) => {
            cornersRef.current[3] = node;
          }}
          className="target-cursor-corner corner-bl"
        />
      </div>
    </div>
  );
}
