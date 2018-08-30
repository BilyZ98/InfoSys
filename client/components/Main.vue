<template>
<div id="container-home">
  <!--顶部栏-->
  <div class="container-header">
  </div>
  <!--主要区域-->
  <div class="container-card">
    <p class="text-greeting"></p>
  </div>
  <div class="container-card">
    <span class="notice-header">公告栏：</span>
    <span class="notice-header" id="notice-number">37</span>
    <div class="notice-list">
      <div class="notice" v-for="notice in notices" @click="noticeClick(notice.id)">
        <span>{{notice.title}}</span>
        <span class="notice-time">{{notice.time}}</span>
        <span class="notice-teacher">{{notice.teacher}}</span>
      </div>
    </div>
    <button id="button-new-notice" @click="newNoticeClick">新建公告</button>
  </div>

  <!-- 弹窗 -->
  <div id="popup" class="popup-background">
    <!-- 弹窗内容 -->
    <div class="popup-content">
      <span id="popup-close" @click="modalCloseClick">&times;</span>
      <div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data: function(){
    return {
      notices: [{
        id: 1,
        title: 'titleeeeeeeeeeeeeeeeeeeeeeeeeee1',
        teacher: '王老师',
        time: '2018-08-30'
      }, {
        id: 2,
        title: 'title2',
        teacher: '王老师',
        time: '2018-08-31'
      }, {
        id: 3,
        title: 'title3',
        teacher: '王老师',
        time: '2018-09-30'
      },{
        id: 1,
        title: 'title1',
        teacher: '王老师',
        time: '2018-08-30'
      }, {
        id: 2,
        title: 'title2',
        teacher: '王老师',
        time: '2018-08-31'
      }, {
        id: 3,
        title: 'title3',
        teacher: '王老师',
        time: '2018-09-30'
      }]
    }
  },
  mounted: function(){
    //问候
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
  methods: {
    noticeClick: function(id) {
      alert(id)
    },
    modalCloseClick: function() {
      $('#popup').hide()
    },
    newNoticeClick: function(){
      $('#popup').show()
    }
  }
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

#container-home .text-greeting {
  text-align: center;
  font-size: 40px;
  font-weight: bolder;
}

/*公告栏*/

#container-home .notice-header {
  font-size: 20px;
  font-weight: bolder;
}

#container-home .notice-list {
  margin-top: 20px;
  height: 430px;
  overflow: auto;
}

#container-home .notice {
  padding: 15px 20px 5px 20px;
  height: 45px;
  border-top: 1px solid var(--grey-shadow);
  transition: background 0.3s;
  -moz-transition: background 0.3s;  /* Firefox 4 */
  -webkit-transition: background 0.3s; /* Safari 和 Chrome */
  -o-transition: background 0.3s;  /* Opera */
}

#container-home .notice:hover {
  background-color: var(--grey-hover);
}

#container-home .notice-teacher {
  float: right;
  margin-right: 20px;
}

#container-home .notice-time {
  float: right;
}

#container-home #button-new-notice {
  margin-top: 40px;
  width: 110px;
  height: 36px;
  margin-left: calc(50% - 55px);
  font-size: 17px;
  color: white;
  background-color: var(--blue);
  border: none;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#container-home #button-new-notice:hover {
  background-color: var(--blue-hover);
}

/* 弹窗 (background) */

#container-home .popup-background {
  display: none; /* 默认隐藏 */
  position: absolute; /* 定位 */
  z-index: 10; /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

/* 弹窗内容 */
#container-home .popup-content {
  background-color: white;
  margin-top: calc(50% - 650px);
  margin-left: calc(50% - 200px);
  padding: 30px;
  width: 600px;
  height: 400px;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-home .popup-cell {
  float: left;
  width: 160px;
  height: 40px;
  text-align: left;
}

/* 关闭按钮 */
#container-home #popup-close {
  position: relative;
  float: right;
  width: 50px;
  height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#container-home #popup-close:hover, #popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/*统计*/
</style>
