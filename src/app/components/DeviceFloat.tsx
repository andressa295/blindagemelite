"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type DeviceFloatProps = {
  /** PNG/WebP com fundo transparente */
  src: string;
  alt?: string;
  /** Largura base em px (o height é auto) */
  width?: number;
  /** Intensidade do tilt/parallax (0.0–1.0) */
  intensity?: number;
  /** Classe extra para ajustar no Hero */
  className?: string;
  /** Sombra/glow forte ou sutil */
  glow?: "none" | "soft" | "strong";
};

export default function DeviceFloat({
  src,
  alt = "Dispositivo",
  width = 420,
  intensity = 0.35,
  className = "",
  glow = "soft",
}: DeviceFloatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, rx: 0, ry: 0, ticking: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (clientX: number, clientY: number) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;

      // -1..1
      const nx = (clientX - cx) / (rect.width / 2);
      const ny = (clientY - cy) / (rect.height / 2);

      state.current.rx = clamp(-ny * 10 * intensity, -10, 10); // rotateX
      state.current.ry = clamp(nx * 12 * intensity, -12, 12);  // rotateY
      state.current.x = clamp(nx * 10 * intensity, -10, 10);   // translateX
      state.current.y = clamp(ny * 12 * intensity, -12, 12);   // translateY

      requestTick();
    };

    const onMouseMove = (e: MouseEvent) => onMove(e.clientX, e.clientY);

    // Suporte simples a giroscópio no mobile
    const onDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      const nx = clamp(e.gamma / 45, -1, 1); // esquerda/direita
      const ny = clamp(e.beta / 45, -1, 1);  // frente/trás
      state.current.rx = clamp(-ny * 8 * intensity, -10, 10);
      state.current.ry = clamp(nx * 10 * intensity, -12, 12);
      state.current.x = clamp(nx * 8 * intensity, -10, 10);
      state.current.y = clamp(ny * 8 * intensity, -12, 12);
      requestTick();
    };

    const requestTick = () => {
      if (state.current.ticking) return;
      state.current.ticking = true;
      requestAnimationFrame(() => {
        state.current.ticking = false;
        const { x, y, rx, ry } = state.current;
        el.style.setProperty("--dx", `${x.toFixed(2)}px`);
        el.style.setProperty("--dy", `${y.toFixed(2)}px`);
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("deviceorientation", onDeviceOrientation, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("deviceorientation", onDeviceOrientation);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={`deviceFloat ${glow !== "none" ? `deviceFloat--${glow}` : ""} ${className}`}
      style={{ "--w": `${width}px` } as React.CSSProperties}
      aria-hidden="true"
    >
      <div className="deviceFloat__inner">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={Math.round(width * 2)} // placeholder, Next ajusta pelo aspect real
          priority
          draggable={false}
        />
      </div>
      <div className="deviceFloat__shadow" />
    </div>
  );
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
