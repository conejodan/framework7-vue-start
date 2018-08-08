<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7router.back()">
                <f7-icon f7="arrow_left"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>{{title}}</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <f7-list no-hairlines-md form>

            <f7-list-item>
                <f7-label>Porcentaje de distribucion adecuado</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>Todas las recamaras y baños son privados</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>Todos los espacios se aprovechan</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>
        </f7-list>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Espacios',
      form:{
          nombre:"",
          apellidos:"",
          telefono:"",
          email:"",
      },
    };
  },
  mounted(){
      console.log("Iniciando Entrevista");
  },
  methods:{
  }
};
</script>
