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
                <f7-label>El terreno esta en zona de riesgo?</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>Tiene uso de suelo habitacional</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>
            
            <f7-list-item checkbox value="check_2" title="Se verifico en el PDU"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Inspect visual"></f7-list-item>

            <f7-list-item checkbox value="check_2" title="Condiciones de viviendo congruentes con nivel de ingresos"></f7-list-item>

            <f7-list-item>
                <f7-label>En donde se va a aplicar el subsidio es vivienda unica</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>Uso que dara a la vivienda</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Habitarla"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Rentarla"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Prestarla"></f7-list-item>
            
            <f7-list-item>
                <f7-input type="text" placeholder="Otro" clear-button></f7-input>
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
      title: 'Factibilidad',
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
