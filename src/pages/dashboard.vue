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
      <f7-row tag="p" v-if="false">
        <f7-col>
          <f7-button fill @click="prepareBanner">Prepare Banner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p" v-if="false">
        <f7-col>
          <f7-button fill @click="showBanner">Show Banner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p" v-if="false">
        <f7-col>
          <f7-button fill @click="prepareInterstitial">Prepare Interstitial</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showInterstitial">Show Insterstitial</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p" v-if="false">
        <f7-col>
          <f7-button fill @click="prepareRewarded">Prepare Rewarded</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showReward">Show Rewarded</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p" v-if="false">
        <f7-col>
          <f7-button fill @click="sumarPuntos">Puntos: {{puntos}} - {{puntos_por_puntos}}</f7-button>
        </f7-col>
      </f7-row>
      <f7-row>
          <f7-list simple-list>
              <f7-list-item :title="'Monto Ganado: $' + ((puntos)?puntos/100:0) + ' pesos (MXN)' "></f7-list-item>
          </f7-list>
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
      panel_left: false,
      puntos: 0,
      puntos_por_puntos: 0,
      db:null
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
        this.cargarFire()
      }
    });
  },
  methods:{
    ...mapActions(['saveUsuario']),
    cargarFire(){
      let usuario = firebase.auth().currentUser;
      this.db= firebase.database();
      console.log("Perfil Usuario", usuario);
        this.db.ref("/"+ usuario.uid+ "/puntos_ads").on('value', snapshot => this.cargarPuntos(snapshot.val()));
        this.db.ref("/configs").on('value', snapshot => this.cargarConfig(snapshot.val()));
    },
    cargarPuntos(puntos){
          this.puntos = puntos;
      },
      cargarConfig(config){
        console.log("config", config)
        this.puntos_por_puntos = config.puntos_por_puntos
      },
    prepareBanner(){
      console.log("Preparando Banner");
      admob.banner.prepare();
    },
    showBanner(){
      console.log("Mostrando Banner");
      admob.banner.show();
    },
    prepareInterstitial(){
      console.log("Preparando Insterstitial");
      admob.interstitial.prepare();
    },
    showInterstitial(){
      console.log("Mostrando Interstitial");
      admob.interstitial.show()
    },
    prepareRewarded(){
      console.log("Preparando Reward");
      admob.rewardvideo.prepare()
    },
    showReward(){
      console.log("Mostrando Reward");
      admob.rewardvideo.show()
    },
    sumarPuntos(){  
      let puntos = Math.floor((Math.random() * 4) + this.puntos_por_puntos);
      let puntos_ads = puntos + this.puntos;
      console.log("Sumando Puntos", this.puntos, puntos, puntos_ads)
      let usuario = firebase.auth().currentUser;
          console.log(usuario);
          this.db.ref("/"+ usuario.uid + "/puntos_ads").set(puntos_ads).then(()=>{
              console.log("Enviado")
          })
    },
  },
  created() {
    document.addEventListener("admob.rewardvideo.events.REWARD", this.sumarPuntos);
  }
};
</script>