import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import {library} from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTrash, faLink, faListUl,faRandom, faUndo, faStar, faEnvelope
} from "@fortawesome/free-solid-svg-icons";

library.add(faTrash, faLink, faListUl,faRandom, faUndo, faStar, faEnvelope);

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
