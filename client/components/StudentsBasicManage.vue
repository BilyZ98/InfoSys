<template>
  <div>
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
      <!--
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='query'}" @click="queryClick">高级查询（跨表查询）</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='insert'}" @click="insertClick">插入</div>
      <div class="button-side" v-bind:class="{'button-clicked': $router.currentRoute.name=='import'}" @click="importClick">导入</div>
      -->
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
      router: 'main'
    }
  },
  methods: {
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
    }
    /*
    queryClick: function() {
      this.$router.push({ name: 'query' })
    },
    insertClick: function() {
      this.$router.push({ name: 'insert' })
    },
    importClick: function() {
      this.$router.push({ name: 'import' })
    }
    */
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
  height: 100px;
  text-align: center;
  border-bottom: 1px solid black;
  padding-top: 25px;
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
</style>