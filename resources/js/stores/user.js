import {defineStore} from "pinia";
import router from "@/router";

export default defineStore("user", {
    state: () => ({
        isLoggedIn: false,
        errorInfo: "",
        user: {},
        userList: {},
        metaInfo: null,
        role: 'employee'
    }),
    getters: {
        setLoggedIn(state) {
            return state.isLoggedIn;
        },
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
        async fetchUsers() {
            const headerConfig = this.getHeaderConfig;
            await axios
                .get("/api/users", headerConfig)
                .then((response) => {
                    if (response.data) {
                        this.userList = response.data.data;
                    } else {
                        this.userList = {};
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
        async approvedUser(data) {
            const headerConfig = this.getHeaderConfig;
            await axios
                .post("/api/user-approved", data, headerConfig)
                .then((response) => {
                    if (response.data) {
                        this.userList = response.data.data;
                    } else {
                        this.userList = {};
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
        authenticate(values) {
            return axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/api/login", values)
                    .then((response) => {
                        let userResponse = response.data;
                        if (userResponse.status) {
                            this.user = userResponse.data;
                            this.errorInfo = "";
                            localStorage.setItem('access_token', userResponse.token);
                            localStorage.setItem('access_role', this.role);
                            router.push({name: "dashboard"});
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
            this.isLoggedIn = !!localStorage.getItem('access_token')
            // await axios
            //     .get("/api/user")
            //     .then((response) => {
            //         if (response.data) {
            //             this.user = response.data;
            //
            //             this.isLoggedIn = true;
            //         } else {
            //             this.user = {};
            //             this.isLoggedIn = false;
            //         }
            //     })
            //     .catch((error) => {
            //         return error;
            //     });
        },
        logout() {
            const headerConfig = this.getHeaderConfig;
            axios
                .post("/api/logout", headerConfig)
                .then((response) => {
                    if (response.data) {
                        localStorage.removeItem('access_token')
                        localStorage.removeItem('access_role')
                        this.isLoggedIn = false;
                        router.push({name: "login"});
                    } else {
                        this.user = {};
                        this.isLoggedIn = false;
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
    },
});
