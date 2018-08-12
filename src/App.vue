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
    initAd(){
      if ( window.plugins && window.plugins.AdMob ) {
        var ad_units = {
            ios : {
                banner: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx',       //PUT ADMOB ADCODE HERE
                interstitial: 'ca-app-pub-xxxxxxxxxxx/xxxxxxxxxxx'  //PUT ADMOB ADCODE HERE
            },
            android : {
                banner: 'ca-app-pub-6894711411071006/2975463962',       //PUT ADMOB ADCODE HERE
                interstitial: 'ca-app-pub-6894711411071006/1673467493'  //PUT ADMOB ADCODE HERE
            }
        };
        var admobid = ( /(android)/i.test(navigator.userAgent) ) ? ad_units.android : ad_units.ios;

        window.plugins.AdMob.setOptions( {
            publisherId: admobid.banner,
            interstitialAdId: admobid.interstitial,
            adSize: window.plugins.AdMob.AD_SIZE.SMART_BANNER,  //use SMART_BANNER, BANNER, LARGE_BANNER, IAB_MRECT, IAB_BANNER, IAB_LEADERBOARD
            bannerAtTop: false, // set to true, to put banner at top
            overlap: true, // banner will overlap webview
            offsetTopBar: false, // set to true to avoid ios7 status bar overlap
            isTesting: false, // receiving test ad
            autoShow: false // auto show interstitial ad when loaded
        });

        this.registerAdEvents();
        window.plugins.AdMob.createInterstitialView();  //get the interstitials ready to be shown
        window.plugins.AdMob.requestInterstitialAd();

      } else {
          //alert( 'admob plugin not ready' );
      }
    },
    onResume(){
      console.log("onResume");
      setTimeout(()=>{
        window.plugins.AdMob.createBannerView();
      },500);
    },
    registerAdEvents(){
      document.addEventListener("resume", this.onResume);

      document.addEventListener('onReceiveAd', function(){
        console.log("onReceiveAd")
      });
      document.addEventListener('onFailedToReceiveAd', function(data){
        console.log("onFailedToReceiveAd")
      });
      document.addEventListener('onPresentAd', function(){
        console.log("onPresentAd")
      });
      document.addEventListener('onDismissAd', function(){
        console.log("onDismissAd")
       });
      document.addEventListener('onLeaveToAd', function(){
        console.log("onLeaveToAd")
       });
      document.addEventListener('onReceiveInterstitialAd', function(){
        console.log("onReceiveInterstitialAd")
       });
      document.addEventListener('onPresentInterstitialAd', function(){
        console.log("onPresentInterstitialAd")
       });
      document.addEventListener('onDismissInterstitialAd', function(){
        console.log("onDismissInterstitialAd")
        //window.plugins.AdMob.createBannerView();
          //window.plugins.AdMob.createInterstitialView();          //REMOVE THESE 2 LINES IF USING AUTOSHOW
          //window.plugins.AdMob.requestInterstitialAd();           //get the next one ready only after the current one is closed
      });
    },
    showBannerFunc(){
      window.plugins.AdMob.createBannerView();
    },
    showInterstitialFunc(){
      window.plugins.AdMob.showInterstitialAd();
    }
  },
  mounted(){
    setTimeout(()=>{
      console.log("Cargando banners")
      this.initAd();
      this.showBannerFunc();
      this.showInterstitialFunc();
      // setInterval(()=>{
      //   window.plugins.AdMob.createInterstitialView();          //REMOVE THESE 2 LINES IF USING AUTOSHOW
      //   window.plugins.AdMob.requestInterstitialAd();
      // },10000);
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
