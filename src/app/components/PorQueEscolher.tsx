// src/app/components/PorQueEscolher.tsx
"use client";

import { FiCpu, FiCheckCircle, FiHome, FiEye, FiClock, FiAward } from "react-icons/fi";

// ... (Resto do componente React inalterado)

export default function PorQueEscolher() {
  const motivos = [
    { icon: <FiCpu />, text: "Tecnologia exclusiva com partículas de titânio" },
    { icon: <FiCheckCircle />, text: "Aplicação profissional e certificada" },
    { icon: <FiHome />, text: "Atendimento 100% a domicílio" },
    { icon: <FiEye />, text: "Proteção duradoura e invisível" },
    { icon: <FiClock />, text: "Atendimento rápido, exclusivo e personalizado" },
    { icon: <FiAward />, text: "Resultado garantido ou seu dinheiro de volta" },
  ];

  return (
    <section
      id="motivos"
      className="container section sectionDivider contentVis"
      aria-labelledby="motivos-title"
    >
      <div className="chooseWrap reveal in" data-i="1">
        <h2 className="h2 chooseTitle" id="motivos-title">
          Por que escolher a Elite Blindagem
        </h2>

        <div className="chooseGrid" role="list">
          {motivos.map((m, i) => (
            <div className="chooseCard hoverLift gloss" role="listitem" key={i}>
              <div className="chooseIcon">{m.icon}</div>
              <p className="chooseText">{m.text}</p>
            </div>
          ))}
        </div>

        <p className="chooseNote">*aplicável conforme política de garantia local.</p>
      </div>

      <style jsx>{`
        /* ===== Escopo local (mantido) ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }

        /* Divisor premium de seção - Corrigido para Neutro */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(150,150,150,.15), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== Wrapper (mantido) ===== */
        .chooseWrap { position: relative; padding: 18px 0 20px; }

        .chooseTitle {
          text-align: center; margin: 0 0 14px;
          /* Cor ajustada para Preto (se o fundo for branco) */
          color: #0d1116; 
          font-size: clamp(18px, 2.0vw, 22px); font-weight: 780; line-height: 1.2;
        }

        /* ===== Grid (mantido) ===== */
        .chooseGrid {
          display: grid; gap: 12px; grid-template-columns: 1fr;
        }
        @media (min-width:700px){
          .chooseGrid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }

        /* ===== Card TITÂNIO DARK/GELO (CORRIGIDO) ===== */
        .chooseCard{
          position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; min-height: 116px;
          padding: 16px 14px; border-radius: 18px;
          
          /* FUNDO: Preto sutil com toque metálico */
          background: #141a21; 
          /* BORDA: Borda sutil de ciano gelo, mais Elite */
          border: 1px solid rgba(166, 216, 255, .2); 
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          /* Sombra Dark Premium */
          box-shadow: 0 10px 26px rgba(0,0,0,.35); 
          transition: transform .25s, box-shadow .25s;
        }
        .hoverLift { transition: transform .22s ease, box-shadow .22s ease; }
        .hoverLift:hover { 
          transform: translateY(-3px); 
          /* Aumenta a sombra no hover (efeito 3D) */
          box-shadow: 0 16px 40px rgba(0,0,0,.45); 
        }

        /* Brilho sutil (mantido) */
        .gloss { position: relative; overflow: hidden; }
        .gloss::after{
          content:""; position:absolute; inset:0; translate:-120% 0;
          background:linear-gradient(110deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.55) 45%,rgba(255,255,255,0) 60%);
          transition: translate .9s ease;
        }
        .gloss:hover::after{ translate:120% 0; }

        /* Ícone + texto - CORRIGIDO PARA ALTO CONTRASTE */
        .chooseIcon { 
          font-size: 22px; 
          /* Ícone Branco Gelo */
          color: #a6d8ff; 
          margin-bottom: 8px; flex: 0 0 auto; 
        }
        .chooseText {
          /* Texto Branco/Claro */
          color: #e9edf2; 
          font-size: 14.6px; font-weight: 600; line-height: 1.45;
          word-break: break-word; overflow-wrap: anywhere;
          max-width: 36ch;
        }

        /* Ajustes mobile (mantidos) */
        @media (max-width:480px){
          .chooseGrid{ grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .chooseText{ font-size: 13.3px; }
          .chooseIcon{ font-size: 20px; }
          .chooseCard{ min-height: 104px; padding: 12px 10px; }
        }

        .chooseNote {
          text-align: center; font-size: 12.5px; 
          /* Corrigido para Branco/Gelo para o fundo escuro */
          color: #b7c0cb; 
          margin-top: 14px;
        }

        /* Reveal e Performance (mantidos) */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 420px; }
        @media (prefers-reduced-motion:reduce){
          .gloss::after{ transition:none; }
          .hoverLift{ transition:none; }
          .reveal{ transition:none; }
        }
      `}</style>
    </section>
  );
}