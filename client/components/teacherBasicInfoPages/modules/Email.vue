<template>
  <div id="container-email">
    <div>
      <span class="i-text">标题：</span>
      <input type="text" id="email-title">
    </div>
    <div class="info-cell">
      <span class="i-text">收件人学号：</span>
      <span id="email-sid">
          <span v-for="sid in emailSid">
          {{sid}}
          <span class="email-sid-delete" @click="removeFromEmailSid(sid)">&times;</span>
      </span>
      <span id="email-sid-add-button" @click="addEmailSid()">添加学号</span>
      <input id="email-sid-add-input" @blur="addEmailSidFinish" @keyup.enter="addEmailSidFinish">
      </span>
    </div>
    <div class="info-cell">
      <span class="i-text">正文：</span>
      <div class="container-myEditor">
        <div id="myEditor">
          <p>请输入邮件内容</p>
        </div>
      </div>
    </div>
    <div class="info-cell">
      <span class="i-text">附件：</span>
      <input type="file" id="file-input" name="file-input" @change="emailFileUpolad" multiple="multiple" style="display: none;">
      <button @click="uploadFileClick">添加文件</button>
      <span class="file-area"></span>
    </div>
    <button class="button-email-send" @click="sendEmail">发送</button>
    <button class="button-email-close" @click="closeSendEmail">关闭</button>
  </div>
</template>
<script>
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

export default {
  data: function() {
    return {}
  },
  props: ['emailSid'],
  mounted: function() {
    this.quill = new Quill('#myEditor', {
      modules: {
        'history': { // Enable with custom configurations
          'delay': 2500,
          'userOnly': true
        }
      },
      theme: 'snow'
    })
  },
  methods: {
    removeFromEmailSid: function(sid) {
      for (let i = 0; i < this.emailSid.length; i++) {
        if (sid == this.emailSid[i]) {
          this.emailSid.splice(i, 1)
          return
        }
      }
    },
    addEmailSid: function() {
      $('#email-sid-add-button').hide()
      $('#email-sid-add-input').show()
    },
    addEmailSidFinish: function() {
      var sid = $('#email-sid-add-input').val()
      if (sid != '') {
        console.log(sid)
        var reg = /^[1-9][\d]{7}$/
        if (!reg.test(sid)) {
          alert('学号格式不正确！')
        } else {
          this.emailSid.push(sid)
        }
      }
      $('#email-sid-add-input').val('')
      $('#email-sid-add-input').hide()
      $('#email-sid-add-button').show()
    },
    sendEmail: function() {
      if (this.emailSid.length == 0) {
        alert('没有要发送邮件的学生~')
        return
      } else if ($("#email-title").val() == '') {
        alert("请填写邮件标题！")
        return
      } else {
        var formData = new FormData()
        //字段
        formData.append('title', $("#email-title").val())
        //this.quill.root.innerHTML 获取html
        //this.quill.getContents() 获取quill的delta对象
        //this.quill.getText() 获取文本
        formData.append('content', this.quill.root.innerHTML)
        formData.append('sid', JSON.stringify(this.emailSid))
        //附件
        var files = $('#file-input').prop('files')
        if (files.length > 5) {
          alert('上传附件的数量不能超过五个！')
          return
        }
        formData.append('fileNum', files.length)
        for (let i = 0; i < files.length; i++) {
          formData.append('file' + i, $('#file-input').prop('files')[i])
        }
        //post
        $.ajax({
          type: 'POST',
          url: '/students/sendMail',
          data: formData,
          cache: false,
          contentType: false,
          processData: false,
          success: function(result, xhr) {
            for (let key in result) {
              if (key == "content") {
                alert("发送成功!")
                $("#popup-email").hide()
              } else if (key == "err") {
                alert("发送错误:" + result[key])
              }
            }
          },
          error: function(result, xhr) {
            alert("服务器连接出错！")
          }
        })
      }
    },
    closeSendEmail: function() {
      $('#popup-email').hide()
    },
    uploadFileClick: function() {
      $("#file-input").click()
    },
    emailFileUpolad: function() {
      var obj = document.getElementById('file-input')
      var length = obj.files.length
      $('.file-area').html('')
      var str = ''
      for (var i = 0; i < length; i++) {
        var temp = obj.files[i].name
        str += '<span>' + temp + '<span>'
      }
      $('.file-area').append(str)
    }
  }
}
</script>
<style>
#container-email {
  background-color: white;
  width: 800px;
  margin-left: calc(50vw - 512.5px);
  margin-top: 90px;
  padding: 30px 5px 20px 5px;
  text-align: left;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-email .i-text {
  display: inline-block;
  font-size: 14px;
  width: 100px;
  vertical-align: top;
  text-align: right;
}

#container-email #email-title {
  width: 600px;
  display: inline-block;
}

#container-email #email-sid {
  width: 600px;
  display: inline-block;
  min-height: 24px;
}

#container-email .email-sid-delete {
  color: rgb(255, 100, 100);
  font-size: 20px;
  font-weight: bold;
}

#container-email .email-sid-delete:hover,
#container-email .email-sid-delete:focus {
  color: red;
  text-decoration: none;
  cursor: pointer;
}

#container-email #email-sid-add-button {
  display: inline-block;
  color: var(--blue);
  font-weight: bold;
  font-size: 13px;
}

#container-email #email-sid-add-button:hover,
#container-email #email-sid-add-button:focus {
  color: var(--blue-hover);
  text-decoration: none;
  cursor: pointer;
}

#container-email #email-sid-add-input {
  display: none;
  width: 80px;
}

#container-email .info-cell {
  margin-top: 20px;
}

#container-email .container-myEditor {
  display: inline-block;
  height: 250px;
  width: 600px;
}

#container-email .file-area span {
  font-size: 12px;
  margin-left: 7px;
}

#container-email .button-email-send,
#container-email .button-email-close {
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
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

#container-email .button-email-send {
  margin-left: 275px;
}

#container-email .button-email-send:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}

#container-email .button-email-close {
  margin-left: 10px;
}

#container-email .button-email-close:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}
</style>