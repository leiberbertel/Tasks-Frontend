// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import TaskView from '../views/TaskView.vue';
import UserLogin from '../views/UserLogin.vue';
import UserRegister from '../views/UserRegister.vue';

const routes = [
  {
    path: '/tasks',
    name: 'TaskView',
    component: TaskView
  },
  {
    path: '/',
    name: 'UserLogin',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'UserRegister',
    component: UserRegister
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
