<template>
    <u-grid-layout>
        <u-grid-layout-row>
            <u-grid-layout-column :span="6">
                <u-panel title="Cloud Host Resource Trends">
                    <u-line-chart :x-axis="{ key: 'week' }" :y-axis="{ min: 0 }" :smooth="true" :series="[{ key: 'number' } ]" :data="[{ week: 'Monday', number: 150 }, { week: 'Tuesday', number: 300 }, { week: 'Wednesday', number: 28 }, { week: 'Thursday' , number: 200 }, { week: 'Friday', number: 74 }, { week: 'Saturday', number: 532 }, { week: 'Sunday', number: 420 }]" legend
                        style="height: 270px">
                    </u-line-chart>
                </u-panel>
            </u-grid-layout-column>
            <u-grid-layout-column :span="6">
                <u-panel title="Virtual Resource Capacity">
                    <u-line-chart :x-axis="{ key: 'week' }" :y-axis="{ min: 0 }" :series="[{ key: 'number' }]" :data=" [{ week: 'Monday', number: 150 }, { week: 'Tuesday', number: 300 }, { week: 'Wednesday', number: 28 }, { week: 'Thursday', number: 200 }, { week: 'Friday', number: 74 }, { week: 'Saturday', number: 532 }, { week: 'Sunday', number: 420 }]" legend
                        style="height: 270px"
                    ></u-line-chart>
                </u-panel>
            </u-grid-layout-column>
        </u-grid-layout-row>
    </u-grid-layout>
</template>
