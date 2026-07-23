import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type LandingLink = {
  label: string;
  to: string;
};

type Metric = {
  value: string;
  label: string;
};

type Stage = {
  label: string;
  detail: string;
};

type PathCard = {
  eyebrow: string;
  title: string;
  description: string;
  links: LandingLink[];
};

type Area = {
  number: string;
  title: string;
  description: string;
  to: string;
};

type Source = {
  concern: string;
  source: string;
};

type DocumentationLandingProps = {
  hero: {
    title: string;
    description: string;
    primary: LandingLink;
    secondary: LandingLink;
    metrics: Metric[];
    stages: Stage[];
  };
  paths: {
    eyebrow: string;
    title: string;
    description: string;
    items: PathCard[];
  };
  areas: {
    eyebrow: string;
    title: string;
    description: string;
    items: Area[];
  };
  sources: {
    eyebrow: string;
    title: string;
    description: string;
    items: Source[];
  };
  principle: {
    label: string;
    title: string;
    description: string;
    link: LandingLink;
  };
};

function Arrow(): ReactNode {
  return <span aria-hidden="true">→</span>;
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}): ReactNode {
  return (
    <div className={styles.sectionHeading}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function DocumentationLanding({
  hero,
  paths,
  areas,
  sources,
  principle,
}: DocumentationLandingProps): ReactNode {
  return (
    <div className={styles.landing}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <h1>{hero.title}</h1>
          <p className={styles.heroDescription}>{hero.description}</p>
          <div className={styles.actions}>
            <Link className={styles.primaryAction} to={hero.primary.to}>
              {hero.primary.label}
              <Arrow />
            </Link>
            <Link className={styles.secondaryAction} to={hero.secondary.to}>
              {hero.secondary.label}
            </Link>
          </div>
        </div>

        <div className={styles.flowCard}>
          <div className={styles.flowHeader}>
            <span>Platform flow</span>
            <span className={styles.livePill}>Current model</span>
          </div>
          <ol className={styles.flowList}>
            {hero.stages.map((stage, index) => (
              <li key={stage.label}>
                <span className={styles.flowNumber}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>
                  <strong>{stage.label}</strong>
                  <small>{stage.detail}</small>
                </span>
              </li>
            ))}
          </ol>
          <div className={styles.flowFooter}>
            <span>RBAC</span>
            <span>History</span>
            <span>Scheduling</span>
          </div>
        </div>

        <div className={styles.metrics}>
          {hero.metrics.map((metric) => (
            <div className={styles.metric} key={metric.label}>
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading {...paths} />
        <div className={styles.pathGrid}>
          {paths.items.map((path, index) => (
            <article className={styles.pathCard} data-accent={index + 1} key={path.title}>
              <p className={styles.cardEyebrow}>{path.eyebrow}</p>
              <h3>{path.title}</h3>
              <p>{path.description}</p>
              <div className={styles.cardLinks}>
                {path.links.map((link) => (
                  <Link to={link.to} key={link.to}>
                    {link.label}
                    <Arrow />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <SectionHeading {...areas} />
        <div className={styles.areaGrid}>
          {areas.items.map((area) => (
            <Link className={styles.areaCard} to={area.to} key={area.title}>
              <span className={styles.areaNumber}>{area.number}</span>
              <span className={styles.areaCopy}>
                <strong>{area.title}</strong>
                <small>{area.description}</small>
              </span>
              <Arrow />
            </Link>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.sourcesSection}`}>
        <SectionHeading {...sources} />
        <div className={styles.sourceList}>
          {sources.items.map((source) => (
            <div className={styles.sourceRow} key={source.concern}>
              <span>{source.concern}</span>
              <code>{source.source}</code>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.principle}>
        <p>{principle.label}</p>
        <div>
          <h2>{principle.title}</h2>
          <span>{principle.description}</span>
        </div>
        <Link to={principle.link.to}>
          {principle.link.label}
          <Arrow />
        </Link>
      </section>
    </div>
  );
}
