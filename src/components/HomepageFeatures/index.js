import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Plataforma de documentación técnica flexible y fácil de usar.",
    description: (
      <>
        Consulta la documentación cuando la necesites, desde cualquier
        dispositivo. DocuQuest se adapta a ti, estés empezando o perfeccionando
        tus conocimientos.
      </>
    ),
  },
  {
    title: "Temarios de programación bien organizados y fáciles de seguir.",
    description: (
      <>
        Accede a rutas de aprendizaje ordenadas, desde lo más básico hasta lo
        avanzado. Encuentra la documentación exacta que necesitas, sin rodeos ni
        distracciones.
      </>
    ),
  },
  {
    title: "Documentación accesible y optimizada para desarrolladores.",
    description: (
      <>
        Navega por contenidos claros, indexados y actualizados. Todo está
        pensado para que encuentres respuestas rápidas y útiles, sin perder
        tiempo.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>
          <div className={styles.iconBackground}></div>
        </div>
        <div className={styles.featureContent}>
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={clsx("hero hero--primary", styles.features)}>
      <div className="container">
        <div className={styles.featuresHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Por Qué Elegir DocuQuest
          </Heading>
          <p className={styles.sectionSubtitle}>
            Una plataforma diseñada específicamente para desarrolladores que
            buscan aprender y crecer
          </p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
