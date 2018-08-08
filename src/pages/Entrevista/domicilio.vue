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
                <f7-label>Tipo de Vialidad</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Numero Exterior</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Numero Interior</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>CP</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Sup MZ</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>MZ</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>LT</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Col/Asen</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Localidad</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Municipio</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Tipo Via entre c1</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Tipo Via entre c2</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Tipo Via entre c. post</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Clasif</f7-label>
                <f7-input type="select" placeholder="Seleccione una Clasif">
                    <option value="" selected>Seleccione una Clasif</option>
                    <option value="2018-01">R1</option>
                    <option value="2018-02">U1</option>
                    <option value="2018-02">U2</option>
                    <option value="2018-02">U3</option>
                </f7-input>
            </f7-list-item>
            <!-- Additional "checkbox" prop to enable checkbox list item -->
            <f7-list-item checkbox value="check_1" title="Autoproduccion"></f7-list-item>
            <f7-list-item checkbox value="check_2" title="Mejoramiento"></f7-list-item>
            <f7-list-item>
                <f7-label>Latitude</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Longitude</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>
            <f7-list-item checkbox value="check_2" title="Foto CONAVI"></f7-list-item>
            <f7-list-item>
                <f7-label>Descripcion de la Ubicacion</f7-label>
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
      title: 'Entrevista - Domicilio',
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
