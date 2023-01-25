import { createApp } from "vue";
import App from "./App.vue";
import { Dialog, Loading, Notify, Quasar } from "quasar";
import router from "./router";
import { createPinia } from "pinia";

import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v6/fontawesome-v6.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import "quasar/src/css/index.sass";

const app = createApp(App);
app
  .use(createPinia())
  .use(Quasar, {
    plugins: {
      Dialog,
      Loading,
      Notify,
    },
  })
  .use(router);

app.mount("#app");
