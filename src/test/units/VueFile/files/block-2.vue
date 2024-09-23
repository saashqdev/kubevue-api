<template>
<u-form :class="$style.root" ref="form" gap="large">
    <u-form-item label="Billing method" required>
        <u-radios v-model="model.chargeType">
            <u-radio label="0">Yearly and Monthly Subscription</u-radio>
            <u-radio label="1">Pay as you Go</u-radio>
        </u-radios>
    </u-form-item>
    <u-form-item label="Instance Name" required rules="required | ^az | az09$ | ^az09-$ | rangeLength(1,63)">
        <u-input v-model="model.name" size="huge" maxlength="63" placeholder="Composed of 1-63 lowercase letters, numbers, and underscores, starting with a letter and ending with a letter or number" ></u-input>
    </u-form-item>
    <u-form-item label="Specification">
        <u-capsules :class="[$style.capsules, $styles.cap2]" v-model="model.spec">
            <u-capsule value="0101">1 core 1GB</u-capsule>
            <u-capsule value="0102">1 core 2GB</u-capsule>
            <u-capsule value="0204">2 core 4GB</u-capsule>
            <u-capsule value="0408">4 core 8GB</u-capsule>
            <u-capsule value="0816">8 core 16GB</u-capsule>
            <u-capsule value="0832">8 core 32GB</u-capsule>
            <u-capsule value="1664">16 core 64GB</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item label="Type" description="High-performance SSD cloud disk does not support snapshot function" layout="block">
        <u-capsules :class="[$style.capsules, $styles.cap2]" v-model="model.type">
            <u-capsule value="SSD">SSD Cloud Disk</u-capsule>
            <u-capsule value="HSSD">High Performance SSD Cloud Disk</u-capsule>
        </u-capsules>
    </u-form-item>
    <u-form-item>
        <u-button color="primary" @click="submit">Create Now</u-button>
    </u-form-item>
</u-form>
</template>
<script>
import service from './service';

export default {
    data() {
        const list = [];

        return {
            model: {
                chargeType: '0',
                name: '',
                spec: '0101',
                type: 'SSD',
                port: '',
                bandwidth: 10,
                description: '',
            },
        };
    },
    computed: {
        buttonDisabled() {
            return false;
        },
    },
    created() {
        console.log('created2');
    },
    methods: {
        submit() {
            if (!this.model.name) {
                return false;
            }
            this.$refs.form.validate()
                .then(() => this.$toast.show('Verification passed, submission successful!'))
                .catch(() => this.$toast.show('Verification failed!'));
        },
    },
};
</script>
<style module>
.root {
    width: 300px;
    background: #ccc;
}

.capsules {
    text-align: center;
}

.cap2 {
    width: 300px;
}
</style>
