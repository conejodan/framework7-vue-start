<template>
    <div>
    </div>
</template>
<script>
export default {
  methods: {
    onDeviceReady(){
        console.log("Admob::onDeviceReady")
      setTimeout(()=>{
        this.initAds();
      },500);
    },
    onResume(){
      console.log("Admob::onResume");
      setTimeout(()=>{
       //admob.banner.prepare();
       admob.interstitial.prepare();
       admob.rewardvideo.prepare();
      },500);
    },
    initAds(){
        console.log("Admob::initAds");
      var admobid = {}
      if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
        admobid = {
          banner: 'ca-app-pub-6894711411071006/2975463962',
          interstitial: 'ca-app-pub-6894711411071006/1673467493',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
          isTesting: false,
        }
      } else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
        admobid = {
          banner: 'ca-app-pub-6894711411071006/2975463962',
          interstitial: 'ca-app-pub-6894711411071006/1673467493',
          rewarded: 'ca-app-pub-6894711411071006/2708277172',
          isTesting: false,
        }
      }
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
        autoShow: false,
      })
      admob.interstitial.prepare()
      //admob.interstitial.show()
      admob.rewardvideo.config({
        id: admobid.rewarded,
        isTesting: admobid.isTesting,
        autoShow: false,
      })
      admob.rewardvideo.prepare()
    },
    showInsterstitial(){
      console.log("Admob::showInsterstitial")
      admob.interstitial.show()
    }
  },
  mounted(){
    setTimeout(()=>{
        console.log("Cargando banners")
        this.onDeviceReady();
      },1000);
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