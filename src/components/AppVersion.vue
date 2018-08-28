<template>
    <div>
    </div>
</template>
<script>
export default {
    data() {
    return {
      versionNumber: null,
      versionCode: null,
      packageName: null,
      appName: null,
    };
  },
  methods: {
    onDeviceReady(){
        this.appVersion();
    },
    onResume(){
      
    },
    printVersion(){
        if(this.versionNumber && this.versionCode && this.packageName && this.appName){
            alert(
                "App Name " + this.appName + "\n" +
                "Package Name " + this.packageName + "\n" +
                "Version Number " + this.versionNumber + "\n" +
                "Version Code " + this.versionCode + "\n" 
                );
        }
    },
    appVersion(){
      setTimeout(()=>{
        cordova.getAppVersion.getVersionNumber().then((data)=> {
          this.versionNumber = data;
          this.printVersion();
        });
      },500);
      setTimeout(()=>{
        cordova.getAppVersion.getVersionCode().then((data)=> {
          this.versionCode = data;
          this.printVersion();
        });
      },500);
      setTimeout(()=>{
        cordova.getAppVersion.getPackageName().then((data)=> {
          this.packageName = data;
          this.printVersion();
        });
      },500);
      setTimeout(()=>{
        cordova.getAppVersion.getAppName().then((data)=> {
          this.appName = data;
          this.printVersion();
        });
      },500);
      
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