// src/app/components/PorQueAgora.tsx
"use client";

import { FaWhatsapp } from "react-icons/fa";
import { FiShield, FiTrendingDown, FiClock, FiHome } from "react-icons/fi";

type Props = { whatsappUrl: string };

export default function PorQueAgora({ whatsappUrl }: Props) {
  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section
      id="agora"
      className="container section sectionDivider contentVis"
      aria-labelledby="pq-title"
      aria-describedby="pq-lead"
    >
      <div className="impactPanel gradientBorder reveal in" data-i="1">
        <div className="impactGlow" aria-hidden />

        <h2 className="h2 impactTitle" id="pq-title">Por que fazer agora?</h2>

        <p className="impactCopy" id="pq-lead">
          Um deslize, um segundo — e o prejuízo aparece. Trocar a tela pode
          custar caro; blindar é mais inteligente. Com a Elite Blindagem você
          garante proteção imediata, estética impecável e tranquilidade.
        </p>

        <p className="impactCopy reveal in" data-i="2">
          Proteja <strong>antes</strong> que aconteça.{" "}
          <strong>Agende agora e ganhe desconto especial</strong> na primeira
          blindagem a domicílio.
        </p>

        <ul className="impactFacts reveal in" data-i="3" aria-label="Benefícios imediatos">
          <li><FiShield /><span>Proteção imediata</span></li>
          <li><FiTrendingDown /><span>Evita prejuízo alto</span></li>
          <li><FiClock /><span>Agilidade</span></li>
          <li><FiHome /><span>A domicílio</span></li>
        </ul>

        <div className="impactCtaCentered reveal in" data-i="4">
          <button
            className="btnPrimary"
            onClick={openWhats}
            aria-label="Garantir meu desconto pelo WhatsApp"
          >
            <FaWhatsapp size={18} />
            <span className="btnText">Garantir meu desconto</span>
          </button>
        </div>
      </div>

      <style jsx>{`
        /* ===== Escopo local ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }

        /* Divisor premium */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== Painel dark premium ===== */
        .impactPanel{
          position:relative; overflow:hidden; color:#e9edf2;
          background:
            radial-gradient(1200px 380px at 10% -20%, rgba(255,255,255,.06), transparent),
            linear-gradient(180deg,#0f1216 0%, #141a21 100%);
          border:1px solid rgba(255,255,255,.08);
          border-radius:16px;
          padding:18px 16px;
          box-shadow:0 10px 26px rgba(10,15,20,.18);
        }
        @media (min-width:900px){ .impactPanel{ padding:22px; } }

        .gradientBorder{ position:relative; }
        .gradientBorder::before{
          content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
          background:linear-gradient(140deg,#7b5cff 0%, #c9a227 48%, #4cc2ff 100%);
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }

        .impactGlow{
          position:absolute; inset:-40% -10% auto -10%; height:280px;
          background:radial-gradient(closest-side, rgba(255,255,255,.14), rgba(255,255,255,0));
          filter:blur(10px); pointer-events:none;
        }
        .impactTitle{ color:#fff; margin-bottom:6px; }
        .impactCopy{ color:#b7c0cb; margin:6px 0; }
        .impactCopy strong{ color:#fff; }

        /* ===== Chips estáveis (sem quebra interna) ===== */
        .impactFacts{
          display:grid;
          grid-template-columns:repeat(2, minmax(0,1fr)); /* mobile: 2 colunas */
          gap:8px; list-style:none; padding:0; margin:14px 0 10px;
        }
        .impactFacts li{
          display:flex; align-items:center; justify-content:center; gap:6px;
          padding:8px 10px; border-radius:999px;
          background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.10);
          color:#dbe2ea; font-weight:600;
          font-size:clamp(11.5px,3.2vw,13px);
          line-height:1.2; min-height:36px;

          /* ANTIESTOURO + LINHA ÚNICA */
          min-width:0;                   /* permite encolher dentro do grid */
          white-space:nowrap;            /* uma linha só */
          overflow:hidden;               /* oculta excesso */
          text-overflow:ellipsis;        /* ... no final */
        }
        .impactFacts li :global(svg){
          flex:0 0 auto;                 /* ícone não encolhe */
          font-size:16px;
        }
        .impactFacts li > :global(span){
          min-width:0;                   /* texto pode encolher */
        }
        @media (min-width:700px){
          .impactFacts{ grid-template-columns:repeat(4, minmax(0,1fr)); } /* desktop: 4 colunas */
          .impactFacts li{ font-size:13.2px; padding:8px 12px; }
        }

        /* ===== CTA central ===== */
        .impactCtaCentered{ display:flex; justify-content:center; margin-top:14px; }
        .btnPrimary{
          display:inline-flex; align-items:center; gap:10px;
          border-radius:999px; padding:12px 22px; font-weight:800; letter-spacing:.01em;
          background:#171a20; color:#fff; border:1px solid #0f1317; cursor:pointer;
          transition: transform .12s ease, background .2s ease, border-color .2s ease, color .2s ease;
          font-size:14px;
        }
        .btnPrimary:hover{ transform:translateY(-1px) scale(1.015); }
        .btnText{ margin-left:4px; }

        /* Reveal seguro */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }
        .reveal[data-i="2"].in{ transition-delay:.10s; }
        .reveal[data-i="3"].in{ transition-delay:.15s; }
        .reveal[data-i="4"].in{ transition-delay:.20s; }

        /* Performance hint */
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 520px; }

        /* Motion safe */
        @media (prefers-reduced-motion:reduce){
          .reveal{ transition:none; }
        }
      `}</style>
    </section>
  );
}
