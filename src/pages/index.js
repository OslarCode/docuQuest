import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";

import Heading from "@theme/Heading";
import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <div className={styles.heroContent}>
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/intro"
            >
              Comenzar Tutorial - 5min ⏱️
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>📚</div>
            <h4>Aprende Desarrollo Web</h4>
            <p>Tutoriales paso a paso</p>
          </div>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>⚡</div>
            <h4>Contenido Actualizado</h4>
            <p>Tecnologías modernas</p>
          </div>
          <div className={styles.floatingCard}>
            <div className={styles.cardIcon}>🎯</div>
            <h4>Enfoque Práctico</h4>
            <p>Ejemplos reales</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function TechShowcase() {
  const technologies = [
    { name: "React", icon: "⚛️", color: "#61dafb" },
    { name: "JavaScript", icon: "🟨", color: "#f7df1e" },
    { name: "Bases de datos", icon: "🔷", color: "#3178c6" },
    { name: "Node.js", icon: "📦", color: "#339933" },
    { name: "CSS", icon: "🎨", color: "#1572b6" },
    { name: "HTML", icon: "🌐", color: "#e34f26" },
  ];

  return (
    <section className={clsx("hero", styles.techSection)}>
      <div className="container">
        <div className={styles.techContent}>
          <Heading as="h2" className={clsx("hero__title", styles.sectionTitle)}>
            Tecnologías que Cubrimos
          </Heading>
          <p className={clsx("hero__subtitle", styles.sectionSubtitle)}>
            Aprende las tecnologías más demandadas del desarrollo web moderno
          </p>
        </div>
        <div className={styles.techVisual}>
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={styles.techFloatingCard}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div
                className={styles.techCardIcon}
                style={{ backgroundColor: tech.color }}
              >
                {tech.icon}
              </div>
              <h4>{tech.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <Heading as="h2">
            ¿Listo para comenzar tu viaje en desarrollo web?
          </Heading>
          <p>
            Únete a nuestra comunidad y accede a todos nuestros recursos
            gratuitos
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/docs/intro"
            >
              Comenzar Ahora
            </Link>
            <Link
              className="button button--outline button--lg"
              to="https://github.com/OslarCode/docuQuest"
              target="_blank"
            >
              Contribuir en GitHub
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Aprende Desarrollo Web`}
      description="DocuQuest es una plataforma educativa con tutoriales sobre tecnologías clave para el desarrollo web moderno. Aprende React, JavaScript, TypeScript y más."
    >
      <HomepageHeader />

      <main>
        <HomepageFeatures />
      </main>
      <TechShowcase />
      <CTASection />
    </Layout>
  );
}
