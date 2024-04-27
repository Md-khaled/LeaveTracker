<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Register</div>

                    <div class="card-body">
                        <vee-form
                            :validation-schema="schema"
                            @submit="register"
                        >
                            <div class="row" v-if="errorInfo">
                                <div class="col-md-12 text-danger text-center">
                                    <p class="mb-1">{{ errorInfo }}</p>
                                </div>
                            </div>
                            <div class="row mb-3">
                                <label
                                    for="name"
                                    class="col-md-4 col-form-label text-md-end"
                                    >Name</label
                                >

                                <div class="col-md-6">
                                    <vee-field
                                        id="name"
                                        type="text"
                                        class="form-control"
                                        name="name"
                                        v-model="user.name"
                                        required
                                        autocomplete="name"
                                        autofocus
                                    />
                                    <ErrorMessage
                                        class="text-danger"
                                        name="name"
                                    />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label
                                    for="email"
                                    class="col-md-4 col-form-label text-md-end"
                                    >Email Address</label
                                >

                                <div class="col-md-6">
                                    <vee-field
                                        id="email"
                                        type="email"
                                        class="form-control"
                                        name="email"
                                        v-model="user.email"
                                        required
                                        autocomplete="email"
                                    />
                                    <ErrorMessage
                                        class="text-danger"
                                        name="email"
                                    />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label
                                    for="password"
                                    class="col-md-4 col-form-label text-md-end"
                                    >Password</label
                                >

                                <div class="col-md-6">
                                    <vee-field
                                        id="password"
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        v-model="user.password"
                                        required
                                        autocomplete="new-password"
                                    />
                                    <ErrorMessage
                                        class="text-danger"
                                        name="password"
                                    />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <label
                                    for="password-confirm"
                                    class="col-md-4 col-form-label text-md-end"
                                    >Confirm Password</label
                                >

                                <div class="col-md-6">
                                    <vee-field
                                        id="password-confirm"
                                        type="password"
                                        class="form-control"
                                        name="password_confirmation"
                                        v-model="user.password_confirmation"
                                        required
                                        autocomplete="new-password"
                                    />
                                    <ErrorMessage
                                        class="text-danger"
                                        name="password_confirmation"
                                    />
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-6 offset-md-4">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Registers
                                    </button>
                                </div>
                            </div>
                        </vee-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user";
import router from "@/router";
export default {
    name: "Register",
    data() {
        return {
            user: {
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
            },
            schema: {
                name: "required|min:5|max:50|alpha_spaces",
                email: "required|email",
                password: "required|min:5|max:20",
                password_confirmation: "required|confirmed:@password",
            },
            errorInfo: "",
        };
    },
    methods: {
        ...mapActions(useUserStore, ["authCheck"]),
        register() {
            axios.get("/sanctum/csrf-cookie").then((response) => {
                axios
                    .post("/api/register", this.user)
                    .then((response) => {
                        if (response.data.status === "success")
                            //this.authCheck();
                            this.$router.push({ name: "dashboard" });
                    })
                    .catch((error) => {
                        if (error.response.status === 422) {
                            this.errorInfo = error.response.data.message;
                        }
                    });
            });
        },
    },
};
</script>
