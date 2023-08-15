import './assets/main.css'

import { createApp, provide, h  } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { apolloClient } from '@/utils/apolloLink'
import { DefaultApolloClient } from "@vue/apollo-composable"
import PusherPlugin from '@/utils/pusherConfig'

import {createAuth0Client} from "@auth0/auth0-spa-js";

const app = createApp(App);
app.use(PusherPlugin);
app.use(createPinia())
app.use(router)
app.provide(DefaultApolloClient, apolloClient)
app.use(autoAnimatePlugin)
app.mount('#app')
