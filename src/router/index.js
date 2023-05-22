import Vue from "vue";
import VueRouter from "vue-router";
import AuthMiddleware from "@nerd305/firebase-vuetify-auth/src/components/authguard";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Home",
    },
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/HomeView.vue"),
  },
  {
    path: "/blogs",
    name: "Blogs",
    meta: {
      title: "Blogs",
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/BlogsView.vue"),
  },
  {
    path: "/create-post",
    name: "CreatePost",
    meta: {
      title: "Create Post",
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/CreatePost.vue"),
  },
  {
    path: "/edit-post/:blogid",
    name: "EditPost",
    meta: {
      title: "Edit Post",
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/EditPost.vue"),
  },
  {
    path: "/post-preview",
    name: "BlogPreview",
    meta: {
      title: "Preview Blog Post",
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/BlogPreview.vue"),
  },
  {
    path: "/view-blog/:blogid",
    name: "ViewBlog",
    meta: {
      title: "View Blog Post",
    },
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/ViewBlog.vue"),
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   meta: {
  //     title: "Login",
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "blogs" */ "../views/LoginView.vue"),
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   meta: {
  //     title: "Register",
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "blogs" */ "../views/RegisterView.vue"),
  // },
  // {
  //   path: "/reset-password",
  //   name: "ForgotPassword",
  //   meta: {
  //     title: "Forgot Password",
  //   },
  //   component: () =>
  //     import(/* webpackChunkName: "blogs" */ "../views/ForgotPasswordView.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(AuthMiddleware);
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | VueBlogs`;
  next();
});

export default router;
