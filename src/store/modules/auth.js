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
            localStorage.setItem('user',user);
        }else{
            localStorage.removeItem('user');
        }
        context.commit('saveUser',user);
    },
    getUsuario (context, user) {
        console.log("getUsuario", context.getters.getUser);
        if(!firebase.auth().currentUser){
            let local = localStorage.getItem('user');
            return local;
        }
        let result =  firebase.auth().currentUser.uid;
        return result;
    }
  }

export default {
    state:auth,
    getters,
    mutations,
    actions
}