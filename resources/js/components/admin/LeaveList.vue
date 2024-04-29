<template>
    <div>
        <h2>Leave List</h2>
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>User ID</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Comment by Admin</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(leave, index) in leaves" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ leave.user_id }}</td>
                <td>{{ leave.type }}</td>
                <td>{{ leave.start_date }}</td>
                <td>{{ leave.end_date }}</td>
                <td>{{ leave.reason }}</td>
                <td>{{ leave.status }}</td>
                <td>{{ leave.comment_by_admin }}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useLeaveStore } from '@/stores/leaves';

export default {
    name: 'LeaveList',
    setup() {
        const leaves = ref([]);

        const leaveStore = useLeaveStore();

        onMounted(async () => {
            await leaveStore.fetchLeaves();
            leaves.value = leaveStore.leaves;
        });

        return {
            leaves
        };
    }
};
</script>
