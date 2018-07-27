import firebase from 'firebase';

const auth = {
    user:null
};

const getters = {
        getUser: state => {
          console.log(">getUser")
          return state.user;
        }
};

const mutations = {
    saveUser:(state,name)=>{
        console.log("saveUser",state,name);
        state.user = name;
    },
}

const actions= {
    saveUsuario (context, user) {
        console.log("saveUsuario", user);
        if(user){
            localStorage.setItem('ancle_user',user);
        }else{
            localStorage.removeItem('ancle_user');
        }
        context.commit('saveUser',user);
    },
    getUsuario (context, user) {
        console.log("getUsuario", context.getters.getUser);
        let result = null;
        if(!firebase.auth().currentUser){
            result = localStorage.getItem('ancle_user');
        }else{
            result = firebase.auth().currentUser
        }
          
        return result;
    }
  }

export default {
    state:auth,
    getters,
    mutations,
    actions
}