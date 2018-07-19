<template>
    <f7-view>
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
          <f7-button fill @click="$f7.panel.open();">Abrir Panel</f7-button>
        </f7-col>
      </f7-row>
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
