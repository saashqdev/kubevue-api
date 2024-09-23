<template>
    <u-linear-layout direction="vertical" gap="small">
        <u-page-summary>
            Get all the data from the remote end and perform paging processing locally. No request will be sent when paging is clicked, but only when refreshing.
        </u-page-summary>
        <u-linear-layout>
            <u-button icon="create" color="primary" @click="createItem">Create instance (method)</u-button>
            <u-button icon="create" color="primary" to="/demo/form/basic">Create instance (routing)</u-button>
            <u-button square icon="refresh" @click="refresh"></u-button>
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
                    </u-linear-layout>
                </template>
            </u-table-view-column>
        </u-table-view>
        <div>
            <u-linear-layout direction="vertical">
                <u-combo-pagination show-total show-sizer show-jumper
                    :page-size-options="limitList" :total-items="total" :page-size.sync="limit"
                    :page="page" @change="changePage($event)" @change-page-size="changeLimit">
                </u-combo-pagination>
            </u-linear-layout>
        </div>
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
            localPage: true,
            selected: [],
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
    },
    methods: {
        loadList() {
            return noticeService.loadList().then((result) => {
                this.originList = result;
                this.total = result.length;
            });
        },
        batchDelete() {
            this.$confirm(`Confirm to delete ${this.selected.join(',')} instance?`, 'Delete confirmation').then(() => {
                this.refresh();
            }, () => {
                console.log('Cancel deletion');
            });
        },
        createItem() {
            this.$toast.show('Create instance');
        },
    },
};
</script>
<style module>
.tableView  {

}
</style>
