<template>
    <u-modal title="View Category" @ok="modalOK" @cancel="modalCancel"
        ok-button="Confirm" cancel-button="Cancel" :visible.sync="show"
        icon="info">
        <template v-if="detail">
            {{ detail.cate_sname }}
        </template>
    </u-modal>
</template>
<script>
import Modal from '@/global/mixins/modal';
export default {
    mixins: [Modal],
    data() {
        return {
            detail: null,
        };
    },
    methods: {
        modalOK() {
            this.close();
        },
        modalCancel() {
            this.close();
        },
    },
};
</script>
