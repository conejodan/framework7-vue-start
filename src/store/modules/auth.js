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

export default {
    state:auth,
    getters,
    mutations
}