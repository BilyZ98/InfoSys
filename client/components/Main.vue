<template>
<div id="container-home">
  <!--顶部栏
  <div class="container-header">
  </div>-->
  <!--主要区域-->
  <div class="container-card">
    <p class="text-greeting"></p>
  </div>
  <div class="container-card">
    <span class="notice-header">公告栏：</span>
    <span class="notice-header" id="notice-number">{{notices.length}}</span>
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
  <div id="popup-new-notice" class="popup-background">
    <!-- 弹窗内容 -->
    <div class="content-new-notice">
      <div class="new-notice-header">新建公告</div>
      <div class="container-new-notice-text">
        <span>标题：</span>
        <input type="text" id="new-notice-title">
      </div>
      <div class="container-new-notice-text">
        <span>内容：</span>
        <textarea id="new-notice-content"></textarea>
      </div>
      <div class="container-new-notice-text">老师：<span id="new-notice-teacher">王老师</span></div>
      <div class="container-new-notice-text">时间：<span id="new-notice-time">2018-09-01</span></div>
      <button class="button-new-notice" @click="newNotice">新建</button>
      <button class="button-close-new-notice" @click="newNoticeCloseClick">关闭</button>
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
      //alert(id)
    },
    newNoticeClick: function(){
      $('#popup-new-notice').show()
      //获取当前时间
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      if (month < 10) {
          month = "0" + month
      }
      if (day < 10) {
          day = "0" + day
      }
      var nowDate = year + "-" + month + "-" + day
      $('#new-notice-time').text(nowDate)
    },
    newNoticeCloseClick: function() {
      $('#popup-new-notice').hide()
    },
    newNotice: function() {
      if($('#new-notice-title').val() == '') {
        alert('公告标题不能为空!')
        return
      } else if($('#new-notice-content').val() == ''){
        alert('公告内容不能为空!')
        return
      } else {
        var data = {
          id: '???',
          title: $('#new-notice-title').val(),
          content: $('#new-notice-content').val(),
          teacher: $('#new-notice-teacher').text(),
          time: $('#new-notice-time').text()
        }
        var postData = JSON.stringify(data)
        console.log(postData)
      }
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
  display: none;
  position: absolute; /* 定位 */
  z-index: 10; /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-left: 225px;
  padding-top: 60px;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

/* 新建公告 */
#container-home .content-new-notice {
  background-color: white;
  margin-top: 30px;
  margin-left: calc(50% - 350px);
  padding: 30px;
  width: 700px;
  height: 600px;
  text-align: left;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-home .new-notice-header {
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
}

#container-home .container-new-notice-text {
  margin-top: 20px;
  font-size: 16px;
}

#container-home .container-new-notice-text span{
  vertical-align: top;
}

#container-home #new-notice-title {
  width: 500px;
}

#container-home #new-notice-content {
  width: 500px;
  height: 300px;
}

#container-home .button-new-notice, #container-home .button-close-new-notice {
  display: inline-block;
  width: 100px;
  height: 30px;
  font-size: 16px;
  margin-top: 20px;
  text-align: center;
  color: white;
  background-color: var(--blue);
  border: none;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#container-home .button-new-notice {
  margin-left: 215px;
}

#container-home .button-new-notice:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}

#container-home .button-close-new-notice {
  margin-left: 10px;
}

#container-home .button-close-new-notice:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}
</style>
