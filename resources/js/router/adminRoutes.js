import { createWebHistory, createRouter } from "vue-router";

import Login from "@/components/Login.vue";
import Dashboard from "@/components/Dashboard.vue";

const routes = [
    {
        name: "login",
        path: "/admin/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: "Login",
        },
    },
    {
        name: "dashboard",
        path: "/dashboard",
        component: Dashboard,
        meta: {
            middleware: "auth",
            title: "Dashboard",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    const store = useUserStore();
    store.authCheck().then((data) => {
        if (to.meta.middleware) {
            if (to.meta.middleware == "guest") {
                if (store.isLoggedIn) {
                    next({ name: "dashboard" });
                }
                next();
            } else {
                if (store.isLoggedIn) {
                    next();
                } else {
                    next({ name: "login" });
                }
            }
        }
    });
});

export default router;
