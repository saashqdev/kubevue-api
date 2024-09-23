import Layout from './layout/views/index.vue';
import moduleInfos from './modules';
export default [
    {
        path: '/',
        component: Layout,
        children: [
            { path: '', redirect: 'overview' },
            ...moduleInfos.routes,
        ],
    },
    { path: '*', beforeEnter(to, from, next) {
        if (window.microApp && window.microApp.isMicro) {
            if (!location.pathname.startsWith(window.microApp.prefix)) {
                next();
                return;
            }
        }
        next('/exception/404'); // Unmatched links jump to 404
    } },
];
