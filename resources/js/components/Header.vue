<template>
    <ul class="navbar-nav ms-auto">
        <!-- Authentication Links -->
        <template v-if="!(this.userStore.isLoggedIn || this.adminStore.isAdminLoggedIn)">
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
                    <span v-if="adminStore.role == 'admin'">
                        {{ adminStore.user.name }}
                    </span>
                   <span v-if="userStore.role == 'employee'">
                        {{ userStore.user.name }}
                   </span>
                </a>

                <div
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdown"
                >
                    <a class="dropdown-item" @click.prevent="logoutt" href="#">
                        Logout
                    </a>
                </div>
            </li>
        </template>
    </ul>
</template>
<script>
import {mapActions, mapStores, mapWritableState} from "pinia";
import useUserStore from "@/stores/user";
import useAdminStore from "@/stores/admin/adminAuth";
export default {
    name: "Header",
    computed: {
        ...mapStores(useUserStore),
        ...mapStores(useAdminStore),
    },
    methods: {
        ...mapActions(useUserStore, ["logout"]),
        ...mapActions(useAdminStore, ["adminlogout"]),

        logoutt() {
            let role = localStorage.getItem('access_role')
            console.log(role)
            if (role == 'admin')
            {
                this.adminlogout();
            }
            if (role == 'employee')
            {
                this.logout();
            }
        },
    },
};
</script>
