<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Login</div>

                    <div class="card-body">
                        <vee-form
                            :validation-schema="schema"
                            @submit="login"
                            method="POST"
                        >
                            <div class="row" v-if="this.errorInfo">
                                <div class="col-md-12 text-danger text-center">
                                    <p class="mb-1">{{ this.errorInfo }}</p>
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
                                        v-model="auth.email"
                                        class="form-control"
                                        name="email"
                                        required
                                        autocomplete="email"
                                        autofocus
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
                                        v-model="auth.password"
                                        type="password"
                                        class="form-control"
                                        name="password"
                                        required
                                    />
                                    <ErrorMessage
                                        class="text-danger"
                                        name="password"
                                    />
                                </div>
                            </div>

                            <div class="row mb-3">
                                <div class="col-md-6 offset-md-4">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            name="remember"
                                            id="remember"
                                        />

                                        <label
                                            class="form-check-label"
                                            for="remember"
                                        >
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div class="row mb-0">
                                <div class="col-md-8 offset-md-4">
                                    <button
                                        type="submit"
                                        class="btn btn-primary"
                                    >
                                        Login
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
import { mapActions, mapWritableState } from "pinia";
import useUserStore from "@/stores/user";
export default {
    name: "Login",
    computed: {
        ...mapWritableState(useUserStore, ["errorInfo"]),
    },
    data() {
        return {
            schema: {
                email: "required|email",
                password: "required|min:5|max:25",
            },
            auth: {
                email: "",
                password: "",
            },
        };
    },
    methods: {
        ...mapActions(useUserStore, ["authenticate"]),

        login(values) {
            this.authenticate(values);
        },
    },
};
</script>
