import {createWebHistory, createRouter} from "vue-router";
import Login from "@/components/Login.vue";
import AdminLogin from "@/components/admin/AdminLogin.vue";
import Register from "@/components/Register.vue";
import Guest from "@/components/Guest.vue";
import Dashboard from "@/components/Dashboard.vue";
import About from "@/components/About.vue";
import Contact from "@/components/Contact.vue";
import useUserStore from "@/stores/user";
import useAdminStore from "@/stores/admin/adminAuth";
import LeaveTable from "@/components/LeaveTable.vue";
import AdminDashboard from "@/components/admin/AdminDashboard.vue";

const routes = [
    {
        name: "guest",
        path: "/",
        redirect: '/login',
        meta: {
            role: 'employee'
        },
        children: [
            {
                name: "login",
                path: "login",
                component: Login,
                meta: {
                    middleware: "guest",
                    title: "Login",
                },
            },
            {
                name: "register",
                path: "register",
                component: Register,
                meta: {
                    middleware: "guest",
                    title: "Register",
                },
            },
            {
                name: "dashboard",
                path: "dashboard",
                component: LeaveTable,
                meta: {
                    middleware: "auth",
                    title: "Dashboard",
                },
            },
            {
                name: "about",
                path: "about",
                component: About,
                meta: {
                    middleware: "auth",
                    title: "About",
                },
            },
            {
                name: "contact",
                path: "contact",
                component: Contact,
                meta: {
                    middleware: "auth",
                    title: "Contact",
                },
            },
        ]
    },
    {
        path: '/admin',
        redirect: 'admin-login',
        meta: {
            role: 'admin'
        },
        children: [
            {
                name: "admin-login",
                path: "login",
                component: AdminLogin,
                meta: {
                    middleware: "guest",
                    title: "Login",
                },
            },
            {
                name: "admin-dashboard",
                path: "dashboard",
                component: AdminDashboard,
                meta: {
                    middleware: "auth",
                    title: "Admin Dashboard",
                },
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title
    console.log(to.meta)
    if (to.meta.role === 'admin') {
        handleAdminRouteNavigation(to, next);
    } else {
        handleEmployeeRouteNavigation(to, next);
    }
    // handleEmployeeRouteNavigation(to, next);
    // store.authCheck().then((data) => {
    //     if (to.meta.middleware) {
    //         if (to.meta.middleware == "guest") {
    //             if (store.isLoggedIn) {
    //                 next({name: "dashboard"});
    //             }
    //             next();
    //         } else {
    //             if (store.isLoggedIn) {
    //                 next();
    //             } else {
    //                 next({name: "login"});
    //             }
    //         }
    //     }
    // });
});

function handleAdminRouteNavigation(to, next) {
    const adminStore = useAdminStore();
    const isAdminLoggedIn = localStorage.getItem('admin_token')
    if (to.meta.middleware) {
        if (to.meta.middleware === "guest") {
            if (isAdminLoggedIn) {
                next({ name: "admin-dashboard" });
            }
            next();
        } else {
            if (isAdminLoggedIn) {
                next();
            } else {
                next({ name: "admin-login" });
            }
        }
    }
}

function handleEmployeeRouteNavigation(to, next) {
    const store = useUserStore();
    store.authCheck().then((data) => {
        if (to.meta.middleware) {
            if (to.meta.middleware === "guest") {
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
}
export default router;
