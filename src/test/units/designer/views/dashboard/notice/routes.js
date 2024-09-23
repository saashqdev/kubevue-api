import { LWrapper } from 'cloud-ui.kubevue';
export default {
    path: 'notice',
    component: LWrapper,
    meta: {
        title: 'System Notification',
        crumb: 'System notification',
    },
    children: [
        { path: '', redirect: 'list' },
        {
            path: 'list',
            component: () => import(/* webpackChunkName: 'demo' */ './views/list.vue'),
            meta: {
                title: 'Notification List',
            },
        },
        {
            path: 'detail',
            component: () => import(/* webpackChunkName: 'demo' */ './views/detail.vue'),
            meta: {
                title: 'Notification Details',
                crumb: 'Notification details',
            },
        },
    ],
};
