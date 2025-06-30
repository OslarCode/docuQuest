import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Plataforma de documentación técnica flexible y fácil de usar.",
    Svg: require("@site/static/img/undraw_book-lover_f1dq.svg").default,
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
    Svg: require("@site/static/img/undraw_adventure-map_3e4p.svg").default,
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
    Svg: require("@site/static/img/undraw_building-a-website_1wrp.svg").default,
    description: (
      <>
        Navega por contenidos claros, indexados y actualizados. Todo está
        pensado para que encuentres respuestas rápidas y útiles, sin perder
        tiempo.
      </>
    ),
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
