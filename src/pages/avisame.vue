<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>{{title}}</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
      <template v-if="!rastreo_activado">
        <f7-row tag="p">
          <f7-col>
            <f7-button fill >Seleccionar Punto en Mapa</f7-button>
          </f7-col>
        </f7-row>
        <f7-row tag="p">
          <f7-col>
            <f7-button fill @click="popupPuntos = true" >Seleccionar Punto Guardado</f7-button>
          </f7-col>
        </f7-row>
        <f7-row tag="p">
          <f7-col>
            <f7-button v-if="destino" fill @click="empezar_rastreo">Empezar Rastreo</f7-button>
          </f7-col>
        </f7-row>
      </template>
      <f7-row tag="p" v-else>
        <f7-col>
          <f7-button fill @click="detener_rastreo" >Detener Rastreo</f7-button>
        </f7-col>
      </f7-row>
      <f7-block v-if="destino">
          <p>Punto: {{destino.nombre}} </p>
          <p>Direccion: {{destino.direccion}} </p>
        </f7-block>
      <f7-list no-hairlines-md form>
        <f7-list-item>
          <f7-label>Rango Aviso Distancia</f7-label>
          <f7-input type="text" :value="distancia" @input="distancia = $event.target.value" placeholder="Coloca tu contraseña" clear-button></f7-input>
        </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-popup class="demo-popup" :opened="popupPuntos" @popup:closed="popupPuntos = false">
      <f7-page>
        <f7-navbar title="Mis Puntos">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-card-content :padding="false">
          <f7-list media-list>
              <f7-list-item v-for="(punto, index) in puntos_firebase" :key="index"
                :title="punto.nombre"
                :subtitle="punto.latitude + ',' + punto.longitude"
                :text="punto.direccion"
                @click="destino = punto;popupPuntos = false"
              >
            
              
              </f7-list-item>
          </f7-list>
          </f7-card-content>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  
  data() {
    return {
      title: 'Avisame',
      usuario:null,
      db:null,
      imagenTomada:'',
      watch_position:null,
      rastreo_activado: false,
      popupPuntos:false,
      puntos_firebase:null,
      veces:0,
      distancia:500,
      destino:null,//{latitude:18.00105,longitude:-92.9494865}
      
    };
  },
  mounted(){
    console.log("BGM::Mounted")
    this.db= database();
    this.usuario = auth().currentUser;
    this.syncData();
    setTimeout(()=>{
      if(cordova){
        cordova.plugins.backgroundMode.on('enable', ()=> { 
          console.log("BGM-EVENT::enable")
        });
        cordova.plugins.backgroundMode.on('disable', ()=> { 
            console.log("BGM-EVENT::disable")
        });
        cordova.plugins.backgroundMode.on('activate', ()=> { 
            console.log("BGM-EVENT::activate")
            this.veces = 0;
            cordova.plugins.backgroundMode.setDefaults({ 
              title: 'Ancle - Rastreo', 
              text: 'En viaje....', 
              resume: true, 
              hidden: false, 
              silent: false 
            });
            cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
            cordova.plugins.backgroundMode.moveToBackground();
            /* YOUR CODE GOES HERE */ 
            this.createWatchPosition();
          });
        cordova.plugins.backgroundMode.on('disactivate', ()=> { 
            console.log("BGM-EVENT::disactivate")
        });
        cordova.plugins.backgroundMode.on('failure', ()=> { 
            console.log("BGM-EVENT::failure")
        });
      }
    },1000)
  },
  methods:{
    empezar_rastreo(){
      this.rastreo_activado = true;
      this.enable()
      this.createWatchPosition();
    },
    detener_rastreo(){
      this.destino = null;
      this.rastreo_activado = false;
      this.clearWatchPosition();
      this.disable();
    },
    calculateDistance(start, end){
        let distance = 0;
        if(start && end){
            let R = 6371; // Radius of the earth in km
            //console.log("start",start);
            //console.log("end",end);
            let dLat = this.deg2rad(parseFloat(end.latitude) - parseFloat(start.latitude));  // deg2rad below
            //console.log("dLat",dLat)
            let dLon = this.deg2rad(parseFloat(end.longitude) - parseFloat(start.longitude));
            //console.log("dlon",dLon)
            let a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.deg2rad(parseFloat(end.latitude))) * Math.cos(this.deg2rad(parseFloat(start.latitude))) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
//            console.log("a",a)
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            //console.log("c",c)
            distance = (R * c) * 1000; // Distance in km
        }
        return distance.toFixed(2);
    },
    deg2rad(deg) {
      //console.log("deg2rad", deg)
        let a = deg * (Math.PI / 180)
        //console.log("deg2rad--", a)
        return a;
    },
    clearWatchPosition(){
      navigator.geolocation.clearWatch(this.watch_position);
      this.watch_position = null;
    },
    createWatchPosition(){
      this.watch_position = navigator.geolocation.watchPosition((position)=>{
              let {latitude, longitude} = position.coords; 
              console.log("BGM::Position");
              console.log(latitude);
              console.log(longitude);
              if(this.destino){
                let distancia = this.calculateDistance(position.coords, this.destino)
                console.log("Distancia");
                console.log(distancia);
                if(distancia < this.distancia){
                  navigator.vibrate(3000);
                  console.log("BGM::WakeUp");
                  console.log("BGM::WakeUp");
                  console.log("BGM::WakeUp");
                  this.watch_position = null;
                  //this.moveForeground()
                }  
              }
              
              }, (error)=>{
                console.log("Error Watch");
                console.log(error.message);
              }, 
              {
                timeout: 10000
              }
            );
    },
    enable(){     
      cordova.plugins.backgroundMode.enable();
    },
    disable(){
      cordova.plugins.backgroundMode.disable();
    },
    moveBackground(){
      cordova.plugins.backgroundMode.moveToBackground();
    },
    moveForeground(){
      cordova.plugins.backgroundMode.moveToForeground();
    },
    overrideBackButton(){
      cordova.plugins.backgroundMode.overrideBackButton();
    },
    wakeUp(){
      cordova.plugins.backgroundMode.wakeUp();
    },
    unlock(){
      cordova.plugins.backgroundMode.unlock();
    },
    cargarPuntos(puntos){
      console.log("Cargando Puntos");
      this.puntos_firebase = [];
      if(puntos){
        console.log("Tiene puntos")
        for(let key in puntos){
          console.log("puntos[key]", puntos[key])
          let {latitude, longitude, nombre, direccion} = puntos[key];
          let mostrar = (puntos[key]["mostrar"])?puntos[key]["mostrar"]:false;
          this.puntos_firebase.push({latitude, longitude, nombre, direccion, key, mostrar});
        }
        this.puntos_firebase.reverse();
      }
    },
    syncData(){
      console.log("Sincronizando")
      setTimeout(()=>{
        let usuario = auth().currentUser;
        this.db.ref("/puntos/" + usuario.uid).on('value', snapshot => this.cargarPuntos(snapshot.val()));
      },2000);
      
    },
    medir(){
      this.watch_position = navigator.geolocation.watchPosition((position)=>{
              let {latitude, longitude} = position.coords; 
              console.log("BGM::Position");
              console.log(latitude);
              console.log(longitude);
              this.veces += 1;
              console.log(this.veces);
              let distancia = this.calculateDistance(position.coords, {latitude:18.0232266,longitude:-92.9022477})
              console.log("Distancia");
              console.log(distancia);
              if(this.veces > 10){
                console.log("BGM::WakeUp");
                console.log("BGM::WakeUp");
                console.log("BGM::WakeUp");
              }
              }, (error)=>{
                console.log("Error Watch");
                console.log(error.message);
              }, 
              {
                timeout: 10000
              }
            );
    }
  },
};
</script>