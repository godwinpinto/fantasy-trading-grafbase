import './assets/main.css'

import { createApp, provide, h  } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { apolloClient } from '@/utils/apolloLink'
import { DefaultApolloClient } from "@vue/apollo-composable"
import PusherPlugin from '@/utils/pusherConfig'
import { createAuth0 } from '@auth0/auth0-vue';

const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },
    render: () => h(App),
})

app.use(
    createAuth0({
      domain: "grafbase-godwinpinto.jp.auth0.com",
      clientId: "vuaVH0KCyP8d7CFiKWiJ2Asl8w0kjAWr",
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    })
  );

app.use(PusherPlugin);
app.use(createPinia())
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
