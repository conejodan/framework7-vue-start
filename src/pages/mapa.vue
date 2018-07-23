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
    <f7-block inner>
      <f7-row>
        <f7-col>
          <GmapMap
                        ref="googleMap"
                        :center="mapa.center_map"
                        :zoom="mapa.zoom_map"
                        style="width: auto; height: 400px"
                >
          </GmapMap>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      mapa:{
          center_map:{lat:24.083304, lng:-102.339398},
          zoom_map:5
      },
    };
  },
  mounted(){
    console.log("Iniciando")
    setTimeout(()=>{
      console.log("Enviando")
      
    },1000);
    
  }
};
</script>
