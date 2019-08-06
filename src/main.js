// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import {router} from './router/index'
import $ from 'jquery'
import { AjaxPlugin } from 'vux'
import Meta from 'vue-meta'

// Vue.use(Vuex)
Vue.use(AjaxPlugin)
Vue.use(Meta)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
