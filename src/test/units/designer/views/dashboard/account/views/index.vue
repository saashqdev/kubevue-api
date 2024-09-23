<template>
    <div>
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
                    title: 'Personal Center',
                    to: '/account/center',
                },
                {
                    title: 'Personal Settings',
                    to: '/account/setting',
                },
                {
                    title: 'Security Settings',
                    to: '/account/security',
                },
            ],
        };
    },
};
</script>
<style module>

</style>
