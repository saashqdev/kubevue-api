import { LWrapper } from 'cloud-ui.kubevue';
import Exception404 from './views/404.vue';
import Exception500 from './views/500.vue';
export default {
    path: 'exception',
    component: LWrapper,
    children: [
        {
            path: '404',
            name: '404',
            component: Exception404,
            meta: {
                title: 'Sorry, the page you visited does not exist.',
            },
        },
        {
            path: '500',
            name: '500',
            component: Exception500,
            meta: {
                title: 'Sorry, a service error occurred.',
            },
        },
    ],
};
