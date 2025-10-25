"use client";
import Image from "next/image";
import { useCallback } from "react";

type Props = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  /** Passe um <div className="vantaSoftAlt" /> ou outro efeito extra */
  childrenEffect?: React.ReactNode;
};

export default function Hero({ whatsappUrl, onScrollToOque, childrenEffect }: Props) {
  const openWhats = useCallback(() => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }, [whatsappUrl]);

  return (
    <section
      id="topo"
      className="container heroSplit sectionDivider effectHost"
      aria-labelledby="hero-title"
      aria-describedby="hero-lead"
    >
      <div className="vantaSoftAlt" aria-hidden="true" />
      {childrenEffect}

      <div className="heroSplit__left">
        <div className="titleWrap" data-reveal>
          <p className="eyebrow">Proteção invisível · Resistência incomparável</p>
          <h1 className="h1" id="hero-title">Elite Blindagem: o futuro da proteção já chegou</h1>
        </div>

        <p className="lead" id="hero-lead" data-reveal>
          A Elite Blindagem traz ao Brasil uma tecnologia de <strong>nanoproteção com titânio</strong> que cria
          uma camada invisível e ultra-resistente, mantendo seu aparelho com aparência de novo por muito mais tempo.
        </p>

        <p className="subLead" data-reveal>
          <strong>É ciência aplicada à proteção do seu celular.</strong>
        </p>

        <div className="ctaRow left" data-reveal>
          <button className="btnPrimary" onClick={openWhats} aria-label="Agendar avaliação pelo WhatsApp">
            Agendar agora
          </button>
          <button className="btnGhost" onClick={onScrollToOque} aria-label="Saber o que é a blindagem">
            O que é a blindagem?
          </button>
        </div>
      </div>

      <div className="heroSplit__right" data-reveal>
        <figure className="heroFrame gradientBorder gloss hoverLift">
          <div className="heroFrame__glass">
            <Image
              src="/elite.jpg"
              alt="Dispositivo protegido por nanoproteção com titânio"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
              className="heroImg"
            />
            <div className="heroFrame__badge" role="note" aria-label="Selo de tecnologia">
              <Image src="/blindagem.png" alt="" width={22} height={22} />
              <span>Nanoproteção com titânio</span>
            </div>
          </div>
          <figcaption className="srOnly">Acabamento de fábrica, sem ruído</figcaption>
        </figure>
      </div>

      <style jsx>{`
        /* ===== Hero — isolado ao componente (styled-jsx) ===== */

        /* Base local: container + utilitários usados só aqui */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .srOnly{
          position:absolute!important; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden;
          clip:rect(0,0,0,0); white-space:nowrap; border:0;
        }

        /* Divider sutil da seção */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep{ 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* ===== Grid principal — topo-a-topo real ===== */
        .heroSplit{
          display:grid; grid-template-columns: minmax(0,1.1fr) minmax(0,.9fr);
          align-items:start; gap:22px; padding:22px 0 12px; position:relative; z-index:1;
        }
        @media (max-width: 899.98px){
          .heroSplit{ grid-template-columns:1fr; gap:18px; }
          .heroSplit__right{ order:-1; } /* imagem em cima no mobile */
        }
        .heroSplit__left, .heroSplit__right { position: relative; }
        .heroSplit__right{ align-self:start; margin-top:0; }
        .heroSplit__right figure{ margin:0; } /* mata margem default */

        /* Efeito de fundo: sempre atrás */
        .effectHost{ position:relative; overflow:hidden; }
        .heroSplit > *:not(.vantaSoftAlt){ position:relative; z-index:1; }
        .vantaSoftAlt{ position:absolute; inset:0; z-index:0; pointer-events:none; opacity:.18; mix-blend-mode:multiply; }
        .vantaSoftAlt::before{
          content:""; position:absolute; inset:-20%;
          background:
            radial-gradient(40% 30% at 20% 10%, rgba(123,92,255,.45), transparent 60%),
            radial-gradient(35% 25% at 80% 20%, rgba(201,162,39,.35), transparent 60%),
            radial-gradient(30% 30% at 60% 80%, rgba(76,194,255,.35), transparent 60%);
          filter: blur(18px);
          animation:vantaFloat 16s ease-in-out infinite alternate;
        }
        @keyframes vantaFloat{
          from{ transform:translate(-2%, -2%) scale(1); }
          to  { transform:translate(2%, 2%) scale(1.06); }
        }

        /* Tipografia local (só o que o Hero usa) */
        .titleWrap{ margin-bottom:6px; }
        .h1{ font-size: clamp(24px, 2.8vw, 32px); font-weight: 820; line-height:1.18; color:#1a1d21; }
        .eyebrow{ color:#768093; font-size:12.5px; letter-spacing:.08em; margin:2px 0 8px; }
        .lead, .subLead { color:#5a6270; margin:4px 0; max-width:60ch; }
        .subLead strong{ color:#0f1216; }

        /* CTAs */
        .ctaRow{ display:flex; gap:10px; flex-wrap:wrap; justify-content:flex-start; margin:12px 0 2px; }
        .btnPrimary, .btnGhost{
          border-radius:999px; padding:10px 16px; font-weight:800; letter-spacing:.01em; cursor:pointer;
          transition: transform .12s ease, background .2s ease, border-color .2s ease, color .2s ease;
        }
        .btnPrimary{ background:#171a20; color:#fff; border:1px solid #0f1317; }
        .btnPrimary:hover{ transform:translateY(-1px) scale(1.015); }
        .btnGhost{ background:#fff; color:#111; border:1px solid #d9dde4; }
        .btnGhost:hover{ border-color:#c9ced8; transform:translateY(-1px) scale(1.01); }

        /* Frame da imagem — altura estável e badge */
        .heroFrame{
          width:100%; max-width:560px;
          border:1px solid #d9dde4; border-radius:16px; overflow:hidden; background:#fff;
          box-shadow:0 6px 16px rgba(10,15,20,.06);
        }
        .heroFrame__glass{
          position:relative; width:100%;
          min-height:clamp(380px, 46vh, 520px);
          display:flex; align-items:center; justify-content:center;
        }
        .heroImg{ object-fit:cover; object-position:50% 30%; }
        @media (max-width:480px){ .heroFrame__glass{ min-height:320px; } }

        .heroFrame__badge{
          position:absolute; left:12px; bottom:12px;
          display:flex; align-items:center; gap:8px;
          background:rgba(255,255,255,.9); border:1px solid #e6e8ec;
          border-radius:999px; padding:6px 10px; color:#111; font-size:12.5px;
        }

        /* Micro-brilho premium + hover lift */
        .gradientBorder { position: relative; }
        .gradientBorder::before{
          content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
          background:linear-gradient(140deg,#7b5cff 0%, #c9a227 48%, #4cc2ff 100%);
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }
        .gloss{ position:relative; overflow:hidden; }
        .gloss::after{
          content:""; position:absolute; inset:0; translate:-120% 0;
          background:linear-gradient(110deg,rgba(255,255,255,0) 0%,rgba(255,255,255,.55) 45%,rgba(255,255,255,0) 60%);
          transition:translate .9s ease;
        }
        .gloss:hover::after{ translate:120% 0; }
        .hoverLift{ transition:transform .22s ease, box-shadow .22s ease; }
        .hoverLift:hover{ transform:translateY(-3px); box-shadow:0 14px 32px rgba(0,0,0,.10); }

        /* Motion safe */
        @media (prefers-reduced-motion:reduce){
          .gloss::after{ transition:none; }
          .hoverLift, .btnPrimary, .btnGhost { transition:none; }
          .vantaSoftAlt::before{ animation:none; }
        }
      `}</style>
    </section>
  );
}
