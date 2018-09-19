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
            <f7-fab-button class="btn" round @click="showForm = true" >
<f7-icon f7="add_round_fill" ></f7-icon>
              </f7-fab-button>
        </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
      <f7-list media-list>
          <f7-list-item v-for="(todo, index) in todo_list_firebase" :key="index"
          
            :title="todo.title"
            :subtitle="todo.subtitle"
            :text="todo.text"
          >

          <f7-checkbox
            :checked="todo.status"
            slot="after"
            @change="changeStatus(todo)"
          ></f7-checkbox>
          </f7-list-item>
      </f7-list>
    </f7-block>
    <f7-popup class="demo-popup" :opened="showForm" @popup:closed="showForm = false">
      <f7-page>
        <f7-navbar title="Tarea">
          <f7-nav-right>
            <f7-link popup-close>Cerrar</f7-link>
          </f7-nav-right>
        </f7-navbar>
        <f7-block>
          <f7-list no-hairlines-md form>
            <f7-list-item>
                <f7-label>Titulo</f7-label>
                <f7-input type="text" placeholder="" 
                :value="form.title" @input="form.title = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Fecha</f7-label>
                <f7-input type="date" placeholder="" 
                :value="form.subtitle" @input="form.subtitle = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
            <f7-list-item>
                <f7-label>Tarea</f7-label>
                <f7-input type="textarea" resizable placeholder="" 
                :value="form.text" @input="form.text = $event.target.value"
                clear-button></f7-input>
            </f7-list-item>
          </f7-list>
          <f7-row>
            <f7-col>
                <f7-button fill @click="saveTarea">Guardar Punto</f7-button>
            </f7-col>
          </f7-row>
        </f7-block>
      </f7-page>
    </f7-popup>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
const form_init = {
  title:"",
  subtitle:"",
  text:"",
  status:false
}

import {auth, database} from 'firebase';

export default {
  name: 'lista_de_tareas',
  data() {
    return {
      title: 'Lista de Tareas',
      loaded_firebase:true,
      todo_list_firebase:[],
      showForm:false,

      form:this.clonar(form_init)
    };
  },
  mounted(){
    console.log("Cargando ToDo")
    this.db= database();
    this.syncData();
  },
  methods:{
    clonar(obj){
      return JSON.parse( JSON.stringify( obj ) );
    },
    changeStatus(todo){
      if(this.loaded_firebase){
        console.log("Cambiando status de ", todo)
        let usuario = auth().currentUser;
        let {title, subtitle, text, status} = todo;
        status = !status;
        this.db.ref("/todo/" + usuario.uid + "/" + todo.key).set({title, subtitle, text, status}).then(()=>{
          console.log("Actualizado")
        });
      }
    },
    saveTarea(){
      console.log("Guardando Tarea")
      let usuario = auth().currentUser;
      this.db.ref("/todo/"+ usuario.uid).push(this.form).then(()=>{
              this.showForm = false;
              this.$f7.dialog.alert('Tarea Guardado!');
              this.form = this.clonar(form_init)
          });
    },
    cargarLista(tareas){
      console.log("Cargando ");
      this.todo_list_firebase = [];
      if(tareas){
        this.loaded_firebase = false;
        console.log("Tiene tareas")
        for(let key in tareas){
          console.log("puntos[key]", tareas[key])
          let {title, subtitle, text, status} = tareas[key];
          this.todo_list_firebase.push({title, subtitle, text, status, key});
        }
        this.todo_list_firebase.reverse();
        this.loaded_firebase = true;
      }
    },
    syncData(){
      let usuario = auth().currentUser;
      this.db.ref("/todo/" + usuario.uid).on('value', snapshot => this.cargarLista(snapshot.val()));
    }
  },
};
</script>

<style>
  .btn{
    margin-right:12px;
    padding: 2px;
  }
</style>