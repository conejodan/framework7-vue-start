const admob = {
    status:false
};

const getters = {
        getStatus: state => {
          console.log(">getStatus")
          return state.status;
        }
};

const mutations = {
    changeStatus:(state,data)=>{
        console.log("changeStatus",state,data);
        state.status = data;
    },
}

const actions= {
    initAdmob(context){
        console.log("initAdmob");
        
    },
    showBanner(context) {
        console.log("showBanner");
    },
    showInterstitial(context) {
        console.log("showInterstitial");
    },
    hideInterstitial(context) {
        console.log("hideInterstitial");
    }
  }

export default {
    state:admob,
    getters,
    mutations,
    actions
}