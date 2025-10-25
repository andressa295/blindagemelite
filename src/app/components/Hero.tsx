"use client";

type Props = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  childrenEffect?: React.ReactNode; // opcional: VantaBackground dentro do bloco
};

export default function Hero({ whatsappUrl, onScrollToOque, childrenEffect }: Props) {
  const openWhats = () => window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section className="container heroSplit" id="topo">
      {/* efeito opcional (Vanta) – renderiza atrás do conteúdo */}
      {childrenEffect}

      <div className="heroSplit__left">
        <div className="titleWrap" data-reveal>
          <div className="metalStripe" aria-hidden />
          <h1 className="h1">Elite Blindagem: o futuro da proteção já chegou</h1>
        </div>

        <p className="eyebrow" data-reveal>Proteção invisível · Resistência incomparável</p>

        <p className="lead" data-reveal>
          A elite blindagem traz ao brasil uma tecnologia de nanoproteção com titânio que cria
          uma camada invisível e ultra-resistente, mantendo o aparelho com aparência de novo por muito mais tempo.
        </p>

        <p className="subLead" data-reveal>
          <strong>É ciência aplicada à proteção do seu celular.</strong>
        </p>

        <div className="ctaRow left" data-reveal>
          <button className="btnPrimary" onClick={openWhats}>Agendar pelo whatsapp</button>
          <button
            className="btnGhost"
            onClick={onScrollToOque}
          >
            O que é a blindagem?
          </button>
        </div>
      </div>

      <div className="heroSplit__right" data-reveal>
        <div className="heroFrame">
          <div className="heroFrame__glass">
            
            <img src="/elite.jpg" alt="dispositivo protegido" />
          </div>
          <div className="heroFrame__badge">
            <img src="/blindagem.png" alt="" width={22} height={22} />
            <span>Nanoproteção com titânio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
