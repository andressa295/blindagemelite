"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

type HeroProps = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  devicePhoneSrc?: string;
  deviceWatchSrc?: string;
  deviceComboSrc?: string; // celular+relógio juntos
};

export default function Hero({
  whatsappUrl,
  onScrollToOque,
  devicePhoneSrc = "/mobile1.png",
  deviceWatchSrc = "/relogio.png",
  deviceComboSrc = "/combo.png",
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);

  // Anti-FOUC
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.removeAttribute("data-state");
    requestAnimationFrame(() => el.classList.add("play"));
  }, []);

  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section ref={heroRef} className="hero" data-state="init" style={{ opacity: 0 }}>
      {/* partículas */}
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
              <Image src={deviceWatchSrc} alt="Relógio blindado" fill priority style={{ objectFit: "contain" }} />
            </div>

            <div className="phone">
              <Image src={devicePhoneSrc} alt="Celular blindado" fill priority style={{ objectFit: "contain" }} />
            </div>

            <div className="combo">
              <Image
                src={deviceComboSrc}
                alt="Celular e relógio blindados"
                fill
                sizes="(max-width: 900px) 86vw, 46vw"
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
            Tecnologia de <strong>nanoproteção com titânio</strong> — cria uma camada invisível e ultra-resistente,
            mantendo seu aparelho com aparência de novo por muito mais tempo.
          </p>
          <div className="ctaRow">
            <button className="btnPrimary" onClick={openWhats}>Agendar agora</button>
            <button className="btnGhost" onClick={onScrollToOque}>O que é a blindagem?</button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== Vars pra controlar tamanho e escala final ===== */
        .deviceWrapper {
          --wrapW: clamp(280px, 38vw, 600px);
          --wrapH: clamp(400px, 52vh, 680px);
          --phoneFinalScale: 1.02;
          --comboFinalScale: 1.08;    /* desktop */
          --comboOvershoot: 1.12;
        }
        @media (max-width: 900px) {
          .deviceWrapper {
            --wrapW: min(86vw, 560px); /* ↑ maior no mobile */
            --wrapH: min(64vh, 700px); /* ↑ mais alto no mobile */
            --phoneFinalScale: 1.06;   /* phone com mais presença no mobile */
            --comboFinalScale: 1.16;   /* combo maior no mobile */
            --comboOvershoot: 1.20;
          }
        }

        /* ===== LAYOUT & ANTI-FOUC ===== */
        .hero {
          position: relative;
          background: #000;
          color: #eef2f7;
          padding-block: clamp(20px, 5vw, 44px);
          overflow: hidden;
          transition: opacity .5s ease, transform .6s ease;
          transform: scale(1.02);
        }
        .hero.play { opacity: 1 !important; transform: scale(1); }

        .container {
          width: min(1140px, 92%);
          margin: auto;
          display: grid;
          gap: clamp(18px, 4vw, 30px);
          align-items: center;
          position: relative;
          z-index: 2;
        }
        @media (min-width: 900px) {
          .container { grid-template-columns: 1fr 1fr; }
          .hero { padding-block: clamp(14px, 3vw, 34px); }
        }

        /* ===== partículas ===== */
        .sparks { position: absolute; inset: 0; overflow: hidden; z-index: 0; pointer-events: none; }
        .spark {
          position: absolute; bottom: -10%;
          left: calc(2% + 96% * var(--r, .5));
          width: 2px; height: 18px; border-radius: 2px;
          background: linear-gradient(180deg, #fff, transparent);
          opacity: 0; transform: translateY(0) scaleY(.5);
          animation: rise 4s linear infinite; animation-delay: calc(-1s * var(--d, 0));
        }
        .spark:nth-child(odd){ background: linear-gradient(180deg, #a6bfff, transparent); }
        .spark:nth-child(3n){ width: 3px; }
        @keyframes rise {
          0% { opacity: 0; transform: translateY(100%) scaleY(.5); }
          12%{ opacity: 1; }
          50%{ transform: translateY(-20%) scaleY(1); opacity: .9; }
          100%{ transform: translateY(-140%) scaleY(.6); opacity: 0; }
        }

        /* ===== VISUAL ===== */
        .mediaCol { display: flex; justify-content: center; align-items: center; }
        .deviceWrapper {
          position: relative;
          width: var(--wrapW);
          height: var(--wrapH);
          margin: auto;
        }
        .watch, .phone, .combo {
          position: absolute; inset: 0;
          filter: drop-shadow(0 10px 30px rgba(0,0,0,.5));
          opacity: 0;
        }

        /* 1) Relógio: entra e sai suave antes do combo */
        .hero.play .watch {
          animation:
            watchEnter 1.2s cubic-bezier(.25,1,.3,1) 0s forwards,
            watchExit 0.45s cubic-bezier(.22,.61,.36,1) 4.4s forwards;
        }
        @keyframes watchEnter {
          0%   { opacity: 0; transform: translate(-120%, 80%) rotate(-40deg) scale(.7); }
          70%  { opacity: 1; transform: translate(-30%, -10%) rotate(10deg) scale(1.05); }
          100% { opacity: 1; transform: translate(0, 0) rotate(0) scale(1); }
        }
        @keyframes watchExit {
          to { opacity: 0; transform: translate(-6%, -5%) rotate(-6deg) scale(.98); }
        }

        /* 2) Celular: fica MAIS TEMPO e sai suave */
        .hero.play .phone {
          animation:
            phoneEnter 1.5s cubic-bezier(.25,1,.3,1) 1.8s forwards,
            phoneHold 1.6s linear 3.3s forwards,
            phoneExit 0.6s ease-in-out 4.9s forwards;
        }
        @keyframes phoneEnter {
          0%   { opacity: 0; transform: translateY(-160%) rotate(15deg) scale(.82); }
          60%  { opacity: 1; transform: translateY(8%) rotate(-6deg) scale(1.06); }
          100% { opacity: 1; transform: translateY(0) rotate(0) scale(var(--phoneFinalScale)); }
        }
        @keyframes phoneHold { to { opacity: 1; transform: translateY(0) scale(var(--phoneFinalScale)); } }
        @keyframes phoneExit { to { opacity: 0; transform: translateY(-4%) rotate(-3deg) scale(1.0); } }

        /* 3) COMBO FINAL — vem do fundo, MAIOR no mobile e fixa */
        .hero.play .combo {
          animation: comboDepthIn 1s cubic-bezier(.2,1,.3,1) 5.2s forwards;
          z-index: 2;
        }
        @keyframes comboDepthIn {
          0%   { opacity: 0; transform: scale(.6) translateY(4%); filter: blur(6px); }
          70%  { opacity: 1; transform: scale(var(--comboOvershoot)) translateY(-1%); filter: blur(0); }
          100% { opacity: 1; transform: scale(var(--comboFinalScale)) translateY(0); }
        }

        /* ===== TEXTO ===== */
        .textCol { position: relative; opacity: 0; animation: textIn .8s ease 6.1s forwards; }
        @keyframes textIn { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }

        .title {
          font-size: clamp(26px, 3.1vw, 44px);
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: .02em;
          text-transform: uppercase;
          background: linear-gradient(90deg,#e8ecff 0%,#6f7dff 25%,#ffffff 50%,#6f7dff 75%,#e8ecff 100%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          animation: forgeText 1s cubic-bezier(.2,1,.3,1) 1.1s forwards, shineMove 4s linear 3.2s infinite;
        }
        @keyframes forgeText {
          0% { opacity:0; letter-spacing:.16em; filter:blur(6px); transform:scale(1.06); }
          60%{ opacity:1; letter-spacing:.02em; filter:blur(0); transform:scale(1); }
          100%{ opacity:1; }
        }
        @keyframes shineMove { 0%{background-position:0% 0%} 100%{background-position:300% 0%} }

        .subtitle {
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 700;
          color: #b7c2ff;
          margin: 4px 0 14px;
          opacity: 0; transform: translateY(16px);
          animation: subAppear .7s cubic-bezier(.2,1,.3,1) 6.4s forwards;
        }
        @keyframes subAppear { to { opacity: 1; transform: translateY(0); } }

        .lead { color:#d6dce6; font-size: clamp(15px,1.28vw,16.2px); line-height:1.6; max-width:52ch; margin-bottom:18px; }

        .ctaRow { display:flex; gap:12px; opacity:0; animation: btnRise .8s cubic-bezier(.25,1,.3,1) 7s forwards; }
        @keyframes btnRise {
          0%{ transform:translateY(36px) scale(.96); opacity:0; }
          70%{ transform:translateY(-4px) scale(1.02); opacity:1; }
          100%{ transform:translateY(0) scale(1); opacity:1; }
        }
        .btnPrimary,.btnGhost{ border-radius:999px; padding:12px 18px; font-weight:800; cursor:pointer; transition:.2s ease; }
        .btnPrimary{ background:#141a22; color:#fff; border:1px solid #0f1419; box-shadow:0 0 20px rgba(111,125,255,.3); }
        .btnPrimary:hover{ background:#1a2230; box-shadow:0 0 25px rgba(111,125,255,.45); }
        .btnGhost{ background:rgba(255,255,255,.08); color:#fff; border:1px solid rgba(255,255,255,.22); backdrop-filter:blur(6px); }
        .btnGhost:hover{ background:rgba(255,255,255,.12); }
      `}</style>
    </section>
  );
}
