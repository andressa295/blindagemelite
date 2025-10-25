"use client";

export default function Reviews() {
  const items = [
    {
      text:
        "Fizeram na minha casa com toda a estrutura, sem sujeira e super rápido! Excelente atendimento.",
      author: "Carla M.",
      city: "Morumbi - SP",
      rating: 5,
    },
    {
      text: "Caiu da escada e não trincou. Testado e aprovado.",
      author: "André R.",
      city: "Vila Mariana - SP",
      rating: 5,
    },
    {
      text:
        "O atendimento a domicílio foi perfeito! Profissional, pontual e super cuidadoso.",
      author: "Beatriz T.",
      city: "Pinheiros - SP",
      rating: 5,
    },
  ];

  return (
    <section
      id="reviews"
      className="container section sectionDivider contentVis"
      aria-labelledby="reviews-title"
    >
      <header className="reviewsHead reveal in" data-i="1">
        <h2 className="h2" id="reviews-title">O que nossos clientes dizem</h2>
        <p className="sub">
          Atendimento a domicílio com padrão Elite — média <strong>4,9/5</strong> em satisfação.
        </p>
      </header>

      <div className="gridThree reveal in" data-i="2" role="list">
        {items.map((it, i) => (
          <article className="quoteCard gradientBorder hoverLift" role="listitem" key={i}>
            <div className="quoteHeader">
              <div className="avatar" aria-hidden="true">{getInitials(it.author)}</div>
              <div className="meta">
                <span className="name">{it.author}</span>
                <span className="city">{it.city}</span>
              </div>
              <span className="verified" aria-label="Cliente verificado">Verificado</span>
            </div>

            <p className="quoteText">“{it.text}”</p>

            <div className="quoteFooter">
              <Stars value={it.rating} />
              <time className="time" aria-hidden="true">• recente</time>
            </div>
          </article>
        ))}
      </div>

      <style jsx>{`
        /* ===== Escopo local ===== */
        .container { width: min(1140px, 92%); margin-inline: auto; }
        .section { padding: 18px 0 14px; }

        /* Divisor premium (coeso) */
        .sectionDivider { position: relative; }
        .sectionDivider::after{
          content:""; position:absolute; left:50%; transform:translateX(-50%);
          bottom:-6px; width:100vw; height:1px;
          background:linear-gradient(90deg, transparent, rgba(0,0,0,.08), transparent);
          animation:dividerSweep 4s ease-in-out infinite;
        }
        @keyframes dividerSweep { 0%,100%{opacity:.5;} 50%{opacity:1;} }

        /* Cabeçalho */
        .reviewsHead { text-align:center; margin-bottom: 10px; }
        .sub { color:#5a6270; margin:4px 0 0; font-size:14.6px; }

        /* Grid responsivo 1 -> 3 col */
        .gridThree{ display:grid; gap:14px; margin-top:10px; }
        @media (min-width:900px){ .gridThree{ grid-template-columns: repeat(3, 1fr); } }
        @media (max-width:700px){ .gridThree{ grid-template-columns: 1fr; } }

        /* Card */
        .quoteCard{
          border:1px solid #d9dde4; border-radius:14px; background:#fff;
          box-shadow:0 8px 18px rgba(10,15,20,.06);
          padding:14px; display:flex; flex-direction:column; gap:10px;
        }
        .gradientBorder{ position:relative; }
        .gradientBorder::before{
          content:""; position:absolute; inset:-1px; border-radius:inherit; padding:1px;
          background:linear-gradient(140deg,#7b5cff 0%, #c9a227 48%, #4cc2ff 100%);
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor; mask-composite:exclude; pointer-events:none;
        }
        .hoverLift{ transition:transform .22s ease, box-shadow .22s ease; }
        .hoverLift:hover{ transform:translateY(-3px); box-shadow:0 14px 32px rgba(0,0,0,.10); }

        /* Header do card */
        .quoteHeader{ display:flex; align-items:center; gap:10px; }
        .avatar{
          width:38px; height:38px; border-radius:50%;
          display:grid; place-items:center; font-weight:800;
          color:#18202a; background:#eef2f8; border:1px solid #d9dde4;
        }
        .meta{ display:flex; flex-direction:column; line-height:1.1; }
        .name{ font-weight:800; color:#0f1216; }
        .city{ font-size:12.5px; color:#768093; }
        .verified{
          margin-left:auto; font-size:12px; font-weight:700;
          padding:4px 8px; border-radius:999px;
          background:#f2f7ff; color:#214b87; border:1px solid #cfe0ff;
        }

        /* Texto da review */
        .quoteText{ color:#273043; line-height:1.5; font-style:italic; margin:2px 0 0; }

        /* Footer: estrelas + tempo */
        .quoteFooter{ display:flex; align-items:center; gap:8px; margin-top:4px; }
        .stars{ display:inline-flex; gap:2px; }
        .star{ width:16px; height:16px; display:inline-block; }
        .time{ color:#8a94a6; font-size:12.5px; }

        /* Reveal seguro + performance */
        .reveal{ opacity:1; transform:none; transition:opacity .25s, transform .25s; }
        .reveal.in{ opacity:1; transform:none; }
        .reveal[data-i="1"].in{ transition-delay:.05s; }
        .reveal[data-i="2"].in{ transition-delay:.10s; }
        .contentVis{ content-visibility:auto; contain-intrinsic-size: 1px 520px; }

        /* Mobile refinements */
        @media (max-width:480px){
          .quoteCard{ padding:12px; }
          .avatar{ width:34px; height:34px; }
        }
      `}</style>
    </section>
  );
}

/* ===== Helpers ===== */
function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Stars({ value = 5 }: { value?: number }) {
  // 5 estrelas cheias (pode adaptar para meia estrela se quiser)
  return (
    <span className="stars" aria-label={`${value} de 5 estrelas`}>
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="star"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M12 17.27l5.18 3.09-1.39-5.97 4.6-3.99-6.06-.52L12 4 9.67 9.88l-6.06.52 4.6 3.99-1.39 5.97L12 17.27z"
            fill={i < value ? "#f6b400" : "#e3e6ec"}
            stroke={i < value ? "#f0a700" : "#d7dbe4"}
            strokeWidth="1"
          />
        </svg>
      ))}
    </span>
  );
}
