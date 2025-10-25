"use client";

import { FaWhatsapp } from "react-icons/fa";

type Props = { whatsappUrl: string };

export default function WhatsFloat({ whatsappUrl }: Props) {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsFloat"
      aria-label="abrir whatsapp"
    >
      <FaWhatsapp size={26} />
    </a>
  );
}
