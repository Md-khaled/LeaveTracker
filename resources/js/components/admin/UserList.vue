<template>
    <div>
        <h2>User List</h2>
        <table class="table">
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Approved</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(user, index) in users" :key="index" @click="openEditModal(user)">
                <td>{{ index + 1 }}</td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.account_status }}</td>
                <td>
                    <button class="btn btn-primary" data-bs-toggle="modal" @click.stop="openEditModal(user)">Edit</button>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Edit modal -->
        <div class="modal fade" id="user_display_modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Edit User</h5>
                        <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                    </div>
                    <div class="modal-body">
                        <form  v-if="editedUser">
                            <div class="mb-3">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" v-model="editedUser.name" readonly>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" v-model="editedUser.email" readonly>
                            </div>
                            <div class="mb-3">
                                <label class="form-label mx-3">Status : </label>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="blocked" value="pending" v-model="editedUser.account_status">
                                    <label class="form-check-label" for="blocked">Pending</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="approved" value="approved" v-model="editedUser.account_status">
                                    <label class="form-check-label" for="approved">Approved</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" id="blocked" value="blocked" v-model="editedUser.account_status">
                                    <label class="form-check-label" for="blocked">Blocked</label>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="closeModal">Close</button>
                        <button type="button" class="btn btn-primary" @click="saveChanges">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import useUserStore from '@/stores/user';
import { Modal } from "bootstrap";
export default {
    name: 'UserList',
    setup() {
        const users = ref([]);
        const editedUser = ref(null);
        const UserModal = ref(null);

        const userStore = useUserStore();

        onMounted(() => {
            UserModal.value = new Modal('#user_display_modal', UserModal.value);
        });

        const openEditModal = (user) => {
            editedUser.value = { ...user }; // Clone the user object to avoid modifying the original
            UserModal.value.show();
        };

        const closeModal = () => {
            editedUser.value = null;
            UserModal.value.hide();
        };

        const saveChanges = () => {
            userStore.approvedUser(editedUser.value)
            fetchUsers();
            closeModal();
        };

        // Fetch users data
        const fetchUsers = async () => {
            await userStore.fetchUsers();
            users.value = userStore.userList;
        };

        fetchUsers(); // Call fetchUsers when component is mounted

        return {
            users,
            editedUser,
            UserModal,
            openEditModal,
            closeModal,
            saveChanges
        };
    }
};
</script>
