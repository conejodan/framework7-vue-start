import Login from './pages/login.vue';
import Dashboard from './pages/dashboard.vue';
import Formulario from './pages/formulario.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: '/inicio',
    component: Dashboard
  },
  {
    path: '/formulario',
    component: Formulario
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
];
