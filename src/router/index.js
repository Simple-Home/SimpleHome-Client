import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/automations',
    name: 'Automations',
    component: () => import('../views/Automations.vue'),
  },
  {
    path: '/scenes',
    name: 'Scenes',
    component: () => import('../views/Scenes.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: () => import('../views/RecoverPassword.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
