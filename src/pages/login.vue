<template>
  <f7-page>
    <f7-navbar sliding title="Login"></f7-navbar>
    <f7-block inner>
      <f7-list no-hairlines-md form>
        <f7-list-item>
          <f7-label>Usuario</f7-label>
          <f7-input type="text" :value="email" @input="email = $event.target.value" placeholder="Coloca tu Usuario" clear-button></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Contraseña</f7-label>
          <f7-input type="password" :value="password" @input="password = $event.target.value" placeholder="Coloca tu contraseña" clear-button></f7-input>
        </f7-list-item>
      </f7-list>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="signIn">Iniciar</f7-button>
        </f7-col>
      </f7-row>
      <f7-row>
        <f7-col>
          <f7-button small fill @click="popupOpened = true">Recuperar Cuenta</f7-button>
        </f7-col>
        <f7-col>
          <f7-button small fill @click="$f7router.navigate('/registrar');">Registrar</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
    <f7-popup class="demo-popup" :opened="popupOpened" @popup:closed="popupOpened = false">
      <f7-page>
        <f7-navbar title="Recuperar Cuenta">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-list>
              <f7-list-item>
                <f7-label>Usuario</f7-label>
                <f7-input type="text" :value="email" @input="email = $event.target.value" placeholder="Coloca tu Usuario" clear-button></f7-input>
              </f7-list-item>
          </f7-list>
        </f7-block>
        <f7-row tag="p">
          <f7-col>
            <f7-button fill @click="forgetPassword">Recuperar Cuenta</f7-button>
          </f7-col>
        </f7-row>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
import firebase from 'firebase';
import {mapState,mapGetters,mapMutations, mapActions} from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World',
      email:"",
      password:"",
      alert:false,
      popupOpened:false
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
          console.error("Error en Sesion");
          console.error(error);
          setTimeout(()=>{
          this.$f7.dialog.close();
          this.$f7.dialog.alert(error.message, "Inicio de Sesion");
          },500);
        }
      );
    },
    forgetPassword(){
      console.log("Olvide Contraseña");
      firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
        console.log("Olvidar Contraseña Exitoso");
        this.email = "";
        this.popupOpened = false;
        this.$f7.dialog.alert("Se envio un mensaje a tu correo electronico con las instrucciones", "Recuperar Contraseña");
      }).catch((error)=>{
        console.error("Olvidar Contraseña Fallido");
        console.error(error);
        this.$f7.dialog.alert(error.message, "Recuperar Contraseña");
      });
    }
  }
};
</script>
