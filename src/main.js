import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import Vue2Editor from "vue2-editor";
import AuthGuard from "@nerd305/firebase-vuetify-auth";
import app from "@/middleware/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.use(Vue2Editor);
Vue.config.productionTip = false;

const authGuardSettings = {
  debug: true, // enable debug messages in console log
  session: "local", // session persistance

  router, // routes
  firebase: app, // pass on firebase middleware app init
  store,

  saml: false, // allow authentication with SAML
  saml_text: "Login with OKTA", // text for large login button
  saml_provider_id: "saml.okta", // firebase provider ID for SAML

  email: true, // allow authentication with email
  phone: false, // allow authentication with phone
  google: true, // allow authentication with gmail account
  facebook: false, // allow authentication with facebook account

  verification: false, // require user email to be verified before granting access
  registration: true, // allow new user registrations
};

Vue.use(AuthGuard, authGuardSettings);

onAuthStateChanged(getAuth(app), () => {
  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
