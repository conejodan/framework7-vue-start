<template>
  <f7-page>
    <f7-navbar sliding title="Login"></f7-navbar>
    <f7-block inner>
      <f7-list no-hairlines-md>
        <f7-list-item>
          <f7-label>Usuario</f7-label>
          <f7-input type="text" placeholder="Coloca tu Usuario" clear-button :value="username" @input="username = $event.target.value"></f7-input>
        </f7-list-item>
        <f7-list-item>
          <f7-label>Contraseña</f7-label>
          <f7-input type="password" placeholder="Coloca tu contraseña" clear-button></f7-input>
        </f7-list-item>
      </f7-list>
      <f7-row>
        <f7-col>
          <f7-button fill @click="signIn">Iniciar</f7-button>
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
      username:"",
      alert:false
    };
  },
  methods:{
    signIn(){
      console.log("Iniciando Sesion")
      console.log("Usuario: "+ this.username)
      this.$f7router.navigate('/inicio')
      if(!this.alert){
        this.alert=true;
        //this.$f7.dialog.alert('Presiona de nuevo', "Inicio de Sesion");
        return;
      }
      
    }
  }
};
</script>
