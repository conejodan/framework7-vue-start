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
          <f7-button fill @click="escribir('file:///storage/emulated/0/Download')">Escribir Download</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="escribir('file:///storage/emulated/0/Download',true)">Agregar</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <div style="font-size: .7em;">{{logOb}}</div>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-input type="textarea" resizable placeholder="" 
                :value="file_texto" @input="file_texto = $event.target.value"
                ></f7-input>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="leer">Leer</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="escribir('file:///storage/emulated/0')">Escribir store emulated</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="escribir('cordova.file.dataDirectory')">Escribir dataDirectory</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="escribir('cordova.file.cacheDirectory')">Escribir cacheDirectory</f7-button>
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
      logOb:null,
      file_texto:"",
      arreglo:[]
    };
  },
  mounted(){
    console.log("Cargando File")
  },
  methods:{
    remplazar(){
      this.arreglo = JSON.parse(this.file_texto);
    },
    escribir(directorio, seek = false){
      directorio = (directorio == 'cordova.file.dataDirectory')?cordova.file.dataDirectory:directorio;
      directorio = (directorio == 'cordova.file.cacheDirectory')?cordova.file.cacheDirectory:directorio;
      console.log("Escribiendo")
      window.resolveLocalFileSystemURL(directorio, (dir)=>{
        console.log("got main dir",dir);
        dir.getFile("log.txt", {create:true}, (file)=>{
          console.log("got the file", file);
          this.logOb = file;
          this.arreglo.push({
            nombre:"Daniel",
            apellido:"Sanchez"
          })
          this.writeLog(JSON.stringify(this.arreglo), seek);			
        });
      });
    },
    leer(){
      console.log("Leyendo")
      let that = this;
      window.resolveLocalFileSystemURL('file:///storage/emulated/0/Download/log.txt', (dir)=>{
        console.log("got main dir",dir);
        dir.file(function(file){
            console.log("got the file", file);
            var reader = new FileReader();

            reader.onloadend = function() {
                console.log("Successful file read: " + this.result);
                that.file_texto = this.result;
            };

            reader.readAsText(file);
        });
      });
    },
    writeLog(str, seek = false) {
      if(!this.logOb) return;
      let that = this;
      var log = str +"\n";
      console.log("going to log "+log);
      this.logOb.createWriter(function(fileWriter) {
        fileWriter.onwriteend = function(e) {
          that.leer();
          console.log('Write completed.');
        };

        if(seek){
          fileWriter.seek(fileWriter.length);
          log = "," + log
        }
        
        var blob = new Blob([log], {type:'text/plain'});
        fileWriter.write(blob);
        console.log("ok, in theory i worked");
      }, false);
    }
  },
};
</script>