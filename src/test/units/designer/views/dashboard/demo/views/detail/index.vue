<template>
    <div>
        <u-head-card :title="detail.name" :infos="infoMessage">
            <div slot="logo">
                {{ (detail.name || '').substring(0, 2).toUpperCase() }}
            </div>
            <div slot="act">
                <u-button :to="{name: 'demo.form.setting', query: {id: $route.query.id}}">
                    Set Up
                </u-button>
            </div>
        </u-head-card>
        <div>
            <u-tabs router>
                <u-tab title="Details" :to="{path:'/demo/detail/info', query: {id: $route.query.id}}"></u-tab>
                <u-tab title="Monitor" :to="{path:'/demo/detail/monitor', query: {id: $route.query.id}}"></u-tab>
            </u-tabs>
            <div>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style module>

</style>

<script>
import Vue from 'vue';
import { MPublisher } from 'cloud-ui.kubevue';
export default {
    mixins: [MPublisher],
    publish: {
        'demo.detail': 'detail',
    },
    data() {
        return {
            detail: {

            },
        };
    },
    computed: {
        infoMessage() {
            const detail = this.detail;
            return [
            {
                    title: 'Name',
                    value: detail.name,
                },
                {
                    title: 'ID',
                    value: detail.id,
                },
                {
                    title: 'Time',
                    value: detail.time,
                },
            ];
        },
    },
    created() {
        this.getHostZone();
    },
    methods: {
        getHostZone() {
            setTimeout(() => {
                this.detail = {
                    name: 'test',
                    id: (Math.random() + '').replace('.', ''),
                    time: Vue.filter('dateFormat')(new Date() - 0),
                };
            }, 1000);
        },
    },
};
</script>
