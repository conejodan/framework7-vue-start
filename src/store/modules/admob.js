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
    prepareBanner(){
        console.log("Preparando Banner");
        admob.banner.prepare();
      },
      showBanner(){
        console.log("Mostrando Banner");
        admob.banner.show();
      },
      prepareInterstitial(){
        console.log("Preparando Insterstitial");
        admob.interstitial.prepare();
      },
      showInterstitial(){
        console.log("Mostrando Interstitial");
        admob.interstitial.show()
      },
      prepareRewarded(){
        console.log("Preparando Reward");
        admob.rewardvideo.prepare()
      },
      showReward(){
        console.log("Mostrando Reward");
        admob.rewardvideo.show()
      },
  }

export default {
    state:admob,
    getters,
    mutations,
    actions
}