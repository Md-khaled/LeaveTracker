<template>

    <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation" v-for="(tab, index) in tabs" :key="index">
            <button :class="['nav-link', { 'active': index === activeTabIndex }]" :id="`tab-${index}`"
                    data-bs-toggle="tab" :data-bs-target="`#tab-${index}`" type="button" role="tab"
                    :aria-controls="`tab-${index}`" :aria-selected="index === activeTabIndex"
                    @click="setActiveTab(index)">{{ tab }}
            </button>
        </li>
    </ul>
    <div class="tab-content" id="myTabContent">
        <div :class="['tab-pane', { 'fade show active': index === activeTabIndex }]" :id="`tab-${index}`"
             role="tabpanel" :aria-labelledby="`tab-${index}`" v-for="(content, index) in tabContents" :key="index">
            <h2>{{ content.title }}</h2>
            <table class="table">
                <thead>
                <tr>
                    <th v-for="(header, index) in content.headers" :key="index">{{ header }}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, rowIndex) in content.data" :key="rowIndex">
                    <td v-for="(value, colIndex) in item" :key="colIndex">{{ value }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import {ref, computed} from 'vue';
import {useRoute} from 'vue-router';
import {useLeaveStore} from '@/stores/leaves';
import {storeToRefs} from "pinia";

export default {
    setup() {
        const route = useRoute()
        const leavesData = useLeaveStore();
        leavesData.setMetaInfo(route.meta);
        leavesData.fetchLeaves()
        const {leaves} = storeToRefs(leavesData);
        const tabs = ref(['Tab 1', 'Tab 2']); // Tabs labels
        const tabContents = ref([
            {
                title: 'Leave List',
                headers: ['#', 'User ID', 'Type', 'Start Date', 'End Date', 'Reason', 'Status', 'Comment by Admin'],
                data: computed(() => {
                    // Map fetched leaves data to the format expected by the tab
                    return leavesData.leaves.map((leave, index) => ({
                        id: index + 1,
                        user_id: leave.user_id,
                        type: leave.type,
                        start_date: leave.start_date,
                        end_date: leave.end_date,
                        reason: leave.reason,
                        status: leave.status,
                        comment_by_admin: leave.comment_by_admin
                    }));
                })
            },
            {
                title: 'Tab 2 Content',
                headers: ['#', 'Username', 'Email'],
                data: [
                    {id: 1, username: 'user1', email: 'user1@example.com'},
                    {id: 2, username: 'user2', email: 'user2@example.com'}
                ]
            }
        ]); // Tab content
        const activeTabIndex = ref(0); // Active tab index

        const setActiveTab = (index) => {
            activeTabIndex.value = index;
        };

        return {
            tabs,
            tabContents,
            activeTabIndex,
            setActiveTab,
            leavesData
        };
    }
};
</script>

<style scoped>
/* Add scoped CSS here */
</style>
