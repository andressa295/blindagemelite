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
      {/* Efeito FULL-BLEED (100vw) atrás de toda a seção - AJUSTADO ABAIXO */}
      <div className="effectBg vantaTitanium" aria-hidden="true" /> {/* Mudei a classe para .vantaTitanium */}
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
        /* ===== Estrutura (mantida) ===== */
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
          /* Ajuste: Dividers devem ter cores neutras, não pretas fortes */
          background: linear-gradient(90deg, transparent, rgba(150,150,150,.15), transparent);
          animation: dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== FULL-BLEED EFFECT (vantaTitanium) ===== */
        .effectWrap { position: relative; overflow: clip; }
        .effectWrap > .container { position: relative; z-index: 1; }
        .effectBg{
          position: absolute; top: 0; bottom: 0;
          left: 50%; width: 100vw; transform: translateX(-50%);
          z-index: 0; pointer-events: none;
        }

        /* VantaSoftAlt -> VantaTitanium (Gelo/Cinza) */
        .vantaTitanium {
          opacity: .18; mix-blend-mode: multiply;
          /* Gradientes focados em tons frios de cinza e branco */
          background:
            radial-gradient(40% 30% at 20% 10%, rgba(200, 240, 255,.20), transparent 60%), /* Ciano Gelo */
            radial-gradient(35% 25% at 80% 20%, rgba(180, 180, 180,.16), transparent 60%), /* Cinza Prateado */
            radial-gradient(30% 30% at 60% 80%, rgba(200, 240, 255,.18), transparent 60%); /* Ciano Gelo */
        }
        .vantaTitanium::before {
          content: ""; position: absolute; inset: -20%;
          background:
            radial-gradient(40% 30% at 20% 10%, rgba(200, 240, 255,.35), transparent 60%),
            radial-gradient(35% 25% at 80% 20%, rgba(180, 180, 180,.28), transparent 60%),
            radial-gradient(30% 30% at 60% 80%, rgba(200, 240, 255,.30), transparent 60%);
          filter: blur(18px);
          animation: vantaFloat 16s ease-in-out infinite alternate;
        }
        @keyframes vantaFloat {
          from { transform: translate(-2%, -2%) scale(1); }
          to   { transform: translate(2%, 2%) scale(1.06); }
        }

        /* ===== Grid (mantido) ===== */
        .gridTwo { display: grid; gap: 16px; align-items: center; }
        @media (min-width: 900px) {
          .gridTwo { grid-template-columns: 1.05fr .95fr; gap: 20px; }
        }

        /* ===== Tipografia (mantida) ===== */
        .h2 { font-size: clamp(18px, 2.0vw, 22px); font-weight: 780; line-height: 1.2; margin: 0 0 6px; color: #0f1216; }
        .h3 { font-size: 15px; font-weight: 760; margin: 0 0 6px; color: #111; }
        .copy { color: #5a6270; margin: 4px 0; }

        /* ===== Card (mantido) ===== */
        .card {
          border: 1px solid #d9dde4; border-radius: 14px; padding: 12px;
          background: #fff; box-shadow: 0 6px 16px rgba(10,15,20,.05);
        }

        /* ===== Lista (mantida) ===== */
        .bullets { padding-left: 18px; margin: 8px 0 10px; color: #5a6270; }
        .bullets li { margin: 4px 0; }

        /* ===== CTAs - AJUSTADOS PARA TITÂNIO ELITE ===== */
        .ctaRow { display: flex; gap: 10px; flex-wrap: wrap; justify-content: flex-start; margin: 12px 0 2px; }
        .btnPrimary, .btnGhost {
          border-radius: 999px; padding: 10px 18px; font-weight: 800; letter-spacing: .01em; cursor: pointer;
          transition: transform .12s ease, background .2s ease, border-color .2s ease, color .2s ease;
          text-transform: uppercase; /* Adiciona o toque Elite */
        }
        
        .btnPrimary { 
          /* Gradiente Metálico Claro: do branco ao cinza ciano. Contraste! */
          background: linear-gradient(90deg, #f0f0f5 0%, #c4c4cc 100%); 
          color:#000; /* Texto PRETO no fundo CLARO: Contraste Máximo! */
          border:1px solid #c4c4cc; 
          box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 0 4px rgba(255,255,255,0.7) inset; /* Sombra sutil e brilho interno */
        }
        .btnPrimary:hover { 
          background: linear-gradient(90deg, #ffffff 0%, #d4d4dc 100%); 
          transform: translateY(-2px) scale(1.01);
          box-shadow: 0 6px 18px rgba(0,0,0,0.15), 0 0 6px rgba(255,255,255,1) inset; 
        }

        .btnGhost { 
          background: #fff; color: #111; border: 1px solid #d9dde4;
          box-shadow: 0 4px 10px rgba(0,0,0,.08);
        }
        .btnGhost:hover { border-color: #c9ced8; transform: translateY(-1px) scale(1.01); }
        
        /* Microinterações e Vídeo (Mantidos) */
        .figure { position: relative; border: 1px solid #d9dde4; border-radius: 14px; overflow: hidden; background: #fff; box-shadow: 0 6px 16px rgba(10,15,20,.05); }
        .figureVideo { aspect-ratio: 16/9; width: 100%; min-height: 0; }
        .videoCover { width: 100%; height: 100%; object-fit: cover; border-radius: inherit; }
        
        .gradientBorder { position: relative; }
        .gradientBorder::before {
          content: ""; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
          /* Gradiente de Borda ajustado para cores de Titânio/Ciano Gelo */
          background: linear-gradient(140deg,#a6d8ff 0%, #ffffff 48%, #a6d8ff 100%); 
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

        /* Performance (mantida) */
        .contentVis { content-visibility: auto; contain-intrinsic-size: 1px 600px; }
        @media (prefers-reduced-motion: reduce) {
          .gloss::after { transition: none; }
          .hoverLift, .btnPrimary, .btnGhost { transition: none; }
          .vantaTitanium::before { animation: none; }
        }
      `}</style>
    </section>
  );
}