<template>
  <div>
    <aside class="app-bar-display">
      <div class="info-side">
        <!--<label id="info-account"></label>
        <p>数据科学与计算机学院</p>-->
        <p>办事指引</p>
      </div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='leave'}" @click="leaveClick">请假指引</div>
    </aside>
    <div class="container-studentsBasic-display">
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
      router: 'guideline'
    }
  },
  mounted: function() {
    //console.log(this.$store.getters.getUserAccount)
    $('#info-account').text(this.$store.getters.getUserAccount)
  },
  methods: {
    leaveClick: function() {
      this.$router.push({ name: 'guideline' })
    }
    
  }
}
</script>
<style scoped>
aside {
  position: fixed;
  height: calc(100vh - 60px);
  width: 225px;
  top: 60px;
  left: 0;
  background-color: white;
  color: var(--grey-menu);
  /*shadow*/
  box-shadow: 1px 1px 5px var(--grey-shadow);
  z-index: 99;
  overflow: auto;
}

.info-side {
  height: 70px;
  text-align: center;
  border-bottom: 1px solid var(--grey-shadow);
  box-shadow: 1px 0px 1px var(--grey-shadow);
  padding-top: 25px;
  font-weight: bold;
  font-size: 16px;
  /*
  make text in div vertical-align to center
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
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
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

.container-studentsBasic-display {
  /*use min-height/min-width so that the div can auto expand when inside div gets bigger
  使用calc可以实现响应式布局, vw计算的是包括滚动条的宽度/高度*/
  max-width: calc(100vw - 225px);
  min-height: calc(100vh - 60px);
  margin-left: 225px;
  text-align: center;
  /*the section cannot render in front of headbar*/
  z-index: -100;
  background-color: var(--grey-background);
  overflow: hidden;
}
/*
.container-studentsBasic-all {
  margin: 0;
  text-align: center;
  // the section cannot render in front of headbar
  z-index: -100;
  background-color: var(--grey-background);
  overflow: hidden;
}
*/
</style>