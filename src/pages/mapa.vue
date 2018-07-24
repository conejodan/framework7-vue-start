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
    <f7-block>
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
          <f7-block inner>
            <f7-row>
              <f7-col>
                <f7-button fill @click="calculate">Calcular</f7-button>
              </f7-col>
            </f7-row>
          </f7-block>
          <f7-list simple-list>
            <f7-list-item v-if="puntos.length<=2" :title="'Captura '+ (3 - puntos.length) + ' puntos'"></f7-list-item>
            <template v-if="puntos.length>=3">
              <f7-list-item :title="'Perimetro: Proximamente'"></f7-list-item>
              <f7-list-item :title="'Area: Proximamente'"></f7-list-item>
            </template>
            
          </f7-list>
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
      puntos:[]
    };
  },
  mounted(){
    console.log("Iniciando Mapa")
    this.getLocation();
    
  },
  methods:{
    calculate(){
      console.log("Calculando");
      //let distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.Point(0, 0), new google.maps.Point(10, 10));
      console.log(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(18.0241824, -92.8988334),new google.maps.LatLng(18.0207575, -92.9025201)) ); //this is not working
    },
    saveLocation(){
      console.log("Guardado Location");
      this.puntos.push(this.mapa.center_map);
    },
    getLocation(){
      navigator.geolocation.getCurrentPosition((position)=>{
        this.mapa.center_map.lat = position.coords.latitude;
        this.mapa.center_map.lng = position.coords.longitude;
        this.mapa.zoom_map = 18;
      }, (error)=>{
console.log('Error Current Position: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
      });

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
          enableHighAccuracy: false,
          timeout: 5000,
          maximumAge: 0
        }
      );

    }
  }
};
</script>