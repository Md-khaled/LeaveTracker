import { defineStore } from 'pinia';

export const useLeaveStore = defineStore('leaves', {
    state: () => ({
        leaves: [],
        users: [],
        statuses: [],
        errors: null,
    }),
    actions: {
        async fetchLeaves() {
            try {
                const response = await axios.get('/api/leaves');
                this.leaves = response.data.data;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors; // Handle API errors
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get('/api/users'); // Replace with your user endpoint
                this.users = response.data;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors; // Handle API errors
            }
        },
        async fetchStatuses() {
            // If LeaveStatus enum values are directly accessible
            this.statuses = Object.values(LeaveStatus);

            // Alternatively, fetch statuses from an API endpoint if needed
            // try {
            //   const response = await axios.get('/api/leave-statuses');
            //   this.statuses = response.data;
            // } catch (error) {
            //   console.error(error);
            //   this.errors = error.response.data.errors; // Handle API errors
            // }
        },
        async createLeave(data) {
            try {
                const response = await axios.post('/api/leaves', data);
                // Handle successful creation (e.g., clear form, update state)
                this.leaves.push(response.data); // Update local state
                this.errors = null;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors; // Handle API errors
            }
        },
    },
});
