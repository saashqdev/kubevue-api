<template>
<div :class="$style.root">
    <div v-for="item in list" :key="item.id">{{ var1 }}</div>
    <u-linear-layout>
        <u-button @click="test()"></u-button>
        <u-form :class="$style.root2" ref="form" gap="large">
            <u-form-item label="Billing method" required>
                <u-radios v-model="model1.chargeType">
                    <u-radio label="0">Yearly and Monthly Subscription</u-radio>
                    <u-radio label="1">Pay as you Go</u-radio>
                </u-radios>
            </u-form-item>
            <u-form-item label="Instance Name" required rules="required | ^az | az09$ | ^az09-$ | rangeLength(1,63)">
                <u-input v-model="model1.name" size="huge" maxlength="63" placeholder="Composed of 1-63 lowercase letters, numbers, and underscores, starting with a letter and ending with a letter or number" ></u-input>
            </u-form-item>
            <u-form-item label="Specification">
                <u-capsules :class="[$style.capsules, $styles.cap2]" v-model="model1.spec">
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
                <u-capsules :class="[$style.capsules, $styles.cap2]" v-model="model1.type">
                    <u-capsule value="SSD">SSD Cloud Disk</u-capsule>
                    <u-capsule value="HSSD">High Performance SSD Cloud Disk</u-capsule>
                </u-capsules>
            </u-form-item>
            <u-form-item>
                <u-button color="primary" @click="submit">Create Now</u-button>
            </u-form-item>
        </u-form>
        <u-pagination></u-pagination>
    </u-linear-layout>
    <u-transfer :class="$style.root1" :source="source" :target="target">
        <div v-for="(item, index) in list1" :key="item.id" :title="var2">{{ var2 }}</div>
        <tr v-for="(item, index) in list1" :key="index">
            <u-input size="huge full" placeholder="Please enter the region" v-model="item.region"></u-input>
        </tr>
    </u-transfer>
</div>
</template>

<script>
import UWorkflow from '@cloud-ui/u-workflow.vue';
import service from './service';
const source = [
    { text: 'C', value: 'c' },
    { text: 'C#', value: 'csharp' },
    { text: 'C++', value: 'cpp' },
    { text: 'Coq', value: 'coq' },
    { text: 'Go', value: 'go' },
    { text: 'Handlebars', value: 'Handlebars' },
    { text: 'JSON', value: 'json' },
    { text: 'Java', value: 'java' },
    { text: 'Makefile', value: 'makefile' },
    { text: 'Markdown', value: 'markdown' },
    { text: 'Objective-C', value: 'objective-c' },
    { text: 'Objective-C++', value: 'objective-cpp' },
    { text: 'PHP', value: 'php' },
    { text: 'Perl', value: 'perl' },
    { text: 'PowerShell', value: 'powershell' },
    { text: 'Python', value: 'python' },
    { text: 'Ruby', value: 'ruby' },
    { text: 'SQL', value: 'sql' },
    { text: 'SVG', value: 'svg' },
    { text: 'Shell Script', value: 'shellscript' },
    { text: 'Swift', value: 'swift' },
    { text: 'Visual Basic', value: 'vb' },
    { text: 'XML', value: 'xml' },
    { text: 'YAML', value: 'yaml' },
];

const target = [
    { text: 'CSS', value: 'css' },
    { text: 'HTML', value: 'html' },
    { text: 'JavaScript', value: 'javascript' },
    { text: 'Vue', value: 'vue' },
];
export default {
    components: { UWorkflow },
    data() {
        const list = [];
        return {
            var1: undefined,
            list: [],
            model: { instance: {} },

            source,
            target,
            var2: 123,
            list1: ['aaa'],
            model1: {
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
        showButton() {
            return false;
        },
        buttonDisabled() {
            return false;
        },
    },

    created() {
        this.var2 = 2;
        this.list1.push('bbb');
        console.log('created1');
        console.log('created2');
    },
    methods: {
        test() {
            console.info('aaa');
        },
        submit() {
            if (!this.model1.name) {
                return false;
            }
            this.$refs.form
                .validate()
                .then(() => this.$toast.show('Verification passed, submission successful!'))
                .catch(() => this.$toast.show('Verification failed!'));
        },
    },
};
</script>

<style module>
.root {
    width: 100%;
}

.root .item {
    color: blue;
}

:global .red {
    background: red;
}

@media (max-width: 600px) {
    .test {
        width: 30%;
    }
}

.root1 {
    height: 300px;
}

:global .white {
    color: white;
}

.root1 .item1 {
    color: black;
}

@media (max-width: 600px) {
    .root1 {
        width: 50%;
    }
}

.root2 {
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
