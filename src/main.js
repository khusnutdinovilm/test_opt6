import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import colResizeDirective from "@/plugins/vue-columns-resizable";

createApp(App)
  .directive("col-resize", colResizeDirective)
  .use(store)
  .use(router)
  .mount("#app");
