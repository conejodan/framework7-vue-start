<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>Mapa</f7-nav-title>
        <f7-nav-right>
                          
        </f7-nav-right>
    </f7-navbar>
      <GmapMap v-if="get_map"
                        ref="googleMap"
                        :center="mapa.center_map"
                        :zoom="mapa.zoom_map"
                        :style="'width: auto; height:' + this.height +'px'"
                >
                <GmapMarker v-if="mapa.position" :position="mapa.position"/>
      </GmapMap>
    <f7-fab position="right-bottom" slot="fixed">
      <f7-icon f7="add"></f7-icon>
      <f7-icon f7="arrow_down" ></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="Ver puntos" fab-close color="orange" @click="popupPuntos = true">
          <f7-icon f7="eye" md="material:close"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="Guardar Punto" fab-close color="green" @click="popupGuardarPunto = true">
          <f7-icon f7="document_text_fill"></f7-icon>
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>
    <f7-popup class="demo-popup" :opened="popupPuntos" @popup:closed="popupPuntos = false">
      <f7-page>
        <f7-navbar title="Mis Puntos">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-list simple-list>
              
          </f7-list>
        </f7-block>
      </f7-page>
    </f7-popup>
    <f7-popup class="demo-popup" :opened="popupGuardarPunto" @popup:closed="popupGuardarPunto = false">
      <f7-page>
        <f7-navbar title="Guardar Punto">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-list simple-list>
              
          </f7-list>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
import {auth, database} from 'firebase';

export default {
  name: 'Home',
  data() {
    return {
      height:window.innerHeight ,
      db:null,
      get_map:true,
      mapa:{
          center_map:{lat:24.083304, lng:-102.339398},
          position:null,
          zoom_map:5
      },
      ubication:false,
      popupPuntos:false,
      popupGuardarPunto:false,
      last_punto:"",
      puntos_firebase:null,
      puntos_detalle:[],
      puntos:[
        // {lat:18.0361701, lng:-92.9304299},
        // {lat:17.9851545, lng:-92.9072556},
        // {lat:17.9856443, lng:-92.964333}
      ]
    };
  },
  mounted(){
    console.log("Montando Mapa");
    //this.$f7.dialog.preloader("Obteniendo ubicacion...");
    this.getLocation();
    this.db= database();
    let usuario = auth().currentUser;
    console.log("Perfil Usuario", usuario);
  },
  methods:{
    loadPuntos(){
      
    },
    
    borrar(){
      this.$f7.dialog.confirm('Quieres eliminar todos los puntos?', ()=> {
        this.$f7.dialog.alert('Puntos Eliminados!');
        
      let usuario = auth().currentUser;
      this.db.ref("/"+ usuario.uid + "/puntos").remove().then(()=>{
              console.log("Enviado")
          })
      });
    },
    borrar_ultimo_punto(){
      let last_key= "";
      for(let key in this.puntos_firebase){
          last_key = key;
        }
      let usuario = auth().currentUser;
      this.db.ref("/"+ usuario.uid + "/puntos/"+ last_key).remove().then(()=>{
              console.log("Enviado")
          })
    },
    calculate(){
      console.log("Calculando");
      
    },
    getDistanceBetween(first, second){
        let distance = 0;
        if(google){
          distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(first.lat, first.lng),new google.maps.LatLng(second.lat, second.lng));
        }
        return distance.toFixed(2);
    },
    saveLocation(){
      console.log("Guardado Location");
      let {lat, lng} = this.mapa.center_map;
      //this.puntos.push({lat,lng});
      let usuario = auth().currentUser;
      this.db.ref("/mis_puntos/"+ usuario.uid).push({lat,lng}).then(()=>{
              console.log("Enviado")
          })
    },
    getWatchLocation(){
        navigator.geolocation.watchPosition((position)=>{
        console.log("Position",position);
        this.$f7.dialog.close();
        let {latitude, longitude} = position.coords; 
        this.mapa.position = {lat:latitude, lng: longitude};
        this.mapa.zoom_map = 18;
        }, (error)=>{
          console.log("Error Watch");
          console.log(error);
        }, 
        {
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 500
        }
      );
    },
    getLocation(){
      console.log("Obteniendo ubicacion");
      navigator.geolocation.getCurrentPosition((position)=>{
        this.ubication = true;
        this.$f7.dialog.close();
        let usuario = auth().currentUser;
        //this.db.ref("/"+ usuario.uid+ "/puntos").on('value', snapshot => this.cargarPuntos(snapshot.val()));
        let {latitude, longitude} = position.coords; 
        this.mapa.center_map.lat = latitude;
        this.mapa.center_map.lng = longitude;
        this.mapa.position = {lat:latitude, lng: longitude};
        this.mapa.zoom_map = 18;
        this.getWatchLocation();
      }, (error)=>{
            console.log('Error Current Position: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
              if(error.code == 3){
            setTimeout(()=>{
              this.getLocation();
            },5000);
          }
      },{
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
    }
  }
};
</script>