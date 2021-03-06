// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
Vue.use(VueMaterial)
Vue.config.productionTip = false
console.log(process.env)
/* eslint-disable no-new */
const myVueApp = new Vue({ // eslint-disable-line
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
