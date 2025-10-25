import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";

// Si en tu archivo original ya tienes estructuras semejantes (hero + features + tech + cta),
// este componente sustituye únicamente la presentación por una versión minimalista.

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();

  // Lista de “píldoras” del header: usa exactamente los mismos textos que ya tenías en tus 3 tarjetas.
  // Si en tu proyecto estos textos vienen de otra fuente, reemplaza aquí por los tuyos.
  const headerItems = [
    { title: "Aprende Desarrollo Web", subtitle: "Tutoriales paso a paso" },
    { title: "Contenido Actualizado", subtitle: "Tecnologías modernas" },
    { title: "Enfoque Práctico", subtitle: "Ejemplos reales" },
  ];

  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.hero__title}>
            {siteConfig.title ?? "DocuQuest"}
          </h1>
          <p className={styles.hero__subtitle}>
            {siteConfig.tagline ?? "Documentación clara, sin ruido visual."}
          </p>
          <div className={styles.buttons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              Empezar
            </Link>
            {/* Eliminado el acceso al Blog */}
          </div>
        </div>

        {/* Sustitución de las 3 “cards con iconos” por una lista simple, sin iconos */}
        <ul className={styles.featureList}>
          {headerItems.map((item, i) => (
            <li className={styles.featureItem} key={i}>
              <h4>{item.title}</h4>
              <p>{item.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

function TechShowcase() {
  // Si antes tenías un array de tecnologías con iconos/colores,
  // aquí solo mostramos el nombre en una lista simple.
  const technologies = [
    { name: "HTML" },
    { name: "CSS" },
    { name: "JavaScript" },
    { name: "React" },
    { name: "Node.js" },
    { name: "Express" },
    { name: "SQLite" },
    { name: "JSON" },
    { name: "Pruebas y docs" },
  ];

  return (
    <section className={clsx("hero", styles.techSection)}>
      <div className="container">
        <div className={styles.techContent}>
          <h2 className={styles.sectionTitle}>Tecnologías que Cubrimos</h2>
          <p className={styles.sectionSubtitle}>
            Una plataforma diseñada específicamente para desarrolladores que
            buscan aprender y crecer
          </p>
        </div>

        {/* Lista minimalista (sin tarjetas, sin iconos) */}
        <ul className={styles.techList}>
          {technologies.map((tech, i) => (
            <li key={i}>{tech.name}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className={styles.ctaSection}>
      <div className="container ctaContent">
        <h2>Abre la guía y empieza</h2>
        <p>
          La documentación está pensada para leerse de arriba abajo, sin
          distracciones.
        </p>
        <div className={styles.ctaButtons}>
          <Link className="button button--primary button--lg" to="/docs/intro">
            Ir a la documentación
          </Link>
          {/* Eliminado el acceso al Blog */}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title="DocuQuest"
      description="Documentación minimalista con Docusaurus"
    >
      <HomepageHeader />
      <TechShowcase />
      <CTA />
    </Layout>
  );
}
