<template>
<div id="container-home">
  <!--顶部栏
  <div class="container-header">
  </div>-->
  <!--主要区域-->
  <div class="container-card-left">
    <!--<p class="text-greeting"></p>-->
    <div class="card-studentsBasic" @click="studentsBasicClick">学生基本信息</div>
    <div class="card-studentsSpecial">港澳台/国际生</div>
    <div class="card-academicWarning">学业预警</div>
    <div class="card-gameManage">竞赛信息管理</div>
    <div class="card-workManage">实习/就业管理</div>
    <div class="card-educationProof">学历证明</div>
    <div class="card-teacherApply">导师申请</div>
    <div class="card-checkin">签到统计</div>
  </div>
  <div class="container-card-right">
    <span class="notice-header">公告栏：</span>
    <span class="notice-header" id="notice-number">{{notices.length}}</span>
    <span class="notice-header">条公告</span>
    <div class="notice-list">
      <div class="notice" v-for="notice in notices" @click="noticeClick(notice)">
        <span>{{notice.title}}</span>
        <span class="notice-time">{{notice.expireTime}}</span>
        <span class="notice-teacher">{{notice.account}}</span>
      </div>
    </div>
    <button id="button-new-notice" @click="newNoticeClick">新建公告</button>
  </div>
  <!--公告详情-->
  <div id="popup-detail-notice" class="popup-background">
    <!-- 弹窗内容 -->
    <div class="content-detail-notice">
      <div class="detail-notice-header">公告详情</div>
      <div class="container-detail-notice-text">
        <span class="notice-detail-name">标题：</span>
        <span id="detail-notice-title"></span>
      </div>
      <div class="container-detail-notice-text">
        <span class="notice-detail-name">内容：</span>
        <span id="detail-notice-content"></span>
      </div>
      <div class="container-detail-notice-text"><span class="notice-detail-name">发布老师：</span><span id="detail-notice-teacher"></span></div>
      <div class="container-detail-notice-text"><span class="notice-detail-name">创建时间：</span><span id="detail-notice-createTime"></span></div>
      <div class="container-detail-notice-text"><span class="notice-detail-name">过期时间：</span><span id="detail-notice-expireTime"></span></div>
      <button class="button-delete-detail-notice" @click="detailNoticeDeleteClick">删除</button>
      <button class="button-close-detail-notice" @click="detailNoticeCloseClick">关闭</button>
    </div>
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
      notices: [],
      currentNotice: -1
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
    this.getNotices()
  },
  methods: {
    studentsBasicClick: function() {
      this.$router.push({ name: 'basicInfo' })
    },
    getNotices: function() {
      //获取公告
      var _self = this
      $.ajax({
        type: 'GET',
        url: '/notice/getNotice',
        timeout: 5000,
        success: function(result, xhr) {
          for (let key in result) {
            if (key == 'content') {
              //console.log(result[key])
              _self.notices = result[key]
            } else if (key == 'err') {
              alert('请求公告信息错误: ' + result[key]['sqlMessage'])
            }
          }
        },
        error: function(result, xhr) {
          //连接错误,440是未登录造成的，页面在这个函数执行之后会自动处理
          if(result.status != 440){
            alert('服务器连接错误: ' + xhr)
          }
        }
      })
    },
    noticeClick: function(notice) {
      $('#popup-detail-notice').show()
      $('#detail-notice-title').text(notice.title)
      $('#detail-notice-content').text(notice.content)
      $('#detail-notice-teacher').text(notice.account)
      $('#detail-notice-createTime').text(notice.createTime)
      $('#detail-notice-expireTime').text(notice.expireTime)
      this.currentNotice = notice.id
    },
    detailNoticeDeleteClick: function(){
      console.log(this.$store.getters.getUserAccount == $('#detail-notice-teacher').text())
      //alert(this.currentNotice)
      var data = {
          id: this.currentNotice
      }
      var postData = JSON.stringify(data)
      console.log(postData)
      var _self = this
      $.ajax({
        type: 'POST',
        url: '/notice/delNotice',
        data: postData,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
          alert("公告删除成功")
          for(var i=0;i<_self.notices.length;i++){
            if(_self.notices[i].id==_self.currentNotice){
              _self.notices.splice(i,1);
              break;
            }
          }
          _self.detailNoticeCloseClick()
        },
        error: function(result, xhr) {
          console.log(result)
          if (result.status == 441) {
            alert("服务器连接错误")
          }
        }
      })
    },
    detailNoticeCloseClick: function(){
      $('#popup-detail-notice').hide()
      this.currentNotice = -1
    },
    newNoticeClick: function(){
      $('#popup-new-notice').show()
      $('#new-notice-title').val('')
      $('#new-notice-content').val('')
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
                _self.getNotices()
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
        _self.newNoticeCloseClick()
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

#container-home .container-card-left {
  float: left;
  margin: 25px;
  margin-right: 0;
  height: calc(100vh - 110px);
  width: calc(50% - 37.5px);
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-home .container-card-right {
  float: left;
  margin: 25px;
  margin-right: 0;
  padding: 30px;
  height: calc(100vh - 110px);
  width: calc(50% - 37.5px);
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

/* 左边栏 */

#container-home .card-studentsBasic {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(252, 122, 82);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-studentsBasic:hover {
  transform: translate(0, -1px);
  box-shadow: -3px 3px 3px var(--grey-shadow);
  cursor: pointer;
}

#container-home .card-studentsSpecial {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(252, 122, 82);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-studentsSpecial:hover {
  transform: translate(0, -1px);
  box-shadow: -3px 3px 3px var(--grey-shadow);
  cursor: pointer;
}

#container-home .card-academicWarning {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(239, 57, 7);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-academicWarning:hover {
  transform: translate(0, -1px);
  box-shadow: -3px 3px 3px var(--grey-shadow);
  cursor: pointer;
}

#container-home .card-gameManage {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(61, 198, 43);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-gameManage:hover {
  transform: translate(0, -1px);
  box-shadow: -3px 3px 3px var(--grey-shadow);
  cursor: pointer;
}

#container-home .card-workManage {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(255, 153, 45);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-educationProof {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(247, 205, 11);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-teacherApply {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(255, 153, 45);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .card-checkin {
  display: inline-block;
  margin: 30px 0 0 30px;
  width: calc(33% - 40px);
  height: 100px;
  background-color: rgb(255, 153, 45);
  color: white;
  font-size: 20px;
  font-weight: lighter;
  text-align: center;
  line-height: 100px;
}

#container-home .text-greeting {
  text-align: center;
  font-size: 40px;
  font-weight: bolder;
}

/* 公告栏 */

#container-home .notice-header {
  font-size: 20px;
  font-weight: bolder;
}

#container-home .notice-list {
  margin-top: 30px;
  height: calc(100% - 136px);
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
  cursor: pointer;
  border-radius: 3px;
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
  transform: translate(0, -1px);
  box-shadow: -3px 3px 3px var(--grey-shadow);
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

/*公告详情弹窗*/

#container-home .content-detail-notice {
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

#container-home .detail-notice-header {
  text-align: center;
  font-size: 20px;
  font-weight: bolder;
}

#container-home .container-detail-notice-text {
  margin-top: 20px;
  font-size: 16px;
}

#container-home .notice-detail-name{
  display: inline-block;
  vertical-align: top;
  width: 80px;
  text-align: right;
  font-weight: bold;
}

#container-home #detail-notice-title {
  width: 500px;
}

#container-home #detail-notice-content {
  display: inline-block;
  width: 500px;
  height: 200px;
}

#container-home .button-delete-detail-notice, #container-home .button-close-detail-notice {
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

#container-home .button-delete-detail-notice {
  margin-left: 215px;
}

#container-home .button-delete-detail-notice:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}

#container-home .button-close-detail-notice {
  margin-left: 10px;
}

#container-home .button-close-detail-notice:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}

/*新建公告弹窗*/

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
  height: 200px;
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
