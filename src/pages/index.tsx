import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title gradient-text">
          {siteConfig.title}
        </h1>
        <p className="hero__subtitle">
          {siteConfig.tagline}
        </p>
        <p className="hero__description">
          Documentation complète et approfondie de l'écosystème Genesis AI - 
          Orchestration distribuée de workflows AI avec 12 projets interconnectés.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/introduction/overview">
            🚀 Commencer
          </Link>
          <Link
            className="button button--secondary button--lg margin-left--md"
            to="/docs/api-reference/overview">
            📡 API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageQuickLinks() {
  return (
    <section className={styles.quickLinks}>
      <div className="container">
        <div className="row">
          <div className="col col--3">
            <div className="card glass-card">
              <div className="card__header">
                <h3>📦 igon7 Engine</h3>
              </div>
              <div className="card__body">
                <p>Moteur d'orchestration de workflows DAG avec 304+ noeuds</p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--primary button--block"
                  to="/docs/igon7-engine/overview">
                  Voir la doc →
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card glass-card">
              <div className="card__header">
                <h3>🧠 Genesis Nexus</h3>
              </div>
              <div className="card__body">
                <p>Cerveau central avec protocole A2A et routage neural</p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--primary button--block"
                  to="/docs/genesis-nexus/overview">
                  Voir la doc →
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card glass-card">
              <div className="card__header">
                <h3>🛡️ Clisis Agent</h3>
              </div>
              <div className="card__body">
                <p>Agent système avec Guardian Layer 4 couches</p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--primary button--block"
                  to="/docs/clisis-agent/overview">
                  Voir la doc →
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--3">
            <div className="card glass-card">
              <div className="card__header">
                <h3>⏱️ Genesis Temporal</h3>
              </div>
              <div className="card__body">
                <p>Workflows durables avec couche CHASM personnalisée</p>
              </div>
              <div className="card__footer">
                <Link
                  className="button button--primary button--block"
                  to="/docs/genesis-temporal/overview">
                  Voir la doc →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomepageFeatures() {
  const features = [
    {
      title: '🔐 Zero-Knowledge',
      description: 'Chiffrement de bout en bout avec AES-256-GCM',
      icon: '🔐',
    },
    {
      title: '🤖 Multi-Agents',
      description: '12 projets interconnectés avec protocole A2A',
      icon: '🤖',
    },
    {
      title: '⚡ Workflows Durables',
      description: 'Exécution garantie avec Temporal et igon7',
      icon: '⚡',
    },
    {
      title: '🎨 Glassmorphism UI',
      description: 'Interface premium avec design system unifié',
      icon: '🎨',
    },
    {
      title: '📊 Monitoring',
      description: 'Prometheus, Grafana et tracing distribués',
      icon: '📊',
    },
    {
      title: '🚀 Production-Ready',
      description: 'Kubernetes, Terraform et CI/CD automatisés',
      icon: '🚀',
    },
  ];

  return (
    <section className={styles.features}>
      <div className="container">
        <h2 className={styles.featuresTitle}>Pourquoi Genesis AI ?</h2>
        <div className="row">
          {features.map((feature, idx) => (
            <div key={idx} className="col col--4 margin-bottom--lg">
              <div className="card glass-card text--center">
                <div className="card__header">
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                </div>
                <div className="card__body">
                  <p>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title="Documentation Officielle"
      description="Documentation complète de l'écosystème Genesis AI - Orchestration distribuée de workflows AI">
      <HomepageHeader />
      <main>
        <HomepageQuickLinks />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
