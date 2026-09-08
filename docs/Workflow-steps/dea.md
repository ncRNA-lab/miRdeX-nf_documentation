---
sidebar_position: 5
---

# Differential Expression Analysis

Differential Expression Analysis (DEA) asks a simple question:
**which small RNAs change their expression between conditions?** Given a matrix
of raw counts (features × samples) and a table describing each sample
(the metadata), DEA estimates how strongly each feature increases or decreases
under different experimental settings and whether those changes are likely to
be real rather than noise.

In miRdeX-nf, DEA is performed with DESeq2, which models counts using a
negative binomial generalized linear model. DESeq2 first normalizes for
library size/composition, estimates feature-wise dispersion, and then fits a
model defined by a user-specified design formula
(e.g., ~ Treatment, ~ Batch + Treatment, or ~ A + B + A:B for interactions).

**What you get from DEA**

- **Effect size** - A log2 fold change (log2FC) for each contrast (how much
higher/lower a feature is in one condition vs another).
- **Statistical evidence** - A test statistic and adjusted p-value (FDR) controlling
for multiple testing.
- **Quality-control views** -  Variance-stabilized or rlog-transformed data for PCA,
clustering, and MA plots to assess signal vs. noise.

**How designs and contrasts work**

The design formula tells the model which factors explain expression (e.g.,
Treatment, Time, Batch) and whether to include interactions (when the effect
of one factor depends on another). From the fitted model, you extract
comparisons using contrasts—for instance, “cold vs None,” or an interaction
term like “(cold at 12h) vs (None at 12h).” The pipeline lets you declare the
reference level(s) so results are always interpretable (e.g., effects relative
to the control).

**Choosing a test: Wald vs LRT**
- **Wald test** - Evaluates individual model coefficients—ideal for specific
pairwise comparisons or particular interaction terms.
- **Likelihood Ratio Test (LRT)** - Compares a full model to a reduced
one—ideal for asking global questions like “does `Time` (as a whole) matter?”
or “does the interaction `A:B` improve the model?”

**Good practice and common pitfalls**

- Use biological replicates (≥3 per group is a good rule of thumb).
- Provide raw counts (not TPM/CPM) to the model.
- Include known confounders (e.g., `Batch`) in the design to avoid spurious hits.
- Prefer interpreting FDR (adjusted p-values) over raw p-values.
- Consider shrinkage of log2FC for more stable ranking in noisy or low-count features.

## Configuring DEA

This section explains **how to configure a DEA using the project’s metadata table**. Users specify the design formula, statistical test, reference levels, and contrasts directly in the metadata, allowing the pipeline to adapt automatically to a wide range of experimental designs—from simple two-group comparisons to complex multi-factor or nested analyses.

Each of the examples below represents a specific type of design, ranging from the simplest (one factor with two levels) to more advanced models (interaction terms, nested designs, and LRT tests). For each case, we provide:

- A short explanation of the design and its interpretation.
- A minimal example of how the metadata table should be structured.
  
By following these examples, users can better understand how to correctly structure their metadata and take full advantage of the pipeline’s capabilities to perform reproducible and robust differential expression analyses.

### DEA using a design formula (Wald test)

To perform differential expression analysis with DESeq2, a common approach is to define an experimental design using an R formula. This formula (e.g., `~ condition`) specifies the variables that will be used to model the data and estimate expression changes. The formula must begin with a tilde (`~`) followed by the relevant factors separated by plus signs. These factors should correspond to columns in the metadata table, such as treatment groups (`Treatment`), treatment levels (`Level`), or time points (`Time`). This formula instructs DESeq2 on how to model the data based on the experimental variables to identify significant changes between groups.

Differential expression analysis using a design formula requires the utilization of the `Test`, `Design`, and `DesignRef` columns from the metadata table:

<table class="base-table dea-one-row-third-column">
  <thead>
    <tr>
      <th>Column</th>
      <th>Description</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>Test</code></td>
      <td>Specifies the statistical test to be applied, such as the Wald test or the Likelihood Ratio Test (LRT).</td>
      <td>Wald or LRT</td>
    </tr>
    <tr>
      <td><code>Design</code></td>
      <td>Defines the design formula used for modeling the data.</td>
      <td><code>~ Condition</code></td>
    </tr>
    <tr>
      <td><code>DesignRef</code></td>
      <td>Indicates the baseline level for each factor included in the formula, serving as the reference point for comparisons.</td>
      <td><code>Condition(None)</code></td>
    </tr>
  </tbody>
</table>

The following sections illustrate practical examples of experimental designs involving different combinations of factors and levels. These examples are intended to demonstrate how the design formula and associated metadata columns (`Test`, `Design`, and `DesignRef`) can be adapted to match specific biological questions and the structure of the dataset.

#### One Factor, Two Levels

In many experiments, samples are grouped by a key characteristic called factor, which has different categories called levels. For example, a factor could be `Treatment`, with levels like cold and None (non-treated), or `Time`, with levels such as 0h and 12h. Comparing two levels of a single factor is the simplest form of differential expression analysis.

In this case, the goal is to compare two experimental conditions using a single categorical variable, such as `Treatment` with levels cold and None (baseline).

- **Design formula**: `~ Treatment`
- **Test type**: Wald (default)
- **Baseline**: None

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Level</th>
        <th>Time</th>
        <th>Cultivar</th>
        <th>Tissue</th>
        <th>Stage</th>
        <th>Genotype</th>
        <th>Batch</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRef</th>
        <th>DesignRed</th>
        <th>Contrast</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>cold</td>
        <td>1</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>cold</td>
        <td>2</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>cold</td>
        <td>3</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>None</td>
        <td>1</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample5</td>
        <td>None</td>
        <td>2</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample6</td>
        <td>None</td>
        <td>3</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
    </tbody>
  </table>
</div>


#### One Factor, Three or More Levels

This case is quite similar to *One Factor, Two Levels*, but here the single factor includes three or more distinct levels. For example, the factor might be `Time`, with levels like `0h`, `6h`, and `12h`. In this setup, each level is compared individually in a pairwise manner against a baseline level within the same analysis.

- **Design formula**: `~ Time`
- **Test type**: Wald (default)
- **Baseline**: 0h

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Level</th>
        <th>Time</th>
        <th>Cultivar</th>
        <th>Tissue</th>
        <th>Stage</th>
        <th>Genotype</th>
        <th>Batch</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRef</th>
        <th>DesignRed</th>
        <th>Contrast</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>None</td>
        <td>1</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>None</td>
        <td>2</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>None</td>
        <td>3</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>cold</td>
        <td>1</td>
        <td>L.0</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample5</td>
        <td>cold</td>
        <td>2</td>
        <td>L.0</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample6</td>
        <td>cold</td>
        <td>3</td>
        <td>L.0</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample7</td>
        <td>cold</td>
        <td>1</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample8</td>
        <td>cold</td>
        <td>2</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample9</td>
        <td>cold</td>
        <td>3</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
    </tbody>
  </table>
</div>


#### Two Factors with Interaction

Sometimes experiments involve studying the effect of two different factors simultaneously, for example `Treatment` and `Time`. Each factor can have multiple levels, and the combined effect of these factors may not be simply additive but interactive. An interaction means that the effect of one factor depends on the level of the other factor. Modeling this interaction allows detecting sRNAs whose expression changes differently depending on the combination of factor levels, rather than just the individual effects of each factor.

For example, you might want to know if the effect of Treatment (e.g., cold vs None) differs at different time points (0h, 6h, 12h). In this case, the design formula includes both factors and their interaction term: `~ Treatment + Time + Treatment:Time`. Since there are two factors, the `DesignRef` column specifies the baseline level of each factor, separating them with a colon (`:`). For instance: `Treatment(None):Time(0h)` indicates that the baseline is 'None' for `Treatment` and '0h' for `Time`.

- **Design formula**: `~ Treatment + Time + Treatment:Time`
- **Test type**: Wald
- **Baseline**: Treatment = None, Time = 0h

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Level</th>
        <th>Time</th>
        <th>Cultivar</th>
        <th>Tissue</th>
        <th>Stage</th>
        <th>Genotype</th>
        <th>Batch</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRef</th>
        <th>DesignRed</th>
        <th>Contrast</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>None</td>
        <td>1</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>None</td>
        <td>2</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>None</td>
        <td>3</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>cold</td>
        <td>1</td>
        <td>L.0</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample5</td>
        <td>cold</td>
        <td>2</td>
        <td>L.0</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample6</td>
        <td>cold</td>
        <td>3</td>
        <td>L.0</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample7</td>
        <td>cold</td>
        <td>1</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample8</td>
        <td>cold</td>
        <td>2</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample9</td>
        <td>cold</td>
        <td>3</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>Treatment(None):Time(0h)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
    </tbody>
  </table>
</div>


### DEA using a design formula and custom contrast (Wald test)

In some experiments, you may want to test specific hypotheses that are not captured by the default coefficients of the model. This is particularly useful when you want to compare specific levels of a factor that are not directly adjacent in the design formula, or when you want to test combined effects of multiple conditions or levels that require a custom comparison. In these cases, the pipeline allows the use of **custom contrasts** to extract the relevant comparisons from the fitted DESeq2 model. This approach provides flexibility to test hypotheses beyond simple pairwise comparisons defined by the model coefficients.

To perform differential expression analysis using a custom contrast, the pipeline uses the metadata columns `Test`, `Design`, `DesignRef`, and `Contrast`:

<div>
  <table class="base-table dea-one-row-third-column">
    <thead>
      <tr>
        <th>Column</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><code>Test</code></td>
        <td>Specifies the statistical test to apply (Wald test in this case).</td>
        <td>Wald</td>
      </tr>
      <tr>
        <td><code>Design</code></td>
        <td>Defines the full design formula modeling all relevant factors.</td>
        <td><code>~ Time</code></td>
      </tr>
      <tr>
        <td><code>DesignRef</code></td>
        <td>Indicates the baseline level for each factor, serving as the reference point for comparisons.</td>
        <td><code>Time(0h)</code></td>
      </tr>
      <tr>
        <td><code>Contrast</code></td>
        <td>Specifies the specific comparison of interest, which can include combinations or differences of factor levels.</td>
        <td><code>(50h&12hreinf − 0h) − ((50h − 0h) + (12h − 0h))</code></td>
      </tr>
    </tbody>
  </table>
</div>


#### One Factor with Custom Contrast 

In this example, we illustrate the use of a custom contrast for a single factor with multiple levels. The goal is to test whether the combined effect of two specific conditions differs from the sum of their individual effects, which can reveal potential interactions or synergy that are not captured by standard pairwise comparisons. Here, the factor of interest is `Time`, with levels `0h`, `12h`, `50h`, and Superinfection (`50h&12hreinf`). The custom contrast compares the combined level `50h&12hreinf` against what would be expected from adding the individual effects of `50h` and `12h` relative to `0h`.

The following metadata and design setup show how this contrast is specified in the pipeline, using `Wald` as the statistical test and `Time(0h)` as the baseline. The `Contrast` column defines the specific comparison of interest:

- **Design formula**: `~ Time`
- **Test type**: Wald (default)
- **Baseline**: 0h
- **Contrast**: `(50h&12hreinf − 0h) − ((50h − 0h) + (12h − 0h))`

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Level</th>
        <th>Time</th>
        <th>Cultivar</th>
        <th>Tissue</th>
        <th>Stage</th>
        <th>Genotype</th>
        <th>Batch</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRef</th>
        <th>DesignRed</th>
        <th>Contrast</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample1</td>
        <td>None</td>
        <td>1</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample2</td>
        <td>None</td>
        <td>2</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample3</td>
        <td>None</td>
        <td>3</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample4</td>
        <td>vir</td>
        <td>1</td>
        <td>L.0</td>
        <td>50h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample5</td>
        <td>vir</td>
        <td>2</td>
        <td>L.0</td>
        <td>50h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample6</td>
        <td>vir</td>
        <td>3</td>
        <td>L.0</td>
        <td>50h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample7</td>
        <td>vir</td>
        <td>1</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample8</td>
        <td>vir</td>
        <td>2</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>sample9</td>
        <td>vir</td>
        <td>3</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>TS.0</td>
        <td>50h</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Time</code></td>
        <td><code>Time(0h)</code></td>
        <td>DR.0</td>
        <td><code>(50h&12hreinf - 0h) - ((50h - 0h) + (12h - 0h))</code></td>
      </tr>
    </tbody>
  </table>
</div>


#### Three Factors with Nesting

When one factor is nested within another, it means that the levels of the nested
factor are specific to (and only occur within) certain levels of the main factor.
In other words, each level of the nested factor belongs exclusively to one level
of the higher order factor and does not appear elsewhere.

For example, imagine a study with three factors: developmental stage (with levels
"V1" and "D1"), tissue type (with levels "leaves" and "roots"), and time (with
levels "0h" and "6h"). Suppose that leaves are only sampled at stage V1, and roots
are only sampled at stage D1. In this case, tissue type is nested within developmental
stage, because each tissue type is unique to a specific stage.

This nesting structure has important implications for the experimental design
and statistical analysis. Since tissue type depends on developmental stage,
both factors must be included in the model along with their interaction with
time. This allows the model to capture differences in sRNA expression across
stages, tissues, and times, as well as how the effect of time varies depending
on the tissue.

In this example, you cannot directly compare leaves and roots across stages using
tissue alone, because each tissue only exists in one stage. Instead, to study changes
over time within each tissue-stage combination, the model should include the
following design formula and contrasts to compare time points within each tissue:

- **Design formula**: `~ Stage + Tissue + Time + Tissue:Time`
- **Contrasts**: `(leaves at 6h) – (leaves at 0h), (roots at 6h) – (roots at 0h)`
- **Test type**: Wald (default)
- **Baseline**: Tissue(leaves):Time(0h):Stage(V1)

This approach correctly models the nested structure and interaction effects,
allowing valid interpretation of time-dependent changes within each tissue
nested in its developmental stage.

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Time</th>
        <th>Cultivar</th>
        <th>Tissue</th>
        <th>Stage</th>
        <th>Genotype</th>
        <th>Batch</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRef</th>
        <th>Contrast</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>cold</td>
        <td>1</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>V1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(leaves & 6h) - (leaves & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>cold</td>
        <td>2</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>V1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(leaves & 6h) - (leaves & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>cold</td>
        <td>1</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>V1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(leaves & 6h) - (leaves & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>cold</td>
        <td>2</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>V1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(leaves & 6h) - (leaves & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>cold</td>
        <td>1</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>roots</td>
        <td>D1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(roots & 6h) - (roots & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>cold</td>
        <td>2</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>roots</td>
        <td>D1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(roots & 6h) - (roots & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>cold</td>
        <td>1</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>roots</td>
        <td>D1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(roots & 6h) - (roots & 0h)</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>cold</td>
        <td>2</td>
        <td>6h</td>
        <td>CV.0</td>
        <td>roots</td>
        <td>D1</td>
        <td>G.0</td>
        <td>B.0</td>
        <td>Wald</td>
        <td><code>~ Stage + Tissue + Time + Tissue:Time</code></td>
        <td><code>Tissue(leaves):Time(0h):Stage(V1)</code></td>
        <td><code>(roots & 6h) - (roots & 0h)</code></td>
      </tr>
    </tbody>
  </table>
</div>


### DEA using Likelihood Ratio Test (LRT)

The **Likelihood Ratio Test (LRT)** is a statistical method used to determine whether adding a factor or interaction significantly improves the fit of a model. It works by comparing **two nested models**:

- **Full model** – includes all factors of interest.  
- **Reduced model** – excludes the factor(s) you want to test.  

LRT evaluates whether the difference in fit between the full and reduced models is statistically significant. This makes it particularly useful for:

- **Nested models** – to test if extra complexity is justified.  
- **Multi-level factors** – to assess overall differences across several levels simultaneously.  
- **Time-series or longitudinal experiments** – to detect miRNAs whose expression changes over time, avoiding multiple pairwise comparisons at each time point.  

In the pipeline, LRT can be applied by setting the `Test` column in the metadata table to `LRT`. The `Design` column specifies the full model, while the `DesignRed` column defines the reduced (simpler) model for comparison. This allows users to focus on factors or interactions that truly drive expression changes in their experiments.

In this example, we demonstrate how to configure an LRT to evaluate whether the interaction between `Treatment` and `Time` has a significant impact on miRNA expression. The full model includes the interaction term, while the reduced model excludes it. By specifying these models in the `Design` and `DesignRed` columns of the metadata table and setting `Test = LRT`, the pipeline can assess the contribution of the interaction to the overall expression changes.

- **Design formula**: `~ Treatment + Time + Treatment:Time`  
- **Reduced formula**: `~ Treatment + Time`  
- **Test type**: LRT  
- **Baseline**: Treatment = None, Time = 0h  

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Time</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRed</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>None</td>
        <td>1</td>
        <td>0h</td>
        <td>LRT</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>~ Treatment + Time</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>None</td>
        <td>2</td>
        <td>0h</td>
        <td>LRT</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>~ Treatment + Time</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>cold</td>
        <td>1</td>
        <td>6h</td>
        <td>LRT</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>~ Treatment + Time</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>cold</td>
        <td>2</td>
        <td>6h</td>
        <td>LRT</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>~ Treatment + Time</code></td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample5</td>
        <td>cold</td>
        <td>3</td>
        <td>12h</td>
        <td>LRT</td>
        <td><code>~ Treatment + Time + Treatment:Time</code></td>
        <td><code>~ Treatment + Time</code></td>
      </tr>
    </tbody>
  </table>
</div>


### Handling Batch Effects

In many experiments, technical or biological factors unrelated to the experimental conditions—such as sequencing run, library preparation batch, lab technician, or sample source—can introduce systematic differences in the measured expression values. These unwanted variations are collectively referred to as **batch effects**. If not accounted for, batch effects can obscure true biological signals, create false positives or negatives, and lead to incorrect conclusions. Correcting for batch effects ensures that observed differential expression truly reflects the factor(s) of interest rather than technical or confounding variability.

In the pipeline, batch effects can be modeled by including covariates in the design formula. Users simply add columns representing the batch or other confounding variables to the metadata table, and include them in the `Design` formula. DESeq2 then accounts for these variables when estimating expression changes, effectively removing unwanted variability.

The following example demonstrates how to incorporate a `Batch` variable into the design formula to correct for batch effects while testing for differential expression between treatments:

- **Design formula**: `~ Batch + Treatment`  
- **Test type**: Wald  
- **Baseline**: Treatment = None  

#### Metadata Table Example

<div class="long-table-container">
  <table class="long-table">
    <thead>
      <tr>
        <th>Group</th>
        <th>Species</th>
        <th>Project</th>
        <th>Run</th>
        <th>Treatment</th>
        <th>Replicate</th>
        <th>Level</th>
        <th>Time</th>
        <th>Cultivar</th>
        <th>Tissue</th>
        <th>Stage</th>
        <th>Genotype</th>
        <th>Batch</th>
        <th>Test</th>
        <th>Design</th>
        <th>DesignRef</th>
        <th>DesignRed</th>
        <th>Contrast</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample1</td>
        <td>cold</td>
        <td>1</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>1</td>
        <td>Wald</td>
        <td><code>~ Batch + Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample2</td>
        <td>cold</td>
        <td>2</td>
        <td>L.0</td>
        <td>12h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>2</td>
        <td>Wald</td>
        <td><code>~ Batch + Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample3</td>
        <td>None</td>
        <td>1</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>1</td>
        <td>Wald</td>
        <td><code>~ Batch + Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
      <tr>
        <td>1</td>
        <td><i>Arabidopsis thaliana</i></td>
        <td>PROJECT1</td>
        <td>Sample4</td>
        <td>None</td>
        <td>2</td>
        <td>L.0</td>
        <td>0h</td>
        <td>CV.0</td>
        <td>leaves</td>
        <td>D.0</td>
        <td>G.0</td>
        <td>2</td>
        <td>Wald</td>
        <td><code>~ Batch + Treatment</code></td>
        <td><code>Treatment(None)</code></td>
        <td>DR.0</td>
        <td>CT.0</td>
      </tr>
    </tbody>
  </table>
</div>