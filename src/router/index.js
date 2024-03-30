import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from '@/views/Login';
import RegistroComponent from '@/views/Registro';

Vue.use(VueRouter);

const routes = [
  { path: '/login', component: LoginComponent },
  { path: '/', component: LoginComponent },
  { path: '/registro', component: RegistroComponent },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
