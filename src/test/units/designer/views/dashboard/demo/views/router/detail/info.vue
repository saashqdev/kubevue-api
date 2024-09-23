<template>
    <div>
        <u-info-list-group title="Basic Information" column="3">
            <u-info-list-item label="Name">{{ detail.name }}</u-info-list-item>
            <u-info-list-item label="ID">{{ detail.id }}</u-info-list-item>
            <u-info-list-item label="Time">{{ detail.time }}</u-info-list-item>
        </u-info-list-group>
        <u-info-list-group title="Basic Information" column="3">
            <u-info-list-item label="Name">{{ detail.name }}</u-info-list-item>
            <u-info-list-item label="ID">{{ detail.id }}</u-info-list-item>
            <u-info-list-item label="Time">{{ detail.time }}</u-info-list-item>
        </u-info-list-group>
    </div>
</template>
<script>
import { MSubscriber } from 'cloud-ui.kubevue';
export default {
    mixins: [MSubscriber],
    subscribe: {
        'demo.router.detail'(detail) {
            this.detail = detail;
        },
    },
    data() {
        return {
            detail: {},
        };
    },
};
</script>
