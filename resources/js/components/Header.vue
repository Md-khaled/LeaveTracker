<template>
    <ul class="navbar-nav ms-auto">
        <!-- Authentication Links -->
        <template v-if="!this.userStore.isLoggedIn">
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'login' }"
                    >Login</router-link
                >
            </li>

            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'register' }"
                    >Register</router-link
                >
            </li>
        </template>
        <template v-else>
            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'about' }"
                    >About</router-link
                >
            </li>

            <li class="nav-item">
                <router-link class="nav-link" :to="{ name: 'contact' }"
                    >Contact</router-link
                >
            </li>
            <li class="nav-item dropdown">
                <a
                    id="navbarDropdown"
                    class="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                >
                    {{ userStore.user.name }}
                </a>

                <div
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                >
                    <a class="dropdown-item" @click.prevent="logout" href="#">
                        Logout
                    </a>
                </div>
            </li>
        </template>
    </ul>
</template>
<script>
import { mapStores } from "pinia";
import useUserStore from "@/stores/user";
export default {
    name: "Header",

    computed: {
        ...mapStores(useUserStore),
    },
    methods: {
        logout() {
            axios
                .post("/api/logout")
                .then((response) => {
                    if (response.data.status == "success") {
                        this.userStore.logout();
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>
