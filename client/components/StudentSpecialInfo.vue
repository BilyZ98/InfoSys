<template>
  <div id="container-detail">
    <div class="container" id="pdfDom">
      <h3 class="text-center heading">港澳台/国际生学生信息</h3>
      <div class="info col-md-12">
        <!--以表循环-->
        <div v-for="table in tables">
          <!-- <div class="info-heading" v-if="table.id=='HMT'||table.id=='internationalStudent'">{{table.name}}</div> -->
          <!--若表中有数据，以字段循环-->
          <!--一个人最多有一条数据的表-->
          <div class="clearfix" v-if="student[table.id]!=undefined&&student[table.id].length!=0&&(table.id=='HMT'||table.id=='internationalStudent')">
          	<div class="info-heading">{{table.name}}</div>
            <div class="table-array" v-for="tableArr in student[table.id]">
              <span class="info-text" v-for="record in table.records">
              <span class="record-name">{{record.name}}:</span>
              <select v-bind:style="{width: 40 + (tableArr[record.id]).toString().length*12+'px'}" v-if="tableArr[record.id]!=undefined&&record['valueType']=='select'" :class="{'record-changable': record.studentChangAble, 'record-unchangable': !record.studentChangAble}" disabled="true" v-model:text="tableArr[record.id]">
                <option></option>
                <option v-for="option in record.options">{{option}}</option>
              </select>
              <input v-bind:style="{width: 20 + (tableArr[record.id]).toString().length*12+'px'}" v-else-if="tableArr[record.id]!=undefined" :class="{'record-changable': record.studentChangAble, 'record-unchangable': !record.studentChangAble}" disabled="true" v-model:text="tableArr[record.id]">
              <input style="width: 20px" v-else :class="{'record-changable': record.studentChangAble, 'record-unchangable': !record.studentChangAble}" disabled="true" v-model:text="tableArr[record.id]">
              </span>
            </div>
          </div>
          <!--一个人有多条数据的表-->
          <table border="1" v-else-if="student[table.id]!=undefined&&student[table.id].length!=0&&(table.id=='HMT'||table.id=='internationalStudent')">
            <tr>
              <th v-for="record in table.records" class="record-table-head">{{record.name}}</th>
            </tr>
            <tr v-for="tableArr in student[table.id]">
              <td v-for="record in table.records">
                <input v-bind:style="{width: 15 + (tableArr[record.id]).toString().length*12+'px'}" v-if="tableArr[record.id]!=undefined" :class="{'record-changable': record.studentChangAble, 'record-unchangable': !record.studentChangAble}" disabled="disabled" v-model:text="tableArr[record.id]">
                <input style="width: 20px" v-else :class="{'record-changable': record.studentChangAble, 'record-unchangable': !record.studentChangAble}" disabled="true" v-model:text="tableArr[record.id]">
              </td>
            </tr>
          </table>
          <!--表空但可以插入-->
 <!--          <button v-else-if="table.tableStudentChangable&&(table.id=='HMT'||table.id=='internationalStudent')" class="table-empty-button" @click="studentInsertClick(table.id)">填写数据</button> -->

        </div>
      </div>
    </div>
    <div class="btn-show">
      <button class="btn btn-info btn-sm" id="info-update" button-type="begin" @click="updateClick">修改</button>
      <button class="btn btn-info btn-sm" id="info-print" @click="getPDF()">导出PDF</button>
    </div>
  </div>
</template>
<script>
import tableData from './javascripts/tableData.js'
import formatCheck from './javascripts/formatCheck.js'

export default {
  data: function() {
    return {
      sid: null,
      tables: tableData,
      student: {},
      //backup用于更新数据后判断哪些被更新了
      studentBackup: {}
    }
  },
  created: function() {
    //this.sid = this.$store.getters.getUserAccount
    this.sid = this.$route.query.sid
    // alert('sid: ' + this.$store.getters.getUserAccount)
    var data = {
      tables: ['basicInfo', 'family', 'schoolRoll', 'course', 'partyInfo', 'scholarship', 'aid', 'loan', 'cadre', 'award', 'paper', 'patent', 'techProject'],
      id: this.sid
    }
    var postData = JSON.stringify(data)
    //console.log('请求全部信息的data： ' + postData)
    var _self = this
    $.ajax({
      type: 'POST',
      url: '/students/queryAll',
      data: postData,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      timeout: 5000,
      success: function(result, xhr) {
        for (let key in result) {
          if (key == 'content') {
            _self.student = _self.dataMakeup(result['content'])
            //深复制，才能起到backup之用
            _self.studentBackup = JSON.parse(JSON.stringify(_self.student))
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
    // $(".app-bar-display").attr("class", "app-bar-hide")
    // $(".container-info-display").attr("class", "container-info-all")
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
        for (let table in this.student) {
          for (let i = 0; i < this.student[table].length; i++) {
            let tableArr = this.student[table][i]
            for (let record in tableArr) {
              if (tableArr[record] != this.studentBackup[table][i][record]) {
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
                        data[table]['primary'][recordInOld] = this.studentBackup[table][i][recordInOld]
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
          this.student = JSON.parse(JSON.stringify(this.studentBackup))
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
                _self.studentBackup = JSON.parse(JSON.stringify(_self.student))
                alert('更新数据成功！')
              } else if (key == 'err') {
                alert('更新数据失败: ' + result[key]['sqlMessage'])
                //失败，还原更新前的数据，也需要深复制
                _self.student = JSON.parse(JSON.stringify(_self.studentBackup))
              }
            }
          },
          error: function(result, xhr) {
            //console.log(result)
            alert('服务器连接错误: ' + xhr)
          }
        })
      }
    },
    studentInsertClick: function(id) {
      if (id == 'basicInfo')
        this.$router.push({ name: 'studentBasicInfoInsert' })
      else if (id == 'family')
        this.$router.push({ name: 'studentFamilyInsert' })
      else if (id == 'cadre')
        this.$router.push({ name: 'studentCadreInsert' })
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
  height: 25px;
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

#container-detail .record-unchangable {
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

#container-detail .table-empty-button {
  margin-left: 20px;
  width: 80px;
  height: 30px;
  font-size: 16px;
  text-align: center;
  color: white;
  background-color: var(--blue);
  border: none;
  transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#container-detail .table-empty-button:hover {
  background-color: var(--blue-hover);
  cursor: pointer;
}

/**
 * 修改和导出按钮
 */

#container-detail .btn-show {
  text-align: center;
}

#container-detail #info-update,
#container-detail #info-print {
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

#container-detail #info-print {
  bottom: 8px;
}

#container-detail #info-update:hover,
#container-detail #info-print:hover {
  background-color: rgb(0, 132, 255);
}

#container-detail #info-update:active,
#container-detail #info-print:active {
  background-color: rgb(0, 255, 255);
}
</style>