<template>
<div>
  <header class="app-bar-display">
    <div class="button-home" @click="homeClick">SDCS学生信息系统</div>
  </header>
  <aside class="app-bar-display">
    <div class="info-side">
      <label>丘南海</label>
      <p>数据科学与计算机学院</p>
    </div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='basicInfo'}" @click="basicInfoClick">基本信息</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='family'}" @click="familyClick">家庭信息</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='schoolRoll'}" @click="schoolRollClick">学籍管理</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='course'}" @click="courseClick" >课程成绩</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='partyInfo'}" @click="partyInfoClick">党员信息</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='scholarship'}" @click="scholarshipClick">奖学金</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='aid'}" @click="aidClick">资助信息管理</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='loan'}" @click="loanClick">助学贷款</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='cadre'}" @click="cadreClick">学生干部任职情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='award'}" @click="awardClick">获得奖励情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='paper'}" @click="paperClick">发表论文情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='patent'}" @click="patentClick">获得专利情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='techProject'}" @click="techProjectClick">科研项目</div>
<!--
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='query'}" @click="queryClick">高级查询（跨表查询）</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='insert'}" @click="insertClick">插入</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='import'}" @click="importClick">导入</div>-->
  </aside>
  <div class="container-info-display">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
export default {
  data: function() {
    return {
      //v-bind:class="router=='insert'?'button-clicked':'button-side'"
      router : 'main'
    }
  },
  beforeMount(){
    Vue.http.interceptors.push((request, next)=> {
      if (request.method === 'POST' && request.body.silent) {
        delete request.body.silent
        return next()
      } else if (request.silent) {
        delete request.silent
        return next()
      }
      next((res)=>{
        console.log(res.status)
        console.log(res.body)
        if(res.status === 440){
          this.$router.replace({name:'login'})
        }
        return res
      })
    })
    this.$store.dispatch('GET',{
      url:'users/session'
    }).then((res)=>{
      this.$store.commit('updateUserStatus',res.body.content.userType)
      this.$store.commit('updateUserInfo',res.body.content)
    }).then(()=>{
      this.$router.replace({name:'main'})
    }).catch((res)=>{
      if(res.status === 441)
      this.$router.replace({name:'login'})
    })
  },
  methods: {
    homeClick: function() {
      this.$router.push({ name: 'main' })
    },
    basicInfoClick: function() {
      this.$router.push({ name: 'basicInfo' })
    },
    familyClick: function() {
      this.$router.push({ name: 'family' })
    },
    schoolRollClick: function() {
      this.$router.push({ name: 'schoolRoll' })
    },
    courseClick: function() {
      this.$router.push({ name: 'course' })
    },
    partyInfoClick: function() {
      this.$router.push({ name: 'partyInfo' })
    },
    scholarshipClick: function() {
      this.$router.push({ name: 'scholarship' })
    },
    aidClick: function() {
      this.$router.push({ name: 'aid' })
    },
    loanClick: function() {
      this.$router.push({ name: 'loan' })
    },
    cadreClick: function() {
      this.$router.push({ name: 'cadre' })
    },
    awardClick: function() {
      this.$router.push({ name: 'award' })
    },
    paperClick: function() {
      this.$router.push({ name: 'paper' })
    },
    patentClick: function() {
      this.$router.push({ name: 'patent' })
    },
    techProjectClick: function() {
      this.$router.push({ name: 'techProject' })
    },
    queryClick: function(){
      this.$router.push({ name: 'query'})
    },
    insertClick: function(){
      this.$router.push({ name: 'insert'})
    },
    importClick: function(){
      this.$router.push({ name: 'import'})
    }
  }
}
</script>

<style>
:root {
  --blue: rgb(0, 132, 255);
  --blue-hover: rgb(15, 79, 207);
  --grey-menu: rgb(88, 88, 106);
  --grey-hover: rgb(210, 210, 210);
  --grey-shadow: rgb(190, 190, 190);
  --grey-background: rgb(240, 240, 240);
}

* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  /*
  background-color: lighten(#eceef1, 30%);
  color: #34495e;
  */
}

header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: var(--blue);
  text-align: center;
  /*shadow*/
  box-shadow: 1px 1px 5px var(--grey-shadow);
  z-index: 100;
}

.app-bar-hide {
  display: none;
}

.button-home {
  position: relative;
  height: 100%;
  width: 225px;
  padding-top: 15px;
  background-color: var(--blue);
  font-size: 1.5em;
  font-weight: lighter;
  color: white;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

.button-home:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}

aside {
  position: fixed;
  height: 100%;
  width: 225px;
  top: 60px;
  left: 0;
  background-color: white;
  color: var(--grey-menu);
  /*shadow*/
  box-shadow: 1px 1px 5px var(--grey-shadow);
  z-index: 99;
}

.info-side {
  height: 100px;
  text-align: center;
  border-bottom: 1px solid black;
  padding-top: 30px;
  /*
  **make text in div vertical-align to center
  line-height: 100px;
  margin: auto;
  */
}

.button-side {
  float: left;
  width: 100%;
  height: 40px;
  text-align: left;
  line-height: 40px;
  margin: auto;
  /*怎么让文字左右居中？*/
  padding-left: 67px;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

.button-side:hover {
  background-color: var(--grey-hover);
  cursor: pointer;
}

.button-clicked {
  background-color: var(--grey-hover);
}

.container-info-display{
  /*use min-height/min-width so that the div can auto expand when inside div gets bigger
  使用calc可以实现响应式布局*/
  min-width: calc(100vw - 225px);
  min-height: calc(100vh - 60px);
  margin-left: 225px;
  margin-top: 60px;
  text-align: center;
  /*the section cannot render in front of headbar*/
  z-index: -100;
  background-color: var(--grey-background);
  overflow: hidden;
}

.container-info-all {
  margin: 0;
  text-align: center;
  /*the section cannot render in front of headbar*/
  z-index: -100;
  background-color: var(--grey-background);
  overflow: hidden;
}

</style>
