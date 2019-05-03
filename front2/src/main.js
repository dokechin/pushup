import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueApexCharts from 'vue-apexcharts'
import Datepicker from 'vuejs-datepicker'

Vue.component('apexchart', VueApexCharts)
Vue.component('datepicker', Datepicker)

Vue.config.productionTip = false

Vue.prototype.liff = window.liff

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
