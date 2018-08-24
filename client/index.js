import Vue from 'vue'
import VueRouter from 'vue-router'
import $ from 'jquery'

//.vue components
import App from './App.vue'
import Main from './components/Main.vue'
import Query from './components/Query.vue'
import List from './components/List.vue'
import Insert from './components/Insert.vue'
import Import from './components/Import.vue'
import Detail from './components/Detail.vue'

import BasicInfo from './components/BasicInfo.vue'
import Family from './components/Family.vue'

import BasicInfoInsert from './components/inserts/BasicInfo.vue'
import FamilyInsert from './components/inserts/Family.vue'
import PaperInsert from './components/inserts/Paper.vue'
import PatentInsert from './components/inserts/Patent.vue'
import TechProjectInsert from './components/inserts/TechProject.vue'
import CourseInsert from './components/inserts/Course.vue'
import CadreInsert from './components/inserts/Cadre.vue'
import ScholarshipInsert from './components/inserts/Scholarship.vue'


Vue.config.debug = true
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { name: 'main', path: '/', component: Main },
    { name: 'basicInfo', path: '/basicInfo', component: BasicInfo },
    { name: 'family', path: '/family', component: Family },
    { name: 'query', path: '/query', component: Query },
    { name: 'list', path: '/list', component: List },
    { name: 'import', path: '/import', component: Import},
    { name: 'detail', path: '/detail', component: Detail},
    {
      name: 'insert',
      path: '/insert',
      component: Insert,
      children: [
        { name: 'basicInfoInsert', path: 'basicInfo', component: BasicInfoInsert },
        { name: 'familyInsert', path: 'family', component: FamilyInsert },
        { name: 'paperInsert', path: 'paper', component: PaperInsert },
        { name: 'patentInsert', path: 'patent', component: PatentInsert },
        { name: 'techProjectInsert', path: 'techProject', component: TechProjectInsert },
        { name: 'courseInsert', path: 'course', component: CourseInsert },
        { name: 'cadreInsert', path: 'cadre', component: CadreInsert },
        { name: 'scholarshipInsert', path: 'scholarship', component: ScholarshipInsert }
      ]
    }
  ]
})

const app = new Vue({
  //router,
  router: router,
  //render: h => h(App)
  render: function(h) {
      return h(App)
  }
}).$mount('#app')