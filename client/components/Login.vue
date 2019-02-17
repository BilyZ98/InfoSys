<template>
  <div id="container-login">
    <!--<div>
    <a href="http://sdcs.sysu.edu.cn/" target="_blank">
    <img :src="sdcsLogo" class="img-responsive" alt="Responsive image">
  </a>
  </div>-->
    <div class="container-card">
      <form>
        <div class="text-header">学生信息系统</div>
        <hr>
        <div class="container-input">
          <span>账号：</span>
          <input type="text" id="input-id" placeholder="学号或学工号">
        </div>
        <div class="container-input">
          <span>密码：</span>
          <input type="password" id="input-password" placeholder="密码">
        </div>
        <div id="warning"></div>
        <div class="button-login" @click="loginInStudent">学生登录</div>
        <div class="button-login" @click="loginInTeacher">教师登陆</div>
      </form>
    </div>
  </div>
</template>
<script>
import banner from '../assets/sdcs_banner.png'

export default {
  data: function() {
    return {
      banner: banner
    }
  },
  mounted: function() {
    $(".app-bar-display").attr("class", "app-bar-hide")
    $(".container-info-display").attr("class", "container-info-all")
  },
  beforeDestroy: function() {
    $(".app-bar-hide").attr("class", "app-bar-display")
    $(".container-info-all").attr("class", "container-info-display")
  },
  methods: {
    loginInStudent: function() {
      var id = $("#input-id").val()
      var password = $("#input-password").val()
      //alert('id: ' + id)
      /*if ($.cookie("rmbUser") == "true") {
        $("#ck_rmbUser").attr("checked", true);
        $("#input-id").val($.cookie("username"));
        $("#input-password").val($.cookie("password"));
      }
      */
      if (this.isNULL(id)) {
        //alert("请填写学号或学工号！");
        $("#warning").text("请填写学号！")
        // return;
      } else if (this.isNULL(password)) {
        //alert("请填写密码！");
        $("#warning").text("请填写密码！")
      } else if (!this.isValidId(id)) {
        //alert("学号或学工号不正确！");
        $("#warning").text("学号不正确！")
      } else {
        //this.Save();
        var data = {
          "account": id,
          "password": password,
          "usertype" : 'student'
        }
        var postData = JSON.stringify(data)
        //alert(postData)
        var _self = this
        $.ajax({
          type: 'POST',
          url: '/users/login',
          data: postData,
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          timeout: 5000,
          success: function(result, xhr) {
            for (let key in result) {
              if (key == 'content') {
                _self.$store.commit('updateUserStatus', 'student')
                _self.$store.commit('updateUserInfo', data)
                $('#info-account').text(id)
                _self.$router.push({ name: 'studentMain' })
              } else if (key == 'err') {
                alert("服务器错误")
              }
            }
          },
          error: function(result, xhr) {
            console.log(result)
            //表示密码错误
            if (result.status == 441) {
              alert("账号或密码错误")
            }
          }
        })
      }
      //this.$router.push({ name: 'main'})
    },
    loginInTeacher: function() {
      var id = $("#input-id").val()
      var password = $("#input-password").val()
      //alert('id: ' + id)
      /*if ($.cookie("rmbUser") == "true") {
        $("#ck_rmbUser").attr("checked", true);
        $("#input-id").val($.cookie("username"));
        $("#input-password").val($.cookie("password"));
      }
      */
      if (this.isNULL(id)) {
        //alert("请填写学号或学工号！");
        $("#warning").text("请填写学工号！")
        // return;
      } else if (this.isNULL(password)) {
        //alert("请填写密码！");
        $("#warning").text("请填写密码！")
      } else if (!this.isValidId(id)) {
        //alert("学号或学工号不正确！");
        $("#warning").text("学工号不正确！")
      } else {
        //this.Save();
        var data = {
          "account": id,
          "password": password,
          "usertype": 'teacher'
        }
        var postData = JSON.stringify(data)
        //alert(postData)
        var _self = this
        $.ajax({
          type: 'POST',
          url: '/users/login',
          data: postData,
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          timeout: 5000,
          success: function(result, xhr) {
            for (let key in result) {
              if (key == 'content') {
                _self.$store.commit('updateUserStatus', 'teacher')
                _self.$store.commit('updateUserInfo', data)
                $('#info-account').text(id)
                _self.$router.push({ name: 'teacherMain' })
              } else if (key == 'err') {
                alert("服务器错误")
              }
            }
          },
          error: function(result, xhr) {
            console.log(result)
            //表示密码错误
            if (result.status == 441) {
              alert("账号或密码错误")
            }
          }
        })
      }
      //this.$router.push({ name: 'main'})
    },
    registerClick: function() {
      this.$router.push({ name: 'register'})
    },
    isNULL: function(data) {
      if (data.length == 0)
        return true;
      else return false;
    },
    isValidId: function(data) {
      if (data.match(/^([0-9]*)$/) && data.length == 8)
        return true;
      return true;
    }
    /*,
        //记住用户名密码
        Save: function() {
          if ($("#ck_rmbUser").attr("checked")) {
            var str_username = $("#input-id").val();
            var str_password = $("#input-password").val();
            $.cookie("rmbUser", "true", { expires: 7 });
            $.cookie("username", str_username, { expires: 7 });
            $.cookie("password", str_password, { expires: 7 });
          } else {
            //$.cookie("rmbUser", "false", { expire: -1 });
            $.cookie("username", "", { expires: -1 });
            $.cookie("password", "", { expires: -1 });
          }
        }*/
  }
}
</script>
<style>
#container-login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--grey-background);
}


/*
#container-login .container-banner img {
  margin: auto;
  width: 600px;
  bottom: 0;
}
*/

#container-login .container-card {
  margin-left: calc(50vw - 300px);
  margin-top: calc(50vh - 230px);
  width: 600px;
  text-align: center;
  padding: 30px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-login .text-header {
  margin: auto;
  font-size: 35px;
  font-weight: 700;
}

#container-login .container-input {
  text-align: left;
  margin-top: 20px;
  font-size: 16px;
}

#container-login .container-input span {
  display: inline-block;
  font-weight: bold;
  width: 50px;
  margin-left: 100px;
  text-align: right;
}

#container-login .container-input input {
  height: 40px;
  width: 230px;
  padding: 0 20px 0 25px;
  background: #f0f0f0;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  transition: all 0.3s ease 0s;
}

#container-login .container-input input:focus {
  background: #e0e0e0;
  box-shadow: none;
  outline: 0 none;
}

#container-login #warning {
  text-align: left;
  color: #f00;
  margin-top: 20px;
  margin-left: 170px;
  height: 20px;
}

#container-login .button-login {
  margin: auto;
  margin-top: 15px;
  padding-top: 4px;
  width: 230px;
  height: 35px;
  color: white;
  background-color: var(--blue);
  font-size: 19px;
  font-weight: bold;
  border: none;
  /*radius*/
  border-radius: 3px;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

#container-login .button-login:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}
</style>