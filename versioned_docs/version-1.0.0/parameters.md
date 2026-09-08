---
sidebar_position: 3
---

# Parameters

## <FAIcon icon="fa-solid fa-terminal" className="fa-1x" /> Input/output options

Define where the pipeline should find input data and save output data.

<div class="table-container">
  <table class="base-table param-table">
    <thead>
      <tr>
        <th>Parameter</th>
        <th>Description</th>
        <th>Info</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <FAIcon icon="fa-solid fa-terminal" />&nbsp;<code>--input</code>
        </td>
        <td>Path to comma-separated file containing information about the samples.</td>
        <td>
          <span class="badge required">Required</span>
          <div><strong>Type:</strong> <code>string</code></div>
          <div><strong>Pattern:</strong> <code>^\S+\.csv$</code></div>
        </td>
      </tr>
      <tr>
        <td>
          <FAIcon icon="fa-solid fa-folder-open" />&nbsp;<code>--outdir</code>
        </td>
        <td>Directory where the results will be saved (absolute paths recommended).</td>
        <td>
          <span class="badge required">Required</span>
          <div><strong>Type:</strong> <code>string</code></div>
          <div><strong>Pattern:</strong> <code>^\S+\.csv$</code></div>
        </td>
      </tr>
      <tr>
        <td>
          <FAIcon icon="fa-solid fa-envelope" />&nbsp;<code>--email</code>
        </td>
        <td>Email address for completion summary.</td>
        <td>
          <div><strong>Type:</strong> <code>string</code></div>
          <div class="scroll-row"><strong>Pattern:</strong> <code>^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$</code></div>
        </td>
      </tr>
    </tbody>
  </table>
</div>

## <FAIcon icon="fa-solid fa-gear" className="fa-1x" /> Execution mode options

Options that define the starting point and scope of the pipeline execution. These options allow partial execution or resumption from intermediate steps.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="scroll-row"><FAIcon icon="fa-solid fa-scissors" />&nbsp;<code>--only_preprocessing</code></div>
      </td>
      <td>Runs only the preprocessing steps — including trimming, validation, and FastQC/MultiQC. Skips quantification, differential expression analysis (DEA), and miRNA annotation.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="scroll-row"><FAIcon icon="fa-solid fa-scissors" />&nbsp;<code>--only_preprocessing_and_counts</code></div>
      </td>
      <td>
        Runs preprocessing and also generates count matrices per analysis group. Additionally, produces a samplesheet to resume from this point using <code>--from_counts</code>.
      </td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-table" />&nbsp;<code>--from_counts</code>
      </td>
      <td>Indicates that the input samplesheet provides paths to raw count tables instead of sequencing libraries. The pipeline starts from the quantification step using these tables.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
  </tbody>
</table>



## <FAIcon icon="fa-solid fa-scissors" className="fa-1x" /> Trimming options

Options to adjust read trimming criteria.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <div class="scroll-row"><FAIcon icon="fa-solid fa-dna" />&nbsp;<code>--trimming_adapters</code></div>
      </td>
      <td>FASTA file with the adapters that must be removed during the trimming process.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-ruler" />&nbsp;<code>--trimming_min_len</code>
      </td>
      <td>Minimum read length.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-ruler" />&nbsp;<code>--trimming_max_len</code>
      </td>
      <td>Maximum read length.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <div><FAIcon icon="fa-solid fa-plus" /> <code>--trimming_custom_args</code></div>
      </td>
      <td>User-defined extra parameters to customize fastp behavior during read trimming.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
  </tbody>
</table>


## <FAIcon icon="fa-solid fa-check" className="fa-1x" /> Validation options

Options to define criteria for validating sequencing libraries and experimental comparisons.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-align-left" />&nbsp;<code>--validation_depth</code>
      </td>
      <td>Minimum read depth required for a sequencing library to be considered valid.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-copy" />&nbsp;<code>--validation_rep</code>
      </td>
      <td>Minimum number of biological replicates needed to validate a comparison (e.g., control vs treated).</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
  </tbody>
</table>

## <FAIcon icon="fa-solid fa-filter" className="fa-1x" /> Filtering options

Options to configure filtering of sequencing reads based on database or genome alignment criteria.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-database" />&nbsp;<code>--filt_db</code>
      </td>
      <td>Path to the FASTA file used to remove sequences from the libraries. Database-based filtering is only performed if this file is provided.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-dna" />&nbsp;<code>--filt_genome</code>
      </td>
      <td>Indicates whether the libraries are aligned to the species genome.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="scroll-row"><FAIcon icon="fa-solid fa-plus" />&nbsp;<code>--bowtie_filt_db_ext_args</code></div>
      </td>
      <td>Additional parameters to pass to Bowtie for database filtering.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="scroll-row"><FAIcon icon="fa-solid fa-plus" />&nbsp;<code>--bowtie_filt_genome_ext_args</code></div>
      </td>
      <td>Additional parameters to pass to Bowtie for genome filtering.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
  </tbody>
</table>

## <FAIcon icon="fa-solid fa-table" className="fa-1x" /> Quantification options

Parameters related to the quantification of sequencing reads and filtering based on count thresholds.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-angle-down" />&nbsp;<code>--min_counts</code>
      </td>
      <td>Minimum number of counts required for a sequence to be considered.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-copy" />&nbsp;<code>--min_samples</code>
      </td>
      <td>Minimum number of samples in which the sequence must meet the min_counts threshold to avoid being filtered out.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="scroll-row"><FAIcon icon="fa-solid fa-sd-card" />&nbsp;<code>--counts_not_memory</code></div>
      </td>
      <td>Indicates whether the SQLite database used to generate the count matrices should not be loaded into memory. This will result in higher memory usage but better performance.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-table" />&nbsp;<code>--calculate_rpm</code>
      </td>
      <td>Indicates whether to calculate reads per million (RPM).</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
  </tbody>
</table>


## <FAIcon icon="fa-solid fa-chart-simple" className="fa-1x" /> Differential expression analysis options

Options related to exploratory analysis (EA) and subsequent differential expression analysis (DEA).

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-less-than-equal" />&nbsp;<code>--ea_p_value</code>
      </td>
      <td>P-value threshold for Mann–Whitney–Wilcoxon tests used to assess whether sample groups are spatially separated in PCA.</td>
      <td>
        <div><strong>Type:</strong> <code>number</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-less-than-equal" />&nbsp;<code>--dea_alpha</code>
      </td>
      <td>Significance level (alpha) used for determining statistical significance in DEA.</td>
      <td>
        <div><strong>Type:</strong> <code>number</code></div>

      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-greater-than-equal" />&nbsp;<code>--log2fc_threshold</code>
      </td>
      <td>A non-negative value that specifies a log2FC threshold.</td>
      <td>
        <div><strong>Type:</strong> <code>number</code></div>
      </td>
    </tr>
  </tbody>
</table>

## <FAIcon icon="fa-solid fa-magnifying-glass" className="fa-1x" /> miRNA/isomiR annotation options

Options for miRNA annotation of differentially expressed sequences through curated databases and specific criteria.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-database" />&nbsp;<code>--databases</code>
      </td>
      <td>Comma-separated string indicating the databases to use for miRNA identification and their order of preference.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
        <div class="scroll-row"><strong>Pattern:</strong> <code>^[A-Za-z0-9_]+(,[A-Za-z0-9_]+)*$</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-list-ul" />&nbsp;<code>--mirna_classes</code>
      </td>
      <td>Comma-separated string specifying which miRNA classes or variants will be considered during the annotation process.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-arrows-rotate" />&nbsp;<code>--substitutions</code>
      </td>
      <td>Maximum number of allowed internal substitutions (not at sequence ends).</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-backward-step" />&nbsp;<code>--five_add</code>
      </td>
      <td>Maximum number of non-templated nucleotides allowed at the 5′ end.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-forward-step" />&nbsp;<code>--three_add</code>
      </td>
      <td>Maximum number of non-templated nucleotides allowed at the 3′ end.</td>
      <td>
        <div><strong>Type:</strong> <code>integer</code></div>

      </td>
    </tr>
  </tbody>
</table>

## <FAIcon icon="fa-solid fa-globe" className="fa-1x" /> Global patterns of DE miRNAs options

Options for generating global summary matrices that capture the behavior of differentially expressed miRNA families across all experimental conditions.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-table" />&nbsp;<code>--global_matrix</code>
      </td>
      <td>Boolean specifying whether to generate presence/absence and log2FC matrices of miRNAs based on the results of the contrasted comparisons in the differential expression analyses.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-table" />&nbsp;<code>--global_fields</code>
      </td>
      <td>Comma-separated list of metadata fields used to generate comparison identifiers.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
        <div class="scroll-row"><strong>Pattern:</strong> <code>^[A-Za-z0-9_]+(,[A-Za-z0-9_]+)*$</code></div>
      </td>
    </tr>
  </tbody>
</table>

## <FAIcon icon="fa-solid fa-forward" /> Process skipping options

Options to skip various steps within the workflow.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-forward" />&nbsp;<code>--skip_trimming</code>
      </td>
      <td>Skip trimming. Use this option only if the input libraries have already been trimmed and contain only clean reads composed exclusively of A, C, G, and T bases.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-forward" />&nbsp;<code>--skip_fastqc</code>
      </td>
      <td>Skip FastQC quality control.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-forward" />&nbsp;<code>--skip_multiqc</code>
      </td>
      <td>Skip MultiQC report generation.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-forward" />&nbsp;<code>--skip_qc_trim</code>
      </td>
      <td>Skip FastQC and MultiQC on trimmed reads.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-forward" />&nbsp;<code>--skip_annotation</code>
      </td>
      <td>Skip miRNA annotation of differentially expressed sequences.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
  </tbody>
</table>


## <FAIcon icon="fa-solid fa-gear" className="fa-1x" /> Generic options

General parameters for pipeline configuration and metadata.

<table class="base-table param-table">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
      <th>Info</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-tag" />&nbsp;<code>--version</code>
      </td>
      <td>Display version and exit.</td>
      <td>
        <div><strong>Type:</strong> <code>boolean</code></div>
      </td>
    </tr>
    <tr>
      <td>
        <FAIcon icon="fa-solid fa-gear" />&nbsp;<code>--custom_config</code>
      </td>
      <td>Path to an additional Nextflow configuration file to override or extend the default pipeline settings.</td>
      <td>
        <div><strong>Type:</strong> <code>string</code></div>
      </td>
    </tr>
  </tbody>
</table>