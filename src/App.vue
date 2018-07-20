<template>
  <!-- App -->
  <div id="app">

    <!-- Statusbar -->
    <f7-statusbar></f7-statusbar>

    <f7-panel left reveal>
          <f7-block-title>Menu</f7-block-title>
          <f7-list>
            <f7-list-item title="Inicio" link="/inicio"></f7-list-item>
            <f7-list-item title="Formulario" link="/formulario"></f7-list-item>
            <f7-list-item title="Mapa" link="/mapa"></f7-list-item>
            <f7-list-item title="Salir" link="/"></f7-list-item>
          </f7-list>
          <f7-list simple-list>
            <f7-list-item>
              <f7-link href="/inicio" panel-close>Dashboard</f7-link>
            </f7-list-item>
            <f7-list-item>
              <f7-link href="/" panel-close>Mapa</f7-link>
            </f7-list-item>
            <f7-list-item>
              <f7-link href="/formulario" panel-close>Formulario</f7-link>
            </f7-list-item>
            <f7-list-item>
              <f7-link href="/" panel-close>Salir</f7-link>
            </f7-list-item>
          </f7-list>
    </f7-panel>

    <!-- Main View -->
    <f7-view id="main-view" url="/" main></f7-view>


  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    algo(){
      console.log("algo");
      console.log(this.$f7.router.navigate('/'));
      this.$f7.router.navigate('/');
      //this.$f7router.navigate('/')
    },

    handleBackButton() {
      // NOTE: The back button will behave differently depending on circumstance
      // If the side panel is open, close it
      if (document.querySelector('.panel-left.panel-active')) {
        // This will do nothing when the split-view is open
        return this.$f7.panel.close();
      }
      // Close modals
      // @TODO How to handle modals we shouldn't close like a login-screen?
      if (document.querySelector('.modal-in')) {
        return this.$f7.popover.close();
      }
      // If we have a back button, we want it to go back
      if (this.$f7.views.main.router.history.length > 1) {
        return this.$f7.views.main.router.back();
      }
      // Default to closing the app
      return window.navigator.app.exitApp();
    }
  },
  computed: {
    isiOS() {
      return window.isiOS;
    }
  },
  created() {
    document.addEventListener('backbutton', this.handleBackButton);
  }
};
</script>
