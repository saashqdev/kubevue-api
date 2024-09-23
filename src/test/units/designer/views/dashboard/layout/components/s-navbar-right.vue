<template>
    <div>
        <div :class="$style.item">
            <u-badge corner dot :value="noticeCount">
                <u-link
                    :class="noticeActive ? $style.active : ''"
                    to="/notice"
                    title="Notification">
                    <i-icon name="notice" :class="$style.icon"></i-icon>
                </u-link>
            </u-badge>
        </div>
        <u-navbar-dropdown style="margin-right: 10px;">
            <template #title>
                <u-avatar shape="circle" :class="$style.avatar"></u-avatar>
                <span :class="$style.username">{{ userInfo.username }}</span>
            </template>
            <template #default>
                <u-navbar-menu>
                    <u-navbar-menu-item to="/account/center">Personal Center</u-navbar-menu-item>
                    <u-navbar-menu-item @click="logout">Safe Exit</u-navbar-menu-item>
                </u-navbar-menu>
            </template>
        </u-navbar-dropdown>
    </div>
</template>
<script>
export default {
    props: {
        userInfo: Object,
    },
    data() {
        return {
            noticeCount: 6,
            noticeActive: false,
        };
    },

    watch: {
        $route: {
            immediate: true,
            handler($route) {
                this.noticeActive = $route.path.startsWith('/notice');
            },
        },
    },
    methods: {
        logout() {
            this.$confirm(`Are you sure you want to log out?`, 'prompt').then(() => {
                location.reload();
            });
        },
    },
};
</script>
<style module>
.avatar {
    /* (64px - 44px) / 2 */
    margin-top: 10px;
    margin-bottom: 10px;
    margin-right: 10px;
}
.username {
    display: inline-block;
    vertical-align: top;
    margin-right: 10px;
    color: #fff;
}
.icon {
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
}
.item {
    display: inline-block;
    vertical-align: top;
    width: 64px;
    text-align: center;
    line-height: 64px;
}
.item .icon {
    font-size: 22px;
    line-height: 22px;
    color: #9ba4ad;
}

.active[class] span{
    color: #67aaf5;
}

</style>
