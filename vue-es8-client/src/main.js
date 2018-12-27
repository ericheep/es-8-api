import Vue from 'vue'
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'
import App from './App.vue'
import { store } from './store/store'
import VueSocketio from 'vue-socket.io-extended'
import io from 'socket.io-client'

import paper from 'paper'
Object.defineProperty(Vue.prototype, '$paper', { value: paper })

Vue.config.productionTip = false
Vue.use(VueSocketio, io('http://localhost:3000'), { store })
Vue.use(VueResize)

new Vue({
  store: store,
  render: h => h(App),
}).$mount('#app')
