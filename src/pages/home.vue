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
    <f7-popover class="popover-menu" :opened="alert">
      <f7-list>
        <f7-list-item link="#" popover-close title="Dialog"></f7-list-item>
        <f7-list-item link="#" popover-close title="Tabs"></f7-list-item>
        <f7-list-item link="#" popover-close title="Side Panels"></f7-list-item>
        <f7-list-item link="#" popover-close title="List View"></f7-list-item>
        <f7-list-item link="#" popover-close title="Form Inputs"></f7-list-item>
      </f7-list>
  </f7-popover>
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
    }
  }
};
</script>
