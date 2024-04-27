import { createWebHistory, createRouter } from "vue-router";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";
import Guest from "@/components/Guest.vue";
import Dashboard from "@/components/Dashboard.vue";
import About from "@/components/About.vue";
import Contact from "@/components/Contact.vue";
import useUserStore from "@/stores/user";

const routes = [
    {
        name: "guest",
        path: "/",
        component: Guest,
        meta: {
            middleware: "guest",
            title: "Guest",
        },
    },
    {
        name: "login",
        path: "/login",
        component: Login,
        meta: {
            middleware: "guest",
            title: "Login",
        },
    },
    {
        name: "register",
        path: "/register",
        component: Register,
        meta: {
            middleware: "guest",
            title: "Register",
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
    {
        name: "about",
        path: "/about",
        component: About,
        meta: {
            middleware: "auth",
            title: "About",
        },
    },
    {
        name: "contact",
        path: "/contact",
        component: Contact,
        meta: {
            middleware: "auth",
            title: "Contact",
        },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
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
