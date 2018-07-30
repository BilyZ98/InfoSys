import Vue from 'vue'
import Router from 'vue-router'

//.vue components
import App from './App.vue'
import Query from './components/Query.vue'
import List from './components/List.vue'

Vue.config.debug = true
Vue.use(Router)

const Bar = { template: '<div>bar</div>' }

const router = new Router({
  routes: [
    { path: '/', component: Query },
    { path: '/list', component: List },
    { path: '/bar', component: Bar }
  ]
})

const app = new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
