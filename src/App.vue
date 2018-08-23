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


  </div>
</template>

<script>
import {auth} from 'firebase';
import {mapActions} from 'vuex';
export default {
  name: 'App',
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
        console.log("Cargando banners")
        this.initAds();
        this.bkgEnable()
      },1000);
      setTimeout(()=>{
        this.bkgIsScreenOff();
      },10000);
      setTimeout(()=>{
        this.bkgDisable();
      },30000);
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
    bkgIsScreenOff(){
      // cordova.plugins.backgroundMode.isScreenOff(function(bool) {
      //         console.log("Mandando mensaje")
      //         console.log(bool)
      // });
    },
    bkgDisable(){
      console.log("bkgDisable")
      cordova.plugins.backgroundMode.disable();
    },
    onResume(){
      console.log("onResume");
      setTimeout(()=>{
       //admob.banner.prepare();
       admob.interstitial.prepare();
       admob.rewardvideo.prepare();
      },500);
    },
    initAds(){
      var admobid = {}
      if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
        admobid = {
          banner: 'ca-app-pub-6894711411071006/2975463962',
          interstitial: 'ca-app-pub-6894711411071006/1673467493',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
          isTesting: false,
        }
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
        admobid = {
          banner: 'ca-app-pub-6894711411071006/2975463962',
          interstitial: 'ca-app-pub-6894711411071006/1673467493',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
          isTesting: false,
        }
      }
      admob.banner.config({
        id: admobid.banner,
        isTesting: admobid.isTesting,
        autoShow: true,
      })
      admob.banner.prepare();
      //admob.banner.show();
      admob.interstitial.config({
        id: admobid.interstitial,
        isTesting: admobid.isTesting,
        autoShow: false,
      })
      admob.interstitial.prepare()
      //admob.interstitial.show()
      admob.rewardvideo.config({
        id: admobid.rewarded,
        isTesting: admobid.isTesting,
        autoShow: false,
      })
      admob.rewardvideo.prepare()
    },
    showInsterstitial(){
      console.log("showInsteerstitial")
      admob.interstitial.show()
    }
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