import type {ReactNode} from 'react';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  label: string;
  description: ReactNode;
  items: string[];
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Customer Help Center',
    label: 'Public',
    description: (
      <>
        Task-based guides for users working with catalog data, imports,
        mappings, pricing, channels, exports, roles, and troubleshooting.
      </>
    ),
    items: ['Catalog workflows', 'Import diagnostics', 'Export readiness'],
  },
  {
    title: 'Integration Reference',
    label: 'Public when enabled',
    description: (
      <>
        Customer-safe API and export-format documentation for supported
        external integrations.
      </>
    ),
    items: ['Authentication', 'Export formats', 'Error contracts'],
  },
  {
    title: 'Troubleshooting',
    label: 'Public',
    description: (
      <>
        Practical checks for common user-facing issues such as failed imports,
        missing prices, empty exports, and access problems.
      </>
    ),
    items: ['Import errors', 'Access issues', 'Export readiness'],
  },
];

function Feature({title, label, description, items}: FeatureItem) {
  return (
    <article className={styles.featureCard}>
      <div className={styles.featureLabel}>{label}</div>
      <div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className={styles.inner}>
        <div className={styles.sectionHeader}>
          <span>Documentation areas</span>
          <Heading as="h2">Built for the people who actually use each layer.</Heading>
          <p>
            Public documentation stays focused on tasks, safe integrations, and
            common operational questions.
          </p>
        </div>
        <div className={styles.grid}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
