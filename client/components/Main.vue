<template>
<div id="container-home">
  <!--顶部栏-->
  <div class="container-header">
  </div>
  <!--主要区域-->
  <div class="container-card">
    <p id="text-greeting"></p>
  </div>
  <div class="container-card">
    <span>公告栏：</span>
    <span>37</span>
    <div id="container-board">infoinfo...</div>
    <button>新建公告</button>
  </div>
</div>
</template>

<script>
export default {
  data: function(){
    return {}
  },
  mounted: function(){
      var hour = new Date().getHours()
      var hourStr = ''
      if(hour >= 4 && hour < 12) {
        hourStr = '早上好!'
      } else if(hour >= 12 && hour <= 6) {
        hourStr = '下午好!'
      } else {
        hourStr = '晚上好!'
      }
      //$('#text-greeting').text(hourStr)
    },
  methods: {}
}
</script>

<style>
#container-home .container-header {
  height: 70px;
  line-height: 70px;
  padding-left: 30px;
  text-align: left;
  background-color: white;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*设置文字不可被选中*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

#container-home .container-card {
  float: left;
  margin: 25px;
  margin-right: 0;
  padding: 30px;
  height: 600px;
  width: calc(50% - 37.5px);
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-home #text-greeting {
  text-align: center;
  font-size: 40px;
  font-weight: bolder;
}

#container-home .container-card span {
  font-size: 17px;
}

#container-home #container-board {
  margin-top: 20px;
  padding: 5px;
  height: 300px;
}
</style>
