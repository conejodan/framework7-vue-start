import Login from './pages/login.vue';
import Registrar from './pages/registrar.vue';
import Dashboard from './pages/dashboard.vue';
import Perfil from './pages/perfil.vue';
import Entrevista from './pages/Entrevista/entrevista.vue';
import EntrevistaDomicilio from './pages/Entrevista/domicilio.vue';
import EntrevistaServLote from './pages/Entrevista/servicioslote.vue';
import EntrevistaServVivienda from './pages/Entrevista/serviciosvivienda.vue';
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
    path: '/entrevista',
    component: Entrevista
  },
  {
    path: '/entrevista/domicilio',
    component: EntrevistaDomicilio
  },
  {
    path: '/entrevista/serv_lote',
    component: EntrevistaServLote
  },
  {
    path: '/entrevista/serv_vivienda',
    component: EntrevistaServVivienda
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
