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
          <f7-button fill @click="callCamara">Tomar foto</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  name: 'Camara',
  data() {
    return {
      title: 'Camara',
    };
  },
  mounted(){
    console.log("Cargando Camara")
  },
  methods:{
    
  },
};
</script>