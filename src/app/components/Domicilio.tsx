// src/app/components/Domicilio.tsx
"use client";

type Props = {
  whatsappUrl: string;
  /** Efeito opcional extra (se quiser somar algo por cima) */
  childrenEffect?: React.ReactNode;
};

export default function Domicilio({ whatsappUrl, childrenEffect }: Props) {
  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    // Wrapper de SEÇÃO (full-bleed) com efeito por trás
    <section
      id="domicilio"
      className="section sectionDivider effectWrap contentVis"
      aria-labelledby="dom-title"
      aria-describedby="dom-lead"
    >
      {/* Efeito FULL-BLEED (100vw) atrás de toda a seção */}
      <div className="effectBg vantaSoftAlt" aria-hidden="true" />
      {childrenEffect}

      {/* Conteúdo limitado ao container, acima do efeito */}
      <div className="container">
        <div className="gridTwo">
          <div>
            <h2 className="h2" id="dom-title" data-reveal>
              Atendimento personalizado a domicílio
            </h2>

            <p className="copy" id="dom-lead" data-reveal>
              Levamos tecnologia, praticidade e sofisticação até você — com
              conforto, exclusividade e eficiência. Atendimento individualizado,
              equipamentos profissionais e produtos de alta performance.
            </p>

            <div className="card gradientBorder hoverLift" data-reveal>
              <h3 className="h3">Requisitos para o atendimento</h3>
              <ul className="bullets">
                <li>Uma tomada próxima para os equipamentos;</li>
                <li>Uma mesa ou superfície estável para a aplicação.</li>
              </ul>

              <div className="ctaRow left">
                <button
                  className="btnPrimary"
                  onClick={openWhats}
                  aria-label="Agendar atendimento a domicílio pelo WhatsApp"
                >
                  Agendar agora
                </button>
              </div>
            </div>
          </div>

          {/* Vídeo grande (segunda coluna no desktop, abaixo no mobile) */}
          <figure
            className="figure figureVideo gloss hoverLift gradientBorder"
            data-reveal
          >
            <video
              className="videoCover"
              controls
              playsInline
              preload="metadata"
              poster="/mockups/poster.jpg"
              controlsList="nodownload noplaybackrate"
            >
              <source src="/videos/processo.webm" type="video/webm" />
              <source src="/videos/processo.mp4" type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
            <figcaption className="srOnly">
              Demonstração do processo de aplicação da blindagem
            </figcaption>
          </figure>
        </div>
      </div>

      <style jsx>{`
        /* ===== Estrutura ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }
        .srOnly {
          position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
        }

        /* Divider premium (coeso com o restante) */
        .sectionDivider { position: relative; }
        .sectionDivider::after {
          content: ""; position: absolute; left: 50%; transform: translateX(-50%);
          bottom: -6px; width: 100vw; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation: dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== FULL-BLEED EFFECT =====
           A camada de efeito vive fora do .container e ocupa 100vw,
           alinhada ao centro da viewport.
        */
        .effectWrap { position: relative; overflow: clip; }
        .effectWrap > .container { position: relative; z-index: 1; }
        .effectBg{
          position: absolute; top: 0; bottom: 0;
          left: 50%; width: 100vw; transform: translateX(-50%);
          z-index: 0; pointer-events: none;
        }

        /* VantaSoftAlt (névoa sutil, blend) */
        .vantaSoftAlt {
          opacity: .18; mix-blend-mode: multiply;
          /* fundo base cinza-claro para aparecer tanto em branco quanto cinza */
          background:
            radial-gradient(40% 30% at 20% 10%, rgba(123,92,255,.20), transparent 60%),
            radial-gradient(35% 25% at 80% 20%, rgba(201,162,39,.16), transparent 60%),
            radial-gradient(30% 30% at 60% 80%, rgba(76,194,255,.18), transparent 60%);
        }
        .vantaSoftAlt::before {
          content: ""; position: absolute; inset: -20%;
          background:
            radial-gradient(40% 30% at 20% 10%, rgba(123,92,255,.35), transparent 60%),
            radial-gradient(35% 25% at 80% 20%, rgba(201,162,39,.28), transparent 60%),
            radial-gradient(30% 30% at 60% 80%, rgba(76,194,255,.30), transparent 60%);
          filter: blur(18px);
          animation: vantaFloat 16s ease-in-out infinite alternate;
        }
        @keyframes vantaFloat {
          from { transform: translate(-2%, -2%) scale(1); }
          to   { transform: translate(2%, 2%) scale(1.06); }
        }

        /* ===== Grid ===== */
        .gridTwo { display: grid; gap: 16px; align-items: center; }
        @media (min-width: 900px) {
          .gridTwo { grid-template-columns: 1.05fr .95fr; gap: 20px; }
        }

        /* ===== Tipografia ===== */
        .h2 { font-size: clamp(18px, 2.0vw, 22px); font-weight: 780; line-height: 1.2; margin: 0 0 6px; color: #0f1216; }
        .h3 { font-size: 15px; font-weight: 760; margin: 0 0 6px; color: #111; }
        .copy { color: #5a6270; margin: 4px 0; }

        /* ===== Card ===== */
        .card {
          border: 1px solid #d9dde4; border-radius: 14px; padding: 12px;
          background: #fff; box-shadow: 0 6px 16px rgba(10,15,20,.05);
        }

        /* ===== Lista ===== */
        .bullets { padding-left: 18px; margin: 8px 0 10px; color: #5a6270; }
        .bullets li { margin: 4px 0; }

        /* ===== CTAs ===== */
        .ctaRow { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-start; margin: 12px 0 2px; }
        .btnPrimary, .btnGhost {
          border-radius: 999px; padding: 10px 16px; font-weight: 800; letter-spacing: .01em; cursor: pointer;
          transition: transform .12s ease, background .2s ease, border-color .2s ease, color .2s ease;
        }
        .btnPrimary { background: #171a20; color: #fff; border: 1px solid #0f1317; }
        .btnPrimary:hover { transform: translateY(-1px) scale(1.015); }
        .btnGhost { background: #fff; color: #111; border: 1px solid #d9dde4; }
        .btnGhost:hover { border-color: #c9ced8; transform: translateY(-1px) scale(1.01); }

        /* ===== Vídeo ===== */
        .figure {
          position: relative; border: 1px solid #d9dde4; border-radius: 14px; overflow: hidden;
          background: #fff; box-shadow: 0 6px 16px rgba(10,15,20,.05);
        }
        .figureVideo { aspect-ratio: 16/9; width: 100%; min-height: 0; }
        .videoCover { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }

        /* Microinterações premium */
        .gradientBorder { position: relative; }
        .gradientBorder::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          background: linear-gradient(140deg,#7b5cff 0%, #c9a227 48%, #4cc2ff 100%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; pointer-events: none;
        }
        .gloss { position: relative; overflow: hidden; }
        .gloss::after {
          content: ""; position: absolute; inset: 0; translate: -120% 0;
          background: linear-gradient(110deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.55) 45%,rgba(255,255,255,0) 60%);
          transition: translate .9s ease;
        }
        .gloss:hover::after { translate: 120% 0; }
        .hoverLift { transition: transform .22s ease, box-shadow .22s ease; }
        .hoverLift:hover { transform: translateY(-3px); box-shadow: 0 14px 32px rgba(0,0,0,.10); }

        /* Performance */
        .contentVis { content-visibility: auto; contain-intrinsic-size: 1px 600px; }

        /* Motion safe */
        @media (prefers-reduced-motion: reduce) {
          .gloss::after { transition: none; }
          .hoverLift, .btnPrimary, .btnGhost { transition: none; }
          .vantaSoftAlt::before { animation: none; }
        }
      `}</style>
    </section>
  );
}
