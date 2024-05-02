import {defineStore} from "pinia";
import router from "@/router";

export default defineStore("admin", {
    state: () => ({
        isAdminLoggedIn: false,
        errorInfo: "",
        user: {},
        role: 'admin',
    }),
    getters: {
        setLoggedIn(state) {
            return state.isAdminLoggedIn;
        },
        getHeaderConfig(state) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${state.user.currentToken}`,
                    "Accept": "application/json",
                }
            }
            return config;
        }
    },
    actions: {
        authenticate(values) {
            return axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/api/admin/login", values)
                    .then((response) => {
                        let adminResponse = response.data
                        this.user = adminResponse.data;

                        if (adminResponse.success) {
                            localStorage.setItem('access_token', adminResponse.token);
                            localStorage.setItem('access_role', this.role);
                            this.isAdminLoggedIn = true;
                            this.errorInfo = "";
                            router.push({name: "admin-dashboard"});
                        } else {
                            this.errorInfo = response.data.message;
                            console.log(this.errorInfo);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        if (error.response.status === 422) {
                            this.errorInfo = error.response.data.message;
                        }
                    }); // credentials didn't match
            });
        },
        async authCheck() {
            this.isAdminLoggedIn = !!localStorage.getItem('access_token')
            // await axios
            //     .get("/api/admin/me")
            //     .then((response) => {
            //         if (response.data) {
            //             this.user = response.data;
            //
            //             this.isAdminLoggedIn = true;
            //         } else {
            //             this.user = {};
            //             this.isAdminLoggedIn = false;
            //         }
            //     })
            //     .catch((error) => {
            //         return error;
            //     });
        },
        adminlogout() {
            const headerConfig = this.getHeaderConfig;
            axios
                .post("/api/admin/logout", headerConfig)
                .then((response) => {
                    if (response.data) {
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('access_role')
                        this.isAdminLoggedIn = false;
                        router.push({name: "admin-login"});
                    } else {
                        this.isAdminLoggedIn = false;
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
    },
});
