<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>Dashboard</f7-nav-title>
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
import firebase from 'firebase';
import {mapActions} from 'vuex';

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
    let usuario = firebase.auth().currentUser;
    console.log("Dashboard Usuario",usuario);
    firebase.auth().onAuthStateChanged((user)=>{
      if(user){
        console.log("onAuthStateChange", user)
        this.saveUsuario(user.uid)
      }
    });
  },
  methods:{
    ...mapActions(['saveUsuario']),
    
  }
};
</script>
