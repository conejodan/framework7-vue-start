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
                <f7-label>Año en que llego a vivir</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Cuantas familias existen en el Lote</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Clase de Vivienda</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" name="a" title="Casa Ind"></f7-list-item>
            <f7-list-item checkbox value="check_2" name="a" title="Azote (Otros Niveles)"></f7-list-item>
            <f7-list-item checkbox value="check_3" name="a" title="Lote Familiar"></f7-list-item>

            <f7-list-item>
                <f7-label>Originalmente el dueño</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" name="b" title="La compro hecha"></f7-list-item>
            <f7-list-item checkbox value="check_2" name="b" title="La mando construir"></f7-list-item>
            <f7-list-item checkbox value="check_3" name="b" title="La construyo el mismo"></f7-list-item>
            <f7-list-item checkbox value="check_4" name="b" title="La obtuvo de otra manera"></f7-list-item>

            <f7-list-item>
                <f7-label>Estado de la Inst. Elec</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" name="c" title="Provicional"></f7-list-item>
            <f7-list-item checkbox value="check_2" name="c" title="Definitivo"></f7-list-item>
            <f7-list-item checkbox value="check_3" name="c" title="Parte Prov y Definitivo"></f7-list-item>

            <f7-list-item>
                <f7-label>El aparato que mas se usa para cocina es</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Cuantos dias a la semana llega el agua</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Tienen algun medio de almacenamiento de agua</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Tienen excusado</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" name="d" title="Retrete"></f7-list-item>
            <f7-list-item checkbox value="check_2" name="d" title="Sanitario"></f7-list-item>
            <f7-list-item checkbox value="check_3" name="d" title="Letrina"></f7-list-item>
            <f7-list-item checkbox value="check_3" name="d" title="Hoyo negro"></f7-list-item>

            <f7-list-item>
                <f7-label>Compartido con otra vivienda</f7-label>
            </f7-list-item>
            <f7-list-item checkbox value="check_1" name="e" title="Si"></f7-list-item>
            <f7-list-item checkbox value="check_2" name="e" title="No"></f7-list-item>

            <f7-list-item>
                <f7-label>Como le hechan agua al sanitario</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
            </f7-list-item>

            <f7-list-item>
                <f7-label>Tienen alguna forma de tratamiento de agua</f7-label>
                <f7-input type="text" placeholder="" clear-button></f7-input>
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
      title: 'Servicios de Vivienda',
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
