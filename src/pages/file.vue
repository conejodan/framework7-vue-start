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
          <f7-button fill @click="escribir">Escribir</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="leer">Leer</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  name: 'File',
  data() {
    return {
      title: 'File',
      logOb:null
    };
  },
  mounted(){
    console.log("Cargando File")
  },
  methods:{
    escribir(){
      console.log("Escribiendo")
      window.resolveLocalFileSystemURL(cordova.file.dataDirectory, (dir)=>{
        console.log("got main dir",dir);
        dir.getFile("log.txt", {create:true}, (file)=>{
          console.log("got the file", file);
          this.logOb = file;
          this.writeLog("Escribiendo");			
        });
      });
    },
    leer(){
      console.log("Leyendo")
    },
    writeLog(str) {
      if(!this.logOb) return;
      var log = str + " [" + (new Date()) + "]\n";
      console.log("going to log "+log);
      this.logOb.createWriter(function(fileWriter) {
        
        fileWriter.seek(fileWriter.length);
        
        var blob = new Blob([log], {type:'text/plain'});
        fileWriter.write(blob);
        console.log("ok, in theory i worked");
      }, false);
    }
  },
};
</script>