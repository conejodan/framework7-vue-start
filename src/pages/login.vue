<template>
  <f7-page>
    <f7-navbar sliding title="Login"></f7-navbar>
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
          <f7-button fill @click="signIn">Iniciar</f7-button>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-button fill @click="$f7router.navigate('/registrar');">Registrar</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import firebase from 'firebase';
import {mapState,mapGetters,mapMutations, mapActions} from 'vuex';

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
  mounted(){
    console.log("Iniciando Login");
    this.getUsuario().then((data)=>{
      console.log("Datos de usuario", data);
        if(data){
          this.$f7router.navigate('/inicio');
        }
    });
  },
  computed:{
    nombre(){
      return "Daniel"
    },
    ...mapState(['cantidad']),
    ...mapGetters(['getUser'])
  },
  
  methods:{
    ...mapActions(['saveUsuario','getUsuario']),
    ...mapMutations(['saveUser']),
    signIn(){
      console.log("Comprobando sesion de: "+ this.email);
      this.$f7.dialog.preloader("Validando...");
      firebase.auth().signInWithEmailAndPassword(this.email,this.password).then(
        (user)=>{
          console.log("Iniciando Sesion");
          this.saveUsuario(user.user.uid);
          console.log(user);
          setTimeout(()=>{
            this.$f7.dialog.close();
            this.$f7router.navigate('/inicio');
          },500);
          
        },
        (error)=>{
          console.log("Error en Sesion");
          console.log(error);
          setTimeout(()=>{
          this.$f7.dialog.close();
          this.$f7.dialog.alert(error.message, "Inicio de Sesion");
          },500);
        }
      );
    }
  }
};
</script>
