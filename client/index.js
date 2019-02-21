import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import $ from 'jquery'
import store from './store/store'

/* html to pdf */
import htmlToPDF from './components/javascripts/htmlToPDF'

/* bootstrap */
import BootstrapVue from 'bootstrap-vue'
//import 'bootstrap'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

/* xlsx */
import XLSX from 'xlsx'

/* first-level vue components */
import App from './App.vue'
import Invalid from './components/Invalid.vue'
import TeacherMain from './components/TeacherMain.vue'
import StudentMain from './components/StudentMain.vue'
import Login from './components/Login.vue'
import Resetpswd from './components/Resetpswd.vue'
import Query from './components/Query.vue'
import List from './components/List.vue'
import Import from './components/Import.vue'
import Detail from './components/Detail.vue'

/* TeacherBasicInfo for teachers vue components */
import TeacherBasicInfo from './components/TeacherBasicInfo.vue'
import BasicInfo from './components/teacherBasicInfoPages/BasicInfo.vue'
import Family from './components/teacherBasicInfoPages/Family.vue'
import SchoolRoll from './components/teacherBasicInfoPages/SchoolRoll.vue'
import Course from './components/teacherBasicInfoPages/Course.vue'
import PartyInfo from './components/teacherBasicInfoPages/PartyInfo.vue'
import Scholarship from './components/teacherBasicInfoPages/Scholarship.vue'
import Aid from './components/teacherBasicInfoPages/Aid.vue'
import Loan from './components/teacherBasicInfoPages/Loan.vue'
import Cadre from './components/teacherBasicInfoPages/Cadre.vue'
import Award from './components/teacherBasicInfoPages/Award.vue'
import Paper from './components/teacherBasicInfoPages/Paper.vue'
import Patent from './components/teacherBasicInfoPages/Patent.vue'
import TechProject from './components/teacherBasicInfoPages/TechProject.vue'
/* insert of TeacherBasicInfo for teachers */
import TeacherBasicInfoInsert from './components/TeacherBasicInfoInsert.vue'
import BasicInfoInsert from './components/teacherBasicInfoInserts/BasicInfoInsert.vue'
import FamilyInsert from './components/teacherBasicInfoInserts/FamilyInsert.vue'
import PaperInsert from './components/teacherBasicInfoInserts/PaperInsert.vue'
import PatentInsert from './components/teacherBasicInfoInserts/PatentInsert.vue'
import TechProjectInsert from './components/teacherBasicInfoInserts/TechProjectInsert.vue'
import CadreInsert from './components/teacherBasicInfoInserts/CadreInsert.vue'
import AwardInsert from './components/teacherBasicInfoInserts/AwardInsert.vue'
/* TeacherSpecialInfo for teachers */
import TeacherSpecialInfo from './components/TeacherSpecialInfo.vue'
/* AcademicWaring*/
import AcademicWarning from './components/teacherBasicInfoPages/Warning.vue'

/*Contest Info*/
import GameManage from './components/GameManage.vue'
import TeamInfo from './components/contest/TeamInfo.vue'
import AwardInfo from './components/contest/AwardInfo.vue'

/* StudentBasicInfo for students */
import StudentBasicInfo from './components/StudentBasicInfo.vue'
import StudentWarning from './components/studentWarning.vue'
/* insert in StudentBasicInfo for students */
import StudentBasicInfoInsert from './components/studentBasicInfoInserts/StudentBasicInfoInsert.vue'
import StudentFamilyInsert from './components/studentBasicInfoInserts/StudentFamilyInsert.vue'
import StudentCadreInsert from './components/studentBasicInfoInserts/StudentCadreInsert.vue'
/* StudentSpecialInfo for students */
import StudentSpecialInfo from './components/StudentSpecialInfo.vue'
import HMT from './components/teacherSpecialInfoPages/HMT.vue'
import InternationalStudent from './components/teacherSpecialInfoPages/InternationalStudent.vue'
import HMTInsert from './components/teacherSpecialInfoPages/HMTInsert.vue'
import InternationalStudentInsert from './components/teacherSpecialInfoPages/InternationalStudentInsert.vue'
/* guideline for students */
import Guideline from './components/Guideline.vue'
import Leave from './components/guideline/Leave.vue'
import QuitClass from './components/guideline/QuitClass.vue'

/* email component */
import Email from './components/teacherBasicInfoPages/modules/Email.vue'


Vue.config.debug = true
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(htmlToPDF)
Vue.use(BootstrapVue)
//全局注册email组件, 在页面中可以通过<email></email>直接引用
Vue.component('email', Email)

const router = new VueRouter({
  //使用路由的history模式，url栏没有#
  mode: 'history',
  routes: [
    { path: '/', redirect: 'login' },
    /* 账号管理 */
    { name: 'login', path: '/login', component: Login },
    { name: 'resetpswd', path: '/resetpswd', component: Resetpswd },
    /* 教师路由 */
    { name: 'teacherMain', path: '/teacherMain', component: TeacherMain },
    { name: 'academicWarning', path: '/academicWarning', component: AcademicWarning},
    {
      name: 'teacherBasicInfo',
      path: '/teacherBasicInfo',
      component: TeacherBasicInfo,
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
    { name: 'query', path: '/query', component: Query },
    { name: 'list', path: '/list', component: List },
    { name: 'import', path: '/import', component: Import },
    { name: 'detail', path: '/detail', component: Detail },
    {
      name: 'teacherBasicInfoInsert',
      path: '/teacherBasicInfoInsert',
      component: TeacherBasicInfoInsert,
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
    {
      name: 'teacherSpecialInfo',
      path: '/teacherSpecialInfo',
      component: TeacherSpecialInfo,
      children: [
        { name: 'HMT', path: 'HMT', component: HMT },
        { name: 'internationalStudent', path: 'internationalStudent', component: InternationalStudent }
      ]
    },
    /* 学生路由 */
    { name: 'studentMain', path: '/studentMain', component: StudentMain },
    { name: 'studentBasicInfo', path: '/studentBasicInfo', component: StudentBasicInfo },
    { name: 'studentWarning', path: '/studentWarning', component: StudentWarning},
    { 
      name: 'gameManage',
      path: '/gameManage', 
      component: GameManage,
      children: [
        {name: 'teamInfo', path: 'teamInfo', component: TeamInfo},
        {name: 'awardInfo', path: 'awardInfo', component: AwardInfo}
      ]
    },
    {
      name: 'guideline',
      path: '/guideline',
      component: Guideline,
      children: [
        { name: 'leave', path: 'leave', component: Leave },
        { name: 'quitClass', path: 'quitClass', component: QuitClass}
      ]
    },
    { name: 'studentBasicInfoInsert', path: '/studentBasicInfoInsert', component: StudentBasicInfoInsert },
    { name: 'studentFamilyInsert', path: '/studentFamilyInsert', component: StudentFamilyInsert },
    { name: 'studentCadreInsert', path: '/studentCadreInsert', component: StudentCadreInsert },
    { name: 'studentSpecialInfo', path: '/studentSpecialInfo', component: StudentSpecialInfo },
    { name: 'HMTInsert', path: '/HMTInsert', component: HMTInsert },
    { name: 'internationalStudentInsert', path: '/internationalStudentInsert', component: InternationalStudentInsert },
    /* 所有未匹配的路径都会加载404页面组件 */
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

/*

*/