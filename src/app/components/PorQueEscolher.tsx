"use client";

export default function PorQueEscolher() {
  const pontos = [
    "Tecnologia exclusiva com partículas de titânio",
    "Aplicação profissional e certificada",
    "Atendimento 100% a domicílio",
    "Proteção duradoura e invisível",
    "Atendimento rápido, exclusivo e personalizado",
    "Resultado garantido ou seu dinheiro de volta",
  ];

  return (
    <section className="container section" id="motivos">
      <h2 className="h2" data-reveal>Por que escolher a Elite Blindagem</h2>
      <div className="gridThree" data-reveal>
        {pontos.map((t) => (
          <div className="card" key={t}><p className="copy">{t}</p></div>
        ))}
      </div>
      <p className="note" data-reveal>*aplicável conforme política de garantia local.</p>
    </section>
  );
}
