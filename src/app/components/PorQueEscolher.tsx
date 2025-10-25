"use client";

import { FiCpu, FiCheckCircle, FiHome, FiEye, FiClock, FiAward } from "react-icons/fi";

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
        /* ===== Escopo local ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }

        /* Divisor premium de seção (igual aos demais) */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== Wrapper ===== */
        .chooseWrap { position: relative; padding: 18px 0 20px; }

        .chooseTitle {
          text-align: center; margin: 0 0 14px;
          color: #0d1116; font-size: clamp(18px, 2.0vw, 22px); font-weight: 780; line-height: 1.2;
        }

        /* ===== Grid ===== */
        .chooseGrid {
          display: grid; gap: 12px; grid-template-columns: 1fr;
        }
        @media (min-width:700px){
          .chooseGrid { grid-template-columns: repeat(3, 1fr); gap: 14px; }
        }

        /* ===== Card vidro fosco ===== */
        .chooseCard{
          position: relative;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          text-align: center; min-height: 116px;
          padding: 16px 14px; border-radius: 18px;
          background: rgba(255,255,255,.55);
          border: 1px solid rgba(0,0,0,.06);
          backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 10px 26px rgba(0,0,0,.06);
          transition: transform .25s, box-shadow .25s;
        }
        .hoverLift { transition: transform .22s ease, box-shadow .22s ease; }
        .hoverLift:hover { transform: translateY(-3px); box-shadow: 0 14px 32px rgba(0,0,0,.09); }

        /* Brilho sutil */
        .gloss { position: relative; overflow: hidden; }
        .gloss::after{
          content:""; position:absolute; inset:0; translate:-120% 0;
          background:linear-gradient(110deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.55) 45%,rgba(255,255,255,0) 60%);
          transition: translate .9s ease;
        }
        .gloss:hover::after{ translate:120% 0; }

        /* Ícone + texto */
        .chooseIcon { font-size: 22px; color: #3d4b63; margin-bottom: 8px; flex: 0 0 auto; }
        .chooseText {
          color: #20242a; font-size: 14.6px; font-weight: 600; line-height: 1.45;
          word-break: break-word; overflow-wrap: anywhere;
          max-width: 36ch;
        }

        /* Ajustes mobile */
        @media (max-width:480px){
          .chooseGrid{ grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .chooseText{ font-size: 13.3px; }
          .chooseIcon{ font-size: 20px; }
          .chooseCard{ min-height: 104px; padding: 12px 10px; }
        }

        .chooseNote {
          text-align: center; font-size: 12.5px; color: #6f7883; margin-top: 14px;
        }

        /* Reveal seguro */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }

        /* Performance */
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 420px; }

        /* Motion safe */
        @media (prefers-reduced-motion:reduce){
          .gloss::after{ transition:none; }
          .hoverLift{ transition:none; }
          .reveal{ transition:none; }
        }
      `}</style>
    </section>
  );
}
