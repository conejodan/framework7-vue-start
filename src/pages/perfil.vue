<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>Perfil</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
        <f7-list no-hairlines-md>
            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="Tu Nombre" 
                :value="form.nombre" @input="form.nombre = $event.target.value"
                clear-button ></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Apellidos</f7-label>
                <f7-input type="text" placeholder="Tus apellidos" 
                :value="form.apellidos" @input="form.apellidos = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Telefono</f7-label>
                <f7-input type="tel" placeholder="Tu telefono" 
                :value="form.telefono" @input="form.telefono = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
        </f7-list>
        <f7-row>
            <f7-col>
                <f7-button fill @click="sendForm">Guardar</f7-button>
            </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import firebase from 'firebase';

export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World',
      panel_left: false,
      form:{
          nombre:"",
          apellidos:"",
          telefono:"",
          email:"",
      },
      db:null
    };
  },
  mounted(){
      console.log("Iniciando Perfil");
      this.db= firebase.database();
      let usuario = firebase.auth().currentUser;
      console.log("Perfil Usuario", usuario);
        this.db.ref("/"+ usuario.uid+ "/perfil").on('value', snapshot => this.cargarPerfil(snapshot.val()));
  },
  methods:{
      cargarPerfil(perfil){
          console.log("Perfil", perfil);
          let {nombre, apellidos, telefono, email} = perfil;
          this.form = {nombre, apellidos, telefono, email};
      },
      sendForm(){
          let usuario = firebase.auth().currentUser;
          console.log(usuario);
          this.form.email = usuario.email;
          this.db.ref("/"+ usuario.uid + "/perfil").set(this.form).then(()=>{
              console.log("Enviado")
          })
          
      }
  }
};
</script>
