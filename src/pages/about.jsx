import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './about.module.css';
import MirnaAgoLight from '@site/static/img/miRNA_ago.svg';
import MirnaAgoDark from '@site/static/img/miRNA_ago_dark.svg';

const features = [
  {
    icon: '⧉',
    title: 'Multiple datasets in one run',
    description:
      'Process a single small RNA dataset or scale up to analyze multiple runs and conditions simultaneously. One command handles everything.',
  },
  {
    icon: '⌥',
    title: 'End-to-end automation',
    description:
      'Go from automated data retrieval and QC to miRNA annotation, quantification, and DESeq2 differential expression analysis without gluing ad hoc scripts together.',
  },
  {
    icon: '⟳',
    title: 'Nextflow-native orchestration',
    description:
      'Built on Nextflow DSL2. The engine automatically manages task concurrency and hardware resource allocation, maximizing performance without manual scheduling.',
  },
  {
    icon: '⚁',
    title: 'Portable environments',
    description:
      'Run the pipeline on your local computer or scale up to HPC clusters with full support for Docker, Singularity, and Conda.',
  },
];

export default function About() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title="About" description="About miRdeX-nf">
      <main className={styles.main}>

        {/* ── HERO ── */}
        <section className={styles.hero}>

          <div className={styles.heroBackdrop} />

          <div className={styles.heroMinimal}>

            <div className={styles.heroAbout}>
              About
            </div>

            <div className={styles.heroLogoWrap}>
              <img
                src={useBaseUrl('/img/logo.svg')}
                alt="miRdeX-nf logo"
                className={`${styles.heroLogoLarge} ${styles.lightOnly}`}
              />

              <img
                src={useBaseUrl('/img/logo_dark.svg')}
                alt="miRdeX-nf logo"
                className={`${styles.heroLogoLarge} ${styles.darkOnly}`}
              />
            </div>

          </div>

          <div className={styles.heroDivider} />

        </section>

        {/* ── MOTIVATION ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={styles.splitLayout}>

              <div className={styles.splitText}>
                <div className={styles.sectionLabel}>Background</div>

                <h2 className={styles.sectionTitle}>
                  The Story Behind the Pipeline
                </h2>

                <div className={styles.prose}>
                  <p>
                    miRdeX-nf was conceived during a PhD project focused on
                    uncovering global patterns of miRNA-mediated stress
                    responses in plants. While microRNAs are recognized as key
                    regulators of plant adaptation, most current knowledge remains
                    fragmented, deriving from species- or stress-specific studies.
                    The growing availability of public small RNA sequencing data
                    offered an unprecedented opportunity to explore these regulatory
                    networks at scale and understand how they evolved across different
                    plant lineages.
                  </p>

                  <p>
                    However, integrating dozens of independent public studies — each
                    with its own experimental design, sequencing depth, and technical
                    variability — quickly became a major bottleneck. Processing
                    these massive datasets one by one using ad hoc scripts was not
                    only time-consuming, but also prone to inconsistency and highly
                    difficult to reproduce.
                  </p>

                  <p>
                    To address these challenges, miRdeX-nf was developed as a
                    dedicated, automated workflow that unifies the entire
                    analysis process — from data retrieval and preprocessing
                    to quantification and differential expression — into a
                    single, scalable, and reproducible framework, turning massive
                    public data into consistent biological insights.
                  </p>
                </div>
              </div>

              <div className={`${styles.floatImgWrap} ${styles.mirnaFigureWrap}`}>
                <div className={styles.mirnaFigureCard}>
                  <MirnaAgoLight
                    className={`${styles.mirnaFigure} light-mode-only`}
                    role="img"
                    aria-label="miRNA-AGO complex illustration"
                  />

                  <MirnaAgoDark
                    className={`${styles.mirnaFigure} dark-mode-only`}
                    role="img"
                    aria-label="miRNA-AGO complex illustration"
                  />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── KEY FEATURES ── */}
        <section className={styles.featuresSection}>
          <div className={styles.sectionInner}>

            <div className={styles.featuresHeader}>
              <div className={styles.sectionLabel}>Features</div>

              <h2 className={styles.sectionTitle}>
                Pipeline design and core capabilities
              </h2>
            </div>

            <div className={styles.featuresGrid}>
              {features.map((f, i) => (
                <div key={i} className={styles.featureCard}>
                  <span
                    className={styles.featureIcon}
                    aria-hidden="true"
                  >
                    {f.icon}
                  </span>

                  <h3 className={styles.featureTitle}>
                    {f.title}
                  </h3>

                  <p className={styles.featureDesc}>
                    {f.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── THE LAB ── */}
        <section className={styles.section}>
          <div className={styles.sectionInner}>
            <div className={`${styles.splitLayout} ${styles.splitReverse}`}>

              <div className={`${styles.floatImgWrap} ${styles.labFigureWrap}`}>
                <div className={styles.labFigureCard}>
                  <img
                    src={useBaseUrl('/img/lab_photo.jpg')}
                    alt="ncRNA-lab research group"
                    className={styles.labFigure}
                  />
                </div>
              </div>

              <div className={styles.splitText}>
                <div className={styles.sectionLabel}>
                  Research group
                </div>

                <h2 className={styles.sectionTitle}>
                  The ncRNA-lab
                </h2>

                <div className={styles.prose}>
                  <p>
                    This pipeline was born at the ncRNA-lab. Here, we focus on deciphering the regulatory pathways mediated by non-coding RNAs to better understand the molecular mechanisms that allow crops to respond and adapt to biotic and abiotic stress conditions.
                  </p>

                  <p>
                    miRdeX-nf is the product of an interdisciplinary
                    environment built on daily collaboration between
                    experimental and computational researchers, aiming
                    to standardize our data workflows and bring robust
                    analysis to our daily research.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

      {/* ── CREDITS ── */}
      <section className={`${styles.section} ${styles.lastSection}`}>
        <div className={styles.sectionInner}>

          <div className={styles.assetCredits}>
            miRNA illustration adapted from Wikimedia Commons material
            licensed under{' '}
            <a
              href="https://creativecommons.org/licenses/by/3.0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CC BY 3.0
            </a>.
            Modified from the original.
          </div>

        </div>
      </section>

      </main>
    </Layout>
  );
}