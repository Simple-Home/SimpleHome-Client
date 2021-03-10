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
    component: () => import('../views/auth/Login.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('../views/auth/Logout.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/Register.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/recover-password',
    name: 'RecoverPassword',
    component: () => import('../views/auth/RecoverPassword.vue'),
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/device-detail/:id',
    name: 'DeviceDetail',
    component: () => import('../components/DeviceDetail.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/device-editor/:id',
    name: 'DeviceEditor',
    component: () => import('../components/DeviceEditor.vue'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/automation-form/:id',
    name: 'AutomationForm',
    component: () => import('../components/AutomationForm.vue'),
    meta: {
      requiresAuth: true,
    }
  },
];

const router = new VueRouter({
  routes,
});

export default router;
