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
        <f7-fab-button label="Guardar Punto" fab-close color="green" @click="openSavePunto">
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
          <f7-card-content :padding="false">
          <f7-list media-list>
              <f7-list-item v-for="(punto, index) in puntos_firebase" :key="index"
                link="#"
                :title="punto.nombre"
                :subtitle="punto.latitude + ',' + punto.longitude"
                :text="punto.direccion"
              ></f7-list-item>
          </f7-list>
          </f7-card-content>
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
          <f7-list no-hairlines-md form>
            <f7-list-item>
                <f7-label>Alias</f7-label>
                <f7-input type="text" placeholder="" 
                :value="form.nombre" @input="form.nombre = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Latitude</f7-label>
                <f7-input type="text" placeholder="" 
                :value="form.latitude" @input="form.latitude = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Longitude</f7-label>
                <f7-input type="text" placeholder="" 
                :value="form.longitude" @input="form.longitude = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Direccion</f7-label>
                <f7-input type="text" placeholder="" 
                :value="form.direccion" @input="form.direccion = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-row>
            <f7-col>
                <f7-button fill @click="savePunto">Guardar Punto</f7-button>
            </f7-col>
          </f7-row>
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
      form:{
        nombre: "",
        latitude:"",
        longitude:"",
        direccion:""
      },
      ubication:false,
      popupPuntos:false,
      popupGuardarPunto:false,
      puntos_firebase:null,
    };
  },
  mounted(){
    console.log("Montando Mapa");
    //this.$f7.dialog.preloader("Obteniendo ubicacion...");
    this.getLocation();
    this.db= database();
    let usuario = auth().currentUser;
    console.log("Perfil Usuario", usuario);
    this.db.ref("/puntos/" + usuario.uid).on('value', snapshot => this.cargarPuntos(snapshot.val()));
  },
  methods:{
    cargarPuntos(puntos){
      console.log("Cargando Puntos");
      if(puntos){
        this.puntos_firebase = [];
        console.log("Tiene puntos")
        for(let key in puntos){
          console.log("puntos[key]", puntos[key])
          let {latitude, longitude, nombre, direccion} = puntos[key];
          this.puntos_firebase.push({latitude, longitude, nombre, direccion});
        }
      }
    },
    openSavePunto(){
      this.popupGuardarPunto = true;
      this.form.latitude = this.mapa.position.lat;
      this.form.longitude = this.mapa.position.lng;
    },
    savePunto(){
      console.log("Guardando Puntos", this.form);
      let usuario = auth().currentUser;
      this.db.ref("/puntos/"+ usuario.uid).push(this.form).then(()=>{
              this.popupGuardarPunto = false;
              alert("Punto Guardado")
              console.log("Enviado")
          })
    },
    getPuntos(){

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