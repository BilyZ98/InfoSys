<template>
<div id="manager-basicInfo">
	<div class="container-header">
		<p class="header-text">基本信息管理</p>
		<div class="header-button">
			<span>上传学生照片</span>
			<span>修改密码</span>
			<span>导出</span>
			<span>导入</span>
			<span>下载模板</span>
			<span>删除</span>
			<span>编辑</span>
			<span>转毕业生</span>
			<span>自定义列</span>
		</div>
	</div>
	<div class="container-card">
		<div class="container-record" v-for="record in table.records">
      <span>{{record.name}}:</span>
      <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="table.id+'-'+record.id" v-model="record.value">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="table.id+'-'+record.id" v-model="record.value">
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="table.id+'-'+record.id">
        <h6>最小值：</h6><input type="text" class="min"><h6> 最大值：</h6><input type="text" class="max">
      </span>
    </div>
    <button class="manager-button">查询</button>
	</div>
	<div class="container-card-list">
		<table border="1">
			<tr class="table-head">
				<th>#</th>
		    <th v-for="record in table.records">{{record.name}}</th>
		  </tr>
		  <tr v-for="(student, index) in students">
		  	<td>{{index}}</td>
		  	<td v-for="record in table.records">
		  		<span v-if="student['basicInfo'][record.id] != undefined">{{student['basicInfo'][record.id]}}</span>
		  		<span v-else>---</span>
		  	</td>
		  </tr>
		</table>
	</div>
</div>
</template>

<script>
import tableData from './tableData.js'

export default {
	data: function(){
		return {
			table: tableData['basicInfo'],
			students:   [
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', tel: '15521336318', mail: 'jack@126.com', wechat: 'wxid_123456', qq: '12345678', idNum: '142701198912221549' }, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏' }, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}},
	      {basicInfo: {sid: 'id', name: 'name', gender: '男', birthPlace: '新疆'}, cadre: {year: '2013', cadreClass: 'homeAddress', cadreName: '321'}},
	      {basicInfo: {sid: 'id1', name: 'name1', gender: '男1', birthPlace: '西藏'}, cadre: {year: '2013', cadreClass: 'homeAddress1289', cadreName: '321'}}
	    ]
		}
	},
	mounted: function(){
		//alert(window.innerWidth)
		//1536*728
	}
}
</script>

<style>

#manager-basicInfo .container-header {
	width:100%;
	height: 70px;
	line-height: 70px;
	margin: auto;
	text-align: left;
	padding-left: 30px;
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

#manager-basicInfo .header-text {
	float: left;
	font-size: 20px;
}

#manager-basicInfo .header-button {
	float: right;
	margin-right: 20px;
}

#manager-basicInfo .header-button span{
	padding-right: 10px;
	font-weight: bold;
}

#manager-basicInfo .header-button span:hover {
	color: var(--blue);
  cursor: pointer;
}

#manager-basicInfo .container-card {
  margin: 30px;
  text-align: left;
  padding: 20px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  /*让float的内部元素可以撑开容器*/
  overflow: hidden;
}

#manager-basicInfo .container-record {
	float: left;
	width: 350px;
	height: 35px;
	text-align: right;
}

#manager-basicInfo .container-record input, select, span {
	width: 200px;
}

#manager-basicInfo .manager-button {
	float: left;
	clear: both;
	width: 110px;
	height: 36px;
	margin-left: 44%;
	font-size: 17px;
	color: white;
	background-color: var(--blue);
	border: none;
}

#manager-basicInfo .manager-button:hover {
	background-color: var(--blue-hover);
}

#manager-basicInfo .container-card-list {
  margin: 30px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-basicInfo .container-card-list').width())不包含margin，但是会减去padding
  固定了width，才能在内部元素超出宽度时出现滚动条*/
  width: 1231.32px;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
  overflow: auto;
}

#manager-basicInfo .container-card-list table {
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;
	min-width: 100%;
	font-size: 14px;
	border-color: var(--grey-shadow);
	margin-right: 100px;
}

#manager-basicInfo .container-card-list th, td {
	padding: 8px;
}

#manager-basicInfo .container-card-list tr:not(.table-head):hover{
	background-color: var(--grey-hover);
}


</style>