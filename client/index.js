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

import BasicInfo from './components/managerPages/BasicInfo.vue'
import Family from './components/managerPages/Family.vue'
import SchoolRoll from './components/managerPages/SchoolRoll.vue'
import Course from './components/managerPages/Course.vue'
import PartyInfo from './components/managerPages/PartyInfo.vue'
import Scholarship from './components/managerPages/Scholarship.vue'
import Aid from './components/managerPages/Aid.vue'
import Loan from './components/managerPages/Loan.vue'
import Cadre from './components/managerPages/Cadre.vue'
import Award from './components/managerPages/Award.vue'
import Paper from './components/managerPages/Paper.vue'
import Patent from './components/managerPages/Patent.vue'
import TechProject from './components/managerPages/TechProject.vue'

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
    { name: 'schoolRoll', path: '/schoolRoll', component: SchoolRoll },
    { name: 'course', path: '/course', component: Course },
    { name: 'partyInfo', path: '/partyInfo', component: PartyInfo },
    { name: 'scholarship', path: '/scholarship', component: Scholarship },
    { name: 'aid', path: '/aid', component: Aid },
    { name: 'loan', path: '/loan', component: Loan },
    { name: 'cadre', path: '/cadre', component: Cadre },
    { name: 'award', path: '/award', component: Award },
    { name: 'paper', path: '/paper', component: Paper },
    { name: 'patent', path: '/patent', component: Patent },
    { name: 'techProject', path: '/techProject', component: TechProject },
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