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
      notices: []
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
    //获取公告
    var _self = this
    $.ajax({
      type: 'GET',
      url: '/notice/getNotice',
      timeout: 5000,
      success: function(result, xhr) {
        for (let key in result) {
          if (key == 'content') {
            console.log(result[key])
            _self.notices = result[key]
          } else if (key == 'err') {
            alert('请求公告信息错误: ' + result[key]['sqlMessage'])
          }
        }
      },
      error: function(result, xhr) {
        //连接错误
        alert('服务器连接错误: ' + xhr)
      }
    })
  },
  methods: {
    noticeClick: function(id) {
      //alert(id)
    },
    newNoticeClick: function(){
      $('#popup-new-notice').show()
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
          title: $('#new-notice-title').val(),
          content: $('#new-notice-content').val(),
        }
        var postData = JSON.stringify(data)
        console.log(postData)
        var _self = this
        $.ajax({
          type: 'POST',
          url: '/notice/addNotice',
          data: postData,
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          timeout: 5000,
          success: function(result, xhr) {
            for (let key in result) {
              if (key == 'content') {
                _self.notices.push(data)
              } else if (key == 'err') {
                console.log(result[key])
                alert('添加公告错误: ' + result[key])
              }
            }
          },
          error: function(result, xhr) {
            console.log(result)
            if (result.status == 441) {
              alert("服务器连接错误")
            }
          }
        })
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
  padding: 40px;
  width: 700px;
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
