<template>
    <div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-12">
                    <h2>Leave Requests</h2>
                            <button type="button" class="btn btn-primary mb-3" @click="showLeaveForm">
                                Add Leave
                            </button>
                            <leave-form v-if="showForm" @submitted="createLeave" @close="showForm = false"></leave-form>
                    <table class="table table-bordered">
                        <thead>
                        <tr>
                            <th>User</th>
                            <th>Type</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Reason</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="leave in leaves.leaves" :key="leave.id">
                            <td>{{ leave.user?.name }}</td>
                            <td>{{ leave.type }}</td>
                            <td>{{ leave.start_date }}</td>
                            <td>{{ leave.end_date }}</td>
                            <td>{{ leave.reason }}</td>
                            <td>{{ leave.status }}</td>
                            <td>
                                <a href="#" class="btn btn-sm btn-primary">Edit</a> <button type="button" class="btn btn-sm btn-danger" @click="deleteLeave(leave.id)">Delete</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
<!--                    <div v-if="errors" class="alert alert-danger mt-3" role="alert">-->
<!--                        <ul>-->
<!--                            <li v-for="error in errors" :key="error">{{ error }}</li>-->
<!--                        </ul>-->
<!--                    </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useLeaveStore } from '@/stores/leaves';
import LeaveForm from '@/components/LeaveForm.vue';

export default {
    setup() {
        const showForm = ref(false);
        const  leaves = useLeaveStore();
        leaves.fetchLeaves()

        const createLeave = async (leaveData) => {
            await leaves.createLeave(leaveData);
            await leaves.fetchLeaves();
        };

        const showLeaveForm = () => {
            showForm.value = true;
        };

        return {
            leaves,
            showForm,
            showLeaveForm,
            createLeave
        };
    },
    components: {
        LeaveForm,
    },
};
</script>
