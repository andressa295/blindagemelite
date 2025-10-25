"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

// Evita colisão com HTMLAttributes.color (string)
type VantaProps = Omit<React.HTMLAttributes<HTMLDivElement>, "color"> & {
  bgColor?: number;     // ex: 0xf5f7fa
  lineColor?: number;   // ex: 0x0e1116
};

export default function VantaBackground({
  bgColor = 0xf4f6f8,
  lineColor = 0x0f1115,
  className,
  ...rest
}: VantaProps) {
  const elRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!effectRef.current && elRef.current) {
      effectRef.current = NET({
        el: elRef.current,
        THREE,
        backgroundColor: bgColor,
        color: lineColor,
        points: 9.0,
        maxDistance: 18.0,
        spacing: 14.0,
      });
    }
    return () => effectRef.current?.destroy?.();
  }, [bgColor, lineColor]);

  return <div ref={elRef} className={className ?? "vantaBlock"} {...rest} />;
}
