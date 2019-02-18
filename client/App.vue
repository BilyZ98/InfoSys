<template>
  <div>
    <header class="app-bar-display">
      <div class="button-home" @click="homeClick">SDCS学生信息系统</div>
      <div class="button-icon glyphicon glyphicon-log-out" aria-hidden="true" @click="logoutClick" title="登出"></div>
      <div class="button-icon glyphicon glyphicon-user" aria-hidden="true" title="用户信息" @mouseenter="userInfoEnter" @mouseleave="userInfoLeave">
        <!-- 浮窗 -->
        <div id="popup-userInfo">
          <div id="popup-account">12345678</div>
          <div id="popup-usertype">guest</div>
          <button class="popup-btn-resetpassword" @click="resetpswdClick">重置密码</button>
        </div>
      </div>
    </header>
    <!--
    <aside class="app-bar-display">
      <div class="info-side">
        <label id="info-account"></label>
        <p>数据科学与计算机学院</p>
      </div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='basicInfo'}" @click="basicInfoClick">基本信息</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='family'}" @click="familyClick">家庭信息</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='schoolRoll'}" @click="schoolRollClick">学籍管理</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='course'}" @click="courseClick">课程成绩</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='partyInfo'}" @click="partyInfoClick">党员信息</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='scholarship'}" @click="scholarshipClick">奖学金管理</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='aid'}" @click="aidClick">资助信息管理</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='loan'}" @click="loanClick">助学贷款</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='cadre'}" @click="cadreClick">学生干部任职情况</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='award'}" @click="awardClick">获得奖励情况</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='paper'}" @click="paperClick">发表论文情况</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='patent'}" @click="patentClick">获得专利情况</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='techProject'}" @click="techProjectClick">科研项目</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='query'}" @click="queryClick">高级查询（跨表查询）</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='insert'}" @click="insertClick">插入</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='import'}" @click="importClick">导入</div>
    </aside>
    -->
    <div class="container-info-display">
      <transition name="test" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      router: 'studentMain'
    }
  },
  methods: {
    homeClick: function() {
      if(this.$store.getters.getUserStatus == 'student')
        this.$router.push({ name: 'studentMain' })
      else if(this.$store.getters.getUserStatus == 'teacher')
        this.$router.push({ name: 'teacherMain' })
    },
    userInfoEnter: function() {
      $('#popup-userInfo').show()
      $('#popup-account').text(this.$store.getters.getUserAccount)
      $('#popup-usertype').text(this.$store.getters.getUserStatus)
    },
    userInfoLeave: function() {
      $('#popup-userInfo').hide()
    },
    resetpswdClick: function(){
      this.$router.push({ name: 'resetpswd' })
    },
    logoutClick: function() {
      if (confirm("您确定要退出登录吗？")) {
        var _self = this
        $.ajax({
          type: 'GET',
          url: '/users/logout',
          contentType: 'application/json;charset=utf-8',
          timeout: 5000,
          success: function(result, xhr) {
            //console.log(result)
            _self.$router.push({ name: 'login' })
          },
          error: function(result, xhr) {
            //连接错误
            //console.log(result)
            alert('服务器连接错误: ' + xhr)
          }
        })
      }
    }
    /*
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
    queryClick: function() {
      this.$router.push({ name: 'query' })
    },
    insertClick: function() {
      this.$router.push({ name: 'insert' })
    },
    importClick: function() {
      this.$router.push({ name: 'import' })
    }*/
  }
}
</script>
<style>
.test-enter-active,
.test-leave-active {
  transition: 0.25s ease-in-out;
}

.test-enter {
  transform: translate(-100px, 0);
  opacity: 0;
}

.test-leave-to
/* .component-fade-leave-active for below version 2.1.8 */
{
  transform: translate(300px, 0);
  opacity: 0;
}

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
  background-color: var(--grey-background);
}

header {
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  background-color: var(--blue);
  /*shadow*/
  box-shadow: 1px 1px 5px var(--grey-shadow);
  z-index: 100;
}

.app-bar-hide {
  display: none;
}

.button-home {
  position: relative;
  display: inline-block;
  height: 100%;
  width: 225px;
  text-align: center;
  padding-top: 12px;
  background-color: var(--blue);
  font-size: 1.5em;
  font-weight: lighter;
  color: white;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.button-home:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
  border-radius: 5px;
}

.button-icon {
  float: right;
  margin-right: 40px;
  padding-top: 20px;
  height: 100%;
  width: 20px;
  text-align: center;
  color: black;
  font-size: 20px;
  font-weight: bold;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.button-icon:hover {
  color: white;
  cursor: pointer;
}

#popup-userInfo {
  display: none;
  position: fixed;
  width: 180px;
  height: 200px;
  margin-top: 5px;
  right: 20px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /* transition */
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
}

#popup-account {
  margin-top: 20px;
  color: black;
  font-size: 16px;
  font-weight: bold;
}

#popup-usertype {
  margin-top: 20px;
  color: black;
  font-size: 16px;
  font-weight: bold;
}

.popup-btn-resetpassword {
  width: 100px;
  height: 36px;
  margin-top: 80px;
  font-size: 16px;
  color: var(--blue);
  background-color: white;
  border: 2px solid var(--blue);
  border-radius: 3px;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}
/*
aside {
  position: fixed;
  height: calc(100vh - 60px);
  width: 225px;
  top: 60px;
  left: 0;
  background-color: white;
  color: var(--grey-menu);
  // shadow
  box-shadow: 1px 1px 5px var(--grey-shadow);
  z-index: 99;
  overflow: auto;
}

.info-side {
  height: 100px;
  text-align: center;
  border-bottom: 1px solid black;
  padding-top: 25px;
}

.button-side {
  float: left;
  width: 100%;
  height: 40px;
  text-align: left;
  line-height: 40px;
  margin: auto;
  // 怎么让文字左右居中？
  padding-left: 67px;
  transition: 0.3s;
  -moz-transition: 0.3s;
  // Firefox 4
  -webkit-transition: 0.3s;
  // Safari 和 Chrome
  -o-transition: 0.3s;
  // Opera
}

.button-side:hover {
  background-color: var(--grey-hover);
  cursor: pointer;
  transform: translate(0, -3px);
  box-shadow: 0 2px 3px var(--grey-shadow);
}

.button-clicked {
  background-color: var(--grey-hover);
  transform: translate(0, -3px);
  box-shadow: 0 2px 3px var(--grey-shadow);
}
*/
.container-info-display {
  /*use min-height/min-width so that the div can auto expand when inside div gets bigger
  使用calc可以实现响应式布局, vw计算的是包括滚动条的宽度/高度*/
  max-width: calc(100vw);
  min-height: calc(100vh - 60px);
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