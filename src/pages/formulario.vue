<template>
    <f7-view>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>Formulario</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
        <f7-list no-hairlines-md>
            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="Ingresa tu Nombre" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Apellidos</f7-label>
                <f7-input type="text" placeholder="Ingresa tu apellido" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Correo</f7-label>
                <f7-input type="email" placeholder="Correo" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Contraseña</f7-label>
                <f7-input type="password" placeholder="Contraseña" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Confirmar Contraseña</f7-label>
                <f7-input type="password" placeholder="Confirmar Contraseña" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>URL</f7-label>
                <f7-input type="url" placeholder="URL" clear-button></f7-input>
            </f7-list-item>
        </f7-list>
    </f7-block>
  </f7-page>
    </f7-view>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World',
      panel_left: false
    };
  }
};
</script>
