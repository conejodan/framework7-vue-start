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
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="enable">Enable</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="disable">Disable</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="moveBackground">MoveBackground</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="moveForeground">MoveForeGround</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="overrideBackButton">OverrideBackButton</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="wakeUp">WakeUp</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="unlock">Unlock</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="medir">Medir</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  
  data() {
    return {
      title: 'BackgroundMode',
      imagenTomada:'',
      watch_position:null,
      veces:0
    };
  },
  mounted(){
    console.log("BGM::Mounted")
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
            this.watch_position = navigator.geolocation.watchPosition((position)=>{
              let {latitude, longitude} = position.coords; 
              console.log("BGM::Position");
              console.log(latitude);
              console.log(longitude);
              this.veces += 1;
              console.log(this.veces);
              let distancia = this.calculateDistance(position.coords, {latitude:18.00105,longitude:-92.9494865})
              console.log("Distancia");
              console.log(distancia);
              if(distancia < 200){
                navigator.vibrate(3000);
                console.log("BGM::WakeUp");
                console.log("BGM::WakeUp");
                console.log("BGM::WakeUp");
                this.watch_position = null;
                //this.moveForeground()
              }
              }, (error)=>{
                console.log("Error Watch");
                console.log(error.message);
              }, 
              {
                timeout: 10000
              }
            );
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