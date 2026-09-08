---
sidebar_position: 3
---

# Filtering

Filtering is an *optional* step designed to
**exclude sequences that are either irrelevant or potentially confounding**
for downstream analyses, ensuring that only meaningful reads are retained. In
small RNA sequencing, contaminants such as structural RNAs (rRNA, tRNA, snRNA,
snoRNA) or non-genomic artefacts can account for a large fraction of raw reads.
Similarly, reads not originating from the reference genome of interest may
introduce spurious signals if left unfiltered. To address this, the pipeline
provides two complementary filtering modes, both implemented with
[Bowtie](https://bowtie-bio.sourceforge.net/manual.shtml), an
ultrafast, memory-efficient aligner optimized for short reads.

- **Database filtering** (*optional*) removes sequences matching a
user-supplied FASTA database (e.g., rRNA, tRNA, snRNA, snoRNA). Reads that
align to this database are discarded, while unaligned reads are preserved for
further analysis. This step effectively eliminates abundant but non-informative
RNA species, improving the sensitivity of downstream quantification. By default,
alignments are performed with the stringent parameter `-v 0`, which requires
perfect matches, ensuring that only exact contaminants are removed.
- **Genome filtering** (*optional*) ensures that only reads originating from
the target species are retained. Reads are aligned to the reference genome
FASTA provided in the input samplesheet (via the `Genome` column), and
only those mapping to the genome are kept. This guarantees that subsequent
analyses focus on endogenous small RNAs, excluding sequences of ambiguous or
exogenous origin. Here, a more permissive alignment mode is applied
(`-v 2` by default), allowing for limited mismatches to account for biological
variation and sequencing errors.

Both modes are fully **optional** and **independent** — the user may choose to apply
none, one, or both filtering strategies depending on the experimental
design and data characteristics. When enabled, these steps provide a two-tiered
approach that maximizes specificity: first by discarding known contaminants, and
then by confirming the genomic origin of the remaining reads. This careful
curation ensures that downstream quantification and differential expression
analyses are performed on a high-confidence set of small RNA sequences.

:::warning
When using this pipeline for **isomiR annotation**, enabling genome
filtering requires **caution**. Reads not aligning under the chosen mismatch
setting will be discarded, which may include biologically relevant isomiRs.
If genome filtering is applied, adjust the mismatch parameter thoughtfully
to avoid biasing downstream analyses.
:::