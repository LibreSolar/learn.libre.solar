module.exports = {
    title: 'Building DC Energy Systems',
    description: 'Open Educational Resource (OER) by Libre Solar to explain how to develop, produce and use components for DC energy systems',
    plugins: [
        'vuepress-plugin-latex' // or 'vuepress-plugin-latex'
    ],
    themeConfig: {
        nav: [{
                text: 'System Layout',
                link: '/system/'
            },
            {
                text: 'Component Development',
                link: '/development/'
            },
            {
                text: 'Production',
                link: '/production/'
            },
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
                ],
            }, {
                title: "Consumption",
                collapsable: false,
                children: [
                    'dump_load',
                ],
            }, {
                title: "Power Electronics",
                collapsable: false,
                children: [
                    'charge_controller',
                    'bms',
                    'inverter',
                ],
            }, {
                title: "Connections",
                collapsable: false,
                children: [
                    'wiring',
                    'fuses',
                    'grounding',
                ],
            }],
            '/development/': [{
                title: "Hardware",
                collapsable: false,
                children: [
                    'current_measurement',
                    'heat_dissipation',
                    'dcdc_converter',
                    'mosfets_drivers',
                ],
            }, {
                title: "Firmware",
                collapsable: false,
                children: [
                    'rtos_state_machines',
                    'hw_abstraction_drivers',
                    'digital_control',
                    'flashing_debugging',
                ],
            }, {
                title: "Communication",
                collapsable: false,
                children: [
                    'communication',
                ],
            }, {
                title: "Software",
                collapsable: false,
                children: [
                    'software',
                ],
            }],
            '/prodduction/': [{
                title: "PCB",
                collapsable: false,
                children: [
                    'pcb_reproduction',
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