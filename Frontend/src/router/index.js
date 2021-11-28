import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    path: "/",
    alias: "/ListChamp",
    name: "ListChamp",
    component: () => import("../views/ListChamp.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/UserLogin.vue"),
  },
  {
    path: "/skin/:champId",
    name: "Skin",    
    component: () => import("../views/Skin.vue"),
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/UserRegister.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/UserProfile.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});



export default router;