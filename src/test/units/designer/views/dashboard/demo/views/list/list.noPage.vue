<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            Common list page (no pagination)
        </u-page-summary>
        <u-linear-layout justify="space-between">
            <u-linear-layout display="inline">
                <u-button icon="create" color="primary" @click="createItem">Create instance (method)</u-button>
                <u-button icon="create" color="primary" to="/demo/form/basic">Create instance (routing)</u-button>
                <u-button square icon="refresh" @click="refresh"></u-button>
            </u-linear-layout>
            <u-linear-layout type="flex" justify="end">
                <u-search v-model="form.search" placeholder="search"></u-search>
            </u-linear-layout>
        </u-linear-layout>
        <u-table-view :class="$style.tableView" :data="list" :loading="loading" value-field="name" :values="selected">
            <u-table-view-column type="checkbox" width="8%"></u-table-view-column>
            <u-table-view-column title="Message Title">
                <template slot="cell" slot-scope="{ item }">
                    {{ item.name }}
                </template>
            </u-table-view-column>
            <u-table-view-column title="Time">
                <template slot="cell" slot-scope="{ item }">
                    {{ item.time | dateFormat }}
                </template>
            </u-table-view-column>
            <u-table-view-column title="Operation">
                <template slot="cell" slot-scope="scope">
                    <u-linear-layout>
                        <u-link :to="{name: 'demo.detail', query: {id: scope.item.ch_name}}">
                            Check the details
                        </u-link>
                        <u-link @click="deleteItem">
                            Delete
                        </u-link>
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <u-footbar :position="batchBtnPos">
            <u-linear-layout>
                <span>{{ selected.length }} items selected</span>
                <u-button :disabled="!allowBatchDelete" @click="batchDelete">Delete</u-button>
            </u-linear-layout>
        </u-footbar>
    </u-linear-layout>
</template>
<script>
import page from '@/global/mixins/page/page';
import noticeService from '@/views/dashboard/demo/service';
export default {
    mixins: [page],
    data() {
        return {
            selected: [],
            form: {
                search: '',
            },
        };
    },
    computed: {
        allowBatchDelete() {
            return this.selected && this.selected.length;
        },
        batchBtnPos() {
            const pos = this.selected && this.selected.length > 0 ? 'auto' : 'static';
            return pos;
        },
    },
    watch: {
        list() {
            this.selected = [];
        },
        'form.search'() {
            this.resetPage();
            this.refresh();
        },
    },
    methods: {
        loadList() {
            return noticeService.loadList({
                query: {
                    search: this.form.search,
                },
            }).then((result) => {
                if (this.form.search) {
                    result = result.filter((item) => JSON.stringify(item).includes(this.form.search));
                }
                this.list = result;
            });
        },
        batchDelete() {
            this.$confirm(`Confirm deletion of ${this.selected.join(',')} instance?`, 'Delete confirmation').then(() => {
                this.refresh();
            }, () => {
                console.log('Cancel deletion');
            });
        },
        createItem() {
            this.$toast.show('Create instance');
        },
        deleteItem() {
            this.$confirm('Are you sure you want to delete this instance?', 'Confirm deletion').then(() => {
                this.$toast.show('Start deletion');
            }, () => {
                this.$toast.show('Cancel deletion');
            });
        },
    },
};
</script>
<style module>
.tableView  {
    vertical-align: middle;
}
</style>
