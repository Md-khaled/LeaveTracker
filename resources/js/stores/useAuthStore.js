
import { defineStore } from 'pinia';


export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: '',
        errors: ''
    }),
    getters: {
        getUser: (state) => state.user,
        getErrors: (state) => state.errors,
        getHeaderConfig(state) {
            const config = {
                headers: {
                    "Authorization" : `Bearer ${state.user.currentToken}`,
                    "Accept": "application/json",
                }
            }
            return config;
        }
    },
    actions: {
        setUser() {
            if (localStorage.getItem('user')) {
                this.user = JSON.parse(localStorage.getItem('user'));
            }
        },
        storeUser(user) {
            localStorage.setItem('user', JSON.stringify(user));
            this.user = user;
        },
        clearStoredData() {
            localStorage.removeItem('user');
            this.user = '';
        },
        setErrors(errors) {
            this.errors = errors;
        },
        clearErrors() {
            this.errors = '';
        }
    },
});

