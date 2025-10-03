"use client";

import Image from "next/image";
import s from "./page.module.css";
import { useEffect, useRef } from "react";

export default function Home() {
  const whatsapp = "https://wa.me/5599999999999"; // TODO: atualize

  // Reveal on scroll (IntersectionObserver)
  const observeRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    // marca <html> como JS-enabled (opcional pra CSS refinado)
    document.documentElement.classList.add("js");

    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (!("IntersectionObserver" in window)) {
      // sem IO: mostra tudo
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    // aplica a classe do CSS module só via JS (evita sumir sem JS)
    els.forEach((el) => el.classList.add(s.reveal));

    observeRef.current = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        }),
      { threshold: 0.16 }
    );

    els.forEach((el) => observeRef.current?.observe(el));
    return () => observeRef.current?.disconnect();
  }, []);

  return (
    <main className={s.page}>
      {/* HEADER com logo centralizada */}
      <div className={`${s.header} container`}>
        <div className={`${s.logo} ${s.logoIn}`}>
          <Image
            src="/blindagem.png"
            alt="Blindagem Elite"
            width={178}
            height={178}
            priority
          />
          <span></span>
        </div>
      </div>

      {/* HERO */}
      <section className={`${s.hero} container`} id="topo">
        {/* luz ambiente (atrás) */}
        <div className={s.light} />
        <div className={s.light2} />

        <header className={`${s.heroHead} ${s.uLightBlue}`} data-reveal>
          <span className={s.kicker}>Nanotecnologia de Titânio</span>
          <h1 className={s.titleXL}>
            Blindagem <span>Elite</span>
          </h1>
            <p className={s.lead}>
            Uma <strong>nanocamada invisível de titânio</strong> projetada para absorver e dispersar
            energia de <strong>impactos fortes</strong> e <strong>pontas agudas</strong>, mantendo a
            transparência e o toque original. Tecnologia inspirada em ligas usadas na{" "}
            <em>aeronáutica</em> leve, extremamente resistente e estável.
          </p>
        </header>

        <div className={s.ctaRow} data-reveal>
          <button
            className={s.btnPrimary}
            onClick={() => window.open(whatsapp, "_blank")}
          >
            Quero Blindagem Elite
          </button>
          <button
            className={s.btnGhost}
            onClick={() =>
              document.getElementById("tech")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Ver tecnologia
          </button>
        </div>

        <div className={s.badges} data-reveal>
          <span className={s.badge}>
            <i className={s.dot} /> Ultra-transparente
          </span>
          <span className={s.badge}>
            <i className={s.dot} /> Filtragem EMI parcial
          </span>
        </div>
     {/* Vídeo opcional (desktop). Remova se não usar. */}
        <div className="hidden-mobile" aria-hidden>
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      <hr className="hr" />

      {/* PROBLEMA */}
      <section className={`${s.section} container`} id="problema">
        <div className={s.gridTwo}>
          <figure className={s.figure} data-reveal>
            <Image
              src="/mockups/problema.jpg"
              alt="Impactos, pontas e riscos reais do dia a dia"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </figure>

          <div>
            <div data-reveal>
              <span className={s.kicker}>O Desafio Invisível</span>
            </div>
            <h2 className={s.titleLG} data-reveal>
              Quedas, pancadas e pontas metálicas existem e destroem telas.
            </h2>
            <p className={s.muted} data-reveal>
              No uso real, o dispositivo sofre desde micro-riscos até <strong>impactos concentrados</strong>
              (chaves, tesouras, quedas em quinas). Sem proteção avançada, esses esforços focais iniciam trincas
              e avariam módulos.
            </p>

            <ul className={s.list} data-reveal>
              <li>
                <i className={s.dot} />
                <div>
                  <span className={`${s.itemTitle} ${s.blue} ${s.soft}`}>Picos de impacto</span>
                  <br />
                  Força concentrada em pontos minúsculos (ponta de tesoura/chave).
                </div>
              </li>
              <li>
                <i className={s.dot} />
                <div>
                  <span className={`${s.itemTitle} ${s.blue} ${s.soft}`}>Micro-riscos acumulados</span>
                  <br />
                  Microfissuras crescentes que enfraquecem o vidro ao longo do tempo.
                </div>
              </li>
              <li>
                <i className={s.dot} />
                <div>
                  <span className={`${s.itemTitle} ${s.blue} ${s.soft}`}>Interferências</span>
                  <br />
                  Ruídos eletromagnéticos e picos elétricos em sensores e antenas.
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SOLUÇÃO */}
      <section className={`${s.section} container`} id="solucao">
        <div data-reveal>
          <span className={s.kicker}>Solução</span>
        </div>
        <h2 className={s.titleLG} data-reveal>
          Nanocamada de Titânio: <span style={{ whiteSpace: "nowrap" }}>blindagem de alto impacto</span>
        </h2>
        <p className={s.muted} data-reveal style={{ maxWidth: 900 }}>
          Nossa arquitetura deposita uma camada de titânio que aumenta a <strong>resistência mecânica</strong> e a
          <strong> tenacidade</strong> da superfície, distribuindo a energia de pancadas e reduzindo a propagação de
          trincas — tudo isso <strong>sem perder transparência</strong> nem sensibilidade ao toque.
        </p>

        <div className={s.gridThree} data-reveal>
          <div className={s.card}>
            <span className={`${s.itemTitle} ${s.red} ${s.soft}`}>Resistência a impactos</span>
            <br />
            <span className={s.muted}>Projetada para suportar pancadas fortes e pontas metálicas.</span>
          </div>
          <div className={s.card}>
            <span className={`${s.itemTitle} ${s.red} ${s.soft}`}>Ultra-transparente</span>
            <br />
            <span className={s.muted}>Sem distorção óptica; cores e nitidez preservadas.</span>
          </div>
          <div className={s.card}>
            <span className={`${s.itemTitle} ${s.red} ${s.soft}`}>Estável e durável</span>
            <br />
            <span className={s.muted}>Camada resistente a desgaste, oxidação e uso severo.</span>
          </div>
        </div>
      </section>

      {/* TECNOLOGIA */}
      <section className={`${s.section} container`} id="tech">
        <div className={s.gridTwo}>
          <div>
            <div data-reveal>
              <span className={s.kicker}>Como funciona</span>
            </div>
            <h2 className={s.titleLG} data-reveal>Estrutura multicamadas na escala nano</h2>
            <p className={s.muted} data-reveal>
              Camadas de adesão + <strong>titânio</strong> + camada funcional. O conjunto melhora a
              distribuição de tensões, eleva a resistência a riscos/impactos e mantém a superfície clara.
            </p>
            <ul className={s.list} data-reveal>
              <li>
                <i className={s.dot} />
                <div>
                  <span className={`${s.itemTitle} ${s.blue} ${s.soft}`}>Camada de Titânio</span>
                  <br />
                  Liga de alta resistência específica e excelente relação resistência-peso (referência aeronáutica).
                </div>
              </li>
              <li>
                <i className={s.dot} />
                <div>
                  <span className={`${s.itemTitle} ${s.blue} ${s.soft}`}>Distribuição de energia</span>
                  <br />
                  Dissipa impactos concentrados e reduz nucleação/propagação de trincas.
                </div>
              </li>
              <li>
                <i className={s.dot} />
                <div>
                  <span className={`${s.itemTitle} ${s.blue} ${s.soft}`}>Transparência & toque</span>
                  <br />
                  Preserva a ótica e o deslize original da tela.
                </div>
              </li>
            </ul>
            <div className={s.ctaRow} data-reveal>
              <button className={s.btnGhost} onClick={() => window.open(whatsapp, "_blank")}>
                Solicitar demonstração
              </button>
              <button
                className={s.btnPrimary}
                onClick={() => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver em ação
              </button>
            </div>
          </div>

          <figure className={s.figure} data-reveal>
            <Image
              src="/mockups/camadas.jpg"
              alt="Estrutura multicamadas"
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </figure>
        </div>
      </section>

      {/* DEMO */}
      <section className={`${s.section} container`} id="demo">
        <div data-reveal>
          <span className={s.kicker}>Veja em ação</span>
        </div>
        <h2 className={s.titleLG} data-reveal>Aplicação e impacto</h2>
        <p className={s.muted} data-reveal style={{ maxWidth: 900 }}>
          Confira a aplicação e testes práticos (pancadas, pontas metálicas e quedas controladas) demonstrando
          a robustez da Blindagem Elite.
        </p>
        <figure className={`${s.figure} ${s.video}`} data-reveal>
          <video controls poster="/mockups/poster.jpg">
            <source src="/demo.mp4" type="video/mp4" />
          </video>
        </figure>
      </section>

      {/* CTA final */}
      <section className={`${s.section} container ${s.center}`}>
        <h2 className={s.titleLG} data-reveal>Pronto para blindar seu dispositivo?</h2>
        <p className={s.muted} data-reveal>
          Fale conosco e garanta sua Blindagem Elite — proteção <strong>de alto impacto</strong> para celulares,
          relógios e gadgets.
        </p>
        <div className={s.ctaRow} data-reveal>
          <button className={s.btnPrimary} onClick={() => window.open(whatsapp, "_blank")}>
            Falar no WhatsApp
          </button>
          <button className={s.btnGhost} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            Voltar ao topo
          </button>
        </div>

        {/* NOTA revisada */}
        <small className={s.disclaimer} data-reveal>
          Nota: camada projetada para suportar <strong>impactos fortes</strong>, pontas e abrasão do uso diário — sem
          alterar a clareza da tela. Resultados variam conforme intensidade e condições do teste.
        </small>
      </section>

      {/* FAQ */}
      <section className={`${s.section} container`} id="faq">
        <div data-reveal>
          <span className={s.kicker}>Dúvidas Frequentes</span>
        </div>
        <h2 className={s.titleLG} data-reveal>Perguntas que sempre nos fazem</h2>

        {/* Usando <details> para não criar CSS novo */}
        <div className={s.gridThree} data-reveal>
          <div className={s.card}>
            <details>
              <summary><strong>É de titânio “de verdade”? O que isso muda?</strong></summary>
              <p className={s.muted} style={{ marginTop: 8 }}>
                Sim. O titânio e suas ligas (como Ti-6Al-4V, referência aeronáutica) combinam{" "}
                <strong>alta resistência com baixo peso</strong> e excelente estabilidade. Ligas comuns têm{" "}
                <strong>tensão de escoamento na faixa de 800–1100 MPa</strong> e dureza elevada — motivo de uso em
                estruturas aeroespaciais.
              </p>
            </details>
          </div>

          <div className={s.card}>
            <details>
              <summary><strong>Protege contra objetos pontiagudos (tesoura, chave)?</strong></summary>
              <p className={s.muted} style={{ marginTop: 8 }}>
                A nanoestrutura aumenta a resistência a <strong>impactos concentrados</strong> — o ponto crítico em
                pontas metálicas. Revestimentos técnicos à base de titânio (ex.: TiN) são referência pela dureza muito alta,
                inspirando nossa abordagem de proteção de superfície.
              </p>
            </details>
          </div>

          <div className={s.card}>
            <details>
              <summary><strong>Vai mudar a cor, brilho ou a sensibilidade do toque?</strong></summary>
              <p className={s.muted} style={{ marginTop: 8 }}>
                Não. A camada é <strong>ultra-transparente</strong> e preserva o toque. O objetivo é reforço mecânico
                e estabilidade da superfície, sem “efeito película”.
              </p>
            </details>
          </div>

          <div className={s.card}>
            <details>
              <summary><strong>Por que titânio é usado em aeronaves e equipamentos premium?</strong></summary>
              <p className={s.muted} style={{ marginTop: 8 }}>
                Pelo <strong>alto índice resistência/peso</strong>, <strong>resistência à fadiga</strong> e{" "}
                <strong>corrosão</strong>, mantendo desempenho em condições severas — exatamente o que buscamos
                numa blindagem fina e leve.
              </p>
            </details>
          </div>

          <div className={s.card}>
            <details>
              <summary><strong>Como isso se compara a películas comuns?</strong></summary>
              <p className={s.muted} style={{ marginTop: 8 }}>
                Películas típicas focam em riscos superficiais. A Blindagem Elite usa <strong>engenharia de material</strong>
                para <strong>dispersar energia</strong> de pancadas, mantendo transparência e durabilidade.
              </p>
            </details>
          </div>

          <div className={s.card}>
            <details>
              <summary><strong>Suporta quedas?</strong></summary>
              <p className={s.muted} style={{ marginTop: 8 }}>
                Projetada para auxiliar em <strong>quedas e batidas fortes</strong> reduzindo iniciação de trincas e
                danos por foco de impacto. Quedas extremas podem exceder qualquer sistema de proteção, mas nossos
                testes práticos demonstram performance superior.
              </p>
            </details>
          </div>
        </div>
      </section>

      <footer className={s.footer}>
        Blindagem Elite — nanotecnologia de titânio. © {new Date().getFullYear()}
      </footer>
    </main>
  );
}