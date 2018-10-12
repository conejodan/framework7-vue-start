import Login from './pages/login.vue';
import Registrar from './pages/registrar.vue';
import Dashboard from './pages/dashboard.vue';
import Perfil from './pages/perfil.vue';
import Entrevista from './pages/Entrevista/entrevista.vue';
import EntrevistaDomicilio from './pages/Entrevista/domicilio.vue';
import EntrevistaServLote from './pages/Entrevista/servicioslote.vue';
import EntrevistaServVivienda from './pages/Entrevista/serviciosvivienda.vue';
import EntrevistaFactibilidad from './pages/Entrevista/factibilidad.vue';
import EntrevistaSeguridadEstructural from './pages/Entrevista/seguridadestructural.vue';
import EntrevistaFamilia from './pages/Entrevista/familia.vue';
import EntrevistaEspacios from './pages/Entrevista/espacios.vue';
import EntrevistaDatos from './pages/Entrevista/entrevista_datos.vue';
import Mapa from './pages/mapa.vue';
import Mapa2 from './pages/mapa2.vue';
import Camara from './pages/camara.vue';
import Background from './pages/background.vue';
import OneSignal from './pages/onesignal.vue';
import ToDo from './pages/ToDoList/dashboard.vue';
import Avisame from './pages/avisame.vue';
import Paypal from './pages/paypal.vue';
import Admob from './pages/admob.vue';
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
    path: '/entrevista/factibilidad',
    component: EntrevistaFactibilidad
  },
  {
    path: '/entrevista/seguridad_estructural',
    component: EntrevistaSeguridadEstructural
  },
  {
    path: '/entrevista/familia',
    component: EntrevistaFamilia
  },
  {
    path: '/entrevista/espacios',
    component: EntrevistaEspacios
  },
  {
    path: '/entrevista/entrevista_datos',
    component: EntrevistaDatos
  },
  {
    path: '/mapa',
    component: Mapa
  },
  {
    path: '/mapa2',
    component: Mapa2
  },
  {
    path: '/camara',
    component: Camara
  },
  {
    path: '/background',
    component: Background
  },
  {
    path: '/onesignal',
    component: OneSignal
  },
  {
    path: '/todo',
    component: ToDo
  },
  {
    path: '/avisame',
    component: Avisame
  },
  {
    path: '/paypal',
    component: Paypal
  },
  {
    path: '/admob',
    component: Admob
  },
  {
    path: '(.*)',
    component: NotFoundPage
  }
];

export default router;
