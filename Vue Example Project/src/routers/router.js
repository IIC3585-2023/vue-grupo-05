import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import Register from '../components/Register.vue';
import Card from '../components/Card.vue';
import UserProfile from '../components/UserProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/feed', component: Card },
  { path: '/users/:id', component: UserProfile },
  { path: '/:pathMatch(.*)*', redirect: '/' }
];
const publicRoutes = ['/login', '/register'];
const privateRoutes = ['/feed', '/users/:id'];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export {
  router,
  publicRoutes,
  privateRoutes
};