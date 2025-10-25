"use client";

export default function Reviews() {
  return (
    <section className="container section" id="reviews">
      <h2 className="h2" data-reveal>o que nossos clientes dizem</h2>
      <div className="gridThree" data-reveal>
        <blockquote className="quote">
          “fizeram na minha casa com toda a estrutura, sem sujeira e super rápido! excelente atendimento.”
          <cite>— carla m.</cite>
        </blockquote>
        <blockquote className="quote">
          “caiu da escada e não trincou. testado e aprovado.”
          <cite>— andré r.</cite>
        </blockquote>
        <blockquote className="quote">
          “o atendimento a domicílio foi perfeito! profissional, pontual e super cuidadoso.”
          <cite>— beatriz t.</cite>
        </blockquote>
      </div>
    </section>
  );
}
