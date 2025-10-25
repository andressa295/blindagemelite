"use client";

type Props = {
  whatsappUrl: string;
  // permite aplicar efeito só neste bloco, se quiser
  childrenEffect?: React.ReactNode;
};

export default function Domicilio({ whatsappUrl, childrenEffect }: Props) {
  const openWhats = () => window.open(whatsappUrl, "_blank", "noopener,noreferrer");

  return (
    // adicionamos as classes sectionDivided + effectHost
    <section className="container section sectionDivided effectHost" id="domicilio">
      {/* efeito sutil SÓ neste bloco */}
      {childrenEffect}

      <div className="gridTwo">
        <div>
          <h2 className="h2" data-reveal>Atendimento personalizado a domicílio</h2>
          <p className="copy" data-reveal>
            Levamos tecnologia, praticidade e sofisticação até você, conforto, exclusividade e eficiência.
            atendimento individualizado com equipamentos profissionais e produtos de alta performance.
          </p>

          <div className="card" data-reveal>
            <h3 className="h3">Requisitos para o atendimento</h3>
            <ul className="bullets">
              <li>Uma tomada próxima para os equipamentos</li>
              <li>Uma mesa ou superfície estável para a aplicação</li>
            </ul>
            <div className="ctaRow left">
              <button className="btnPrimary" onClick={openWhats}>agendar agora</button>
            </div>
          </div>
        </div>

        {/* VÍDEO (substitui a imagem) */}
        <figure className="figure figureVideo" data-reveal>
          <video
            className="videoCover"
            controls
            playsInline
            preload="metadata"
            poster="/mockups/poster.jpg"
          >
            <source src="/videos/processo.webm" type="video/webm" />
            <source src="/videos/processo.mp4" type="video/mp4" />
            Seu navegador não suporta vídeo HTML5.
          </video>
        </figure>
      </div>
    </section>
  );
}
