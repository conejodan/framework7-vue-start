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
            <f7-list-item title="Salir" @click="logout" panel-close></f7-list-item>
          </f7-list>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>


  </div>
</template>

<script>
import firebase from 'firebase';
import {mapActions} from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions(['saveUsuario']),
    logout(){
      console.log("Logout");
      firebase.auth().signOut().then(()=>{
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
    onResume(){
      console.log("onResume");
      setTimeout(()=>{
       //this.initAds(); 
      },2500);
    },
    initAds(){
      var admobid = {}
      if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
        admobid = {
          banner: 'ca-app-pub-3940256099942544/6300978111',
          interstitial: 'ca-app-pub-3940256099942544/1033173712',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
        }
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
        admobid = {
          banner: 'ca-app-pub-3940256099942544/2934735716',
          interstitial: 'ca-app-pub-3940256099942544/4411468910',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
        }
      }

      admob.banner.config({
        id: admobid.banner,
        isTesting: true,
        autoShow: true,
      })
      admob.banner.prepare();
      //admob.banner.show();

      admob.interstitial.config({
        id: admobid.interstitial,
        isTesting: true,
        autoShow: false,
      })
      admob.interstitial.prepare()
      //admob.interstitial.show()

      admob.rewardvideo.config({
        id: admobid.rewarded,
        isTesting: true,
        autoShow: true,
      })
      admob.rewardvideo.prepare()
    },
    showInsterstitial(){
      console.log("showInsteerstitial")
      admob.interstitial.show()
    }
  },
  mounted(){
    setTimeout(()=>{
      console.log("Cargando banners")
      this.initAds();
    },500);
  },
  computed: {
    isiOS() {
      return window.isiOS;
    }
  },
  created() {
    document.addEventListener('backbutton', this.handleBackButton);
  }
};
</script>
