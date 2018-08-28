<template>
    <div>
    </div>
</template>
<script>
export default {
  methods: {
    onDeviceReady(){
        
    },
    onResume(){
      
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