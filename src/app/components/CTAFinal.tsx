"use client";

import { FaWhatsapp } from "react-icons/fa";

type Props = { whatsappUrl: string };

export default function CTAFinal({ whatsappUrl }: Props) {
  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section
      id="agenda"
      className="container section sectionDivider contentVis"
      aria-labelledby="cta-title"
      aria-describedby="cta-copy"
    >
      <div className="ctaPanel gradientBorder reveal in" data-i="1">
        <div className="ctaGlow" aria-hidden />

        <div className="ctaHead">
          <span className="offerBadge">Desconto de lançamento</span>
          <h2 className="h2" id="cta-title">Agende agora</h2>
          <p className="copy" id="cta-copy">
            Seu celular merece o padrão Elite. Proteja o que importa com
            acabamento impecável, tecnologia real e atendimento a domicílio.
          </p>
        </div>

        <div className="ctaRow center">
          <button
            className="btnPrimary big"
            onClick={openWhats}
            aria-label="Agendar atendimento pelo WhatsApp"
          >
            <FaWhatsapp size={18} />
            <span>Agendar pelo WhatsApp</span>
          </button>
        </div>

        <p className="guarantee">
          Satisfação garantida ou seu dinheiro de volta.*
        </p>

        <ul className="contacts" aria-label="Informações de contato">
          <li>
            WhatsApp:{" "}
            <a href={whatsappUrl} className="mono linkStrong">(11) 96016-4958</a>
          </li>
          <li>Atendimento a domicílio em toda a região</li>
          <li>
            <a href="mailto:contato@eliteblindagem.com.br" className="linkStrong">
              contato@eliteblindagem.com.br
            </a>
          </li>
        </ul>
      </div>

      <style jsx>{`
        /* ===== Escopo local ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 22px 0 26px; }

        /* Divisor premium */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== Painel CTA dark premium ===== */
        .ctaPanel{
          --ink:#f3f7fb;           /* texto alto contraste */
          --muted:#d5deea;        /* parágrafos */
          --muted-2:#c5cfdd;      /* notas/contatos */
          --accent:#ffffff;       /* links fortes */
          --badge-bg:rgba(255,255,255,.12);
          --badge-border:rgba(255,255,255,.28);

          position:relative; overflow:hidden; color:var(--ink);
          background:
            radial-gradient(1100px 360px at 8% -20%, rgba(255,255,255,.09), transparent),
            linear-gradient(180deg,#0f1216 0%, #131a23 100%);
          border:1px solid rgba(255,255,255,.10);
          border-radius:16px;
          padding:24px 16px;
          box-shadow:0 12px 28px rgba(10,15,20,.22);
          text-align:center;
        }
        @media (min-width:900px){ .ctaPanel{ padding:30px 22px; } }

        .gradientBorder{ position:relative; }
        .gradientBorder::before{
          content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
          background:linear-gradient(140deg,#8a75ff 0%, #d6b24a 48%, #74d2ff 100%);
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }

        .ctaGlow{
          position:absolute; inset:-35% -10% auto -10%; height:260px;
          background:radial-gradient(closest-side, rgba(255,255,255,.16), rgba(255,255,255,0));
          filter:blur(12px); pointer-events:none;
        }

        .ctaHead { max-width:70ch; margin:0 auto 8px; }
        .h2{
          font-size: clamp(20px, 4.8vw, 28px);
          font-weight: 820; line-height:1.2; margin: 6px 0 6px; color:var(--ink);
          text-shadow: 0 1px 0 rgba(0,0,0,.18); /* leve para legibilidade */
        }
        .copy{
          color: var(--muted);
          margin: 0 auto 12px;
          text-wrap: balance;
        }
        .copy strong { color: var(--ink); }

        .offerBadge{
          display:inline-flex; align-items:center; gap:8px;
          padding:6px 12px; border-radius:999px;
          background: var(--badge-bg);
          border:1px solid var(--badge-border);
          color: var(--ink);
          font-weight:800; font-size:12.8px; letter-spacing:.01em;
        }

        /* ===== CTA ===== */
        .ctaRow{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; margin:14px 0 8px; }
        .btnPrimary{
          display:inline-flex; align-items:center; gap:10px;
          border-radius:999px; padding:12px 22px; font-weight:900; letter-spacing:.01em; cursor:pointer;
          background:#202734; color:#fff; border:1px solid #0f1317;
          box-shadow: 0 6px 16px rgba(0,0,0,.25);
          transition: transform .12s ease, background .2s ease, border-color .2s ease, color .2s ease, box-shadow .2s ease;
        }
        .btnPrimary:hover{ transform:translateY(-1px) scale(1.015); background:#1a212d; box-shadow:0 10px 24px rgba(0,0,0,.28); }
        .btnPrimary:focus-visible{ outline:2px solid #9cc9ff; outline-offset:2px; }
        .btnPrimary.big{ font-size:15px; }

        /* Microgarantia (mais clara) */
        .guarantee{
          color:#e2e9f3; font-size:13.6px; margin:8px 0 4px; font-weight:600;
        }

        /* Contatos mais visíveis */
        .contacts{
          list-style:none; padding:0; margin:14px auto 0;
          color: var(--ink); display:grid; gap:6px; justify-content:center;
          font-size:14.4px;
        }
        .mono{ font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
        .linkStrong{
          color: var(--accent);
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 800;
        }
        .contacts a:focus-visible{ outline:2px solid #9cc9ff; outline-offset:2px; }

        /* Reveal + performance */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 420px; }

        /* Motion safe */
        @media (prefers-reduced-motion:reduce){
          .reveal{ transition:none; }
        }
      `}</style>
    </section>
  );
}
