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
                <f7-label>Antiguedad de la casa</f7-label>
                <f7-input type="tel" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Hay problemas estructurales a simple vista?</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>Se detectaron problemas estructurales</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>En que elemento</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Cimentacion"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Muros"></f7-list-item>
            <f7-list-item>
                <f7-input type="text" placeholder="Otros" clear-button></f7-input>
            </f7-list-item>
            
            <f7-list-item>
                <f7-label>Motivo por el que no hay seguridad estructural</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
        </f7-list>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Seguridad Estructural',
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
