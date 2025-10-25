// src/app/components/Hero.tsx
"use client";
import Image from "next/image";
import { useCallback, type ReactNode, type CSSProperties } from "react";

type Props = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  /** Opcional: efeito externo por baixo (evite usar junto para não sobrepor) */
  childrenEffect?: ReactNode;
};

/** CSS vars tipadas */
type HeroCSSVars = CSSProperties & {
  "--auroraOpacity"?: number | string;  // força do efeito (0.0–1)
  "--auroraSpeed"?: number | string;    // segundos por ciclo
  "--auroraAngle"?: number | string;    // graus de inclinação
};

export default function Hero({ whatsappUrl, onScrollToOque, childrenEffect }: Props) {
  const openWhats = useCallback(() => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [whatsappUrl]);

  /** Ajuste fino do efeito (visível porém sutil) */
  const styleVars: HeroCSSVars = {
    "--auroraOpacity": 0.12, // 0.10–0.18
    "--auroraSpeed": 48,     // maior = mais lento
    "--auroraAngle": 24,     // diagonal suave
  };

  return (
    <section
      id="topo"
      className="hero contentVis"
      aria-labelledby="hero-title"
      aria-describedby="hero-lead"
      style={styleVars}
    >
      {/* Se usar, fica por baixo de tudo (recomendado não misturar com o aurora) */}
      {childrenEffect}

      {/* ÚNICO EFEITO: AURORA RIBBONS */}
      <div className="bg fx-aurora" aria-hidden>
        {/* camada de textura suave */}
        <i aria-hidden />
      </div>

      <div className="container grid">
        {/* IMAGEM — primeiro no mobile */}
        <div className="mediaCol">
          <figure className="frame" aria-label="Dispositivo blindado">
            <div className="glass">
              <div className="vignette" aria-hidden />
              <Image
                src="/elite.jpg"
                alt="Dispositivo protegido por nanoproteção com titânio"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
                className="img"
              />
              <div className="badge" role="note">
                <Image src="/blindagem.png" alt="" width={18} height={18} />
                <span>Nanoproteção com titânio</span>
              </div>
            </div>
            <figcaption className="srOnly">Acabamento de fábrica, sem ruído</figcaption>
          </figure>
        </div>

        {/* TEXTO */}
        <div className="textCol">
          <p className="eyebrow">Proteção invisível · Resistência incomparável</p>
          <h1 className="h1" id="hero-title">Elite Blindagem: o futuro da proteção já chegou</h1>

          <p className="lead" id="hero-lead">
            A Elite Blindagem traz ao Brasil uma tecnologia de <strong>nanoproteção com titânio</strong> que cria
            uma camada invisível e ultra-resistente, mantendo seu aparelho com aparência de novo por muito mais tempo.
          </p>

          <p className="subLead"><strong>É ciência aplicada à proteção do seu celular.</strong></p>

          <div className="ctaRow">
            <button className="btnPrimary" onClick={openWhats} aria-label="Agendar avaliação pelo WhatsApp">
              Agendar agora
            </button>
            <button className="btnGhost" onClick={onScrollToOque} aria-label="Saber o que é a blindagem">
              O que é a blindagem?
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Utilitários */
        .container { width:min(1140px,92%); margin-inline:auto; }
        .srOnly { position:absolute!important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        .contentVis { content-visibility:auto; contain-intrinsic-size: 1px 680px; }

        /* HERO */
        .hero{
          position:relative; isolation:isolate;
          padding: clamp(18px,4vw,26px) 0 clamp(16px,3vw,22px);
          background:#0b0f14; color:#eef2f7; overflow:clip;
        }
        :global(.vantaBlock){ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .bg{ position:absolute; inset:0; z-index:1; pointer-events:none; }
        .hero > .container{ position:relative; z-index:2; }

        /* ========= AURORA RIBBONS =========
           Duas faixas diagonais com conic/radial + blur, drift lento.
           Uma camada extra (<i>) aplica granulação finíssima p/ dar “caro”.
        */
        .fx-aurora{
          --o: var(--auroraOpacity);
          --spd: var(--auroraSpeed);
          --ang: var(--auroraAngle);
          position:absolute; inset:0; overflow:hidden;
          background:#0b0f14;
        }
        .fx-aurora::before,
        .fx-aurora::after{
          content:""; position:absolute; inset:-18%;
          transform: rotate(calc(var(--ang) * 1deg));
          filter: blur(26px);
          mix-blend-mode: screen; /* luz sobre fundo escuro */
          opacity: calc(var(--o) + 0.02);
          animation: auroraDrift var(--spd)s ease-in-out infinite alternate;
          background:
            /* faixa 1 (fria) */
            radial-gradient(80% 40% at 20% 30%, rgba(120,160,255,.24) 0%, transparent 60%),
            conic-gradient(from 0deg at 50% 50%,
              rgba(110,150,255,.24) 0 25%,
              rgba(160,210,255,.10) 25% 45%,
              transparent 45% 100%);
        }
        .fx-aurora::after{
          transform: rotate(calc(var(--ang) * -1deg));
          opacity: calc(var(--o) + 0.01);
          animation-duration: calc(var(--spd) * 1.35s);
          background:
            /* faixa 2 (neutra/metal) */
            radial-gradient(70% 35% at 80% 60%, rgba(200,220,255,.18) 0%, transparent 62%),
            conic-gradient(from 180deg at 50% 50%,
              rgba(180,195,220,.16) 0 18%,
              rgba(255,255,255,.06) 18% 40%,
              transparent 40% 100%);
        }

        /* Textura finíssima: simula “fibra/ruído” muito discreto */
        .fx-aurora > i{
          position:absolute; inset:-2%;
          opacity: calc(var(--o) * 0.65);
          mix-blend-mode: soft-light;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(200,210,230,.045) 0 1px,
              rgba(200,210,230,0) 1px 22px
            );
          filter: blur(3px);
          animation: grainShift calc(var(--spd) * 1.8s) linear infinite;
        }

        @keyframes auroraDrift {
          0%   { transform: translate3d(-2%, -1%, 0) rotate(var(--ang)); }
          100% { transform: translate3d( 2%,  1%, 0) rotate(var(--ang)); }
        }
        @keyframes grainShift {
          from { background-position: 0 0; }
          to   { background-position: 120px 0; }
        }

        /* Fallback quando não rolar blend avançado/mask — sobe opacidade */
        @supports not (mix-blend-mode: screen) {
          .fx-aurora::before, .fx-aurora::after { mix-blend-mode: normal; opacity: calc(var(--o) + .08); }
        }

        /* Grid conteúdo */
        .grid{
          display:grid; gap: clamp(16px,3vw,26px);
          grid-template-columns: 1fr; align-items:start;
        }
        .mediaCol { order:-1; }
        @media (min-width:900px){
          .grid{ grid-template-columns:minmax(0,1.02fr) minmax(0,.98fr); gap: clamp(20px,3vw,28px); }
          .mediaCol { order:initial; }
          .textCol { padding-top:4px; }
        }

        /* Tipografia */
        .eyebrow{
          color:#c6ced9; opacity:.9; margin:0 0 8px;
          font-size:12px; letter-spacing:.12em; text-transform:uppercase; font-weight:700;
        }
        .h1{
          margin:0 0 8px; color:#fff;
          font-size: clamp(22px, 3vw, 32px);
          line-height:1.16; font-weight:680; letter-spacing:.003em;
          text-wrap: balance;
        }
        .lead, .subLead{ color:#d6dce6; margin:6px 0 0; max-width:62ch; }
        .lead{ font-size: clamp(14.6px,1.35vw,16.2px); line-height:1.58; }
        .subLead strong{ color:#fff; font-weight:720; }

        /* CTAs */
        .ctaRow{ margin-top:14px; display:flex; gap:12px; flex-wrap:nowrap; }
        .btnPrimary, .btnGhost{
          border-radius:999px; padding:12px 18px; font-weight:820; letter-spacing:.01em; cursor:pointer;
          transition: transform .12s ease, background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
          white-space:nowrap; min-width:0;
        }
        .btnPrimary{ background:#141a22; color:#fff; border:1px solid #0f1419; box-shadow:0 8px 18px rgba(0,0,0,.20); }
        .btnPrimary:hover{ transform:translateY(-1px); box-shadow:0 12px 26px rgba(0,0,0,.24); }
        .btnGhost{ background:rgba(255,255,255,.08); color:#fff; border:1px solid rgba(255,255,255,.22); backdrop-filter: blur(6px); }
        .btnGhost:hover{ transform:translateY(-1px); background:rgba(255,255,255,.12); }
        @media (max-width:520px){
          .ctaRow{ display:grid; grid-template-columns:1fr 1fr; gap:10px; }
          .btnPrimary, .btnGhost{ width:100%; padding:10px 12px; font-size:14px; }
        }

        /* Mídia */
        .frame{
          margin:0; border-radius:18px; overflow:hidden; border:0; background:#0b0f14;
          box-shadow: 0 10px 26px rgba(0,0,0,.45);
          transform: translateZ(0);
        }
        .glass{
          position:relative; width:100%;
          min-height: clamp(360px, 48vh, 560px);
          display:flex; align-items:center; justify-content:center;
          background:#0b0f14;
        }
        .img{ object-fit:cover; object-position:50% 30%; filter: saturate(1.04) contrast(1.02); }
        .vignette{
          position:absolute; inset:0; pointer-events:none;
          background:
            linear-gradient(180deg, rgba(0,0,0,.18) 0%, rgba(0,0,0,0) 32%),
            radial-gradient(120% 120% at 100% 100%, rgba(0,0,0,.22), transparent 52%);
          mix-blend-mode:multiply;
        }
        .badge{
          position:absolute; left:12px; bottom:12px; z-index:1;
          display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,.94); border:1px solid #e6e8ec; border-radius:999px;
          padding:6px 10px; color:#0c1117; font-size:12.3px; font-weight:780;
          box-shadow:0 8px 18px rgba(0,0,0,.28);
        }

        /* Acessibilidade */
        @media (prefers-reduced-motion: reduce){
          .fx-aurora, .fx-aurora::before, .fx-aurora::after, .fx-aurora > i { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
