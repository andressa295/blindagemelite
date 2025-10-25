"use client";

import {
  HeaderDark,
  Hero,
  OqueE,
  Domicilio,
  PorQueAgora,
  PorQueEscolher,
  Reviews,
  CTAFinal,
  WhatsFloat,
  VantaBackground
} from "./components";

export default function Page() {
  const whatsappUrl = "https://wa.me/5511960164958"; // número real

  const scrollToOque = () =>
    document.getElementById("oque")?.scrollIntoView({ behavior: "smooth" });

  return (
    <main className="page">
      {/* Cabeçalho escuro fixo com logo e botão */}
      <HeaderDark whatsappUrl={whatsappUrl} />

      {/* Hero principal */}
      <Hero
  whatsappUrl={whatsappUrl}
  onScrollToOque={scrollToOque}
  childrenEffect={
    <VantaBackground
      className="vantaBlock"  // CSS do Hero já posiciona atrás
      bgColor={0x0b0f14}      // preto do hero
      lineColor={0x1a222d}    // linhas em cinza-azulado escuro
    />
  }
/>

      <hr className="hr" />

      {/* Bloco 1: o que é a blindagem */}
      <OqueE />

      {/* Bloco 2: atendimento a domicílio, com efeito sutil */}
      <Domicilio
        whatsappUrl={whatsappUrl}
        childrenEffect={
          <VantaBackground
            className="vantaBlock vantaSoft"
            bgColor={0xf5f7fa}
            lineColor={0x0e1116}
          />
        }
      />

      {/* Bloco 3: por que fazer agora */}
      <PorQueAgora whatsappUrl={whatsappUrl} />

      {/* Bloco 4: por que escolher a elite blindagem */}
      <PorQueEscolher />

      {/* Bloco 5: depoimentos */}
      <Reviews />

      {/* Bloco 6: call-to-action final */}
      <CTAFinal whatsappUrl={whatsappUrl} />

      {/* Botão flutuante WhatsApp com ícone e efeito */}
      <WhatsFloat whatsappUrl={whatsappUrl} />
    </main>
  );
}
