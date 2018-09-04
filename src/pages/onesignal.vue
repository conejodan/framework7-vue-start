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
          <f7-button fill @click="suscribirse(true)">Suscribirse</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="suscribirse(false)">UnSubscribirse</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="sendPush">Send Push</f7-button>
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
//import {auth, database} from 'firebase';
//import {mapActions} from 'vuex';
export default {
  name: 'Example',
  data() {
    return {
      title: 'OneSignal',
    };
  },
  mounted(){
    console.log("Cargando Example")
  },
  methods:{
    suscribirse(valor){
      window.plugins.OneSignal.setSubscription(valor);
    },
    sendPush(){
      window.plugins.OneSignal.getIds(function(ids) {
        console.log("OneSignal::sendPush");
        console.log(ids);
        var notificationObj = { contents: {en: "message body"},
                                include_player_ids: [ids.userId]};
        window.plugins.OneSignal.postNotification(notificationObj,
          function(successResponse) {
            console.log("Notification Post Success:", successResponse);
          },
          function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
          }
        );
      });
    }
  },
};
</script>