---
sidebar_position: 1
---

# Data download

Among the possible input modes, one option is to provide an accession list
(a simple text file with one identifier per row). In this scenario, the
pipeline starts by retrieving the raw sRNA-seq libraries from the NCBI
[Sequence Read Archive (SRA)](https://www.ncbi.nlm.nih.gov/sra). The SRA is
the largest public repository of next-generation sequencing data
and stores both the raw sequencing files and associated metadata describing
species, tissues, treatments, and experimental conditions. Downloading data
from the SRA provides a straightforward way to obtain publicly available
sequencing libraries, which can be particularly useful for integrating
external datasets into new analyses.

This process relies on two utilities from the [SRA Toolkit](https://github.com/ncbi/sra-tools):

- **prefetch**: retrieves the `.sra` files corresponding to the accession identifiers in the input list. During transfer, the tool verifies checksums to ensure data integrity.
- **fasterq-dump**: converts the `.sra` files into the widely used FASTQ format.

Each sequencing library listed in the accession file is thus converted into a
compressed FASTQ file (`*.fastq.gz`), which constitutes the starting point for
downstream quality control and preprocessing.

:::info
If the pipeline input consists of raw sequencing libraries already available in FASTQ format, this stage is skipped, and the workflow begins directly at the trimming and quality control steps.
:::