<template>
<div id="container-reset">
<!--<div>
    <a href="http://sdcs.sysu.edu.cn/" target="_blank">
    <img :src="sdcsLogo" class="img-responsive" alt="Responsive image">
  </a>
  </div>-->
  <div class="container-card">
    <form>
      <div class="text-header">修改密码</div>
      <hr>
      <div class="container-input">
        <span>账号：</span>
        <span>{{userAccount}}</span>
      </div>
      <div class="container-input">
        <span>旧密码：</span>
        <input type="password" placeholder="旧密码" v-model="oldpswd">
      </div>
      <div class="container-input">
        <span>新密码：</span>
        <input type="password" placeholder="新密码" v-model="newpswd">
      </div>
      <div class="container-input">
        <span>重复密码：</span>
        <input type="password" placeholder="重复密码" v-model="repeatpswd">
      </div>
      <div id="warning">{{warningtxt}}</div>
      <div class="button-reset" @click="resetClick">修改密码</div>
    </form>
  </div>
</div>
</template>

<script>
//import banner from '../assets/sdcs_banner.png'

export default {
  data: function(){
    return {
      //banner: banner
      userAccount: this.$store.getters.getUserAccount,
      usertype: this.$store.getters.getUserStatus,
      oldpswd: '',
      newpswd: '',
      repeatpswd: '',
      warningtxt: null
    }
  },
  mounted: function(){
    $(".app-bar-display").attr("class", "app-bar-hide")
    $(".container-info-display").attr("class", "container-info-all")
  },

  beforeDestroy: function(){
    $(".app-bar-hide").attr("class", "app-bar-display")
    $(".container-info-all").attr("class", "container-info-display")
  },
  methods: {
    resetClick: function() {
      if (this.isNULL(this.oldpswd)) {
        this.warningtxt = '请输入旧密码!'
      } else if (this.isNULL(this.newpswd)) {
        this.warningtxt = '请输入新密码!'
      } else if (this.isNULL(this.repeatpswd)) {
        this.warningtxt = '请重复新密码!'
      } else if (this.newpswd != this.repeatpswd) {
        this.warningtxt = '两次输入的新密码不一致!'
      }  else {
        //this.Save();
        this.warningtxt = ''
        var data = {
          "account": this.userAccount,
          "usertype": this.usertype,
          "password": this.oldpswd,
          "newpassword": this.newpswd
        }
        var postData = JSON.stringify(data)
        //alert(postData)
        var _self = this
        $.ajax({
          type: 'POST',
          url: '/users/changePassword',
          data: postData,
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          timeout: 5000,
          success: function(result, xhr) {
            console.log(result)
            console.log(xhr)
            if(xhr == 'success') {
              alert('修改密码成功！')
              _self.$router.push({ name: 'login'})
            }
          },
          error: function(result, xhr) {
            console.log(result)
            //表示密码错误
            if (result.status == 441) {
              alert("密码错误！")
            }
          }
        })
      }
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
    }/*,
    //记住用户名密码
    Save: function() {
      if ($("#ck_rmbUser").attr("checked")) {
        var str_username = $("#input-id").val();
        var str_password = $("#input-password-repeat").val();
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
#container-reset {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: var(--grey-background);
}

/*
#container-reset .container-banner img {
  margin: auto;
  width: 600px;
  bottom: 0;
}
*/
#container-reset .container-card {
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

#container-reset .text-header {
  margin: auto;
  font-size: 35px;
  font-weight: 700;
}

#container-reset .container-input {
  text-align: left;
  margin-top: 20px;
  font-size: 16px;
}

#container-reset .container-input span {
  display: inline-block;
  font-weight: bold;
  width: 80px;
  margin-left: 70px;
  text-align: right;
}

#container-reset .container-input input {
  height: 40px;
  width: 230px;
  padding: 0 20px 0 25px;
  background: #f0f0f0;
  border: none;
  border-radius: 3px;
  box-shadow: none;
  transition: all 0.3s ease 0s;
}

#container-reset .container-input input:focus {
  background: #e0e0e0;
  box-shadow: none;
  outline: 0 none;
}

#container-reset #warning {
  text-align: left;
  color: #f00;
  margin-top: 20px;
  margin-left: 170px;
  height: 20px;
}

#container-reset .button-reset {
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
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#container-reset .button-reset:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}
</style>
