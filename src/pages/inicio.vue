<template>
  <f7-page>
    <f7-navbar sliding title="Inicio"></f7-navbar>
    <f7-block-title>{{ title }}</f7-block-title>
    <f7-block inner>
      <a class="link" href="/">Login</a>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World'
    };
  }
};
</script>
