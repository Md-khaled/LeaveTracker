import {defineStore} from 'pinia';

export const useLeaveStore = defineStore('leaves', {
    state: () => ({
        leaves: [],
        users: [],
        statuses: [],
        types: [],
        errors: null,
        metaInfo: null,
    }),
    getters: {
        getHeaderConfig() {
            const getToken = localStorage.getItem('access_token');
            const config = {
                headers: {
                    "Authorization": `Bearer ${getToken}`,
                    "Accept": "application/json",
                }
            }
            return config;
        }
    },
    actions: {
        setMetaInfo(info) {
            this.metaInfo = info;
        },
        async fetchLeaves() {
            try {
                const headerConfig = this.getHeaderConfig;
                const response = await axios.get('/api/leaves', headerConfig);
                this.leaves = response.data.data.leaves.data;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors;
            }
        },
        async fetchUsers() {
            try {
                const response = await axios.get('/api/users');
                this.users = response.data;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors;
            }
        },
        async fetchStatuses() {
            try {
                const response = await axios.get('/api/leave-statuses');
                this.statuses = response.data.data.statuses;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors;
            }
        },
        async fetchLeaveTypes() {
            try {
                const response = await axios.get('/api/leave-types');
                this.types = response.data.data.types;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors;
            }
        },
        async createLeave(data) {
            try {
                const response = await axios.post('/api/leaves', data);
                this.leaves.push(response.data);
                this.errors = null;
            } catch (error) {
                console.error(error);
                this.errors = error.response.data.errors;
            }
        },
    },
});
