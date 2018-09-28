<template>
    <div>
    </div>
</template>
<script>
export default {
  methods: {
    onDeviceReady(){
        console.log("BKM::onDeviceReady")
        setTimeout(()=>{
            //this.bkgEnable()
        },1000);
        setTimeout(()=>{
            //this.bkgDisable();
        },10000);
    },
    onResume(){
      console.log("BKM::onResume");
    },
    bkgEnable(){
      console.log("BKM::bkgEnable")
      setTimeout(()=>{
        cordova.plugins.backgroundMode.on('activate', ()=> { 
          console.log("BKM::onActivate")
          cordova.plugins.backgroundMode.disableWebViewOptimizations(); 
          cordova.plugins.backgroundMode.moveToBackground(); 
          setInterval(()=>{
            this.getLocation();
          },4000);
          /* YOUR CODE GOES HERE */ });
      },1000)
      setTimeout(()=>{
        cordova.plugins.backgroundMode.enable();
      },1000)
    },
    getLocation(){
      navigator.geolocation.getCurrentPosition((position)=>{
          console.log("BKM::getPosicion");
          console.log(position.coords.latitude);
          console.log(position.coords.longitude);
        }, (error)=>{
              console.log('BKM::Error Current Position: '    + error.code    + ',' +
                'message: ' + error.message + '\n');
                if(error.code == 3){
              setTimeout(()=>{
                this.getLocation();
              },3000);
            }
        },{
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
          });
    },
    bkgDisable(){
      console.log("BKM::bkgDisable")
      cordova.plugins.backgroundMode.disable();
    },
  },
  mounted(){
      
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