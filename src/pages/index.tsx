import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

type HomeTarget = {
  icon: string;
  eyebrow: string;
  title: string;
  description: string;
  to: string;
  linkLabel: string;
};

type HomeFields = {
  homeEyebrow?: string;
  homeTitle?: string;
  homeDescription?: string;
  homePrimaryPath?: string;
  homePrimaryLabel?: string;
  homeSecondaryPath?: string;
  homeSecondaryLabel?: string;
  homeSectionLabel?: string;
  homeSectionTitle?: string;
  homeSectionDescription?: string;
  homeTargets?: HomeTarget[];
};

function TargetIcon({name}: {name: string}): ReactNode {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    strokeWidth: 1.8,
  };

  if (name === 'public') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c2.4 2.5 3.6 5.5 3.6 9S14.4 18.5 12 21c-2.4-2.5-3.6-5.5-3.6-9S9.6 5.5 12 3Z" />
      </svg>
    );
  }

  if (name === 'integration') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <rect x="3" y="4" width="6" height="6" rx="2" />
        <rect x="15" y="14" width="6" height="6" rx="2" />
        <path d="M9 7h4a4 4 0 0 1 4 4v3M15 17h-4a4 4 0 0 1-4-4v-3" />
      </svg>
    );
  }

  if (name === 'support') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <circle cx="12" cy="12" r="9" />
        <circle cx="12" cy="12" r="3" />
        <path d="m5.6 5.6 4.3 4.3m4.2 4.2 4.3 4.3m0-12.8-4.3 4.3m-4.2 4.2-4.3 4.3" />
      </svg>
    );
  }

  if (name === 'architecture') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <rect x="9" y="3" width="6" height="5" rx="1.5" />
        <rect x="3" y="16" width="6" height="5" rx="1.5" />
        <rect x="15" y="16" width="6" height="5" rx="1.5" />
        <path d="M12 8v4M6 16v-2h12v2" />
      </svg>
    );
  }

  if (name === 'operations') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <rect x="3" y="4" width="18" height="6" rx="2" />
        <rect x="3" y="14" width="18" height="6" rx="2" />
        <path d="M7 7h.01M7 17h.01M11 7h6M11 17h6" />
      </svg>
    );
  }

  if (name === 'guide') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22V5.5ZM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22V5.5Z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      <path d="M12 3 4 7v5c0 4.8 3.3 7.8 8 9 4.7-1.2 8-4.2 8-9V7l-8-4Z" />
      <path d="M9 12.2 11.1 14 15 10" />
    </svg>
  );
}

function HomepageHeader({fields}: {fields: HomeFields}): ReactNode {
  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>
            {fields.homeEyebrow ?? 'PAD Platform documentation'}
          </p>
          <Heading as="h1" className={styles.heroTitle}>
            {fields.homeTitle ?? 'Product data operations, documented clearly.'}
          </Heading>
          <p className={styles.heroSubtitle}>
            {fields.homeDescription ??
              'Choose the documentation that matches your work.'}
          </p>
          <div className={styles.buttons}>
            {fields.homePrimaryPath && (
              <Link
                className={styles.primaryButton}
                to={fields.homePrimaryPath}>
                {fields.homePrimaryLabel ?? 'Open documentation'}
                <span aria-hidden="true">→</span>
              </Link>
            )}
            {fields.homeSecondaryPath && (
              <Link
                className={styles.secondaryButton}
                to={fields.homeSecondaryPath}>
                {fields.homeSecondaryLabel ?? 'Browse documentation'}
              </Link>
            )}
          </div>
        </div>
        <div className={styles.workflowPanel} aria-label="PAD Platform data flow">
          <div className={styles.workflowHeader}>Product data lifecycle</div>
          <ol className={styles.workflowList}>
            <li>Acquire source data</li>
            <li>Govern the catalog</li>
            <li>Automate mapping and pricing</li>
            <li>Enrich channel content</li>
            <li>Publish controlled outputs</li>
          </ol>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const fields = siteConfig.customFields as HomeFields;
  const targets = fields.homeTargets ?? [];

  return (
    <Layout title={siteConfig.title} description={fields.homeDescription}>
      <HomepageHeader fields={fields} />
      <main>
        <section className={styles.gatewaySection}>
          <div className={styles.gatewayInner}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionLabel}>
                {fields.homeSectionLabel ?? 'Documentation'}
              </p>
              <Heading as="h2">
                {fields.homeSectionTitle ?? 'Choose where to begin.'}
              </Heading>
              {fields.homeSectionDescription && (
                <p>{fields.homeSectionDescription}</p>
              )}
            </div>
            <div className={styles.targetGrid}>
              {targets.map((target) => (
                <Link className={styles.targetCard} to={target.to} key={target.to}>
                  <span className={styles.targetIcon}>
                    <TargetIcon name={target.icon} />
                  </span>
                  <span className={styles.targetEyebrow}>{target.eyebrow}</span>
                  <Heading as="h3">{target.title}</Heading>
                  <span className={styles.targetDescription}>
                    {target.description}
                  </span>
                  <span className={styles.targetLink}>
                    {target.linkLabel}
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
