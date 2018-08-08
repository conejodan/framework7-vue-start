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
                <f7-label>Tipo de Interv</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Superficie Lote</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>En la calle hay</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Alumbrado"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Guarniciones"></f7-list-item>
            <f7-list-item checkbox value="check_3" title="Banquetas"></f7-list-item>

            <f7-list-item>
                <f7-label>Sub-tipo de Interv</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" title="Azotea"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Lote Baldio"></f7-list-item>
            <f7-list-item checkbox value="check_3" title="Lote Familiar"></f7-list-item>

            <f7-list-item>
                <f7-label>Drenaje, esta vivienda esta conectada ha</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Disponibilidad de agua, en esta vivienda tienen</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Energia Electrica</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Existe construccion en proceso sin habitar en el lote o vivienda</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" name="a" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" name="a" title="No"></f7-list-item>
        </f7-list>
    </f7-block>
  </f7-page>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {
      title: 'Servicios del Lote',
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
