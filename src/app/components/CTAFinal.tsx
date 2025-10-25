"use client";

type Props = {
  whatsappUrl: string;
};

export default function CTAFinal({ whatsappUrl }: Props) {
  const openWhats = () => window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    <section className="container section center" id="agenda">
      <h2 className="h2" data-reveal>agende agora</h2>
      <p className="copy" data-reveal>
        seu celular merece o padrão elite. proteja o que é importante com quem entende de tecnologia e detalhe.
      </p>
      <div className="ctaRow" data-reveal>
        <button className="btnPrimary" onClick={openWhats}>agendar pelo whatsapp</button>
      </div>

      <ul className="contacts" data-reveal>
        <li>whatsapp: <span className="mono">(colocar número)</span></li>
        <li>atendimento a domicílio em toda a região</li>
        <li><a href="mailto:contato@eliteblindagem.com.br">contato@eliteblindagem.com.br</a></li>
      </ul>
    </section>
  );
}
