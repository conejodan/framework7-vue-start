<template>
  <f7-page>
    <f7-navbar sliding title="Registro"></f7-navbar>
    <f7-block inner>
      <f7-list no-hairlines-md>
        <f7-list-item>
          <f7-label>Usuario</f7-label>
          <f7-input type="text" :value="email" @input="email = $event.target.value" placeholder="Coloca tu Usuario" clear-button></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Contraseña</f7-label>
          <f7-input type="password" :value="password" @input="password = $event.target.value" placeholder="Coloca tu contraseña" clear-button></f7-input>
        </f7-list-item>
      </f7-list>
      <f7-row>
        <f7-col>
          <f7-button fill @click="register">Registrarse</f7-button>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-button fill @click="$f7router.navigate('/');">Ir al Login</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import {auth} from 'firebase';

export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World',
      email:"",
      password:"",
      alert:false
    };
  },
  methods:{
    register(){
      console.log("Iniciando Sesion")
      console.log("Usuario: "+ this.username)

      auth().createUserWithEmailAndPassword(this.email,this.password).then(
        (user)=>{
          console.log("Iniciando Sesion");
          console.log(user);
          this.$f7router.navigate('/inicio');
        },
        (error)=>{
          console.log("Error en Sesion");
          console.log(error);
          this.$f7.dialog.alert('Ocurrio un error. ' + error.message, "Error");
        }
      );
    }
  }
};
</script>
