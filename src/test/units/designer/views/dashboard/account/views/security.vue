<template>
    <u-desc-list>
        <u-desc-list-group title="Security Information">
            <u-desc-list-item label="Security Mobile">138****8888 <u-link @click="updateSecurityMobile()">Modify</u-link></u-desc-list-item >
            <u-desc-list-item label="Security Email">dev****p@gmail.com <u-link @click="updateSecurityEmail()">Modify</u-link></u-desc -list-item>
        </u-desc-list-group>
        <u-desc-list-group title="Account Security">
            <u-desc-list-item label="Login Password">
                <u-link @click="updatePassword()">Modify</u-link>
            </u-desc-list-item>
        </u-desc-list-group>
    </u-desc-list>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    methods: {
        updateSecurityMobile() {
            this.$toast.show('Modify safe phone');
        },
        updateSecurityEmail() {
            this.$toast.show('Modify secure email');
        },
        updatePassword() {
            this.$toast.show('Change login password');
        },
    },
};
</script>
<style module>

</style>
