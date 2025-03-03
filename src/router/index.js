import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from '@/views/Login';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/', component: LoginComponent },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
