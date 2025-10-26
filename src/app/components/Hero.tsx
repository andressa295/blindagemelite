// src/app/components/Hero.tsx
"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  /** Opcional: efeito externo por baixo (evite usar junto para não sobrepor) */
  childrenEffect?: ReactNode;
};

type HeroCSSVars = CSSProperties & {
  "--ionOpacity"?: number | string;  // 0–1
  "--ionSpeed"?: number | string;    // s
  "--ionAngle"?: number | string;    // deg
};

export default function Hero({ whatsappUrl, onScrollToOque, childrenEffect }: Props) {
  const openWhats = useCallback(() => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [whatsappUrl]);

  // Garantir que o título NÃO fica invisível
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    // Mostra já (sem depender de observer)
    el.classList.add("revealActive");
  }, []);

  const styleVars: HeroCSSVars = {
    "--ionOpacity": 0.26, // mais presente no preto; ajuste fino: 0.22–0.32
    "--ionSpeed": 42,
    "--ionAngle": 26,
  };

  return (
    <section
      id="topo"
      className="hero contentVis"
      aria-labelledby="hero-title"
      aria-describedby="hero-lead"
      style={styleVars}
    >
      {/* efeito externo opcional (fica por baixo) */}
      {childrenEffect}

      {/* ===== EFEITO ÚNICO: ION GLOW (visível em preto puro) ===== */}
      <div className="bg fx-ion" aria-hidden>
        <i aria-hidden />
      </div>

      <div className="container grid">
        {/* IMAGEM */}
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

          <h1 className="h1 revealInit" id="hero-title" ref={titleRef}>
            Elite Blindagem: o futuro da proteção já chegou
          </h1>

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
          background:#000; /* preto absoluto */
          color:#eef2f7; overflow:clip;
        }
        :global(.vantaBlock){ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .bg{ position:absolute; inset:0; z-index:1; pointer-events:none; }
        .hero > .container{ position:relative; z-index:2; }

        /* ========= ION GLOW =========
           - 100% visível em preto (#000), sem blend-modes.
           - Duas faixas diagonais + textura leve.
        */
        .fx-ion{
          --o: var(--ionOpacity);
          --spd: var(--ionSpeed);
          --ang: var(--ionAngle);
          position:absolute; inset:0; overflow:hidden;
          background:
            radial-gradient(120% 80% at 50% -10%, rgba(55,85,150, calc(var(--o)*.35)), rgba(0,0,0,0) 70%),
            #000;
        }
        .fx-ion::before,
        .fx-ion::after{
          content:""; position:absolute; inset:-22%;
          filter: blur(28px);
          opacity: calc(var(--o) + 0.06);
          animation: ionDrift var(--spd)s ease-in-out infinite alternate;
        }
        /* faixa 1 (lado esquerdo -> centro) */
        .fx-ion::before{
          transform: rotate(calc(var(--ang) * 1deg));
          background:
            radial-gradient(60% 40% at 18% 32%, rgba(84,148,255,.34), rgba(0,0,0,0) 62%),
            linear-gradient(90deg, rgba(24,120,255,.22), rgba(0,0,0,0) 60%);
        }
        /* faixa 2 (lado direito -> centro) */
        .fx-ion::after{
          transform: rotate(calc(var(--ang) * -1deg));
          opacity: calc(var(--o) + 0.05);
          animation-duration: calc(var(--spd) * 1.35s);
          background:
            radial-gradient(58% 38% at 82% 62%, rgba(180,198,255,.26), rgba(0,0,0,0) 64%),
            linear-gradient(270deg, rgba(220,235,255,.14), rgba(0,0,0,0) 60%);
        }
        /* textura sutil */
        .fx-ion > i{
          position:absolute; inset:-2%;
          opacity: calc(var(--o) * .40);
          background: repeating-linear-gradient(90deg, rgba(190,205,255,.045) 0 1px, transparent 1px 20px);
          filter: blur(2px);
          animation: ionGrain calc(var(--spd) * 1.6s) linear infinite;
        }

        @keyframes ionDrift {
          0%   { transform: translate3d(-2%, -1%, 0); }
          100% { transform: translate3d( 2%,  1%, 0); }
        }
        @keyframes ionGrain {
          from { background-position: 0 0; }
          to   { background-position: 120px 0; }
        }

        /* Grid */
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
          font-size:12.8px; letter-spacing:.12em; text-transform:uppercase; font-weight:700;
          white-space: nowrap;
        }
        @media (max-width:420px){ .eyebrow{ font-size:12px; letter-spacing:.10em; } }
        @media (max-width:360px){ .eyebrow{ font-size:11px; letter-spacing:.085em; } }
        @media (max-width:330px){ .eyebrow{ font-size:10.2px; letter-spacing:.075em; } }

        .h1{
          margin:0 0 8px; color:#fff;
          font-size: clamp(22px, 3vw, 32px);
          line-height:1.16; font-weight:680; letter-spacing:.003em;
          text-wrap: balance;
        }
        .lead, .subLead{ color:#d6dce6; margin:6px 0 0; max-width:62ch; }
        .lead{ font-size: clamp(14.6px,1.35vw,16.2px); line-height:1.58; }
        .subLead strong{ color:#fff; font-weight:720; }

        /* Reveal sutil (título) — agora seguro */
        .revealInit{ opacity:1; transform:none; } /* visível por padrão */
        .revealActive{ animation: popIn .36s cubic-bezier(.22,.61,.36,1); }
        @keyframes popIn {
          from { opacity:.0; transform: translateY(8px) scale(.995); }
          to   { opacity:1;  transform: translateY(0)  scale(1); }
        }
        @media (prefers-reduced-motion: reduce){
          .revealActive{ animation:none; }
        }

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
        .frame{ margin:0; border-radius:18px; overflow:hidden; border:0; background:#000; box-shadow: 0 10px 26px rgba(0,0,0,.45); transform: translateZ(0); }
        .glass{ position:relative; width:100%; min-height: clamp(360px, 48vh, 560px); display:flex; align-items:center; justify-content:center; background:#000; }
        .img{ object-fit:cover; object-position:50% 30%; filter: saturate(1.04) contrast(1.02); }
        .vignette{ position:absolute; inset:0; pointer-events:none; background:
            linear-gradient(180deg, rgba(0,0,0,.18) 0%, rgba(0,0,0,0) 32%),
            radial-gradient(120% 120% at 100% 100%, rgba(0,0,0,.22), transparent 52%); mix-blend-mode:multiply; }
        .badge{ position:absolute; left:12px; bottom:12px; z-index:1; display:flex; align-items:center; gap:8px; background:rgba(255,255,255,.94); border:1px solid #e6e8ec; border-radius:999px; padding:6px 10px; color:#0c1117; font-size:12.3px; font-weight:780; box-shadow:0 8px 18px rgba(0,0,0,.28); }

        /* Motion safe */
        @media (prefers-reduced-motion: reduce){
          .fx-ion, .fx-ion::before, .fx-ion::after, .fx-ion > i { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
