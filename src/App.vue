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
            <f7-list-item title="Salir" @click="logout" panel-close></f7-list-item>
          </f7-list>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>
    <MyAdmob />

  </div>
</template>

<script>
import {auth} from 'firebase';
import {mapActions} from 'vuex';
import MyAdmob from './components/Admob';
export default {
  name: 'App',
  components: {
    MyAdmob
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
      setTimeout(()=>{
        this.bkgEnable()
      },1000);
      setTimeout(()=>{
        this.bkgIsScreenOff();
        this.appVersion()
      },5000);
      setTimeout(()=>{
        this.bkgDisable();
      },10000);
    },
    appVersion(){
      setTimeout(()=>{
        cordova.getAppVersion.getVersionNumber().then(function (version) {
          alert("Version Number " + version);
        });
      },5000);
      setTimeout(()=>{
        cordova.getAppVersion.getVersionCode().then(function (version) {
          alert("Version Code " + version);
        });
      },10000);
      setTimeout(()=>{
        cordova.getAppVersion.getPackageName().then(function (version) {
          alert("Package Name " + version);
        });
      },15000);
      setTimeout(()=>{
        cordova.getAppVersion.getAppName().then(function (version) {
          alert("App Name" + version);
        });
      },20000);
      
    },
    bkgEnable(){
      console.log("bkgEnable")
      setTimeout(()=>{
        cordova.plugins.backgroundMode.on('activate', ()=> { 
          console.log("onActivate")
          cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
          cordova.plugins.backgroundMode.moveToBackground(); 
          setInterval(()=>{
            this.getLocation();
          },2000);
          /* YOUR CODE GOES HERE */ });
        //cordova.plugins.backgroundMode.disableWebViewOptimizations();
      },1000)
      setTimeout(()=>{
        //cordova.plugins.backgroundMode.enable();
      },2000)
    },
    getLocation(){
      navigator.geolocation.getCurrentPosition((position)=>{
          console.log("getPosicion");
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        }, (error)=>{
              console.log('Error Current Position: '    + error.code    + ',' +
                'message: ' + error.message + '\n');
                if(error.code == 3){
              setTimeout(()=>{
                this.getLocation();
              },3000);
            }
        },{
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
    },
    bkgDisable(){
      console.log("bkgDisable")
      cordova.plugins.backgroundMode.disable();
    },
    onResume(){
      console.log("onResume");
    },
  },
  mounted(){
    
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