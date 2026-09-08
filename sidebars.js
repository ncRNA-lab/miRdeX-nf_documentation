/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
    'getting_started',
    'usage',
    'parameters',
    {
      type: 'category',
      label: 'Workflow steps',
      collapsed: false,
      items: [
        'Workflow-steps/data-download',
        'Workflow-steps/trimming',
        'Workflow-steps/filtering',
        'Workflow-steps/quantification',
        'Workflow-steps/dea',
        'Workflow-steps/annotation',
        'Workflow-steps/de_mirna_patterns',
      ],
    },
    'output',
    'tutorial',
    'citations',
  ],
};

module.exports = sidebars;
