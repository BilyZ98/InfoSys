import Vue from 'vue'
import VueRouter from 'vue-router'
//.vue components
import App from './App.vue'
import Main from './components/Main.vue'
import Query from './components/Query.vue'
import List from './components/List.vue'
import Insert from './components/Insert.vue'
import BasicInfo from './components/inserts/BasicInfo.vue'
import Family from './components/inserts/Family.vue'
import Paper from './components/inserts/Paper.vue'
import Patent from './components/inserts/Patent.vue'
import TechProject from './components/inserts/TechProject.vue'
import Course from './components/inserts/Course.vue'
import Cadre from './components/inserts/Cadre.vue'
import Scholarship from './components/inserts/Scholarship.vue'

Vue.config.debug = true
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'main', path: '/', component: Main },
    { name: 'query', path: '/query', component: Query },
    { name: 'list', path: '/list', component: List },
    {
      name: 'insert',
      path: '/insert',
      component: Insert,
      children: [
        { name: 'basicInfo', path: 'basicInfo', component: BasicInfo },
        { name: 'family', path: 'family', component: Family },
        { name: 'paper', path: 'paper', component: Paper },
        { name: 'patent', path: 'patent', component: Patent },
        { name: 'techProject', path: 'techProject', component: TechProject },
        { name: 'course', path: 'course', component: Course },
        { name: 'cadre', path: 'cadre', component: Cadre },
        { name: 'scholarship', path: 'scholarship', component: Scholarship }
      ]
    }
  ]
})

const app = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')