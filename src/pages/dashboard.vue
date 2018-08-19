<template>
        <f7-page>
            
    <f7-navbar>
        <f7-nav-left>
            <f7-link @click="$f7.panel.open();">
                <f7-icon f7="bars"></f7-icon>
            </f7-link>
            
        </f7-nav-left>
        <f7-nav-title>Dashboard</f7-nav-title>
        <f7-nav-right>
            
        </f7-nav-right>
    </f7-navbar>
    <f7-block inner>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="uploadFile">Subir Archivo</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="downloadFile">Descargar Archivo</f7-button>
          <div id="tomar_foto" class="center"
             style="text-align: center; align-items: center; justify-content: center;">
            <img :src="imagenTomada" class="image-section" 
                     style="margin: 0px auto">
          </div>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="deleteFile">Eliminar Archivo</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import {auth, database, storage} from 'firebase';
import {mapActions} from 'vuex';
export default {
  name: 'Home',
  data() {
    return {
      title: 'Hello World',
      panel_left: false,
      imagenTomada: null,
      db:null
    };
  },
  mounted(){
    console.log("Iniciando")
    let usuario = auth().currentUser;
    console.log("Dashboard Usuario",usuario);
    auth().onAuthStateChanged((user)=>{
      if(user){
        console.log("onAuthStateChange", user)
        this.saveUsuario(user.uid)
        this.cargarFire()
      }
    });
    this.showInterstitial();
  },
  methods:{
    ...mapActions(['saveUsuario', 'showInterstitial']),
    deleteFile(){
      console.log("Eliminando archivo");
      let storageRef = storage().ref();
      var desertRef = storageRef.child('mountains.jpg');

      // Delete the file
      desertRef.delete().then(function() {
        console.log("Archivo Eliminado")
      }).catch(function(error) {
        console.log("Error al eliminar archivo", error)
        // Uh-oh, an error occurred!
      });
    },
    downloadFile(){
      console.log("Descargando archivo");
      let storageRef = storage().ref();
      // Create a reference to the file we want to download
      var starsRef = storageRef.child('mountains.jpg');

      // Get the download URL
      starsRef.getDownloadURL().then((url)=> {
        console.log("Archivo Descargado")
        console.log(url);
        this.imagenTomada = url;

        console.log("Solicitando Descarga")
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          console.log("Archivo Blod")
          console.log(xhr.response)
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send()
        // Insert url into an <img> tag to "download"
      }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/object_not_found':
            // File doesn't exist
            break;

          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect the server response
            break;
        }
      });
    },
    uploadFile(){
      console.log("Subiendo Archivo");
      let storageRef = storage().ref();
      var mountainsRef = storageRef.child('mountains.jpg');
      var message = 'data:image/png;base64,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';
      var uploadTask = mountainsRef.putString(message, 'data_url');

      uploadTask.on('state_changed', function(snapshot){
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {
        // Handle unsuccessful uploads
      }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          console.log('File available at', downloadURL);
        });
      });

    },
    cargarFire(){
      let usuario = auth().currentUser;
      this.db= database();
      console.log("Perfil Usuario", usuario);
    },
    
  },
  created() {
  }
};
</script>