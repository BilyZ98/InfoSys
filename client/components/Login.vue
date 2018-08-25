<template>
<div id="container-login">
  <div class="container">
    <div class="row">
      <div>
        <a href="http://sdcs.sysu.edu.cn/" target="_blank">
        <img :src="sdcsLogo" class="img-responsive" alt="Responsive image">
      </a>
      </div>
      <div class="col-md-offset-3 col-md-6 container-input">
        <form class="form-horizontal">
          <span class="heading">用户登录</span>
          <div class="form-group form-inline">
            <span>账号：</span>
            <input type="text" class="form-control" id="inputId" placeholder="学号或学工号">
            <i class="fa fa-user"></i>
          </div>
          <div class="form-group form-inline">
            <span>密码：</span>
            <input type="password" class="form-control" id="inputPassword" placeholder="密　码">
            <i class="fa fa-lock"></i>
            <a href="#" class="fa fa-question-circle"></a>
            <span style="color:#f00" id="warning"></span>
          </div>
          <div class="form-group">
            <div class="main-checkbox">
              <input type="checkbox" value="None" id="ck_rmbUser" name="check" />
              <label for="ck_rmbUser"></label>
              </div>
            <span class="text">Remember me</span>
            <button class="btn btn-default" id="login" @click="loginClick">登录</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import sdcsLogo from '../assets/sdcs_logo.png'

export default {
  data: function(){
    return{
      sdcsLogo: sdcsLogo
    }
  },
  methods: {
    loginClick: function() {
      var id = $("#inputId").val();
      var password = $("#inputPassword").val();
      alert('id: ' + id)
      /*if ($.cookie("rmbUser") == "true") {
        $("#ck_rmbUser").attr("checked", true);
        $("#inputId").val($.cookie("username"));
        $("#inputPassword").val($.cookie("password"));
      }
      */
      if (this.isNULL(id)) {
        //alert("请填写学号或学工号！");
        $("#warning").text("请填写学号或学工号！");
        // return;
      } else if (this.isNULL(password)) {
        //alert("请填写密码！");
        $("#warning").text("请填写密码！");
      } else if (!this.isValidId(id)) {
        //alert("学号或学工号不正确！");
        $("#warning").text("学号或学工号不正确！");
      } else {
        this.Save();
        var data = {
          "id": id,
          "password": password
        }
        // alert(JSON.stringify(data));
        $.ajax({
          type: "POST",
          url: "/home/login",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          dataType: "json",
          success: function(message) {
            if (message['state'] == false) {
              //alert('账号或密码错误！');
              $("#warning").text("账号或密码错误！")
            } else {
              //load mainPage
              alert("登录成功");
            }
          },
          error: function(message) {
            alert("登录出错");
          }
        })
      }
      this.$router.push({ name: 'main'})
    },
    isNULL: function(data) {
      if (data.length == 0)
        return true;
      else return false;
    },
    isValidId: function(data) {
      if (data.match(/^([0-9]*)$/) && data.length == 8)
        return true;
      return false;
    },
    //记住用户名密码
    Save: function() {
      if ($("#ck_rmbUser").attr("checked")) {
        var str_username = $("#inputId").val();
        var str_password = $("#inputPassword").val();
        $.cookie("rmbUser", "true", { expires: 7 });
        $.cookie("username", str_username, { expires: 7 });
        $.cookie("password", str_password, { expires: 7 });
      } else {
        $.cookie("rmbUser", "false", { expire: -1 });
        $.cookie("username", "", { expires: -1 });
        $.cookie("password", "", { expires: -1 });
      }
    }
  }
}
</script>

<style>
header, aside {
  display: none;
}

.container-info {
  margin: 0;
}

#container-login {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #030d28;
}

#container-login .img-responsive {
  margin: auto;
}

#container-login .container-input {
  margin-top: 50px;
}

#container-login .form-horizontal {
  background: #fff;
  padding-bottom: 30px;
  border-radius: 15px;
  text-align: center;
}

#container-login .form-horizontal .heading {
  display: block;
  font-size: 35px;
  font-weight: 700;
  padding: 30px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}

#container-login .form-horizontal .form-group {
  padding: 0 30px;
  margin: 0 0 15px 0;
  position: relative;
}

#container-login .form-horizontal .form-control {
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  box-shadow: none;
  padding: 0 20px 0 45px;
  height: 40px;
  transition: all 0.3s ease 0s;
}

#container-login .form-horizontal .form-control:focus {
  background: #e0e0e0;
  box-shadow: none;
  outline: 0 none;
}

#container-login .form-horizontal .form-group i {
  position: absolute;
  top: 12px;
  left: 60px;
  font-size: 17px;
  color: #c8c8c8;
  transition: all 0.5s ease 0s;
}

#container-login .form-horizontal .form-control:focus+i {
  color: #00b4ef;
}

#container-login .form-horizontal .fa-question-circle {
  display: inline-block;
  position: absolute;
  top: 12px;
  right: 60px;
  font-size: 20px;
  color: #808080;
  transition: all 0.5s ease 0s;
}

#container-login .form-horizontal .fa-question-circle:hover {
  color: #000;
}

#container-login .form-horizontal .main-checkbox {
  float: left;
  width: 20px;
  height: 20px;
  background: #11a3fc;
  border-radius: 50%;
  position: relative;
  margin: 5px 0 0 5px;
  border: 1px solid #11a3fc;
}

#container-login .form-horizontal .main-checkbox label {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}

#container-login .form-horizontal .main-checkbox label:after {
  content: "";
  width: 10px;
  height: 5px;
  position: absolute;
  top: 5px;
  left: 4px;
  border: 3px solid #fff;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

#container-login .form-horizontal .main-checkbox input[type=checkbox] {
  visibility: hidden;
}

#container-login .form-horizontal .main-checkbox input[type=checkbox]:checked+label:after {
  opacity: 1;
}

#container-login .form-horizontal .text {
  float: left;
  margin-left: 7px;
  line-height: 20px;
  padding-top: 5px;
  text-transform: capitalize;
}

#container-login .form-horizontal .btn {
  float: right;
  font-size: 14px;
  color: #fff;
  background: #00b4ef;
  border-radius: 30px;
  padding: 10px 25px;
  border: none;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
}

#container-login @media only screen and (max-width: 479px) {
  .form-horizontal .form-group {
    padding: 0 25px;
  }
  .form-horizontal .form-group i {
    left: 45px;
  }
  .form-horizontal .btn {
    padding: 10px 20px;
  }
}
</style>