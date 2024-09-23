export default {
    module: 'demo',
    sidebar: {
        title: 'Demo',
        children: [
            {
                subnav: [
                    {
                        title: 'List',
                        children: [
                            {
                                title: 'Basic List',
                                to: '/demo/list/basic',
                            },
                            {
                                title: 'Local List',
                                to: '/demo/list/localList',
                            },
                            {
                                title: 'Tab List',
                                to: '/demo/list/tabs',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: 'Routing',
                        children: [
                            {
                                title: 'Basic Routing',
                                to: '/demo/router/list',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: 'Form',
                        children: [
                            {
                                title: 'Basic Form',
                                to: '/demo/form/basic',
                            },
                            {
                                title: 'Settings Page',
                                to: '/demo/form/setting',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: 'Details Page',
                        children: [
                            {
                                title: 'Details Page',
                                to: '/demo/detail',
                            },
                        ],
                    },
                ],
            },
            {
                subnav: [
                    {
                        title: 'Micro Frontend',
                        children: [
                            {
                                title: 'cloud-admin-1',
                                to: '/demo/micro/cloud-admin-1/demo/form/setting',
                            },
                            {
                                title: 'cloud-admin-2',
                                to: '/demo/micro/cloud-admin-2/demo/detail/info',
                            },
                        ],
                    },
                ],
            },
        ],
    },
};
