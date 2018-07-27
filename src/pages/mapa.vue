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
    <f7-block v-if="ubication">
      <GmapMap
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
            </template>
          </f7-list>
          <f7-block inner v-if="puntos.length>=3">
            <f7-row>
              <f7-col>
                <f7-button fill @click="borrar" color="red">Borrar Puntos</f7-button>
              </f7-col>
            </f7-row>
          </f7-block>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      height:window.innerHeight / 3,
      mapa:{
          center_map:{lat:24.083304, lng:-102.339398},
          zoom_map:5
      },
      ubication:false,
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
    borrar(){
      this.puntos = [];
    },
    calculate(){
      console.log("Calculando");
      
    },
    getDistanceBetween(first, second){
        let distance = 0;
        if(google){
          distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(first.lat, first.lng),new google.maps.LatLng(second.lat, second.lng));
        }
        return distance;
      
    },
    saveLocation(){
      console.log("Guardado Location");
      let {lat, lng} = this.mapa.center_map;
      this.puntos.push({lat,lng});
    },
    getWatchLocation(){
        navigator.geolocation.watchPosition((position)=>{
        console.log("Position");
        console.log(position);
        this.mapa.center_map.lat = position.coords.latitude;
        this.mapa.center_map.lng = position.coords.longitude;
        this.mapa.zoom_map = 18;
        }, (error)=>{
          console.log("Error Watch");
          console.log(error);
        }, 
        {
          enableHighAccuracy: true,
          timeout: 2000,
          maximumAge: 0
        }
      );
    },
    getLocation(){
      console.log("Obteniendo ubicacion");
      navigator.geolocation.getCurrentPosition((position)=>{
        this.ubication = true;
        this.$f7.dialog.close();
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
            },4000);
          }
      },{
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
    }
  }
};
</script>