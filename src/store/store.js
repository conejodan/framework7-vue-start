import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
    cantidad:5
  },
  getters: {
    getCantidad: state => {
      console.log(">getCantidad")
      return state.cantidad;
    }
  },
  mutations:{
    saveCantidad:(state,value)=>{
      console.log("saveCantidad",state,value);
      state.cantidad += value;
    },
  },
  actions: {
    increment (context) {
      console.log("> increment");
      setTimeout(()=>{
        context.commit('saveCantidad',1);
      },2000);
    }
  },
  modules:{
      auth
  }
});