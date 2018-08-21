<template>
<div>
  <header>
    <div class="button-home" @click="homeClick">SDCS学生信息系统</div>
  </header>
  <aside>
    <div class="info-side">
      <label>丘南海</label>
      <p>数据科学与计算机学院</p>
    </div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='basicInfo'}" @click="basicInfoClick">基本信息</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >家庭信息</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >学籍管理</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >课程成绩</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >党员信息</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >奖学金</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >资助信息管理</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >助学贷款</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >学生干部任职情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >获得奖励情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >发表论文情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >获得专利情况</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name==''}" >科研项目</div>
<!--
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='query'}" @click="queryClick">高级查询（跨表查询）</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='insert'}" @click="insertClick">插入</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='import'}" @click="importClick">导入</div>-->
  </aside>
  <div class="container-info">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  data: function() {
    return {
      //v-bind:class="router=='insert'?'button-clicked':'button-side'"
      router : 'main'
    }
  },
  methods: {
    homeClick: function() {
      this.$router.push({ name: 'main' })
    },
    basicInfoClick: function() {
      this.$router.push({ name: 'basicInfo' })
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
  font-size: 15px;
  /*
  background-color: lighten(#eceef1, 30%);
  color: #34495e;
  */
}

header {
  position: fixed;
  width: 100%;
  height: 8%;
  background-color: var(--blue);
  text-align: center;
  /*shadow*/
  box-shadow: 1px 1px 5px var(--grey-shadow);
}

.button-home {
  position: relative;
  height: 100%;
  width: 15%;
  padding-top: 15px;
  background-color: var(--blue);
  font-size: 20px;
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
  width: 15%;
  top: 8%;
  background-color: white;
  color: var(--grey-menu);
  /*shadow*/
  box-shadow: 1px 1px 5px var(--grey-shadow);
  z-index: -10;
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

.container-info{
  position: absolute;
  /*use min-height/min-width so that the div can auto expand when inside div gets bigger */
  min-width: 85%;
  min-height: 92%;
  margin-left: 15%;
  top: 8%;
  text-align: center;
  /*the section cannot render in front of headbar*/
  z-index: -100;
  background-color: var(--grey-background);
}
</style>
