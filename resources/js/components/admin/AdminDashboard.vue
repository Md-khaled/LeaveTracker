<template>
    <div class="container">
        <div class="row mb-5">
            <div class="col-md-12">
                <LeaveStatistics/>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
<!--                <AdminTable/>-->
                <div>
                    <ul class="nav nav-tabs">
                        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
                            <button class="nav-link" :class="{ active: activeTabIndex === index }" @click="activeTabIndex = index">{{ tab }}</button>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div v-if="activeTabIndex === 0">
                            <LeaveList />
                        </div>
                        <div v-else-if="activeTabIndex === 1">
                            <UserList />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import {ref, computed} from 'vue';
import { mapStores } from "pinia";
import useAdminStore from "@/stores/admin/adminAuth";
import LeaveStatistics from '@/components/admin/LeaveStatistics.vue';
import LeaveList from '@/components/admin/LeaveList.vue';
import UserList from '@/components/admin/UserList.vue';
import AdminTable from '@/components/admin/AdminTable.vue';
export default {
    name: 'AdminDashboard',
    components: {
        LeaveStatistics,
        AdminTable,
        UserList,
        LeaveList
    },
    setup() {
        const adminStore = useAdminStore();
        const tabs = ref(['Leave List', 'User List']);
        const activeTabIndex = ref(0);

        return {
            ...mapStores(adminStore),
            tabs,
            activeTabIndex
        };
    },
};
</script>
