<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>Dashboard</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showBanner">ShowBanner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="requestInterstitial">requestInterstitial</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showInterstitial">showInterstitial</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showAd">ShowAdmob</f7-button>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import firebase from 'firebase';
import {mapActions} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World',
      panel_left: false
    };
  },
  mounted(){
    console.log("Iniciando")
    let usuario = firebase.auth().currentUser;
    console.log("Dashboard Usuario",usuario);
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log("onAuthStateChange", user)
        this.saveUsuario(user.uid)
      }
    });
  },
  methods:{
    ...mapActions(['saveUsuario']),
    showBanner(){
      window.plugins.AdMob.createBannerView();
    },
    createInterstitial(){
      window.plugins.AdMob.createInterstitialView();
    },
    requestInterstitial(){
      window.plugins.AdMob.requestInterstitialAd();
    },
    showInterstitial(){
      window.plugins.AdMob.showInterstitialAd();
    },
    showAd(){
      this.createInterstitial()
      this.requestInterstitial()
      this.showInterstitial()
    },
  }
};
</script>
