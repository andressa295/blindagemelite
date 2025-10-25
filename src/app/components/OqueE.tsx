"use client";

export default function OqueE() {
  return (
    <section
      id="oque"
      className="container section sectionDivider contentVis"
      aria-labelledby="oque-title"
      aria-describedby="oque-lead"
    >
      <div className="panel gradientBorder reveal in" data-i="1">
        <h2 className="h2" id="oque-title">O que é a blindagem?</h2>

        <p className="copy contentMax reveal in" id="oque-lead">
          A blindagem é uma aplicação líquida de{" "}
          <strong>nanotecnologia com titânio</strong> que se integra à superfície do aparelho,{" "}
          <strong>reforçando a resistência natural do vidro e da carcaça</strong>.
        </p>

        {/* Chips resumindo benefícios */}
        <div className="chips twoCol reveal in" style={{ marginTop: 8 }} aria-label="Benefícios principais">
          <span className="chip">Sem película</span>
          <span className="chip">Sem alterar o toque</span>
        </div>

        <ul className="bullets contentMax reveal in" data-i="2">
          <li>Até <strong>10× mais resistência</strong> contra quedas e impactos.</li>
          <li>Proteção total, mantendo toque e brilho originais da tela.</li>
          <li>Aplicação rápida, acabamento premium e resultado imediato.</li>
        </ul>

        <p className="note contentMax reveal in" data-i="3">
          Observação: a blindagem adere <strong>apenas ao vidro</strong> (não substitui capinha para absorção de impactos estruturais).
        </p>
      </div>

      <style jsx>{`
        /* ===== Escopo local ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }

        /* Divisor premium, coeso com as outras seções */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* Painel premium */
        .panel{
          background:#fff; border:1px solid #d9dde4; border-radius:14px;
          padding:14px 16px; box-shadow:0 4px 14px rgba(10,15,20,.05);
        }
        .gradientBorder{ position:relative; }
        .gradientBorder::before{
          content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
          background:linear-gradient(140deg,#7b5cff 0%, #c9a227 48%, #4cc2ff 100%);
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }

        /* Tipografia local */
        .h2{ font-size:clamp(18px,2.0vw,22px); font-weight:780; line-height:1.2; margin:0 0 6px; color:#0f1216; }
        .copy{ color:#5a6270; margin:6px 0; }
        .note{ color:#768093; font-size:12.6px; margin-top:8px; }
        .contentMax{ max-width:72ch; }

        /* Lista */
        .bullets{ padding-left:18px; margin:10px 0 6px; color:#5a6270; }
        .bullets li{ margin:4px 0; }

        /* Chips (2 col no mobile quando .twoCol) */
        .chips{ display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
        .chip{
          display:inline-flex; align-items:center; gap:8px;
          padding:8px 10px; border-radius:999px; font-weight:700; font-size:12.8px;
          color:#243041; background:#fff; border:1px solid #d9dde4;
          box-shadow:0 6px 16px rgba(10,15,20,.05);
          white-space:normal; word-break:break-word; overflow-wrap:anywhere;
        }
        @media (max-width:480px){
          .chips.twoCol { gap:10px; }
          .chips.twoCol .chip {
            flex:1 1 calc(50% - 10px);
            min-width: calc(50% - 10px);
            padding:10px 12px;
            font-size:13.2px;
          }
        }

        /* Reveal seguro (progressive enhancement) */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }
        .reveal[data-i="2"].in{ transition-delay:.10s; }
        .reveal[data-i="3"].in{ transition-delay:.15s; }

        /* Performance hint */
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 400px; }

        /* Motion safe */
        @media (prefers-reduced-motion:reduce){
          .reveal{ transition:none; }
        }
      `}</style>
    </section>
  );
}
