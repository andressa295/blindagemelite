// components/Hero.tsx
"use client";
import Image from "next/image";
import { useCallback, type ReactNode } from "react";

type Props = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  /** Opcional: um efeito extra por baixo (ex.: <VantaBackground className="vantaBlock" />) */
  childrenEffect?: ReactNode;
};

export default function Hero({ whatsappUrl, onScrollToOque, childrenEffect }: Props) {
  const openWhats = useCallback(() => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [whatsappUrl]);

  return (
    <section
      id="topo"
      className="hero contentVis"
      aria-labelledby="hero-title"
      aria-describedby="hero-lead"
      /* knobs rápidos: 0–1 (intensidade) | segundos (velocidade) */
      style={
        {
          ["--fxOpacity" as any]: 0.10,   // opacidade das ondas (suba p/ 0.14–0.18 se quiser mais visível)
          ["--fxSpeed" as any]: 48,       // velocidade das ondas (s) — maior = mais lento
          ["--gridOpacity" as any]: 0.08, // opacidade do grid alternativo
          ["--gridSpeed" as any]: 60,     // velocidade do grid (s)
        } as React.CSSProperties
      }
    >
      {/* Efeito externo opcional (Vanta) no fundo do fundo */}
      {childrenEffect}

      {/* FUNDO EM MOVIMENTO — escolha 1: waves (padrão) OU parallax-grid (troque a classe) */}
      <div className="bg fx-waves" aria-hidden />
      {/* <div className="bg fx-parallax-grid" aria-hidden /> */}

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

        {/* TEXTO — clean */}
        <div className="textCol">
          <p className="eyebrow">Proteção invisível · Resistência incomparável</p>
          <h1 className="h1" id="hero-title">Elite Blindagem: o futuro da proteção já chegou</h1>

          <p className="lead" id="hero-lead">
            A Elite Blindagem traz ao Brasil uma tecnologia de <strong>nanoproteção com titânio</strong> que cria
            uma camada invisível e ultra-resistente, mantendo seu aparelho com aparência de novo por muito mais tempo.
          </p>

          <p className="subLead"><strong>É ciência aplicada à proteção do seu celular.</strong></p>

          {/* CTAs lado a lado (no bem estreito vira grid 2x1) */}
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
        /* Base utilitária */
        .container { width:min(1140px,92%); margin-inline:auto; }
        .srOnly { position:absolute!important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0; }
        .contentVis { content-visibility:auto; contain-intrinsic-size: 1px 680px; }

        /* HERO preto premium */
        .hero{
          position:relative; isolation:isolate;
          padding: clamp(18px,4vw,26px) 0 clamp(16px,3vw,22px);
          background:#0b0f14; color:#eef2f7; overflow:clip;
        }
        :global(.vantaBlock){ position:absolute; inset:0; z-index:0; pointer-events:none; }
        .bg{ position:absolute; inset:0; z-index:1; pointer-events:none; }
        .hero > .container{ position:relative; z-index:2; }

        /* ========= EFEITO 1 — WAVES (MOVIMENTO NOVO) =========
           Ondas verticais suaves deslizando para a direita, monocromáticas.
           Três camadas com fases diferentes para profundidade. */
        .fx-waves{
          --o: var(--fxOpacity);
          --s: var(--fxSpeed);
          background: #0b0f14;
          overflow:hidden;
        }
        .fx-waves::before,
        .fx-waves::after{
          content:""; position:absolute; inset:-10% -10%; pointer-events:none;
          background:
            repeating-linear-gradient( to right,
              rgba(255,255,255, calc(var(--o) * 0.28)) 0 1px,
              rgba(255,255,255, 0) 1px 26px
            ),
            linear-gradient(180deg, rgba(255,255,255, calc(var(--o) * 0.06)) 0%, rgba(255,255,255,0) 38%);
          filter: blur(4px);
          mix-blend-mode: soft-light;
          animation: waves var(--s)s linear infinite;
          opacity: 1;
        }
        .fx-waves::after{
          /* segunda camada defasada (parallax) */
          animation-duration: calc(var(--s) * 1.35s);
          animation-direction: reverse;
          opacity: 0.9;
          transform: translateY(2%);
        }
        /* terceira camada real, mais distante e mais suave */
        .fx-waves::marker { display:none } /* hack para evitar warnings */
        .fx-waves:has(*){} /* no-op para manter escopo */
        .fx-waves > i{
          position:absolute; inset:-12% -12%;
          background:
            repeating-linear-gradient( to right,
              rgba(255,255,255, calc(var(--o) * 0.18)) 0 1px,
              rgba(255,255,255, 0) 1px 32px
            );
          filter: blur(8px);
          mix-blend-mode: soft-light;
          animation: wavesFar calc(var(--s) * 1.9s) linear infinite;
          opacity: 0.7;
        }
        /* injetamos o <i> por CSS via content apenas quando o browser suporta */
        @supports (mask-image: linear-gradient(#000, #000)) {
          .fx-waves::before { mask-image: radial-gradient(120% 90% at 50% 6%, #000 0%, transparent 80%); }
          .fx-waves::after  { mask-image: radial-gradient(130% 100% at 50% 8%, #000 0%, transparent 82%); }
        }
        @keyframes waves {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 120px 0, 0 0; }
        }
        @keyframes wavesFar {
          from { background-position: 0 0; }
          to   { background-position: 200px 0; }
        }

        /* ========= EFEITO 2 — PARALLAX GRID (ALTERNATIVO) =========
           Linhas hairline animando diagonal, super discreto. */
        .fx-parallax-grid{
          --o: var(--gridOpacity);
          --spd: var(--gridSpeed);
          background:
            repeating-linear-gradient( 90deg, rgba(255,255,255, calc(var(--o)*.85)) 0 1px, transparent 1px 28px ),
            repeating-linear-gradient(   0deg, rgba(255,255,255, calc(var(--o)*.65)) 0 1px, transparent 1px 28px ),
            #0b0f14;
          mask-image: radial-gradient(130% 100% at 50% 10%, #000 0%, transparent 82%);
          animation: gridDrift var(--spd)s linear infinite;
        }
        @keyframes gridDrift {
          from { background-position: 0 0, 0 0; }
          to   { background-position: 40px 16px, -28px 24px; }
        }

        /* GRID do conteúdo — imagem primeiro no mobile */
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

        /* Tipografia clean, menor */
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

        /* CTAs lado a lado (sem quebrar) */
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

        /* Mídia — sem borda branca */
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

        /* Respeita reduce motion */
        @media (prefers-reduced-motion: reduce){
          .fx-waves, .fx-parallax-grid { animation: none !important; }
          .fx-waves::before, .fx-waves::after { animation: none !important; }
        }
      `}</style>

      {/* terceira camada waves (distante) — elemento real para browsers que não aplicam ::before+::after corretamente */}
      <i aria-hidden />
    </section>
  );
}
