"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
  whatsappUrl: string;
};

export default function HeaderDark({ whatsappUrl }: Props) {
  const [open, setOpen] = useState(false);

  const openWhats = () =>
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  // trava o scroll do body quando o menu está aberto
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="headerDark">
      <div className="container headerDark__in">
        {/* Marca */}
        <a href="#topo" className="brand" aria-label="Elite Blindagem">
          <Image src="/blindagem.png" alt="" width={28} height={28} />
          <span>Elite Blindagem</span>
        </a>

        {/* Nav desktop */}
        <nav className="nav" aria-label="principal">
          <a href="#oque">O que é</a>
          <a href="#domicilio">Domicílio</a>
          <a href="#motivos">Por que escolher</a>
          <button className="btnPrimary btnSm" onClick={openWhats}>Agendar</button>
        </nav>

        {/* Botão menu mobile */}
        <button
          className="menuBtn"
          aria-label={open ? "fechar menu" : "abrir menu"}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {/* Ícone hambúrguer/fechar (SVG simples) */}
          {!open ? (
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"/>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden>
              <path fill="currentColor" d="M18.3 5.7L12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3z"/>
            </svg>
          )}
        </button>
      </div>

      {/* Painel mobile */}
      <div
        id="menu-mobile"
        className={`navPanel ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
      >
        <div className="navPanel__content">
          <h2 id="menu-title" className="srOnly">menu</h2>
          <a href="#oque" onClick={() => setOpen(false)}>O que é</a>
          <a href="#domicilio" onClick={() => setOpen(false)}>Domicílio</a>
          <a href="#motivos" onClick={() => setOpen(false)}>Por que escolher</a>
          <button className="btnPrimary btnLg" onClick={() => { setOpen(false); openWhats(); }}>
            Agendar Blindagem
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <button
        className={`navBackdrop ${open ? "show" : ""}`}
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
