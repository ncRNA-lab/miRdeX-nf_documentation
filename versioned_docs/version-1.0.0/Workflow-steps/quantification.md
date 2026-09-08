---
sidebar_position: 4
---

# Quantification
Quantification is the stage in which the abundance of small RNAs is
measured, transforming raw sequencing reads into count data suitable for
statistical analysis. Unlike mRNA-seq, where partial alignments to genes are
sufficient, small RNAs such as miRNAs are typically sequenced in full. This
means that **each read corresponds directly to a complete small RNA molecule**,
allowing quantification to be performed without the need for a mandatory
alignment step. Instead, the pipeline simply counts the frequency of each
unique sequence across the dataset.

This strategy offers two major advantages: first, it avoids potential biases
introduced by forcing sequences to align to a reference at this stage; second,
it provides a comprehensive, reference-free representation of the small RNA
population, which is particularly valuable for capturing novel sequences or
isomiRs. To facilitate comparison across libraries, counts can also be
normalized to Reads Per Million (RPM), scaling raw counts by the total
sequencing depth of each library.

Quantification is performed at two levels:

- **Per-library level** - For every sequencing library, the pipeline generates
a TSV file reporting the counts of all unique sequences detected in that library.
- **Analysis-group level** - Counts from individual libraries belonging to the
same analysis group (as defined in the samplesheet metadata) are merged into
a single count matrix. Each row represents a unique sequence, and each column
corresponds to a sample within the group. These matrices serve as the direct
input for downstream **Differential Expression Analysis (DEA)**.

By combining per-library profiles with group-specific matrices, the pipeline
ensures both granularity and comparability: users can examine the detailed
composition of individual libraries or immediately proceed to statistical
comparisons across experimental conditions.