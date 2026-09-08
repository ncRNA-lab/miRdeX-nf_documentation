---
sidebar_position: 2
---

# Trimming

Trimming is a critical step in the preprocessing of sequencing libraries, aimed at improving the overall quality of the dataset before downstream analysis. Raw sequencing reads often contain technical artifacts introduced during library preparation—such as adapter sequences, poly-nucleotide tails, or low-quality bases near the read ends—that can interfere with read mapping and quantification. Additionally, very short or poor-quality reads may lead to biases and false signals if left unfiltered. By systematically removing these unwanted elements, trimming increases both the accuracy of read alignment and the reliability of downstream analyses, such as quantification and differential expression. In the context of small RNA sequencing, where read lengths are short and precision is critical, trimming ensures that only high-confidence reads are retained for further processing.

This stage is implemented using [fastp](https://github.com/OpenGene/fastp), a widely adopted, high-performance FASTQ preprocessor written in C++ with full multithreading support. fastp integrates multiple preprocessing functions into a single tool, providing both speed and consistency. In this pipeline, fastp is configured by default to:

- Trim low-quality bases at both the 5′ and 3′ ends of reads (`--cut_front`, `--cut_right`), using sliding windows of defined size (`--cut_front_window_size 1`, `--cut_right_window_size 4`).
- Trim bases based on the average quality within these windows, using the thresholds defined by `--cut_front_mean_quality 3` and `--cut_right_mean_quality 20`.
- Remove poly-nucleotide tails, such as long homopolymers (`--trim_poly_x`, with `--poly_x_min_len 10`).
- Filter reads by length, discarding reads shorter than the user-defined minimum (`--length_required ${params.trimming_min_len}`) or longer than the maximum (`--length_limit ${params.trimming_max_len}`).
- Exclude ambiguous reads by removing any sequences containing N bases (`--n_base_limit 0`).

These default parameters are chosen to balance sensitivity and stringency, ensuring that downstream analyses are performed exclusively on reads of sufficient quality.