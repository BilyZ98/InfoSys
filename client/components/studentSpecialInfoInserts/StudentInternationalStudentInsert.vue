<template>
<div id="container-insert-internationalStudent">
  <div class="text-header">国际生信息填写</div>
  <hr>
  <div class="container-input">
    <div class="container-record" v-for="record in table.records">
      <span class="record-name">{{record.name}}:</span>
      <div v-if="!record.studentChangAble&&record.id=='sid'" class="span-uninputable">{{sid}}</div>
      <span v-else-if="!record.studentChangAble" class="span-uninputable">没有填写权限</span>
      <select v-else-if="record.valueType=='select'" v-bind:id="tableId+'-'+record.id" class="record-content">
        <option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <input type="text" v-else-if="record.valueType!='file'" v-bind:id="tableId+'-'+record.id" class="record-content">
      <!--文件选择-->
      <div v-else class="record-content">
        <input type="file" :id="'file-input-'+record.id" name="file-input" accept="image/jpeg,image/jpg,image/png,image/gif,image/pdf" @change="fileUpolad(record.id)" style="display: none;">
        <button class="file-btn" :record-id="record.id" @click="selectFileClick">选择文件</button>
        <span class="file-area">{{showFilename(record.id)}}</span>
      </div>
    </div>
  </div>
  <pre id="warning"></pre>
  <button type="button" class="button-insert" @click="insertClick">提交</button>
</div>
</template>

<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'

export default {
  data: function() {
    return {
      tableId: 'internationalStudent',
      table: tableData['internationalStudent'],
      sid: this.$store.getters.getUserAccount,
      dormRegistryCopy: null,
      visaCopy: null,
      passportCopy: null
    }
  },
  methods: {
    selectFileClick: function() {
      $('#file-input-' + event.currentTarget.getAttribute('record-id')).click()
    },
    fileUpolad: function(id) {
      console.log(event.currentTarget.files[0])
      if(id == 'dormRegistryCopy') {
        this.dormRegistryCopy = event.currentTarget.files[0]
      } else if(id == 'visaCopy') {
        this.visaCopy = event.currentTarget.files[0]
      } else if(id == 'passportCopy') {
        this.passportCopy = event.currentTarget.files[0]
      }
    },
    showFilename: function(id) {
      console.log(id)
      if (id == 'dormRegistryCopy') {
        return this.dormRegistryCopy==null?'':this.dormRegistryCopy.name
      } else if (id == 'visaCopy') {
        return this.visaCopy==null?'':this.visaCopy.name
      } else if (id == 'passportCopy') {
        return this.passportCopy==null?'':this.passportCopy.name
      }
    },
    insertClick: function() {
      var formatTable = formatCheck[this.tableId]
      var message = ''
      for(let item in tableData[this.tableId]['records']) {
        if(!tableData[this.tableId]['records'][item]['studentChangAble'])
          continue
        let record = $('#' + this.tableId + '-' + item).val()
        if(!formatTable[item]['canNull'] && record == '') {
          //检查不能为空的字段是否为空
          message = message + tableData[this.tableId]['records'][item]['name'] + '不能为空\n'
        } else if(record != '' && record.length > 30){
          message = message + tableData[this.tableId]['records'][item]['name'] + '长度不能超过30个字符\n'
        } else if(record != '' && formatTable[item]['reg']!= null && !formatTable[item]['reg'].test(record)){
          //检查格式合法
          message = message + formatTable[item]['msg'] + '\n'
        }
      }
      if (message != '') {
        $('#warning').text(message)
        return
      } else {
        $('#warning').text('')
        var data = {
          table: this.tableId
        }
        data['sid'] = this.sid
        for(let item in tableData[this.tableId]['records']){
          if(!tableData[this.tableId]['records'][item]['studentChangAble']) {
            //
          } else if($('#' + this.tableId + '-' + item).val() != ''){
            data[item] = $('#' + this.tableId + '-' + item).val()
          }
        }
        var postData = JSON.stringify(data)
        console.log(postData)
        var _self = this
        $.ajax({
          type: "POST",
          url: "/students/insert/" + _self.tableId,
          contentType: "application/json; charset=utf-8",
          data: postData,
          dataType: "json",
          //timeous 5s
          timeout: 5000,
          success: function(result, xhr) {
            for(let key in result){
              if(key == 'content'){
                //操作成功
                alert('插入成功！')
              } else if (key == 'err'){
                //操作错误
                alert('插入错误: ' + result[key]['sqlMessage'])
              }
            }
          },
          error: function(result, xhr) {
            //连接错误
            //console.log(result)
            alert('服务器连接错误: ' + xhr)
          }
        })
      }
    }
  }
}
</script>

<style scoped>
#container-insert-internationalStudent {
  margin: 25px;
  text-align: left;
  padding: 30px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*让float的内部元素可以撑开容器*/
  overflow: hidden;
}

#container-insert-internationalStudent .text-header {
  text-align: center;
  font-size: 25px;
  font-weight: bolder;
}

#container-insert-internationalStudent .container-input {
  margin-left: 50px;
}

#container-insert-internationalStudent .container-record {
  float: left;
  margin-top: 20px;
  margin-left: 20px;
}

.record-name {
  display: inline-block;
  text-align: right;
  width: 200px;
  font-size: 16px;
}

.record-content {
  display: inline-block;
  margin-left: 10px;
  width: 250px;
  height: 30px;
  padding: 5px;
}

.file-btn {
  width: 60px;
}

.file-area {
  width: 180px;
  margin-left: 10px;
}

#container-insert-internationalStudent .span-uninputable {
  display: inline-block;
  width: 250px;
  height: 30px;
  padding: 5px;
  margin-left: 10px;
  text-align: right;
  font-size: 16px;
}

#container-insert-internationalStudent #warning {
  float: left;
  clear: both;
  text-align: left;
  margin-top: 10px;
  margin-left: calc(50% - 70px);
  width: 500px;
  background-color: white;
  border: none;
  font-size: 15px;
  color: #f00;
}

#container-insert-internationalStudent .button-insert {
  float: left;
  clear: both;
  width: 110px;
  height: 36px;
  margin-top: 10px;
  margin-left: calc(50% - 55px);
  font-size: 17px;
  color: white;
  background-color: var(--blue);
  border: none;
  border-radius: 3px;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#container-insert-internationalStudent .button-insert:hover {
  background-color: var(--blue-hover);
}
</style>
