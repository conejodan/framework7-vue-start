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
      title: 'Hello World',
      panel_left: false
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
