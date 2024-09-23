<template>
    <div>
        <u-page-summary>Here is the tab list, there is a different page under one tab</u-page-summary>
        <u-tabs router>
            <u-tab v-for="tab in tabs" :title="tab.title" :to="tab.to" :key="tab.to"></u-tab>
        </u-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {
                    title: 'List Page',
                    to: '/demo/list/tabs/list',
                },
                {
                    title: 'Local Paging',
                    to: '/demo/list/tabs/localList',
                },
                {
                    title: 'List Page (no pagination)',
                    to: '/demo/list/tabs/noPageList',
                },

            ],
        };
    },
};
</script>
