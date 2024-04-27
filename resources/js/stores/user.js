import { defineStore } from "pinia";
import router from "@/router";
export default defineStore("user", {
    state: () => ({
        isLoggedIn: false,
        errorInfo: "",
        user: {},
    }),
    getters: {
        setLoggedIn(state) {
            return state.isLoggedIn;
        },
    },
    actions: {
        authenticate(values) {
            return axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/api/login", values)
                    .then((response) => {
                        this.user = response.data.data;

                        if (response.data.status == "success") {
                            this.errorInfo = "";
                            router.push({ name: "dashboard" });
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
                .get("/api/user")
                .then((response) => {
                    if (response.data) {
                        this.user = response.data;

                        this.isLoggedIn = true;
                    } else {
                        this.user = {};
                        this.isLoggedIn = false;
                    }
                })
                .catch((error) => {
                    return error;
                });
        },
        logout() {
            this.isLoggedIn = false;
            router.push({ name: "login" });
        },
    },
});
