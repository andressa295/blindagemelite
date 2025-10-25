"use client";

import { FaWhatsapp } from "react-icons/fa";
import { FiShield, FiTrendingDown, FiClock, FiHome } from "react-icons/fi";

type Props = { whatsappUrl: string };

export default function PorQueAgora({ whatsappUrl }: Props) {
  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section className="container section blockDivided" id="agora">
      <div className="impactPanel" data-reveal>
        <div className="impactGlow" aria-hidden />

        <h2 className="h2 impactTitle">Por que fazer agora?</h2>

        <p className="impactCopy">
          Um deslize, um segundo e o prejuízo aparece. Trocar uma tela pode custar caro, blindar é mais inteligente.
          Com a elite blindagem você garante proteção imediata, estética impecável e tranquilidade.
        </p>
        <p className="impactCopy">
          Proteja antes que aconteça. <strong>Agende agora e ganhe desconto especial</strong> na primeira blindagem a domicílio.
        </p>

        <ul className="impactFacts" aria-label="benefícios imediatos">
          <li><FiShield /> Proteção imediata</li>
          <li><FiTrendingDown /> Evita prejuízo alto</li>
          <li><FiClock /> Atendimento rápido</li>
          <li><FiHome /> Atendimento a domicílio</li>
        </ul>

        <div className="impactCtaCentered">
          <button className="btnPrimary btnLg withIcon" onClick={openWhats}>
            <FaWhatsapp size={18} />
            Garantir meu desconto
          </button>
        </div>
      </div>
    </section>
  );
}
