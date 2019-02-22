<template>
  <div id="container-detail">
    <div class="container" id="pdfDom">
      <h3 class="text-center heading">参赛详情</h3>
      <div class="info col-md-12">
        <!--以表循环-->
        <div v-for="table in tables">
          <div class="info-heading" v-if="table.id=='competition'||table.id=='seniorsGroup'||table.id=='teamMember'||table.id=='comMeeting'">{{table.name}}</div>
          <!--若表中有数据，以字段循环-->
          <!--一个人最多有一条数据的表-->
          <div class="clearfix" v-if="game[table.id]!=undefined&&game[table.id].length!=0&&table.id=='competition'">
            <div class="table-array" v-for="tableArr in game[table.id]">
              <span class="info-text" v-for="record in table.records">
              <span class="record-name">{{record.name}}:</span>
              <select v-bind:style="{width: 40 + (tableArr[record.id]).toString().length*12+'px'}" v-if="tableArr[record.id]!=undefined&&record['valueType']=='select'" class="record-changable" disabled="true" v-model:text="tableArr[record.id]">
                <option></option>
                <option v-for="option in record.options">{{option}}</option>
              </select>
              <input v-bind:style="{width: 20 + (tableArr[record.id]).toString().length*12+'px'}" v-else-if="tableArr[record.id]!=undefined" class="record-changable" disabled="true" v-model:text="tableArr[record.id]">
              <input style="width: 20px" v-else class="record-changable" disabled="true" v-model:text="tableArr[record.id]">
              </span>
            </div>
          </div>
          <!--一个人有多条数据的表-->
          <table border="1" v-else-if="game[table.id]!=undefined&&game[table.id].length!=0&&(table.id=='seniorsGroup'||table.id=='teamMember'||table.id=='comMeeting')">
            <tr>
              <th v-for="record in table.records" class="record-table-head">{{record.name}}</th>
            </tr>
            <tr v-for="tableArr in game[table.id]">
              <td v-for="record in table.records">
                <input v-bind:style="{width: 15 + (tableArr[record.id]).toString().length*12+'px'}" v-if="tableArr[record.id]!=undefined" class="record-changable" disabled="disabled" v-model:text="tableArr[record.id]">
                <input style="width: 20px" v-else class="record-changable" disabled="true" v-model:text="tableArr[record.id]">
              </td>
            </tr>
          </table>
          <!--空-->
          <div v-else-if="table.id=='competition'||table.id=='seniorsGroup'||table.id=='teamMember'||table.id=='comMeeting'" class="table-empty" >---</div>
        </div>
      </div>
    </div>
    <div class="btn-show">
      <button class="btn btn-info btn-sm" id="info-addMeeting" button-type="begin" @click="addMeetingClick">添加会议记录</button>
      <button class="btn btn-info btn-sm" id="info-update" button-type="begin" @click="updateClick">修改</button>
      <button class="btn btn-info btn-sm" id="info-print" @click="getPDF()">导出PDF</button>
    </div>
  </div>
</template>
<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'

export default {
  data: function() {
    return {
      leaderSid: null,
      comName: null,
      tables: tableData,
      game: {},
      //backup用于更新数据后判断哪些被更新了
      gameBackup: {}
    }
  },
  created: function() {
    this.leaderSid = this.$route.query.leaderSid
    this.comName = this.$route.query.comName
    //alert('sid: ' + sid)
    var data = {
      leaderSid: this.leaderSid,
      comName: this.comName
    }
    var postData = JSON.stringify(data)
    console.log('请求全部信息的data： ' + postData)
    var _self = this
    $.ajax({
      type: 'POST',
      url: '/students/getCompetitionInfo',
      data: postData,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      timeout: 5000,
      success: function(result, xhr) {
        console.log(result, xhr)
        for (let key in result) {
          if (key == 'content') {
            _self.game = _self.dataMakeup(result['content'])
            //深复制，才能起到backup之用
            _self.gameBackup = JSON.parse(JSON.stringify(_self.game))
          } else if (key == 'err') {
            alert('请求详细信息错误: ' + result[key]['sqlMessage'])
          }
        }
      },
      error: function(result, xhr) {
        //连接错误
        //console.log(result)
        alert('服务器连接错误: ' + xhr)
      }
    })
  },
  //隐藏侧边栏和顶部栏
  mounted: function() {
    $(".app-bar-display").attr("class", "app-bar-hide")
    $(".container-info-display").attr("class", "container-info-all")
  },
  beforeDestroy: function() {
    $(".app-bar-hide").attr("class", "app-bar-display")
    $(".container-info-all").attr("class", "container-info-display")
  },
  methods: {
    dataMakeup: function(data) {
      //把数据中不全的表中没有的字段全部赋值为空
      for (let table in tableData) {
        if (data[table] != undefined) {
          for (let i = 0; i < data[table].length; i++) {
            for (let record in tableData[table]['records']) {
              if (data[table][i][record] == undefined) {
                data[table][i][record] = ''
              }
            }
          }
        }
      }
      return data
    },
    addMeetingClick: function() {
      this.$router.push({ name: 'insertMeeting' })
    },
    updateClick: function() {
      if ($('#info-update').attr('button-type') == 'begin') {
        //开始修改
        $('#info-update').text('确定')
        $('#info-update').attr('button-type', 'end')
        $('.record-changable').each(function() {
          $(this).attr('disabled', false)
          $(this).css('border-bottom', '1px solid rgb(180, 180, 180)')
        })
      } else if ($('#info-update').attr('button-type') == 'end') {
        //修改完成进行上传
        $('.record-changable').each(function() {
          $(this).attr('disabled', true)
          $(this).css('border', 'none')
        })
        $('#info-update').text('修改')
        $('#info-update').attr('button-type', 'begin')
        //处理数据变化并验证格式
        var data = {}
        var message = ''
        for (let table in this.game) {
          for (let i = 0; i < this.game[table].length; i++) {
            let tableArr = this.game[table][i]
            for (let record in tableArr) {
              if (tableArr[record] != this.gameBackup[table][i][record]) {
                //检查格式，只检查更改了的字段
                if (!formatCheck[table][record]['canNull'] && tableArr[record] == '') {
                  //检查不能为空的字段是否为空
                  message = message + tableData[table]['name'] + tableData[table]['records'][record]['name'] + '不能为空\n'
                } else if (tableArr[record] != '' && tableArr[record].length > 30) {
                  //检查字段是否过长
                  message = message + tableData[table]['name'] + tableData[table]['records'][record]['name'] + '长度不能超过30个字符\n'
                } else if (tableArr[record] != '' && formatCheck[table][record]['reg'] != null && !formatCheck[table][record]['reg'].test(tableArr[record])) {
                  //检查格式合法性
                  message = message + tableData[table]['name'] + formatCheck[table][record]['msg'] + '\n'
                } else {
                  //格式验证通过，添加更改字段
                  if (data[table] == undefined) {
                    data[table] = { primary: {}, new: {} }
                    //把这个表的主键写入
                    for (let recordInOld in tableData[table]['records']) {
                      if (tableData[table]['records'][recordInOld]['isPrimary']) {
                        data[table]['primary'][recordInOld] = this.gameBackup[table][i][recordInOld]
                      }
                    }
                  }
                  data[table]['new'][record] = tableArr[record]
                }
              }
            }
          }
        }
        if (message != '') {
          alert('更新数据失败！\n' + message)
          //还原数据
          this.game = JSON.parse(JSON.stringify(this.gameBackup))
          return
        }
        var postData = JSON.stringify(data)
        if (postData == JSON.stringify({})) {
          alert('没有修改任何数据哦')
          return
        }
        console.log(postData)
        var _self = this
        $.ajax({
          type: 'POST',
          url: '/students/update',
          data: postData,
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          timeout: 5000,
          success: function(result, xhr) {
            for (let key in result) {
              if (key == 'content') {
                //成功后backup变为现在的数据
                _self.gameBackup = JSON.parse(JSON.stringify(_self.game))
                alert('更新数据成功！')
              } else if (key == 'err') {
                alert('更新数据失败: ' + result[key]['sqlMessage'])
                //失败，还原更新前的数据，也需要深复制
                _self.game = JSON.parse(JSON.stringify(_self.gameBackup))
              }
            }
          },
          error: function(result, xhr) {
            //console.log(result)
            alert('服务器连接错误: ' + xhr)
          }
        })
      }
    }
  }
}
</script>
<style>
#container-detail {
  margin: 25px auto 25px auto;
  text-align: left;
  width: 1225px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-detail .container {
  padding: 10px 10px 20px 10px;
}

#container-detail .container .heading {
  font-size: 30px;
  letter-spacing: 3px;
  font-weight: bolder;
  /*
  border-color: #eee;
  border-width: 1px;
  border-style: solid;
  */
  padding: 5px;
}

#container-detail .info {
  border-color: #eee;
  border-width: 1px;
  border-style: solid;
  margin: 10px 0;
  padding: 10px;
}

#container-detail .info .info-heading {
  background-color: #eee;
  padding: 6px 6px 6px 10px;
  margin: 10px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 3px;
}

#container-detail .table-array {
  margin: 5px;
  margin-left: 20px;
  float: left;
}

#container-detail .info-text {
  float: left;
  margin: 5px;
  width: 350px;
  font-size: 15px;
}

#container-detail .record-name {
  font-weight: 550;
}

#container-detail .clearfix {
  zoom: 1;
}

#container-detail .clearfix:before,
.clearfix:after {
  content: "";
  display: table;
}

#container-detail .clearfix:after {
  clear: both;
}

#container-detail .record-changable {
  border: none;
  background-color: white;
  margin-left: 2px;
  padding-left: 2px;
}

#container-detail table {
  margin: 10px 25px 10px 25px;
  border-color: var(--grey-shadow);
  min-width: 96%;
  font-size: 15px;
  /*不会自动换行*/
  word-break: keep-all;
  white-space: nowrap;
}

#container-detail th {
  text-align: center;
  font-weight: 550;
}

#container-detail th,
#container-detail td {
  padding: 3px 6px 3px 8px;
}

#container-detail select {
  appearance: none;
  -moz-appearance: none;
  /* Firefox */
  -webkit-appearance: none;
  /* Safari 和 Chrome */
}

#container-detail .table-empty {
  margin-left: 20px;
}



/**
 * 修改和导出按钮
 */

#container-detail .btn-show {
  text-align: center;
}

#info-addMeeting {
  bottom: 124px;
  right: 30px;
  width: 80px;
  height: 50px;
  font-size: 11px;
  font-weight: bold;
  color: white;
  align-items: center;
  padding: 4px 8px 4px 8px;
  position: fixed;
  background-color: rgb(0, 100, 200);
  cursor: pointer;
  transition: background-color 0.4s;
}

#info-update, #info-print {
  right: 30px;
  bottom: 66px;
  width: 80px;
  height: 50px;
  font-size: 16px;
  font-weight: bold;
  color: white;
  align-items: center;
  padding: 4px 8px 4px 8px;
  position: fixed;
  background-color: rgb(0, 100, 200);
  cursor: pointer;
  transition: background-color 0.4s;
}

#info-print {
  bottom: 8px;
}

#info-addMeeting:hover, #info-update:hover, #info-print:hover {
  background-color: rgb(0, 132, 255);
}

#info-addMeeting:active, #info-update:active, #info-print:active {
  background-color: rgb(0, 255, 255);
}
</style>