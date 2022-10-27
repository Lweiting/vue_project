import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import web3 from 'web3'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$web3 = web3

new Vue({
    render: h => h(App),
}).$mount('#app')
