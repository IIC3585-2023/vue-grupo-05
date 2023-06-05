import { createRouter, createWebHistory } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../components/Home.vue";
import Register from "../components/Register.vue";
import Feed from "../components/Feed.vue";
import Boards from "../components/Boards.vue";
import BoardImages from "../components/BoardImages.vue";
import Users from "../components/Users.vue";

const routes = [
  { path: "/", component: Feed },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/feed", component: Feed },
  { path: "/users", component: Users },
  { path: "/users/:userId/boards", component: Boards },
  { path: "/boards/:boardId", component: BoardImages },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];
const publicRoutes = ["/login", "/register"];
const privateRoutes = ["/feed", "/users/:id"];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router, publicRoutes, privateRoutes };
