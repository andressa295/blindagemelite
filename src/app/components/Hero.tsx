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
  devicePhoneSrc = "/mobile1.png",
  deviceWatchSrc = "/relogio.png",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Anti-FOUC: começa invisível inline e só mostra quando hidratar
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    // remove o "data-state=init" (que mantém opacity:0 inline) e dispara a timeline
    el.removeAttribute("data-state");
    // leve rAF para garantir recálculo antes da animação
    requestAnimationFrame(() => el.classList.add("play"));
  }, []);

  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    // data-state="init" + style inline -> evita flash sem CSS
    <section
      ref={heroRef}
      className="hero"
      data-state="init"
      style={{ opacity: 0 }}
    >
      {/* === FAÍSCAS DE FUNDO === */}
      <div className="sparks" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <span key={i} className="spark" />
        ))}
      </div>

      <div className="container">
        {/* VISUAL */}
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

        {/* TEXTO */}
        <div className="textCol">
          <h1 className="title">ELITE BLINDAGEM</h1>
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
        /* ===== LAYOUT & ANTI-FOUC ===== */
        .hero {
          position: relative;
          background: #000;
          color: #eef2f7;
          /* menos espaço no desktop; mantive confortável no mobile */
          padding-block: clamp(24px, 5vw, 48px);
          overflow: hidden;

          /* quando o atributo data-state é removido, a transição entra */
          transition: opacity 0.5s ease, transform 0.6s ease;
          transform: scale(1.02);
        }
        .hero.play {
          opacity: 1 !important; /* garantido mesmo sem inline */
          transform: scale(1);
        }

        .container {
          width: min(1140px, 92%);
          margin: auto;
          display: grid;
          gap: clamp(20px, 4vw, 32px); /* gap menor no desktop */
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 900px) {
          .container {
            grid-template-columns: 1fr 1fr;
          }
          /* mais perto do cabeçalho no desktop */
          .hero {
            padding-block: clamp(16px, 3.2vw, 36px);
          }
        }

        /* ===== PARTICLES / FAÍSCAS ===== */
        .sparks {
          position: absolute;
          inset: 0;
          overflow: hidden;
          z-index: 0;
          pointer-events: none;
        }
        .spark {
          position: absolute;
          bottom: -10%;
          left: calc(2% + 96% * var(--r, 0.5));
          width: 2px;
          height: 18px;
          border-radius: 2px;
          background: linear-gradient(180deg, #fff, transparent);
          opacity: 0;
          transform: translateY(0) scaleY(0.5);
          animation: rise 4s linear infinite;
          animation-delay: calc(-1s * var(--d, 0));
        }
        .spark:nth-child(odd) {
          background: linear-gradient(180deg, #a6bfff, transparent);
        }
        .spark:nth-child(3n) {
          width: 3px;
        }
        @keyframes rise {
          0% {
            opacity: 0;
            transform: translateY(100%) scaleY(0.5);
          }
          12% {
            opacity: 1;
          }
          50% {
            transform: translateY(-20%) scaleY(1);
            opacity: 0.9;
          }
          100% {
            transform: translateY(-140%) scaleY(0.6);
            opacity: 0;
          }
        }

        /* ===== VISUAL (reduzi altura no desktop) ===== */
        .mediaCol {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .deviceWrapper {
          position: relative;
          width: clamp(260px, 33vw, 480px); /* ligeiramente menor no desktop */
          height: clamp(360px, 46vh, 560px); /* ↓ de 52vh para 46vh */
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
            transform: translateY(8%) rotate(-6deg) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(0deg) scale(1);
          }
        }

        /* ===== TEXTO (menos “preto vazio” e efeito sutil) ===== */
        .textCol {
          position: relative;
          opacity: 0;
          animation: textIn 0.8s ease 3.6s forwards;
        }
        /* feixe metálico sutil atrás do texto (sem poluir) */
        .textCol::before {
          content: "";
          position: absolute;
          left: -6%;
          top: -8%;
          width: 36%;
          height: 120%;
          pointer-events: none;
          background: radial-gradient(
              60% 100% at 0% 50%,
              rgba(120, 140, 255, 0.15),
              transparent 60%
            ),
            linear-gradient(90deg, rgba(255, 255, 255, 0.06), transparent 60%);
          filter: blur(8px);
          opacity: 0.7;
          transform: translateZ(0);
        }
        @media (max-width: 900px) {
          .textCol::before {
            display: none; /* no mobile está ótimo sem esse preenchimento */
          }
        }

        @keyframes textIn {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .title {
          font-size: clamp(26px, 3.1vw, 44px);
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          background: linear-gradient(
            90deg,
            #e8ecff 0%,
            #6f7dff 25%,
            #ffffff 50%,
            #6f7dff 75%,
            #e8ecff 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          animation: forgeText 1s cubic-bezier(0.2, 1, 0.3, 1) 1.1s forwards,
            shineMove 4s linear 3.2s infinite;
        }
        @keyframes forgeText {
          0% {
            opacity: 0;
            letter-spacing: 0.16em;
            filter: blur(6px);
            transform: scale(1.06);
          }
          60% {
            opacity: 1;
            letter-spacing: 0.02em;
            filter: blur(0);
            transform: scale(1);
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
          font-weight: 700;
          color: #b7c2ff;
          margin: 4px 0 14px;
          opacity: 0;
          transform: translateY(16px);
          animation: subAppear 0.7s cubic-bezier(0.2, 1, 0.3, 1) 3s forwards;
        }
        @keyframes subAppear {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .lead {
          color: #d6dce6;
          font-size: clamp(15px, 1.28vw, 16.2px);
          line-height: 1.6;
          max-width: 52ch;
          margin-bottom: 18px;
        }

        /* ===== CTA ===== */
        .ctaRow {
          display: flex;
          gap: 12px;
          opacity: 0;
          animation: btnRise 0.8s cubic-bezier(0.25, 1, 0.3, 1) 4s forwards;
        }
        @keyframes btnRise {
          0% {
            transform: translateY(36px) scale(0.96);
            opacity: 0;
          }
          70% {
            opacity: 1;
            transform: translateY(-4px) scale(1.02);
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
