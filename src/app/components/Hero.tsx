"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroProps = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  devicePhoneSrc?: string;
  deviceWatchSrc?: string;
};

export default function Hero({
  whatsappUrl,
  onScrollToOque,
  devicePhoneSrc = "/mobile.png",
  deviceWatchSrc = "/relogio.png",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    requestAnimationFrame(() => el.classList.add("play"));
  }, []);

  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section ref={heroRef} className="hero">
      {/* === FAÍSCAS DE FUNDO === */}
      <div className="sparks" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className="spark" />
        ))}
      </div>

      <div className="container">
        <div className="mediaCol">
          <div className="deviceWrapper">
            <div className="watch">
              <Image
                src={deviceWatchSrc}
                alt="Relógio blindado"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="phone">
              <Image
                src={devicePhoneSrc}
                alt="Celular blindado"
                fill
                priority
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>

        <div className="textCol">
          <h1 className="title">Elite Blindagem</h1>
          <h2 className="subtitle">O futuro da proteção já chegou</h2>
          <p className="lead">
            Tecnologia de <strong>nanoproteção com titânio</strong> — cria uma
            camada invisível e ultra-resistente, mantendo seu aparelho com
            aparência de novo por muito mais tempo.
          </p>
          <div className="ctaRow">
            <button className="btnPrimary" onClick={openWhats}>
              Agendar agora
            </button>
            <button className="btnGhost" onClick={onScrollToOque}>
              O que é a blindagem?
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          background: #000;
          color: #eef2f7;
          padding: clamp(40px, 6vw, 80px) 0;
          overflow: hidden;
          opacity: 0;
          transform: scale(1.02);
          transition: opacity 0.5s ease, transform 0.6s ease;
        }
        .hero.play {
          opacity: 1;
          transform: scale(1);
        }
        .container {
          width: min(1140px, 92%);
          margin: auto;
          display: grid;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 900px) {
          .container {
            grid-template-columns: 1fr 1fr;
          }
        }

        /* === PARTICLES / FAÍSCAS === */
        .sparks {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
        }
        .spark {
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 2px;
          height: 20px;
          background: linear-gradient(180deg, #fff, transparent);
          border-radius: 2px;
          opacity: 0;
          transform: translateX(-50%) scaleY(0.5);
          animation: rise 4s linear infinite;
        }
        .spark:nth-child(odd) {
          background: linear-gradient(180deg, #a6bfff, transparent);
        }
        .spark:nth-child(3n) {
          background: linear-gradient(180deg, #ffffff, transparent);
          width: 3px;
        }
        .spark {
          --x: calc((var(--i, 0) - 10) * 4%);
        }
        .spark:nth-child(n) {
          left: calc(50% - 200px + (var(--n) * 16px));
        }
        .sparks span {
          --i: calc(var(--n) * 1);
        }
        .sparks .spark {
          left: calc(2% + 96% * var(--random, 0.5));
        }
        @keyframes rise {
          0% {
            transform: translateY(100%) scaleY(0.5);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% {
            transform: translateY(-80%) scaleY(1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-120%) scaleY(0.6);
            opacity: 0;
          }
        }

        /* === DEVICE MOTION === */
        .deviceWrapper {
          position: relative;
          width: clamp(280px, 34vw, 520px);
          aspect-ratio: 1/1.8;
          margin: auto;
        }
        .watch,
        .phone {
          position: absolute;
          inset: 0;
          opacity: 0;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.5));
        }
        .hero.play .watch {
          animation: watchEnter 1.2s cubic-bezier(0.25, 1, 0.3, 1) forwards;
        }
        .hero.play .phone {
          animation: phoneEnter 1.3s cubic-bezier(0.25, 1, 0.3, 1) 2.3s forwards;
        }
        @keyframes watchEnter {
          0% {
            opacity: 0;
            transform: translate(-120%, 80%) rotate(-40deg) scale(0.7);
          }
          70% {
            opacity: 1;
            transform: translate(-30%, -10%) rotate(10deg) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translate(0%, 0%) rotate(0deg) scale(1);
          }
        }
        @keyframes phoneEnter {
          0% {
            opacity: 0;
            transform: translateY(-160%) rotate(15deg) scale(0.8);
          }
          60% {
            opacity: 1;
            transform: translateY(12%) rotate(-6deg) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        /* === TEXT ANIMATION === */
        .textCol {
          opacity: 0;
          animation: textIn 0.8s ease 3.6s forwards;
        }
        @keyframes textIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .title {
          font-size: clamp(30px, 3vw, 48px);
          font-weight: 800;
          margin: 0 0 8px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #e8ecff 0%, #6f7dff 25%, #ffffff 50%, #6f7dff 75%, #e8ecff 100%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: forgeText 2.4s ease-in-out 1.2s forwards,
            shineMove 4s linear 3.4s infinite;
          opacity: 0;
        }
        .hero.play .title {
          opacity: 1;
        }
        @keyframes forgeText {
          0% {
            opacity: 0;
            letter-spacing: 0.2em;
            transform: scale(1.2) rotateX(40deg);
            filter: blur(6px);
          }
          70% {
            opacity: 1;
            letter-spacing: 0.05em;
            transform: scale(1) rotateX(0deg);
            filter: blur(0);
          }
          100% {
            opacity: 1;
          }
        }
        @keyframes shineMove {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 300% 0%;
          }
        }

        .subtitle {
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 600;
          margin: 6px 0 16px;
          color: #b7c2ff;
          opacity: 0;
          transform: translateY(20px);
          animation: subAppear 0.8s cubic-bezier(0.25, 1, 0.3, 1) 2.6s forwards;
        }
        @keyframes subAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .lead {
          color: #d6dce6;
          font-size: clamp(15px, 1.3vw, 16.4px);
          line-height: 1.6;
          max-width: 52ch;
          margin-bottom: 22px;
        }

        /* === CTA BUTTONS === */
        .ctaRow {
          display: flex;
          gap: 12px;
          opacity: 0;
          animation: btnRise 0.9s cubic-bezier(0.25, 1, 0.3, 1) 4.2s forwards;
        }
        @keyframes btnRise {
          0% {
            transform: translateY(40px) scale(0.95);
            opacity: 0;
          }
          70% {
            opacity: 1;
            transform: translateY(-6px) scale(1.02);
          }
          100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
        .btnPrimary,
        .btnGhost {
          border-radius: 999px;
          padding: 12px 18px;
          font-weight: 800;
          cursor: pointer;
          transition: 0.2s ease;
        }
        .btnPrimary {
          background: #141a22;
          color: #fff;
          border: 1px solid #0f1419;
          box-shadow: 0 0 20px rgba(111, 125, 255, 0.3);
        }
        .btnPrimary:hover {
          background: #1a2230;
          box-shadow: 0 0 25px rgba(111, 125, 255, 0.45);
        }
        .btnGhost {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.22);
          backdrop-filter: blur(6px);
        }
        .btnGhost:hover {
          background: rgba(255, 255, 255, 0.12);
        }
      `}</style>
    </section>
  );
}
