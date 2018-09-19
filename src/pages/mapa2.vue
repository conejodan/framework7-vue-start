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
          <f7-fab-button class="btn" v-if="clickPosition" @click="clickPosition = null" >
<f7-icon f7="close_round_fill" ></f7-icon>
              </f7-fab-button>  
              <f7-fab-button class="btn" round @click="openSavePunto" >
<f7-icon f7="add_round_fill" ></f7-icon>
              </f7-fab-button>  
        </f7-nav-right>
    </f7-navbar>
      <GmapMap v-if="get_map"
                        ref="googleMap"
                        :center="mapa.center_map"
                        @click="clickMap"
                        :zoom="mapa.zoom_map"
                        :options="{minZoom: 5, maxZoom: 19}"
                        :style="'width: auto; height:' + this.height +'px'"
                >
                <GmapMarker v-if="mapa.position" :position="mapa.position" :icon="pinSymbol('#007aff')"/>
                <GmapMarker v-if="clickPosition" :draggable="true" :position="clickPosition" :icon="pinSymbol('#000000')"/>
                <GmapMarker 
                v-if="puntos_firebase && marker.mostrar" v-for="(marker, index) in puntos_firebase" 
                :clickable="true"
                @click="showHidePunto(marker)"
                :key="index" 
                :position="{lat:marker.latitude, lng:marker.longitude}"/>
      </GmapMap>
    <f7-fab position="left-bottom" slot="fixed">
      <f7-icon f7="add"></f7-icon>
      <f7-icon f7="arrow_down" ></f7-icon>
      <f7-fab-buttons position="top">
        <f7-fab-button label="Ver puntos" fab-close color="orange" @click="popupPuntos = true">
          <f7-icon f7="eye" md="material:close"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="Guardar Punto" fab-close color="green" @click="openSavePunto">
          <f7-icon f7="document_text_fill"></f7-icon>
        </f7-fab-button>
        <f7-fab-button label="Eliminar Marcadores" fab-close color="red" @click="clearMarkers">
          <f7-icon f7="close"></f7-icon>
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
                :title="punto.nombre"
                :subtitle="punto.latitude + ',' + punto.longitude"
                :text="punto.direccion"
              >
              <f7-fab-button slot="media" color="red" @click="selectPunto(punto)">
                <f7-icon f7="gear_fill" ></f7-icon>
              </f7-fab-button>

              <f7-fab-button slot="after" 
              :color="(punto.mostrar)?'green':'red'"
               @click="showHidePunto(puntos_firebase[index])">
                <f7-icon f7="circle_fill" >
                  
                </f7-icon>
              </f7-fab-button>
              
              </f7-list-item>
          </f7-list>
          </f7-card-content>
        </f7-block>
      </f7-page>
    </f7-popup>
    <f7-actions ref="actionsOneGroup">
      <f7-actions-group>
        <f7-actions-label>Acciones</f7-actions-label>
        <f7-actions-button bold @click="fijarPunto">Fijar en Mapa</f7-actions-button>
        <f7-actions-button @click="editPunto">Editar</f7-actions-button>
        <f7-actions-button color="red" @click="eliminarPuntos">Eliminar</f7-actions-button>
        <f7-actions-button color="red">Cancel</f7-actions-button>
      </f7-actions-group>
    </f7-actions>
    <f7-popup class="demo-popup" :opened="popupGuardarPunto" @popup:closed="closeGuardarPunto">
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
                <f7-input type="textarea" resizable placeholder="" 
                :value="form.direccion" @input="form.direccion = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-row v-if="!form_key">
            <f7-col>
                <f7-button fill @click="savePunto">Guardar Punto</f7-button>
            </f7-col>
          </f7-row>
          <f7-row v-else>
            <f7-col>
                <f7-button fill @click="editarPunto">Editar Punto</f7-button>
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
      height:window.innerHeight - 60,
      db:null,
      get_map:true,
      isWatchPosition:false,
      watch_position:null,
      mapa:{
          center_map:{lat:24.083304, lng:-102.339398},
          position:null,
          zoom_map:5
      },
      form_key:"",
      form:{
        nombre: "",
        latitude:"",
        longitude:"",
        direccion:"",
        mostrar:false,
      },
      ubication:false,
      popupPuntos:false,
      popupGuardarPunto:false,
      puntos_firebase:null,
      punto_selected:null,
      clickPosition:null,
      timeLocation:1000,
    };
  },
  mounted(){
    console.log("Montando Mapa");
    //this.$f7.dialog.preloader("Obteniendo ubicacion...");
    //this.getLocation();
    this.getWatchLocation();
    this.db= database();
    let usuario = auth().currentUser;
    console.log("Perfil Usuario", usuario);
    this.syncData();
    
  },
  methods:{
    showHidePunto(punto){
      console.log("Punto", punto)
      punto.mostrar = !punto.mostrar;
      let usuario = auth().currentUser;
        this.db.ref("/puntos/" + usuario.uid + "/" + punto.key).set(punto).then(()=>{
          this.fitBounds();
          setTimeout(()=>{
            //this.syncData()
          },300)
        });
    },
    fitBounds(){
      var b = new google.maps.LatLngBounds();
      if(this.mapa.position){
        b.extend(this.mapa.position);
      }
      this.puntos_firebase.map((item)=>{
        if(item.mostrar){
          b.extend({lat:item.latitude, lng:item.longitude});
        }
      });
      this.$refs.googleMap.fitBounds(b);
    },
    pinSymbol(color) {
      return {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
          fillColor: color,
          fillOpacity: 1,
          strokeColor: '#000',
          strokeWeight: 1,
          scale: 1,
      };
    },
    clearMarkers(){
      // this.$f7.dialog.confirm('Quieres quitar todos los marcadores?', ()=> {
      //   this.markers = [];
      //   this.fitBounds();
      // });
    },
    editarPunto(){
      console.log("editando punto")
      let usuario = auth().currentUser;
        this.db.ref("/puntos/" + usuario.uid + "/" + this.form_key).set(this.form).then(()=>{
          this.$f7.dialog.alert('Punto Actualizado!');
          this.closeGuardarPunto();
          //this.syncData();
        });
    },
    closeGuardarPunto(){
      this.popupGuardarPunto = false;
      this.form_key = "";
      this.form = {
        nombre: "",
        latitude:"",
        longitude:"",
        direccion:"",
        mostrar:false,
      }
    },
    fijarPunto(){
      console.log("marcar Punto", this.punto_selected);
      let {latitude, longitude} = this.punto_selected;
      this.mapa.center_map.lat = latitude;
      this.mapa.center_map.lng = longitude;
      this.popupPuntos = false;
      // this.fitBounds();
    },
    editPunto(){
      console.log("Editar Punto");
      let {nombre, direccion, latitude, longitude, key} = this.punto_selected;
      this.form = {nombre, direccion, latitude, longitude};
      this.form_key = key;
      this.popupPuntos = false;
      this.popupGuardarPunto = true;
    },
    eliminarPunto(marker){
      console.log("Eliminando Puntos", marker);
      console.log(this.$refs);
      console.log(marker);
      console.log(this.$refs[marker]);
      let toggle = this.$refs[marker][0];
      toggle.checked = false;
    },
    eliminarPuntos(){
      console.log("Eliminando")
      let {nombre, key} = this.punto_selected;
      this.$f7.dialog.confirm('Quieres eliminar el punto de '+ nombre +'?', ()=> {
        let usuario = auth().currentUser;
        this.db.ref("/puntos/" + usuario.uid + "/" + key).remove().then(()=>{
          this.$f7.dialog.alert('Punto Eliminado!');
              console.log("Eliminado");
              //this.syncData();
          })
        this.punto_selected = null;
      },()=>{
        this.punto_selected = null;
      });
    },
    selectPunto(punto){
      console.log("Seleccionando", punto)
      let {nombre, direccion, latitude, longitude, key} = punto;
      this.punto_selected = {nombre, direccion, latitude, longitude, key};
      this.$refs.actionsOneGroup.open();
    },
    clickMap(position){
      this.clickPosition = {
        lat:position.latLng.lat(),
        lng:position.latLng.lng()
      }
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
    openSavePunto(){
      if(!this.clickPosition){
        if(!this.mapa.position){
          this.$f7.dialog.alert('No se tiene una ubicacion, espere por favor', "Sin Ubicacion");
          return;
        }
      }
      
      let {lat, lng} = (this.clickPosition)?this.clickPosition:this.mapa.position;
      this.form.latitude = lat;
      this.form.longitude = lng;
      var geocoder = new google.maps.Geocoder;

      geocoder.geocode({'location': {lat, lng}}, (results,status)=>{ 
        console.log("Cargando GeoCoder")
				if (status === 'OK') {
					if (results[0]) {
						this.form.direccion = results[0].formatted_address;
					} else {
						alert('Direccion no encontrada');
					}
				} else {
					alert('Geocoder failed due to: ' + status);
				}

			}); 

      this.popupGuardarPunto = true;
    },
    savePunto(){
      this.clickPosition = null;
      console.log("Guardando Puntos", this.form);
      this.form.mostrar = true;
      let usuario = auth().currentUser;
      this.db.ref("/puntos/"+ usuario.uid).push(this.form).then(()=>{
              this.popupGuardarPunto = false;
              this.$f7.dialog.alert('Punto Guardado!');
          });
    },
    getPuntos(){

    },
    getWatchLocation(){
      console.log("watchLocation")
        this.watch_position = navigator.geolocation.watchPosition((position)=>{
        console.log("Position",position);
        let {latitude, longitude} = position.coords; 
        this.mapa.position = {lat:latitude, lng: longitude};
        if(!this.ubication){
          this.ubication = true;
          let {latitude, longitude} = position.coords; 
          this.mapa.center_map.lat = latitude;
          this.mapa.center_map.lng = longitude;
          this.mapa.zoom_map = 18;
          if(!this.isWatchPosition){
            this.isWatchPosition = true;
            this.$f7.dialog.close();
          }
        }
        }, (error)=>{
          console.log("Error Watch");
          console.log(error);
          this.$f7.toast.create({
                text: 'Code: ' + error.code+
                ' Message: ' + error.message,
                closeTimeout: 2000,
              }).open();
        }, 
        {
          timeout: 10000
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
        if(!this.isWatchPosition){
          this.isWatchPosition = true;
          this.$f7.dialog.close();
        }
        this.getWatchLocation();
      }, (error)=>{
            console.log('Error Current Position: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
              
              this.$f7.toast.create({
                text: 'Code: ' + error.code+
                ' Message: ' + error.message + ' Time: ' + (this.timeLocation/1000),
                closeTimeout: 2000,
              }).open();
              this.timeLocation += 2000;
              if(error.code == 3){
            setTimeout(()=>{
              this.getLocation();
            },this.timeLocation);
          }
      },{
          enableHighAccuracy: true,
          timeout: 3000,
          maximumAge: 0
        });
    },
    syncData(){
      let usuario = auth().currentUser;
      this.db.ref("/puntos/" + usuario.uid).on('value', snapshot => this.cargarPuntos(snapshot.val()));
    }
  }
};
</script>

<style>
  .btn{
    margin-right:12px;
    padding: 2px;
  }
</style>
