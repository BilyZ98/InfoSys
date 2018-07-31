<template>
<div>
  <header>
    <div class="button-home" @click="homeClick">HOME</div>
    <p>SDCS学生信息系统</p>
  </header>
  <aside>
    <div class="info-side">some info here</div>
    <div class="button-side" @click="queryClick">query</div>
    <div class="button-side" @click="insertClick">insert</div>
    <div class="button-side">button3</div>
  </aside>
  <div class="container-info">
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return { }
  },
  methods: {
    homeClick () {
      this.$router.push({ name: 'main' })
    },
    queryClick(){
      this.$router.push({ name:'query'})
    },
    insertClick(){
      this.$router.push({ name: 'insert'})
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
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
  height: 60px;
  background-color: rgb(150, 150, 150);
  text-align: center;
  color: white;
}

.button-home {
  position: fixed;
  height: 100%;
  width: 15%;
  background-color: rgb(150, 150, 150);
  padding-top: 20px;
}

.button-home:hover {
  background-color: rgb(10, 10, 10);
}

header p {
  padding-top: 15px;
  font-size: 1.3em;
  font-weight: lighter;
}

aside {
  position: fixed;
  height: 100%;
  width: 15%;
  top: 60px;
  background-color: rgb(50, 50, 50);
  color: white;
}

.info-side {
  height: 100px;
  text-align: center;
  /*make text in div vertical-align to center*/
  line-height: 100px;
  margin: auto;
}

.button-side {
  float: left;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: auto;
  border-top: 1px solid black;
}

.button-side:hover {
  background-color: rgb(120, 120, 120);
}

.container-info{
  position: absolute;
  margin-left: 15%;
  width: 85%;
  margin-top: 60px;
  text-align: center;
  /*the section cannot render in front of headbar*/
  z-index: -100;
}
</style>
