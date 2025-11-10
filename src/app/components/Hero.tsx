"use client";
import Image from "next/image";
import { useEffect, useRef } from "react"; // Removendo useState e useEffect desnecessários para sparks

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
      {/* NOVO EFEITO: Barreira Quântica / Brilho Gelo de Titânio - Foco no Branco/Gelo */}
      <div className="titanium-glare" aria-hidden></div>

      <div className="container">
        {/* TEXTO - VEM ANTES NO MOBILE PARA PRIORIZAR O CTA (1) */}
        <div className="textCol">
          <h1 className="title">BLINDAGEM ELITE</h1>
          <h2 className="subtitle">A Blindagem Invisível que Não Trinca</h2>
          <p className="lead">
            Chega de películas. Tecnologia de nanoproteção com Titânio cria uma camada ultra-resistente e invisível que protege seu aparelho contra arranhões, impactos e o tempo.
          </p>
          <div className="ctaRow">
            <button className="btnPrimary" onClick={openWhats}>Agendar Agora</button>
            <button className="btnGhost" onClick={onScrollToOque}>O que é a blindagem?</button>
          </div>
        </div>

        {/* VISUAL - VEM DEPOIS NO MOBILE (2) */}
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
                priority
                sizes="(max-width: 900px) 86vw, 46vw"
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* ===== Vars pra controlar tamanho e escala final ===== */
        .deviceWrapper {
          --wrapW: clamp(280px, 38vw, 600px);
          --wrapH: clamp(400px, 52vh, 680px);
          --phoneFinalScale: 1.02;
          --comboFinalScale: 1.08;    /* desktop */
          --comboOvershoot: 1.12;
        }
        @media (max-width: 900px) {
          .deviceWrapper {
            --wrapW: min(86vw, 560px); 
            --wrapH: min(64vh, 700px); 
            --phoneFinalScale: 1.06;   
            --comboFinalScale: 1.16;   
            --comboOvershoot: 1.20;
          }
        }

        /* ===== LAYOUT & HERO Fundo - SEM AZUL SÓ PRETO E DESTAQUES CINZAS ===== */
        .hero {
          position: relative;
          /* Fundo preto profundo com toque sutil de cinza metálico */
          background: radial-gradient(circle at top, #0d0d0d 0%, #000 70%); 
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
          .mediaCol { order: 2; } 
          .textCol { order: 1; }
        }

        /* ===== NOVO EFEITO: Brilho Gelo de Titânio (Ciano/Branco Frio) ===== */
        .titanium-glare {
          position: absolute;
          inset: 0;
          /* Foco no branco/ciano claro, parecendo titânio frio */
          background: radial-gradient(circle at 50% 15%, rgba(200, 240, 255, 0.1) 0%, transparent 60%); 
          mix-blend-mode: screen; 
          opacity: 0.9;
          z-index: 0;
          pointer-events: none;
          animation: glarePulse 8s ease-in-out infinite alternate;
        }
        @keyframes glarePulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.04); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
        @media (max-width: 900px) {
            .titanium-glare {
                background: radial-gradient(circle at 50% 25%, rgba(200, 240, 255, 0.15) 0%, transparent 80%);
            }
        }

        /* ===== VISUAL e TEXTO - Manter animações e layout ===== */
        .mediaCol { display: flex; justify-content: center; align-items: center; }
        .deviceWrapper { position: relative; width: var(--wrapW); height: var(--wrapH); margin: auto; }
        .watch, .phone, .combo {
          position: absolute; inset: 0;
          filter: drop-shadow(0 10px 30px rgba(0,0,0,.5));
          opacity: 0;
        }

        /* Animações (mantidas as velocidades otimizadas) */
        .hero.play .watch { animation: watchEnter 1s cubic-bezier(.25,1,.3,1) 0s forwards, watchExit 0.5s ease-in-out 1s forwards; }
        @keyframes watchEnter { 0% { opacity: 0; transform: translate(-120%, 80%) rotate(-40deg) scale(.7); } 100% { opacity: 1; transform: translate(0, 0) rotate(0) scale(1); } }
        @keyframes watchExit { to { opacity: 0; transform: translate(-6%, -5%) rotate(-6deg) scale(.98); } }
        .hero.play .phone { animation: phoneEnter 1s cubic-bezier(.25,1,.3,1) 1.2s forwards, phoneExit 0.5s ease-in-out 2.2s forwards; }
        @keyframes phoneEnter { 0% { opacity: 0; transform: translateY(-160%) rotate(15deg) scale(.82); } 100% { opacity: 1; transform: translateY(0) rotate(0) scale(var(--phoneFinalScale)); } }
        @keyframes phoneExit { to { opacity: 0; transform: translateY(-4%) rotate(-3deg) scale(1.0); } }
        .hero.play .combo { animation: comboDepthIn 1s cubic-bezier(.2,1,.3,1) 2.5s forwards; z-index: 2; }
        @keyframes comboDepthIn { 0% { opacity: 0; transform: scale(.6) translateY(4%); filter: blur(6px); } 70% { opacity: 1; transform: scale(var(--comboOvershoot)) translateY(-1%); filter: blur(0); } 100% { opacity: 1; transform: scale(var(--comboFinalScale)) translateY(0); } }
        .textCol { position: relative; opacity: 0; animation: textIn .8s ease 3.2s forwards; } 
        @keyframes textIn { from { opacity:0; transform: translateY(24px); } to { opacity:1; transform: translateY(0); } }

        /* TÍTULO - Ajustado para usar uma cor ciano/branco gelo no gradiente */
        .title {
          font-size: clamp(26px, 3.1vw, 44px);
          font-weight: 900;
          margin: 0 0 8px;
          letter-spacing: .02em;
          text-transform: uppercase;
          /* Gradiente de Titânio/Gelo: foco no branco e ciano suave */
          background: linear-gradient(90deg, #e8ecff 0%, #a6d8ff 25%, #ffffff 50%, #a6d8ff 75%, #e8ecff 100%);
          background-size: 300% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          opacity: 0;
          animation: forgeText 1s cubic-bezier(.2,1,.3,1) 0.5s forwards, shineMove 4s linear 3.2s infinite; 
        }
        @keyframes forgeText { 0% { opacity:0; letter-spacing:.16em; filter:blur(6px); transform:scale(1.06); } 60%{ opacity:1; letter-spacing:.02em; filter:blur(0); transform:scale(1); } 100%{ opacity:1; } }
        @keyframes shineMove { 0%{background-position:0% 0%} 100%{background-position:300% 0%} }

        .subtitle {
          font-size: clamp(18px, 1.8vw, 22px);
          font-weight: 700;
          /* Cor ajustada para um ciano mais metálico */
          color: #a6d8ff; 
          margin: 4px 0 14px;
          opacity: 0; transform: translateY(16px);
          animation: subAppear .7s cubic-bezier(.2,1,.3,1) 3.5s forwards; 
        }
        @keyframes subAppear { to { opacity: 1; transform: translateY(0); } }
        .lead { color:#d6dce6; font-size: clamp(15px,1.28vw,16.2px); line-height:1.6; max-width:52ch; margin-bottom:18px; }
        .ctaRow { opacity:0; display:flex; gap:12px; animation: btnRise .8s cubic-bezier(.25,1,.3,1) 4.2s forwards; flex-wrap: wrap; justify-content: center; }
        @media (min-width: 768px) { .ctaRow { justify-content: flex-start; } }
        @keyframes btnRise { 0%{ transform:translateY(36px) scale(.96); opacity:0; } 70%{ transform:translateY(-4px) scale(1.02); opacity:1; } 100%{ transform:translateY(0) scale(1); opacity:1; } }

        /* ===== BOTÕES FINAIS: MÁXIMO CONTRASTE (CLARO no ESCURO) e TITÂNIO ===== */
        .btnPrimary,.btnGhost{ 
          border-radius:999px; 
          padding:12px 24px; 
          font-weight:800; 
          cursor:pointer; 
          transition:.2s ease; 
          text-transform: uppercase; 
          font-size: clamp(14px, 1.2vw, 16px); 
        }

        .btnPrimary{ 
          /* Gradiente Metálico Claro: do branco ao cinza ciano. Garante contraste! */
          background: linear-gradient(90deg, #f0f0f5 0%, #c4c4cc 100%); 
          color:#000; /* Texto PRETO no fundo CLARO: Contraste Máximo! */
          border:1px solid #c4c4cc; 
          /* Sombra sutil de metal polido */
          box-shadow: 0 8px 25px rgba(255,255,255,0.1), 0 0 6px rgba(255,255,255,0.8) inset; 
        }
        .btnPrimary:hover{ 
          background: linear-gradient(90deg, #ffffff 0%, #d4d4dc 100%); /* Clarear no hover */
          box-shadow: 0 0 30px rgba(255,255,255,0.15), 0 0 8px rgba(255,255,255,1) inset; 
          transform: translateY(-2px); 
        }

        .btnGhost{ 
          background:rgba(255,255,255,.08); 
          color:#fff; 
          border:1px solid rgba(255,255,255,.22); 
          backdrop-filter:blur(6px); 
          box-shadow: 0 0 15px rgba(0,0,0,.3); 
        }
        .btnGhost:hover{ 
          background:rgba(255,255,255,.15); 
          border-color: rgba(255,255,255,.4);
          transform: translateY(-2px);
        }
      `}</style>
    </section>
  );
}