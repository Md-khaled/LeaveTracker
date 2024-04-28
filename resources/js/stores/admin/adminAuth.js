import {defineStore} from "pinia";
import router from "@/router";

export default defineStore("admin-auth", {
    state: () => ({
        isAdminLoggedIn: false,
        errorInfo: "",
        user: {},
    }),
    getters: {
        setLoggedIn(state) {
            return state.isAdminLoggedIn;
        },
    },
    actions: {
        authenticate(values) {
            return axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/api/admin/login", values)
                    .then((response) => {
                        this.user = response.data.data;

                        if (response.data.success) {
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
            await axios
                .get("/api/admin/me")
                .then((response) => {
                    if (response.data) {
                        this.user = response.data;

                        this.isAdminLoggedIn = true;
                    } else {
                        this.user = {};
                        this.isAdminLoggedIn = false;
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
        logout() {
            this.isAdminLoggedIn = false;
            router.push({name: "admin-login"});
        },
    },
});
