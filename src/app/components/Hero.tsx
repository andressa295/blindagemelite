"use client";
import Image from "next/image";

type Props = {
  whatsappUrl: string;
  onScrollToOque?: () => void;
  childrenEffect?: React.ReactNode;
};

export default function Hero({ whatsappUrl, onScrollToOque, childrenEffect }: Props) {
  const openWhats = () => window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section className="container heroSplit" id="topo">
      {childrenEffect}

      <div className="heroSplit__left">
        <div className="titleWrap" data-reveal>
          <h1 className="h1">elite blindagem — o futuro da proteção já chegou</h1>
        </div>

        <p className="eyebrow" data-reveal>proteção invisível · resistência incomparável</p>

        <p className="lead" data-reveal>
          a elite blindagem traz ao brasil uma tecnologia de nanoproteção com titânio que cria
          uma camada invisível e ultra-resistente, mantendo o aparelho com aparência de novo por muito mais tempo.
        </p>

        <p className="subLead" data-reveal>
          não é película. não é capinha. <strong>é ciência aplicada à proteção do seu celular.</strong>
        </p>

        <div className="ctaRow left" data-reveal>
          <button className="btnPrimary" onClick={openWhats}>agendar pelo whatsapp</button>
          <button className="btnGhost" onClick={onScrollToOque}>o que é a blindagem?</button>
        </div>
      </div>

      <div className="heroSplit__right" data-reveal>
        <div className="heroFrame">
          <div className="heroFrame__glass">
            {/* Use fill + sizes pro LCP otimizado */}
            <Image
              src="/mockups/problema.jpg"
              alt="dispositivo protegido"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="heroFrame__badge">
            <Image src="/blindagem.png" alt="" width={22} height={22} />
            <span>nanoproteção com titânio</span>
          </div>
        </div>
      </div>
    </section>
  );
}
