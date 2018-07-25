import Login from './pages/login.vue';
import Registrar from './pages/registrar.vue';
import Dashboard from './pages/dashboard.vue';
import Formulario from './pages/formulario.vue';
import Mapa from './pages/mapa.vue';
import NotFoundPage from './pages/not-found.vue';

export default [
  {
    path: '/',
    component: Login
  },
  {
    path: '/registrar',
    component: Registrar
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
    path: '/mapa',
    component: Mapa
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
];
