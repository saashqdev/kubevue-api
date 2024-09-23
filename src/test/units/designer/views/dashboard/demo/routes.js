import { LWrapper } from 'cloud-ui.kubevue';

export default {
    path: 'demo',
    component: LWrapper,
    meta: {
        crumb: 'demo',
    },
    children: [
        {
            path: '',
            redirect: 'list',
        },
        {
            path: 'list',
            component: LWrapper,
            meta: {
                title: 'List',
                crumb: 'list',
            },
            children: [
                { path: '', redirect: 'basic' },
                {
                    path: 'basic',
                    name: 'demo.list',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.vue'),
                    meta: {
                        title: 'Basic List',
                        crumb: 'Basic list',
                    },
                },
                {
                    path: 'localList',
                    name: 'demo.localList',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.local.vue'),
                    meta: {
                        title: 'Local Paging',
                        crumb: 'local pagination',
                    },
                },
                {
                    path: 'tabs',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.tabs.vue'),
                    meta: {
                        title: 'Tab List',
                        crumb: {
                            title: 'tab List',
                        },
                    },
                    children: [
                        {
                            path: '',
                            redirect: 'list',
                            name: 'demo.tabsList',
                        },
                        {
                            path: 'list',
                            name: 'demo.tabs.list',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.vue'),
                            meta: {
                                title: 'List Page',
                                crumb: {
                                    title: 'List Page',
                                },
                            },
                        },
                        {
                            path: 'localList',
                            name: 'demo.tabs.localList',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.local.vue'),
                            meta: {
                                title: 'Local Paging',
                                crumb: {
                                    title: 'Local Paging',
                                },
                            },
                        },
                        {
                            path: 'noPageList',
                            name: 'demo.tabs.noPageList',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/list/list.noPage.vue'),
                            meta: {
                                title: 'List Page (no pagination)',
                                crumb: {
                                    title: 'List Page (no pagination)',
                                },
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: 'form',
            component: LWrapper,
            meta: {
                title: 'Form',
                crumb: 'form',
            },
            children: [
                {
                    path: '',
                    redirect: 'basic',
                },
                {
                    path: 'basic',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/form/basic.vue'),
                    meta: {
                        title: 'Basic Form',
                        crumb: 'Basic form',
                    },
                },
                {
                    path: 'setting',
                    name: 'demo.form.setting',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/form/setting.vue'),
                    meta: {
                        title: 'Settings',
                        crumb: 'Settings',
                    },
                },
            ],
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail/index.vue'),
            meta: {
                title: 'Details',
                crumb: 'Details',
            },
            children: [
                {
                    path: '',
                    redirect: 'info',
                    name: 'demo.detail',
                },
                {
                    path: 'info',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/detail/info.vue'),
                    meta: {
                        crumb: 'Details',
                    },
                },
                {
                    path: 'monitor',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/detail/monitor.vue'),
                    meta: {
                        crumb: 'Monitoring',
                    },
                },
            ],
        },
        {
            path: 'router',
            component: LWrapper,
            meta: {
                title: 'routing',
                crumb: 'routing',
                locks: [{
                    include: [/router/],
                    params: ['search', 'demo.router.list.page'],
                }],
            },
            children: [
                { path: '', redirect: 'list' },
                {
                    path: 'list',
                    name: 'demo.router.list',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/router/list.vue'),
                    meta: {
                        title: 'List(routing)',
                        crumb: 'List(routing)',
                    },
                },
                {
                    path: 'setting',
                    name: 'demo.router.setting',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/router/setting.vue'),
                    meta: {
                        title: 'Settings',
                        crumb: 'Settings',
                    },
                },
                {
                    path: 'detail',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/router/detail/index.vue'),
                    meta: {
                        title: 'Details',
                        crumb: 'Details',
                    },
                    children: [
                        {
                            path: '',
                            redirect: 'info',
                            name: 'demo.router.detail',
                        },
                        {
                            path: 'info',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/router/detail/info.vue'),
                            meta: {
                                crumb: 'Details',
                            },
                        },
                        {
                            path: 'monitor',
                            component: () => import(/* webpackChunkName: 'demo' */ './views/router/detail/monitor.vue'),
                            meta: {
                                crumb: 'Monitoring',
                            },
                        },
                    ],
                },
            ],
        },
        {
            path: 'micro',
            component: LWrapper,
            meta: {
                title: 'Micro Frontend',
                crumb: 'Micro frontend',
            },
            children: [
                {
                    path: 'cloud-admin-1**',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/micro/cloud-admin-1.vue'),
                    meta: {
                        title: 'cloud-admin-1',
                        crumb: 'cloud-admin-1',
                    },
                },
                {
                    path: 'cloud-admin-2**',
                    component: () => import(/* webpackChunkName: 'demo' */ './views/micro/cloud-admin-2.vue'),
                    meta: {
                        title: 'cloud-admin-2',
                        crumb: 'cloud-admin-2',
                    },
                },
            ],
        },
    ],
};
