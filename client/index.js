import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import store from './store/store'

/* html to pdf */
import htmlToPDF from './components/javascripts/htmlToPDF'

/* bootstrap */
//import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.css'

/* xlsx */
import XLSX from 'xlsx'

/* first-level vue components */
import App from './App.vue'
import Invalid from './components/Invalid.vue'
import teacherMain from './components/teacherMain.vue'
import studentMain from './components/studentMain.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Query from './components/Query.vue'
import List from './components/List.vue'
import Import from './components/Import.vue'
import Detail from './components/Detail.vue'
import Insert from './components/Insert.vue'

/* studentsBasicManage vue components */
import StudentsBasicManage from './components/StudentsBasicManage.vue'
import BasicInfo from './components/StudentsBasicManagePages/BasicInfo.vue'
import BasicInfoOfStu from './components/basicInfoOfStudent.vue'
import Family from './components/StudentsBasicManagePages/Family.vue'
import SchoolRoll from './components/StudentsBasicManagePages/SchoolRoll.vue'
import Course from './components/StudentsBasicManagePages/Course.vue'
import PartyInfo from './components/StudentsBasicManagePages/PartyInfo.vue'
import Scholarship from './components/StudentsBasicManagePages/Scholarship.vue'
import Aid from './components/StudentsBasicManagePages/Aid.vue'
import Loan from './components/StudentsBasicManagePages/Loan.vue'
import Cadre from './components/StudentsBasicManagePages/Cadre.vue'
import Award from './components/StudentsBasicManagePages/Award.vue'
import Paper from './components/StudentsBasicManagePages/Paper.vue'
import Patent from './components/StudentsBasicManagePages/Patent.vue'
import TechProject from './components/StudentsBasicManagePages/TechProject.vue'

/* insert in studentsBasicManage vue components */
import BasicInfoInsert from './components/inserts/BasicInfoInsert.vue'
import FamilyInsert from './components/inserts/FamilyInsert.vue'
import PaperInsert from './components/inserts/PaperInsert.vue'
import PatentInsert from './components/inserts/PatentInsert.vue'
import TechProjectInsert from './components/inserts/TechProjectInsert.vue'
import CadreInsert from './components/inserts/CadreInsert.vue'
import AwardInsert from './components/inserts/AwardInsert.vue'

/* email component */
import Email from './components/StudentsBasicManagePages/modules/Email.vue'


Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(htmlToPDF)
//全局注册email组件, 在页面中可以通过<email></email>直接引用
Vue.component('email', Email)

const router = new VueRouter({
  //使用路由的history模式，url栏没有#
  mode: 'history',
  routes: [
    { path: '/', redirect: 'login' },
    { name: 'login', path: '/login', component: Login },
    { name: 'register', path: '/register', component: Register },
    { name: 'studentMain', path: '/studentMain', component: studentMain },
    { name: 'teacherMain', path: '/teacherMain', component: teacherMain },
    {
      name: 'studentsBasicManage',
      path: '/studentsBasicManage',
      component: StudentsBasicManage,
      children: [
        { name: 'basicInfo', path: 'basicInfo', component: BasicInfo },
        { name: 'family', path: 'family', component: Family },
        { name: 'schoolRoll', path: 'schoolRoll', component: SchoolRoll },
        { name: 'course', path: 'course', component: Course },
        { name: 'partyInfo', path: 'partyInfo', component: PartyInfo },
        { name: 'scholarship', path: 'scholarship', component: Scholarship },
        { name: 'aid', path: 'aid', component: Aid },
        { name: 'loan', path: 'loan', component: Loan },
        { name: 'cadre', path: 'cadre', component: Cadre },
        { name: 'award', path: 'award', component: Award },
        { name: 'paper', path: 'paper', component: Paper },
        { name: 'patent', path: 'patent', component: Patent },
        { name: 'techProject', path: 'techProject', component: TechProject },
      ]
    },
    { name: 'basicInfoOfStu', path: '/basicInfoOfStu', component: BasicInfoOfStu},
    { name: 'query', path: '/query', component: Query },
    { name: 'list', path: '/list', component: List },
    { name: 'import', path: '/import', component: Import },
    { name: 'detail', path: '/detail', component: Detail },
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
        { name: 'cadreInsert', path: 'cadre', component: CadreInsert },
        { name: 'awardInsert', path: 'award', component: AwardInsert }
      ]
    },
    //所有未匹配的路径都会加载404页面组件
    { name: 'invalid', path: '*', component: Invalid }
  ]
})

const app = new Vue({
  //router,
  router: router,
  store: store,
  beforeMount: function() {
    this.$store.dispatch('GET', {
      url: '/users/session'
    }).then((res) => {
      app.$store.commit('updateUserStatus', res.body.content.usertype)
      app.$store.commit('updateUserInfo', res.body.content)
    }).then(() => {
      // 防止回到登陆页面或访问和权限不符的页面
      if(app.$store.getters.getUserStatus == 'student') {
        if (app.$route.path == '/login')
          app.$router.replace({ name: 'studentMain'})
        if (app.$route.path == '/teacherMain')
          app.$router.replace({ name: 'studentMain'})
      } else if (app.$store.getters.getUserStatus == 'teacher') {
        if (app.$route.path == '/login')
          app.$router.replace({ name: 'teacherMain'})
        if (app.$route.path == '/studentMain')
          app.$router.replace({ name: 'teacherMain'})
      }
      //显示用户信息
      //$('#info-account').text(this.$store.getters.getUserAccount)
    }).catch((res) => {
      if (res.status === 441 || res.status === 440){
        app.$router.replace({ name: 'login' })
      }
    })
  },
  //render: h => h(App)
  render: function(h) {
    return h(App)
  }
}).$mount('#app')

/*
为了解决：
已经登陆后再把地址改为'http://localhost:3000/'仍转到登陆界面而不是主界面；
未登录时访问所有界面都跳转到登陆界面；

使用beforeMount守卫，在应用首次打开时判断登录状态

不需要下面的beforeEach守卫，
只需要在beforeMount中加入判断是否跳入login页面即可，
因为跳转到login只能通过地址栏输入，相当于重新加载

router.beforeEach(function(to, from, next){
  app.$store.dispatch('GET', {
    url: 'users/session'
  }).then((res) => {
    app.$store.commit('updateUserStatus', res.body.content.userType)
    app.$store.commit('updateUserInfo', res.body.content)
  }).then(() => {
    //app.$router.replace({name:'main'})
    if ((to.path == '/') || (to.path == '/login')) {
      app.$router.replace({
        name: 'main'
      })
    }
  }).catch((res) => {
    if (res.status === 441 || res.status === 440){
      app.$router.replace({ name: 'login' })
    }
  })

  next()
})
*/