import Login from './pages/login.vue';
import Registrar from './pages/registrar.vue';
import Dashboard from './pages/dashboard.vue';
import Perfil from './pages/perfil.vue';
import Mapa from './pages/mapa.vue';
import NotFoundPage from './pages/not-found.vue';

let router =  [
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
    component: Perfil
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

export default router;
