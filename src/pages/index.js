import React from "react";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import styles from "./index.module.css";

import LogoLight from "@site/docs/img/logo.svg";
import LogoDark from "@site/docs/img/logo_dark.svg";
import PipelineLight from "@site/docs/img/mirdex_metromap_wo_logo.svg";
import PipelineDark from "@site/docs/img/mirdex_metromap_dark_wo_logo.svg";

export default function Home() {
  return (
    <Layout
      title="Home"
      description="A Nextflow pipeline for automated microRNA differential expression analysis."
    >
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.left}>
            <div className={styles.logoWrap} aria-hidden="true">
              <LogoLight className={`${styles.logo} light-mode-only`} />
              <LogoDark className={`${styles.logo} dark-mode-only`} />
            </div>

            <p className={styles.tagline}>
              A Nextflow pipeline for automated microRNA differential expression analysis.
            </p>
            <div className={styles.buttonRow}>
              <Link className={styles.getStarted} to="/docs/getting_started">
                <span className={styles.getStartedCircle}>
                  <span className={`${styles.getStartedIcon} ${styles.getStartedArrow}`} />
                </span>
                <span className={styles.getStartedText}>GET STARTED</span>
              </Link>
            </div>
          </div>

          <div className={styles.right} aria-label="Pipeline diagram">
            {/* Versión clara */}
            <PipelineLight className={`${styles.pipeline} light-mode-only`} />

            {/* Versión oscura */}
            <PipelineDark className={`${styles.pipeline} dark-mode-only`} />
          </div>
        </section>
      </main>
    </Layout>
  );
}
