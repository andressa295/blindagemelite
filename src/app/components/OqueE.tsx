// src/app/components/OqueE.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

export default function OqueE() {
  /* >>> CONFIGURE SUAS FOTOS AQUI <<< */
  const photos = useMemo(
    () => [
      { src: "/elite1.jpg", alt: "Aplicação de blindagem em smartphone" },
      { src: "/elite2.jpg", alt: "Detalhe do acabamento premium após aplicação" },
      { src: "/elite.jpg", alt: "Aplicação de blindagem em smartphone" },
      { src: "/elite3.jpg", alt: "Equipamentos profissionais utilizados no processo" },
      { src: "/elite4.jpg", alt: "Resultado final: brilho e toque originais" },
    ],
    []
  );

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);

  /* Auto-slide com respeito ao prefers-reduced-motion e pausa em interação */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return; // não auto-rola se o usuário prefere menos movimento

    let paused = false;
    let raf = 0;
    let timer: number | null = null;

    const scrollToIndex = (i: number) => {
      const slides = Array.from(track.children) as HTMLElement[];
      const target = slides[i];
      if (!target) return;
      const left = target.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft || "0");
      track.scrollTo({ left, behavior: "smooth" });
      setIndex(i);
    };

    const next = () => {
      const slides = Array.from(track.children);
      if (!slides.length) return;
      const i = (index + 1) % slides.length;
      scrollToIndex(i);
    };

    const schedule = () => {
      if (paused) return;
      timer = window.setTimeout(() => {
        raf = requestAnimationFrame(next);
      }, 3500);
    };

    const clear = () => {
      if (timer) { clearTimeout(timer); timer = null; }
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
    };

    const onEnter = () => { paused = true; clear(); };
    const onLeave = () => { paused = false; schedule(); };
    const onVisibility = () => { clear(); if (!document.hidden) schedule(); };

    track.addEventListener("mouseenter", onEnter);
    track.addEventListener("mouseleave", onLeave);
    track.addEventListener("touchstart", onEnter, { passive: true });
    track.addEventListener("touchend", onLeave, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    schedule(); // inicia

    return () => {
      clear();
      track.removeEventListener("mouseenter", onEnter);
      track.removeEventListener("mouseleave", onLeave);
      track.removeEventListener("touchstart", onEnter);
      track.removeEventListener("touchend", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [index]);

  /* Atualiza índice ao scroll para sincronizar dots (robusto em qualquer largura) */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        if (!slides.length) { ticking = false; return; }
        const leftPad = parseFloat(getComputedStyle(track).paddingLeft || "0");
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        slides.forEach((el, i) => {
          const slideCenter = el.offsetLeft - leftPad + el.clientWidth / 2;
          const dist = Math.abs(center - slideCenter);
          if (dist < best) { best = dist; nearest = i; }
        });
        setIndex(nearest);
        ticking = false;
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); };
  }, []);

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

        {/* === Galeria horizontal com auto-slide === */}
        <div className="galleryWrap reveal in" data-i="2">
          <div className="galleryTrack" ref={trackRef} aria-label="Galeria de fotos do processo e resultados">
            {photos.map((p, i) => (
              <figure className="slide gradientBorder gloss hoverLift" key={p.src}>
                <div className="media">
                  <Image
                    src={p.src}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 900px) 88vw, 48vw"
                    priority={i === 0}
                    className="img"
                  />
                </div>
                <figcaption className="srOnly">{p.alt}</figcaption>
              </figure>
            ))}
          </div>

          {/* Dots indicadores (somente visual) */}
          <div className="dots" role="presentation" aria-hidden="true">
            {photos.map((_, i) => (
              <i key={i} className={i === index ? "dot active" : "dot"} />
            ))}
          </div>
        </div>

        <ul className="bullets contentMax reveal in" data-i="3">
          <li>Até <strong>10× mais resistência</strong> contra quedas e impactos.</li>
          <li>Proteção total, mantendo toque e brilho originais da tela.</li>
          <li>Aplicação rápida, acabamento premium e resultado imediato.</li>
        </ul>

        <p className="note contentMax reveal in" data-i="4">
          Observação: a blindagem adere <strong>apenas ao vidro</strong> (não substitui capinha para absorção de impactos estruturais).
        </p>
      </div>

      <style jsx>{`
        /* ===== Escopo local ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }
        .srOnly {
          position: absolute !important; width: 1px; height: 1px; padding: 0; margin: -1px;
          overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
        }

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

        /* ===== Galeria horizontal ===== */
        .galleryWrap{ margin: 12px 0 8px; }
        .galleryTrack{
          display:flex; gap:12px; overflow-x:auto; overflow-y:hidden;
          scroll-snap-type:x mandatory;
          -webkit-overflow-scrolling: touch;
          padding: 2px 2px 2px 8px;       /* leve respiro no início */
          margin: 0 -8px;                 /* estica até as bordas no mobile */
          scroll-behavior: smooth;
          overscroll-behavior-x: contain;
        }
        .galleryTrack::-webkit-scrollbar { height: 8px; }
        .galleryTrack::-webkit-scrollbar-thumb { background: rgba(0,0,0,.12); border-radius: 999px; }
        .galleryTrack::-webkit-scrollbar-track { background: transparent; }

        .slide{
          flex: 0 0 88%;                  /* 1 por vez no mobile, com respiro */
          scroll-snap-align: center;
          border-radius: 14px; overflow: hidden; background: #fff;
          box-shadow: 0 8px 22px rgba(10,15,20,.08);
          position: relative;
        }
        .media{
          position:relative; width:100%; aspect-ratio: 16/9; background:#eef2f7;
        }
        .img{ object-fit: cover; }

        @media (min-width: 900px){
          .galleryTrack{ gap: 14px; padding: 4px; margin: 0; }
          .slide{ flex: 0 0 48%; }       /* 2 por vez no desktop */
          .media{ aspect-ratio: 16/9; }
        }

        /* Dots indicadores */
        .dots{ display:flex; gap:6px; justify-content:center; margin: 8px 0 2px; }
        .dot{
          width:6px; height:6px; border-radius:999px;
          background: #d9dde4; opacity:.7; transition: opacity .2s, transform .2s;
        }
        .dot.active{
          opacity:1; transform: scale(1.25);
          background: #7b5cff;
        }

        /* Lista */
        .bullets{ padding-left:18px; margin:10px 0 6px; color:#5a6270; }
        .bullets li{ margin:4px 0; }

        /* Microinterações */
        .gloss { position: relative; overflow: hidden; }
        .gloss::after {
          content: ""; position: absolute; inset: 0; translate: -120% 0;
          background: linear-gradient(110deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.55) 45%,rgba(255,255,255,0) 60%);
          transition: translate .9s ease;
        }
        .gloss:hover::after { translate: 120% 0; }
        .hoverLift { transition: transform .22s ease, box-shadow .22s ease; }
        .hoverLift:hover { transform: translateY(-3px); box-shadow: 0 14px 32px rgba(0,0,0,.10); }

        /* Reveal seguro (progressive enhancement) */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }
        .reveal[data-i="2"].in{ transition-delay:.10s; }
        .reveal[data-i="3"].in{ transition-delay:.15s; }
        .reveal[data-i="4"].in{ transition-delay:.20s; }

        /* Performance hint */
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 560px; }

        /* Motion safe */
        @media (prefers-reduced-motion:reduce){
          .galleryTrack{ scroll-behavior: auto; }
          /* desliga auto-slide pelo hook acima */
        }
      `}</style>
    </section>
  );
}
