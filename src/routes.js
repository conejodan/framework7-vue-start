import HomePage from './pages/home.vue';
import Inicio from './pages/inicio.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/inicio',
    component: Inicio
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
];
