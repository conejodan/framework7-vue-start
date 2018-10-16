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
    <f7-block inner>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="initAds">Init Admod</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="prepareBanner">Prepare Banner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showBanner">Show Banner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="hideBanner">Hide Banner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="removeBanner">Remove Banner</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="prepareInsterstitial">Prepare interstitial</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showInsterstitial">Show interstitial</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="prepareRewardVideo">Prepare RewardVideo</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="showRewardVideo">show Reward Video</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  name: 'Admob',
  data() {
    return {
      title: 'Admob',
      show_admob: true,
      testing: true
    };
  },
  methods: {
    onDeviceReady(){
        console.log("Admob::onDeviceReady")
      setTimeout(()=>{
        this.initAds();
      },300);
    },
    onResume(){
      console.log("Admob::onResume");
    },
    showAdmob(show){
      if(show){
        this.prepareBanner();
        this.show_admob = true;
      }else{
        this.removeBanner();
      }
    },
    initAds(){
        console.log("Admob::initAds");
      var admobid = {}
      var test = this.testing;
      if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
        admobid = {
          banner: 'ca-app-pub-6894711411071006/2975463962',
          interstitial: 'ca-app-pub-6894711411071006/1673467493',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
          isTesting: test,
        }
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
        admobid = {
          banner: 'ca-app-pub-6894711411071006/2975463962',
          interstitial: 'ca-app-pub-6894711411071006/1673467493',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
          isTesting: test,
        }
      }
      if(admob){
        admob.banner.config({
          id: admobid.banner,
          isTesting: admobid.isTesting,
          autoShow: true,
        })
        admob.banner.prepare();
      //admob.banner.show();
        admob.interstitial.config({
          id: admobid.interstitial,
          isTesting: admobid.isTesting,
          autoShow: true,
        })
        admob.interstitial.prepare()
        //admob.interstitial.show()
        admob.rewardvideo.config({
          id: admobid.rewarded,
          isTesting: admobid.isTesting,
          autoShow: false,
        })
      //admob.rewardvideo.prepare()
      }
      
    },
    prepareBanner(){
      if(this.show_admob){
        console.log("Admob::prepareBanner")
        admob.banner.prepare()
      }
    },
    showBanner(){
      if(this.show_admob){
        console.log("Admob::showBanner")
        admob.banner.show()
      }
    },
    hideBanner(){
      console.log("Admob::hideBanner")
      admob.banner.hide()
    },
    removeBanner(){
      console.log("Admob::removeBanner")
      admob.banner.remove()
    },
    prepareInsterstitial(){
      if(this.show_admob){
        console.log("Admob::prepareInsterstitial")
        admob.interstitial.prepare()
      }
    },
    showInsterstitial(){
      if(this.show_admob){
        console.log("Admob::showInsterstitial")
        admob.interstitial.show()
      }
    },
    prepareRewardVideo(){
      if(this.show_admob){
        console.log("Admob::prepareRewardVideo")
        admob.rewardvideo.prepare()
      }
    },
    showRewardVideo(){
      if(this.show_admob){
        console.log("Admob::showRewardVideo")
        admob.rewardvideo.show()
      }
    }
  },
  mounted(){
    setTimeout(()=>{
        console.log("Cargando banners")
        this.onDeviceReady();
      },300);
  },
  computed: {
    isiOS() {
      return window.isiOS;
    }
  },
  created() {
    document.addEventListener('resume', this.onResume);
    document.addEventListener("deviceready", this.onDeviceReady);
  }
};
</script>