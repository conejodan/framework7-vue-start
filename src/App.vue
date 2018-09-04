<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <f7-panel left reveal>
          <f7-block-title>Menu</f7-block-title>
          <f7-list>
            <f7-list-item title="Inicio" link="/inicio" panel-close></f7-list-item>
            <f7-list-item title="Perfil" link="/formulario" panel-close></f7-list-item>
            <f7-list-item title="Entrevista" link="/entrevista" panel-close></f7-list-item>
            <f7-list-item title="Mapa" link="/mapa" panel-close></f7-list-item>
            <f7-list-item title="Camara" link="/camara" panel-close></f7-list-item>
            <f7-list-item title="Background" link="/background" panel-close></f7-list-item>
            <f7-list-item title="OneSignal" link="/onesignal" panel-close></f7-list-item>
            <f7-list-item title="Salir" @click="logout" panel-close></f7-list-item>
          </f7-list>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>
    <MyAdmob />
    <AppVersion />
    <BackgroundMode />

  </div>
</template>

<script>
import {auth} from 'firebase';
import {mapActions} from 'vuex';
import MyAdmob from './components/Admob';
import AppVersion from './components/AppVersion';
import BackgroundMode from './components/BackgroundMode';

export default {
  name: 'App',
  components: {
    MyAdmob,
    AppVersion,
    BackgroundMode
  },
  methods: {
    ...mapActions(['saveUsuario']),
    logout(){
      console.log("Logout");
      auth().signOut().then(()=>{
        this.saveUsuario(null);
        this.$f7.panel.close();
        this.$f7.views.main.router.navigate('/')
      });
    },
    handleBackButton() {
      console.log("handleBackButton")
      // NOTE: The back button will behave differently depending on circumstance
      // If the side panel is open, close it
      if (document.querySelector('.panel-left.panel-active')) {
        // This will do nothing when the split-view is open
        return this.$f7.panel.close();
      }
      // Close modals
      // @TODO How to handle modals we shouldn't close like a login-screen?
      if (document.querySelector('.modal-in')) {
        return this.$f7.popover.close();
      }
      // If we have a back button, we want it to go back
      if (this.$f7.views.main.router.history.length > 1) {
        return this.$f7.views.main.router.back();
      }
      // Default to closing the app
      this.$f7.dialog.confirm('Quieres salir de la aplicacion?', ()=> {
        return window.navigator.app.exitApp();
      });
      
    },
    onDeviceReady(){
      
    },
    onResume(){
      console.log("onResume");
    },
  },
  mounted(){
    setTimeout(()=>{
      console.log("App::montando");
      var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };

      window.plugins.OneSignal
        .startInit("50217a8f-a10d-4539-8e80-6b252c78ccff")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();
    },1000);
  },
  computed: {
    isiOS() {
      return window.isiOS;
    }
  },
  created() {
    document.addEventListener('backbutton', this.handleBackButton);
    document.addEventListener('resume', this.onResume);
    document.addEventListener("deviceready", this.onDeviceReady);
  }
};
</script>