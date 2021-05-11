module.exports = {
  title: 'Building DC Energy Systems',
  description: 'Open Educational Resource (OER) by Libre Solar to explain how to develop, produce and use components for DC energy systems',
  base: '/',
  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/favicons/site.webmanifest"}],
    ['link', { rel: "mask-icon", href: "/favicons/safari-pinned-tab.svg", color: "#5bbad5"}],
    ['link', { rel: "shortcut icon", href: "/favicons/favicon.ico"}],
    ['meta', { name: "msapplication-TileColor", content: "#2b5797"}],
    ['meta', { name: "msapplication-config", content: "/favicons/browserconfig.xml"}],
    ['meta', { name: "theme-color", content: "#ffffff"}],
  ],
  plugins: [
    'vuepress-plugin-export',
    '@maginapp/vuepress-plugin-katex', {
      delimiters: 'dollars'
    }
  ],
  themeConfig: {
    nav: [
      { text: 'System Layout', link: '/system/' },
      { text: 'Component Development', link: '/development/' },
      { text: 'Production', link: '/production/' },
    ],
    sidebar: {
      '/system/': [{
        title: "Generation",
        collapsable: false,
        children: [
          'solar_panel',
          'wind_turbine',
        ],
      }, {
        title: "Storage",
        collapsable: false,
        children: [
          'battery',
          //'grid',
        ],
      },/* {
        title: "Consumption",
        collapsable: false,
        children: [
          'dump_load',
        ],
      }, */{
        title: "Power Electronics",
        collapsable: false,
        children: [
          'charge_controller',
          'bms',
          //'inverter',
        ],
      }, {
        title: "Connections",
        collapsable: false,
        children: [
          'wires_fuses',
          'grounding',
        ],
      }],
      '/development/': [{
        title: "Hardware",
        collapsable: false,
        children: [
          'dcdc_converter',
          'load_switch',
          'current_measurement',
          'heat_dissipation',
          //'mosfets_drivers',
        ],
      }, {
        title: "Firmware",
        collapsable: false,
        children: [
          'firmware_frameworks',
          'rtos_super_loop',
          /*'hw_abstraction_drivers',*/
          'flashing_debugging',
          'digital_control',
        ],
      }, {
        title: "Communication",
        collapsable: false,
        children: [
          'communication',
        ],
      }, /*{
        title: "Software",
        collapsable: false,
        children: [
          'software',
        ],
      }*/],
      '/production/': [{
        title: "Ordering",
        collapsable: false,
        children: [
          'pcbs',
          'stencil',
          'parts',
        ],
      }, {
        title: "Assembly",
        collapsable: false,
        children: [
          'smd',
          'tht',
        ],
      }, {
        title: "Testing",
        collapsable: false,
        children: [
          'visual_check',
          'eol',
        ],
      }]
    },
    // Assumes GitHub. Can also be a full GitLab url.
    //repo: 'LibreSolar/learn.libre.solar',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    //repoLabel: 'Contribute!',

    // if your docs are in a different repo from your main project:
    docsRepo: 'LibreSolar/learn.libre.solar',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Edit this page on GitHub!',

    lastUpdated: 'Last Updated', // string | boolean
  }
}
