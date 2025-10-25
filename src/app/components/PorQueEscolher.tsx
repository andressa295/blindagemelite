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
    <section className="container section blockDivided" id="motivos">
      <div className="chooseWrap" data-reveal>
        <h2 className="h2 chooseTitle">Por que escolher a Elite Blindagem</h2>

        <div className="chooseGrid">
          {motivos.map((m, i) => (
            <div className="chooseCard" key={i}>
              <div className="chooseIcon">{m.icon}</div>
              <p className="chooseText">{m.text}</p>
            </div>
          ))}
        </div>

        <p className="chooseNote">*aplicável conforme política de garantia local.</p>
      </div>
    </section>
  );
}
