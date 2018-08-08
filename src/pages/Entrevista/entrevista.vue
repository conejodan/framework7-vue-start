<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>{{title}}</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block>
        <f7-list no-hairlines-md form>
            <f7-list-item>
                <f7-label>Paquete</f7-label>
                <f7-input type="select" placeholder="">
                <option value="" selected>Selecciona un paquete</option>
                <option value="2018-01">Paquete Enero</option>
                <option value="2018-02">Paquete Febrero</option>
                <option value="2018-03">Paquete Marzo</option>
                <option value="2018-04">Paquete Abril</option>
                <option value="2018-05">Paquete Mayo</option>
                <option value="2018-06">Paquete Junio</option>
                <option value="2018-07">Paquete Julio</option>
                <option value="2018-08" selected>Paquete Agosto</option>
                <option value="2018-09">Paquete Septiembre</option>
                <option value="2018-10">Paquete Octubre</option>
                <option value="2018-11">Paquete Noviembre</option>
                <option value="2018-12">Paquete Diciembre</option>
            </f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Fecha</f7-label>
                <f7-input type="date" value="2018-07-10" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Nombre</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Sucursal</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Telefono</f7-label>
                <f7-input type="tel" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-block-title>Secciones</f7-block-title>
            <f7-list>
                <f7-list-item title="Domicilio" link="/entrevista/domicilio"></f7-list-item>
                <f7-list-item title="Servicios en el Lote" link="/entrevista/serv_lote"></f7-list-item>
                <f7-list-item title="Servicios de la Vivienda" link="/entrevista/serv_vivienda"></f7-list-item>
                <f7-list-item title="Factibilidad" link="/entrevista/factibilidad"></f7-list-item>
                <f7-list-item title="Seguridad Estructural" link="/entrevista/seguridad_estructural"></f7-list-item>
                <f7-list-item title="Familia" link="/entrevista/familia"></f7-list-item>
                <f7-list-item title="Espacios" link="/entrevista/espacios"></f7-list-item>
                <f7-list-item title="Entrevista" link="#"></f7-list-item>
            </f7-list>
        </f7-list>
    </f7-block>
  </f7-page>
</template>
<script>

export default {
  name: 'Home',
  data() {
    return {
      title: 'Nueva Entrevista',
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
