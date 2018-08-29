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
          <f7-button fill @click="moveToForeground">MoveForeGround</f7-button>
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
          <f7-button fill @click="Unlock">Unlock</f7-button>
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
      imagenTomada:''
    };
  },
  mounted(){
    console.log("Cargando BackgroundMode");
    setTimeout(()=>{
      cordova.plugins.backgroundMode.on('enable', ()=> { 
          console.log("EVENT::enable")
      });
      cordova.plugins.backgroundMode.on('disable', ()=> { 
          console.log("EVENT::disable")
      });
      cordova.plugins.backgroundMode.on('activate', ()=> { 
          console.log("EVENT::activate")
          cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
          cordova.plugins.backgroundMode.moveToBackground();
          /* YOUR CODE GOES HERE */ 
      });
      cordova.plugins.backgroundMode.on('disactivate', ()=> { 
          console.log("EVENT::disactivate")
      });
      cordova.plugins.backgroundMode.on('failure', ()=> { 
          console.log("EVENT::failure")
      });
      
    },1000)
  },
  methods:{
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
    }
  },
};
</script>