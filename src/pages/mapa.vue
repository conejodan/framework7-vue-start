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
                            <f7-button @click="get_map = !get_map" fill :color="(get_map)?'green':'red'" >
<f7-icon f7="compass_fill" ></f7-icon>
              </f7-button>
        </f7-nav-right>
    </f7-navbar>
    <f7-block v-if="ubication">
      <GmapMap v-if="get_map"
                        ref="googleMap"
                        :center="mapa.center_map"
                        :zoom="mapa.zoom_map"
                        :style="'width: auto; height:' + this.height +'px'"
                >
                <GmapMarker :position="mapa.center_map"/>
                <GmapPolygon v-if="puntos.length>2"
                  :path.sync="puntos"
                  :options="{
                                          strokeColor:'#008000',
                                          strokeOpacity: 0.8,
                                          fillColor: '#000000',
                                          fillOpacity: 0.2
                                          }"
                  :draggable="false"
                >
            </GmapPolygon>
          </GmapMap>
          <f7-block inner>
            <f7-row>
              <f7-col>
                <f7-button fill @click="saveLocation">Capturar Ubicacion</f7-button>
              </f7-col>
            </f7-row>
          </f7-block>
          <f7-list simple-list>
            <f7-list-item v-if="puntos.length<=2" :title="'Captura '+ (3 - puntos.length) + ' puntos'"></f7-list-item>
            <template v-if="puntos.length>=3">
              <f7-list-item :title="'Perimetro: ' + calcularPerimetro"></f7-list-item>
              <f7-list-item :title="'Area: ' + calculatArea"></f7-list-item>
              <f7-list-item :title="'Puntos: ' + puntos.length"></f7-list-item>
            </template>
          </f7-list>
          <f7-block inner v-if="puntos.length>0">
            <f7-row>
              <f7-col>
                <f7-button fill @click="borrar_ultimo_punto" color="red">Borrar ultimo Punto</f7-button>
              </f7-col>
            </f7-row>
          </f7-block>
    </f7-block>
    <f7-fab position="right-bottom" slot="fixed" v-if="puntos.length>1">
      <f7-icon f7="add"></f7-icon>
      <f7-icon f7="arrow_down" ></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="Ver puntos" fab-close color="orange" @click="popupOpened = true">
          <f7-icon f7="eye" md="material:close"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="Guardar Puntos" fab-close color="green">
          <f7-icon f7="document_text_fill"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="Eliminar Puntos" fab-close color="red" @click="borrar">
          <f7-icon f7="close"></f7-icon>
        </f7-fab-button>
      </f7-fab-buttons>
    </f7-fab>
    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Detalle de Puntos">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-list simple-list>
              <f7-list-item v-for="(punto,index) in puntos_detalle" :key="index" :title="punto"></f7-list-item>
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
      height:window.innerHeight / 3,
      db:null,
      get_map:true,
      mapa:{
          center_map:{lat:24.083304, lng:-102.339398},
          zoom_map:5
      },
      ubication:false,
      popupOpened:false,
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
    this.$f7.dialog.preloader("Obteniendo ubicacion...");
    this.getLocation();
    this.db= database();
    let usuario = auth().currentUser;
    console.log("Perfil Usuario", usuario);
  },
  computed:{
    calcularPerimetro:function(){
      let perimetro = 0;
      console.log(this.puntos.length)
      if(this.puntos.length>1){
        for (var i = 0; i < this.puntos.length - 1; i++) { 
          perimetro += this.getDistanceBetween(this.puntos[i],this.puntos[i+1]);
          console.log(perimetro);
        }
      }
      return perimetro.toFixed(2) + " metros";
    },
    calculatArea:function(){
      let result = 0;
      if(this.puntos.length>2){
        let poligon = this.puntos.map((item)=>{
          return new google.maps.LatLng(item.lat, item.lng)
        });
        result = google.maps.geometry.spherical.computeArea(poligon);
      }
      return result.toFixed(2) + " metros";
    }
  },
  methods:{
    loadPuntos(){
      
    },
    cargarPuntos(puntos){
      console.log("CargandoPuntos->", puntos);
      this.puntos_firebase = puntos;
      this.puntos = [];
      this.puntos_detalle = [];
      if(puntos){
        console.log("Tiene puntos")
        for(let key in puntos){
          let {lat, lng} = puntos[key];
          this.puntos.push({lat,lng});
        }
        if(this.puntos.length>1){
          for(let i = 0; i< this.puntos.length-1;i++){
            let distancia = this.getDistanceBetween(this.puntos[i],this.puntos[i+1])
            this.puntos_detalle.push("Trazo " + (i+1) + ": " + distancia + " metros")
            if(this.puntos.length>2 && ((i+2) == this.puntos.length)){
              let distancia = this.getDistanceBetween(this.puntos[i+1],this.puntos[0])
              this.puntos_detalle.push("Trazo " + (i+2) + ": " + distancia + " metros")
            }
          }
        }
      }
      //this.puntos = puntos;
    },
    borrar(){
      this.$f7.dialog.confirm('Quieres eliminar todos los puntos?', ()=> {
        this.$f7.dialog.alert('Puntos Eliminados!');
        this.puntos = [];
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
        return parseFloat(distance.toFixed(2));
    },
    saveLocation(){
      console.log("Guardado Location");
      let {lat, lng} = this.mapa.center_map;
      //this.puntos.push({lat,lng});
      let usuario = auth().currentUser;
      this.db.ref("/"+ usuario.uid + "/puntos").push({lat,lng}).then(()=>{
              console.log("Enviado")
          })
    },
    getWatchLocation(){
        navigator.geolocation.watchPosition((position)=>{
        console.log("Position",position);
        this.mapa.center_map.lat = position.coords.latitude;
        this.mapa.center_map.lng = position.coords.longitude;
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
        this.db.ref("/"+ usuario.uid+ "/puntos").on('value', snapshot => this.cargarPuntos(snapshot.val()));
        this.mapa.center_map.lat = position.coords.latitude;
        this.mapa.center_map.lng = position.coords.longitude;
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