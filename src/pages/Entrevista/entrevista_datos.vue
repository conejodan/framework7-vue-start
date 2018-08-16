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
                <f7-label>Demanda de mejora</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Porque y para que</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Proyecto del cliente</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Mas menos</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Actividades/Forma de vida</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Casa final deseada</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Comentarios libres</f7-label>
                <f7-input type="textarea" resizable placeholder=""></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Necesidades - Problema o Deseo</f7-label>
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
      title: 'Entrevista - Datos',
      form:{
          nombre:"",
          apellidos:"",
          telefono:"",
          email:"",
      },
    };
  },
  mounted(){
      console.log("Iniciando Datos Entrevista");
  },
  methods:{
  }
};
</script>
