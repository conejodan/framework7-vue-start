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
          <f7-button fill @click="buyNowBtn">buyNowBtn</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="buyInFutureBtn">buyInFutureBtn</f7-button>
        </f7-col>
      </f7-row>
      <f7-row tag="p">
        <f7-col>
          <f7-button fill @click="profileSharingBtn">profileSharingBtn</f7-button>
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
      title: 'Paypal',
    };
  },
  mounted(){
    console.log("Cargando Paypal")
    setTimeout(()=>{
      this.initPaymentUI();
    },300);
  },
  methods:{
    buyNowBtn(){
      console.log("Evento buyNowBtn");
       PayPalMobile.renderSinglePaymentUI(this.createPayment(), this.onSuccesfulPayment, this.onUserCanceled);
    },
    createPayment() {
      // for simplicity use predefined amount
      // optional payment details for more information check [helper js file](https://github.com/paypal/PayPal-Cordova-Plugin/blob/master/www/paypal-mobile-js-helper.js)
      var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
      var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale", paymentDetails);
      return payment;
    },
    onSuccesfulPayment(payment) {
      console.log("payment success: " + JSON.stringify(payment, null, 4));
    },
    onUserCanceled(result) {
      console.log("onUserCanceled",result);
    },
    buyInFutureBtn(){
      console.log("Evento buyInFutureBtn");
      PayPalMobile.renderFuturePaymentUI(this.onAuthorizationCallback, this.onUserCanceled);
    },
    onAuthorizationCallback(authorization) {
      console.log("authorization: " + JSON.stringify(authorization, null, 4));
    },
    profileSharingBtn(){
      alert("Evento profileSharingBtn");
      PayPalMobile.renderProfileSharingUI(["profile", "email", "phone", "address", "futurepayments", "paypalattributes"], this.onAuthorizationCallback, this.onUserCanceled);
    },
    initPaymentUI(){
      console.log("Evento initPaymentUI");
      var clientIDs = {
        "PayPalEnvironmentProduction": "AXgIimdxxBHSbDaxZrmYo0MoHv3wCJEpbMrLb7dUogc0gwp_keHZ2Enh1oO-0FQHnghKK5DJofxFvS1I",
        "PayPalEnvironmentSandbox": "Acx0fZIkoQt4LYAEVVahKzOKUl1-ON0mGjo2TF69N7hYKZ5Ijw_qwiWEjTeo59CrsZQ4Jch5tiPAZjSx"
      };
      PayPalMobile.init(clientIDs, this.onPayPalMobileInit);
    },
    configuration() {
      // for more options see `paypal-mobile-js-helper.js`
      var config = new PayPalConfiguration({
        merchantName: "My test shop", 
        merchantPrivacyPolicyURL: "https://mytestshop.com/policy", 
        merchantUserAgreementURL: "https://mytestshop.com/agreement"
        });
      return config;
    },
    onPayPalMobileInit() {
      // must be called
      // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
      PayPalMobile.prepareToRender("PayPalEnvironmentSandbox", this.configuration(), this.onPrepareRender);
    },
  },
};
</script>