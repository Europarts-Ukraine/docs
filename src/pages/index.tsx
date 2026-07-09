import type {ReactNode} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const customFields = siteConfig.customFields as {
    homePrimaryPath?: string;
    homePrimaryLabel?: string;
    homeSecondaryPath?: string;
    homeSecondaryLabel?: string;
  };

  return (
    <header className={styles.hero}>
      <div className={styles.heroInner}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>BAS Platform documentation</p>
          <Heading as="h1" className={styles.heroTitle}>
            Product data operations, documented clearly.
          </Heading>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={styles.primaryButton}
              to={customFields.homePrimaryPath ?? '/docs/public/intro'}>
              {customFields.homePrimaryLabel ?? 'Open documentation'}
            </Link>
            <Link
              className={styles.secondaryButton}
              to={customFields.homeSecondaryPath ?? '/docs/public/imports'}>
              {customFields.homeSecondaryLabel ?? 'Start with imports'}
            </Link>
          </div>
        </div>
        <div className={styles.workflowPanel} aria-label="BAS Platform data flow">
          <div className={styles.workflowHeader}>Core data flow</div>
          <ol className={styles.workflowList}>
            <li>Sources and supplier feeds</li>
            <li>Imports and validation</li>
            <li>Catalog, PIM, and mapping</li>
            <li>Pricing and enrichment</li>
            <li>Channels and exports</li>
          </ol>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description="BAS Platform documentation">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <section className={styles.splitSection}>
          <div className={styles.splitInner}>
            <div>
              <p className={styles.sectionLabel}>Documentation model</p>
              <Heading as="h2">One source, two publishing targets.</Heading>
            </div>
            <div className={styles.targetGrid}>
              <article className={styles.targetCard}>
                <h3>Help Center</h3>
                <p>
                  Guides for product, catalog, import, pricing, channel, export,
                  permission, history, and troubleshooting workflows.
                </p>
              </article>
              <article className={styles.targetCard}>
                <h3>Integrations</h3>
                <p>
                  Customer-safe reference material for supported API usage,
                  authentication, export formats, and external data exchange.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
