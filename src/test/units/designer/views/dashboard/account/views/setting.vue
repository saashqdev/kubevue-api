<template>
    <u-form gap="large">
        <u-form-item label="Contact Information" required>
            <u-input v-model="model.phone" size="huge"></u-input>
        </u-form-item>
        <u-form-item label="Address">
            <u-region-select v-model="model.area"></u-region-select>
        </u-form-item>
        <u-form-item label="Detailed address" layout="block">
            <u-textarea v-model="model.street" size="huge"></u-textarea>
        </u-form-item>
        <u-form-item>
            <u-button color="primary" @click="submit()">Submit Now</u-button>
        </u-form-item>
    </u-form>
</template>
<script>
export default {
    data() {
        return {
            model: {
                area: undefined,
                street: '',
                phone: '',
            },
            currentNav: 'A',
        };
    },
    methods: {
        submit() {
            // todo
        },
    },
};
</script>
<style module>

</style>
