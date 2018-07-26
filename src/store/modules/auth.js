const auth = {
    user:"Danilo"
};

const mutations = {
    saveUser:(state,name)=>{
        console.log("saveUser",$store.state,name);
        state = name;
    },
}

export default {
    state:auth,
    mutations
}