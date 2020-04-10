import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/scenes',
    name: 'Scenes',
    component: () => import('../views/Scenes.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: () => import('../views/RecoverPassword.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
