module.exports = {
        title: 'Building DC Energy Systems',
        description: 'Open Educational Resource (OER) by Libre Solar to explain how to develop, produce and use components for DC energy systems',
        plugins: {
            mathjax: {
                target: 'chtml',
                presets: [
                    '\\def\\lr#1#2#3{\\left#1#2\\right#3}',
                ],
            },
            'vuepress-plugin-export': {},
        },
        themeConfig: {
            locales: {
                // The key is the path for the locale to be nested under.
                // As a special case, the default locale can use '/' as its path.
                '/': {
                    lang: 'en-US', // this will be set as the lang attribute on <html>
                    title: 'Building DC Energy Systems',
                    description: 'Open Educational Resource (OER) by Libre Solar to explain how to develop, produce and use components for DC energy systems'
                },
                '/zh/': {
                    lang: 'Español',
                    title: 'Como Construir Sistemas de Energía de Corriente Directa ',
                    description: 'Recursos de acceso abierto de Libre Solar para explicar cómo desarrollar, producir y usar componentes para sistemas de energía de DC'
                }
            }
        },
        themeConfig: {
            locales: {
                '/': {
                    // text for the language dropdown
                    selectText: 'Languages',
                    // label for this locale in the language dropdown
                    label: 'English',
                    // text for the edit-on-github link
                    editLinkText: 'Edit this page on GitHub',
                    // config for Service Worker 
                    serviceWorker: {
                        updatePopup: {
                            message: "New content is available.",
                            buttonText: "Refresh"
                        }
                    },
                    // algolia docsearch options for current locale
                    algolia: {},
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
                },
                '/Español/': {
                    selectText: 'Idiomas',
                    label: 'Español',
                    editLinkText: '在 GitHub 上编辑此页',
                    serviceWorker: {
                        updatePopup: {
                            message: "发现新内容可用.",
                            buttonText: "刷新"
                        }
                    },
                    nav: [{
                        text: '嵌套',
                        link: '/zh/nested/'
                    }],
                    algolia: {},
                    sidebar: {
                        '/zh/': [ /* ... */ ],
                        '/zh/nested/': [ /* ... */ ]
                    }
                }
            }
        }
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