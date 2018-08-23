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
          <f7-button fill @click="takePicture">Tomar foto {{imagenTomada}}</f7-button>
          <div id="tomar_foto" class="center"
             style="text-align: center; align-items: center; justify-content: center;">
            <img :src="imagenTomada" class="image-section" @click="takePicture"
                     style="margin: 0px auto">
          </div>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="scanCamera">Scanear Codigo</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  name: 'Camara',
  data() {
    return {
      title: 'Camara',
      imagenTomada:''
    };
  },
  mounted(){
    console.log("Cargando Camara")
    setTimeout(()=>{
      console.log(navigator.camera);
    },1000)
  },
  methods:{
    scanCamera(){
      console.log("Escaneando codigo");
      cordova.plugins.barcodeScanner.scan(
        function (result) {
            alert("We got a barcode\n" +
                  "Result: " + result.text + "\n" +
                  "Format: " + result.format + "\n" +
                  "Cancelled: " + result.cancelled);
        },
        function (error) {
            alert("Scanning failed: " + error);
        },
        {
            preferFrontCamera : false, // iOS and Android
            showFlipCameraButton : false, // iOS and Android
            showTorchButton : false, // iOS and Android
            torchOn: false, // Android, launch with the torch switched on (if available)
            saveHistory: true, // Android, save scan history (default false)
            prompt : "Coloca el codigo de barras en el recuadro", // Android
            resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
            //formats : "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
            orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
            disableAnimations : false, // iOS
            disableSuccessBeep: false // iOS and Android
        }
      );
    },
    takePicture(){
      console.log("takePicture")
      console.log(navigator.camera);
      navigator.camera.getPicture(this.onSuccessCamera, this.onFailCamera,
                        {
                            quality: 100,
                            destinationType: Camera.DestinationType.FILE_URI,
                            cameraDirection : 1,
                            correctOrientation: true,
                            targetWidth: 600
                        });
    },
    getFileContentAsBase64(path,callback){
        window.resolveLocalFileSystemURL(path, gotFile, fail);
        function fail(e) {
            alert('Cannot found requested file');
        }
        function gotFile(fileEntry) {
          console.log("gotFile")
            fileEntry.file(function(file) {
                let reader = new FileReader();
                reader.onloadend = function(e) {
                    let content = this.result;
                    callback(content);
                };
                // The most important point, use the readAsDatURL Method from the file plugin
                reader.readAsDataURL(file);
            });
        }
    },
    onSuccessCamera(imageURI) {
      console.log("onSuccessCamera")
      console.log(imageURI);
        this.getFileContentAsBase64(imageURI,(base64Image)=>{
          console.log("getFileContentAsBase64")
          console.log(base64Image)
            this.imagenTomada = base64Image;
            // Then you'll be able to handle the myimage.png file as base64
        });
    },
    onFailCamera(message) {
        this.showToast('Imagen no tomada', 3500,{position : 'center'});
    },
  },
};
</script>