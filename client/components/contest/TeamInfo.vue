<template>
  <div>
    <!--顶部菜单-->
    <div class="container-header">
      <p class="header-text">参赛队伍信息</p>
      <div class="header-button">
      </div>
    </div>
    <!--显示数据-->
    <div class="container-card-list">
      <table border="1">
        <tr class="table-head">
          <th>#</th>
          <th v-for="record in table.records">{{record.name}}</th>
        </tr>
        <tr v-for="(game, index) in games" @click="comClick(game)">
          <td>{{index+1}}</td>
          <td v-for="record in table.records" contenteditable="false">
            <span v-if="game[record.id]!=undefined">{{game[record.id]}}</span>
            <span v-else>---</span>
          </td>
        </tr>
      </table>
      <button class="manager-button" @click="addClick">添加参赛队伍</button>
    </div>
  </div>
</template>
<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'

var empty = JSON.stringify({ equal: {}, range: {}, fuzzy: {} })
var emptyCell = JSON.stringify({})

export default {
  data: function() {
    return {
      table: tableData['competition'],
      games: []
    }
  },
  created: function() {
    //alert(window.innerWidth)
    //1536*728
    var sid = this.$store.getters.getUserAccount;
    //alert(window.innerWidth)
    //1536*728
    var data = {
      leaderSid: sid
    }
    var postData = JSON.stringify(data)
    var _self = this
    // replace getPost with your data fetching util / API wrapper
    $.ajax({
      type: 'POST',
      url: '/students/getCompetitionBySid',
      data: postData,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      timeout: 5000,
      success: function(result, xhr) {
        _self.games = result.content;
        console.log(result.content)
      },
      error: function(result, xhr) {
        //连接错误
        //console.log(result)
        alert('服务器连接错误: ' + xhr)
      }
    })
  },
  methods: {
    addClick: function() {
      this.$router.push({ name: 'insertTeamInfo' })
    },
    comClick: function(game) {
      var routeData = this.$router.resolve({
        name: 'gameDetail',
        query: {
          leaderSid: game.leaderSid,
          comName: game.comName
        }
      })
      window.open(routeData.href, '_blank')
    },
  }
}
</script>
<style scoped>
.team-info-list {

  margin-top: 10px;
  text-align: center;
  border-radius: 15px;
  border-bottom: 1px solid var(--grey-shadow);
  box-shadow: 1px 0px 1px var(--grey-shadow);
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 16px;
}

.container-header {
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

.header-text {
  float: left;
  font-size: 20px;
}

.header-button {
  float: right;
  margin-right: 20px;
}

.header-button span {
  padding-right: 10px;
  font-weight: bold;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.header-button span:hover {
  color: var(--blue);
  cursor: pointer;
}

.container-record {
  float: left;
  width: 360px;
  height: 35px;
  text-align: right;
}

.container-record .text-range {
  font-size: 12px;
}

.container-record .min,
.container-record .max {
  width: 50px;
}

.container-record .hide-container {
  height: 24px;
  width: 180px;
}

.manager-button {
  float: left;
  clear: both;
  width: 110px;
  height: 36px;
  margin-top: 20px;
  margin-left: calc(50% - 55px);
  font-size: 17px;
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

.manager-button:hover {
  background-color: var(--blue-hover);
}

.container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('.container-card-list').width())不包含margin，但是会减去padding
  固定了width，才能在内部元素超出宽度时出现滚动条*/
  /*width: 1251.32px;*/
  width: calc(100vw - 275px);
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  overflow: auto;
}

.container-card-list table {
  /*不会自动换行*/
  word-break: keep-all;
  white-space: nowrap;
  min-width: 100%;
  font-size: 14px;
  border-color: var(--grey-shadow);
}

.container-card-list th,
td {
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 4px;
  padding-bottom: 4px;
}

.container-card-list tr {
  transition: background 0.3s;
  -moz-transition: background 0.3s;
  /* Firefox 4 */
  -webkit-transition: background 0.3s;
  /* Safari 和 Chrome */
  -o-transition: background 0.3s;
  /* Opera */
}

.container-card-list tr:not(.table-head):hover {
  background-color: var(--grey-hover);
}

#button-import {
  display: none;
}


/* 弹窗 (background) */

.popup-background {
  display: none;
  /* 默认隐藏 */
  position: fixed;
  /* 定位 */
  z-index: 10;
  /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-left: 225px;
  padding-top: 60px;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}


/* 弹窗内容 */

.popup-content {
  background-color: white;
  margin-top: 100px;
  margin-left: calc(50% - 200px);
  padding: 30px;
  width: 600px;
  height: 400px;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

.popup-cell {
  float: left;
  width: 160px;
  height: 40px;
  text-align: left;
}

/* 关闭按钮 */

#popup-close {
  position: relative;
  float: right;
  width: 50px;
  height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#popup-close:hover,
#popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/*统计*/

.stat-record {
  float: left;
  width: 300px;
  min-height: 35px;
  text-align: right;
  font-size: 13px;
}

.stat-record .hide-container {
  height: 23px;
  width: 140px;
}

/*
.stat-record input[type="checkbox"] {
  width: 13px;
  height: 13px;
}
*/

.stat-checkbox {
  width: 130px;
  height: 25px;
  border: none;
  background-color: var(--grey-hover);
  outline: none;
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.stat-checkbox:hover {
  transform: translate(0, -2px);
  box-shadow: 0 2px 2px var(--grey-shadow);
}

.stat-checkbox-selected {
  width: 130px;
  height: 25px;
  border: none;
  color: white;
  background-color: var(--blue);
  transform: translate(0, -2px);
  box-shadow: 0 2px 2px var(--grey-shadow);
  transition: 0.3s;
  -moz-transition: 0.3s;
  /* Firefox 4 */
  -webkit-transition: 0.3s;
  /* Safari 和 Chrome */
  -o-transition: 0.3s;
  /* Opera */
}

.stat-input {
  width: 10px;
  height: 10px;
}

.stat-nonselect-range {
  display: none;
}

.stat-nonselect-range div {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 14px;
}

#stat-nonselect-input-GPA-start,
#stat-nonselect-input-GPA-end {
  margin-left: 10px;
  display: inline-block;
  width: 140px;
}

#stat-nonselect-input-GPA-range {
  margin-left: 10px;
  width: 140px;
  height: 22px;
}

#stat-chart-bar {
  float: left;
  margin-top: 20px;
  width: 50%;
}

#stat-chart-pie {
  float: left;
  margin-top: 20px;
  width: 50%;
}
</style>