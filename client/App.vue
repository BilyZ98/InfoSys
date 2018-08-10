<template>
<div>
  <header>
    <div class="button-home" @click="homeClick">SDCS学生信息系统</div>
  </header>
  <aside>
    <div class="info-side">信息栏</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='query'}" @click="queryClick">查询</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='insert'}" @click="insertClick">插入</div>
    <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='import'}" @click="importClick">导入</div>
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
* {
  margin: 0;
  padding: 0;
  transition: 0.5s;
  -moz-transition: 0.5s;  /* Firefox 4 */
  -webkit-transition: 0.5s; /* Safari 和 Chrome */
  -o-transition: 0.5s;  /* Opera */
}

body {
  width: 100%;
  height: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size: 15px;
  background-color: lighten(#eceef1, 30%);
  color: #34495e;
}

header {
  position: fixed;
  width: 100%;
  height: 10%;
  background-color: rgb(150, 150, 150);
  text-align: center;
  color: white;
  /*shadow*/
  box-shadow: 1px 1px 5px #888888;
}

.button-home {
  position: fixed;
  height: 100%;
  width: 15%;
  padding-top: 25px;
  background-color: rgb(150, 150, 150);
}

.button-home:hover {
  background-color: black;
}

aside {
  position: fixed;
  height: 100%;
  width: 15%;
  top: 10%;
  background-color: rgb(70, 70, 70);
  color: white;
  /*shadow*/
  box-shadow: 1px 1px 5px #888888;
}

.info-side {
  height: 100px;
  text-align: center;
  border-bottom: 1px solid black;
  /*make text in div vertical-align to center*/
  line-height: 100px;
  margin: auto;
}

.button-side {
  float: left;
  width: 100%;
  height: 50px;
  text-align: left;
  line-height: 50px;
  margin: auto;
  /*怎么让文字左右居中？*/
  padding-left: 43%;
}

.button-side:hover {
  background-color: black;
}

.button-clicked {
  background-color: black;
}

.container-info{
  position: absolute;
  /*use min-height/min-width so that the div can auto expand when inside div gets bigger */
  min-width: 85%;
  min-height: 90%;
  margin-left: 15%;
  top: 10%;
  text-align: center;
  /*the section cannot render in front of headbar*/
  z-index: -100;
  background-color: rgb(230, 230, 230);
}
</style>
