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
                <th>Action</th>
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
                <td>
                    <button class="btn btn-primary" data-bs-toggle="modal" @click.stop="openEditModal(leave)">Edit
                    </button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Edit modal -->
        <div class="modal fade" id="editLeaveModal" tabindex="-1" aria-labelledby="editLeaveModalLabel"
             aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit Leave</h5>
                        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <form v-if="editedLeave">
                            <div class="mb-3">
                                <label for="type" class="form-label">Type</label>
                                <input type="text" class="form-control" id="type" v-model="editedLeave.type" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="start_date" class="form-label">Start Date</label>
                                <input type="date" class="form-control" id="start_date"
                                       v-model="editedLeave.start_date" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="end_date" class="form-label">End Date</label>
                                <input type="date" class="form-control" id="end_date" v-model="editedLeave.end_date" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label mx-3">Status : </label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="blocked" value="pending" v-model="editedLeave.status">
                                    <label class="form-check-label" for="blocked">Pending</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="approved" value="approved" v-model="editedLeave.status">
                                    <label class="form-check-label" for="approved">Approved</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="blocked" value="rejected" v-model="editedLeave.status">
                                    <label class="form-check-label" for="blocked">Rejected</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="comment_by_admin" class="form-label">Comment by Admin</label>
                                <textarea class="form-control" id="comment_by_admin"
                                          v-model="editedLeave.comment_by_admin"></textarea>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">
                            Close
                        </button>
                        <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import {useLeaveStore} from '@/stores/leaves';
import {Modal} from "bootstrap";

export default {
    name: 'LeaveList',
    setup() {
        const leaves = ref([]);
        const editedLeave = ref(null);
        const LeaveModal = ref(null);

        const leaveStore = useLeaveStore();
        const fetchLeaves = async () => {
            await leaveStore.fetchLeaves();
            leaves.value = leaveStore.leaves;
        };
        onMounted(() => {
            fetchLeaves();
            LeaveModal.value = new Modal('#editLeaveModal', LeaveModal.value);
        });
        const openEditModal = (leave) => {
            editedLeave.value = {...leave};
            LeaveModal.value.show();
        };

        const closeModal = () => {
            editedLeave.value = null;
            LeaveModal.value.hide();
        };
        const saveChanges = () => {
            leaveStore.approvedLeave(editedLeave.value)
            fetchLeaves();
            closeModal();
        };

        return {
            leaves,
            editedLeave,
            LeaveModal,
            openEditModal,
            closeModal,
            saveChanges
        };
    }
};
</script>
