---
sidebar_position: 7
---

# Global patterns of DE miRNAs

This step integrates the results of all individual differential expression
analyses into global summary matrices, allowing users to explore broad patterns
of miRNA family regulation across multiple experimental groups. While previous
steps identify significant changes at the level of individual miRNAs within
specific comparisons, this step provides a bird’s-eye view of how entire miRNA
families behave across the full dataset.

The workflow condenses complex results into two complementary perspectives:

- **Presence/absence of DE miRNAs** – Highlights whether a given miRNA family
is implicated in any response within each analysis group.
- **Representative effect sizes** – Captures the direction and magnitude of
the family’s most representative response, providing a quantitative summary
that can be compared across conditions and species.

By structuring results into uniform matrices, the pipeline enables:
- **Pattern discovery** – Detecting families consistently activated or
repressed under certain stresses, tissues, or developmental stages.
- **Cross-comparison** – Directly comparing responses across projects or
species.
- **Downstream integration** – Serving as a standardized input for clustering,
heatmaps, or network-based analyses.

Together, these outputs transform detailed DEA results into a global framework
for interpreting the regulatory roles of miRNA families, bridging the gap
between individual contrasts and large-scale biological insights.