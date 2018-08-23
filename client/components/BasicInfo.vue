<template>
<div id="manager-basicInfo">
	<!--顶部菜单-->
	<div class="container-header">
		<p class="header-text">基本信息管理</p>
		<div class="header-button">
			<span @click="insertClick">插入数据</span>
			<span>上传学生照片</span>
			<span>修改密码</span>
			<span @click="downloadClick">导出</span>
			<span @click="importClick">导入<input id="button-import" v-on:change="importUpload" type="file"></span>
			<span>下载模板</span>
			<span>删除</span>
			<span>编辑</span>
			<span>转毕业生</span>
			<span @click="diycolClick">自定义列</span>
		</div>
	</div>
	<!--查询输入-->
	<div class="container-card-list">
		<div class="container-record" v-for="record in table.records">
      <span>{{record.name}}:</span>
      <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="'basicInfo-'+record.id">
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'basicInfo-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="'basicInfo-'+record.id">
        <h6>最小值：</h6><input type="text" class="min"><h6> 最大值：</h6><input type="text" class="max">
      </span>
    </div>
    <button class="manager-button" @click="queryClick">查询</button>
	</div>
	<!--显示数据-->
	<div class="container-card-list">
		<table border="1">
			<tr class="table-head">
				<th>#</th>
		    <th v-for="record in table.records" v-if="record['display']==true">{{record.name}}</th>
		  </tr>
		  <tr v-for="(student, index) in students" @click="studentClick" v-bind:sid="student['basicInfo']['sid']">
		  	<td>{{index}}</td>
		  	<td v-for="record in table.records" v-if="record['display']==true" contenteditable="false">
		  		<span v-if="student['basicInfo'][record.id]!=undefined">{{student['basicInfo'][record.id]}}</span>
		  		<span v-else>---</span>
		  	</td>
		  </tr>
		</table>
	</div>
	<!--统计-->
	<div class="container-card">
		<div class="stat-record" v-for="record in table.records">
      <span>{{record.name}}:</span>
      <input class="stat-checkbox" type="checkbox" v-bind:record-id="record.id">
      <input class="hide-container" type="text" v-if="record.valueType=='input'" v-bind:id="'basicInfo-stat-'+record.id">
      <select class="hide-container" v-else v-bind:id="'basicInfo-stat-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
    </div>
    <button class="manager-button" @click="statClick">统计</button>
		<div id="stat-chart"></div>
	</div>

	<!-- 弹窗 -->
	<div id="popup" class="popup-background">
	  <!-- 弹窗内容 -->
	  <div class="popup-content">
	    <span id="popup-close" @click="modalCloseClick">&times;</span>
	    <div class="popup-cell" v-for="record in table.records">
	    	{{record.name}}
	    	<input type="checkbox" v-model:checked="record.display">
	    </div>
	  </div>
	</div>
</div>
</template>

<script>
import tableData from './javascripts/tableData.js'
import downloadModule from './javascripts/downloadModule.js'
import importModule from './javascripts/importModule.js'
var empty = JSON.stringify({equal: {}, range: {}, fuzzy: {}})
var emptyCell = JSON.stringify({})

export default {
	data: function(){
		return {
			table: tableData['basicInfo'],
			students: []
		}
	},
	created: function(){
		//alert(window.innerWidth)
		//1536*728
	},
	methods: {
		insertClick: function(){
			this.$router.push({
        name: 'basicInfoInsert'
      })
		},
		queryClick: function(){
			var basicInfo = {equal: {}, range: {}, fuzzy: {}}
			var data = {
        select: ['basicInfo'],
        where: {
          equal: {},
          range: {},
          fuzzy: {}
        }
      }
			if ($('#basicInfo-sid').val()) {
        basicInfo['equal']['sid'] = $('#basicInfo-sid').val()
      } else {
	      if ($('#basicInfo-name').val()) basicInfo['equal']['name'] = $('#basicInfo-name').val()
	      if ($('#basicInfo-gender').val()) basicInfo['equal']['gender'] = $('#basicInfo-gender').val()
	      if ($('#basicInfo-birthPlace').val()) basicInfo['equal']['birthPlace'] = $('#basicInfo-birthPlace').val()
	      if ($('#basicInfo-ethnic').val()) basicInfo['equal']['ethnic'] = $('#basicInfo-ethnic').val()
	      if ($('#basicInfo-poliFace').val()) basicInfo['equal']['poliFace'] = $('#basicInfo-poliFace').val()
	      if ($('#basicInfo-idNum').val()) basicInfo['equal']['idNum'] = $('#basicInfo-idNum').val()
	      if ($('#basicInfo-birthDate').val()) basicInfo['equal']['birthDate'] = $('#basicInfo-birthDate').val()
	      if ($('#basicInfo-tel').val()) basicInfo['equal']['tel'] = $('#basicInfo-tel').val()
	      if ($('#basicInfo-mail').val()) basicInfo['equal']['mail'] = $('#basicInfo-mail').val()
	      if ($('#basicInfo-wechat').val()) basicInfo['equal']['wechat'] = $('#basicInfo-wechat').val()
	      if ($('#basicInfo-qq').val()) basicInfo['equal']['qq'] = $('#basicInfo-qq').val()
	      if ($('#basicInfo-degree').val()) basicInfo['equal']['degree'] = $('#basicInfo-degree').val()
	      if ($('#basicInfo-stuGroup ').val()) basicInfo['equal']['stuGroup '] = $('#basicInfo-stuGroup ').val()
	      if ($('#basicInfo-grade').val()) basicInfo['equal']['grade'] = $('#basicInfo-grade').val()
	      if ($('#basicInfo-major').val()) basicInfo['equal']['major'] = $('#basicInfo-major').val()
	      if ($('#basicInfo-class').val()) basicInfo['equal']['class'] = $('#basicInfo-class').val()
	      //格式：'dorm+dormNumber'，至善园2号，明德园10号
	      if ($('#basicInfo-dorm').val()) basicInfo['equal']['dorm'] = $('#basicInfo-dorm').val() + $('#basicInfo-dormNumber').val() + '号'
	      //if ($('#basicInfo-dormNumber').val()) basicInfo['equal']['dormNumber'] = $('#basicInfo-dormNumber').val()
	      if ($('#basicInfo-dormRoom ').val()) basicInfo['equal']['dormRoom '] = $('#basicInfo-dormRoom ').val()
	      if ($('#basicInfo-speciality').val()) basicInfo['equal']['speciality'] = $('#basicInfo-speciality').val()
	      if ($('#basicInfo-highSchool').val()) basicInfo['equal']['highSchool'] = $('#basicInfo-highSchool').val()
	      if(JSON.stringify(basicInfo) == empty){
	      	alert('请输入查询条件！')
	      	return
	      }
	    }
      if(JSON.stringify(basicInfo['equal']) != emptyCell) data['where']['equal']['basicInfo'] = basicInfo['equal']
      if(JSON.stringify(basicInfo['range']) != emptyCell) data['where']['range']['basicInfo'] = basicInfo['range']
      if(JSON.stringify(basicInfo['fuzzy']) != emptyCell) data['where']['fuzzy']['basicInfo'] = basicInfo['fuzzy']
      var postData = JSON.stringify(data)
      console.log(postData)
      //post
      var _self = this
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/students/query',
        data: postData,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(result, xhr) {
	      	for(let key in result){
	      		if(key == 'content'){
	      			//操作成功
	      			_self.students = result['content']
	      		} else if (key == 'err'){
	      			//操作错误
	      			alert('查询信息错误: ' + result[key]['sqlMessage'])
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
		downloadClick: function(){
			downloadModule.downloadClick(this.students)
		},
		importClick: function(){
			$('#button-import').click()
		},
		//onchange时调用这个函数实现文件选择后上传
		importUpload: function(){
			importModule.importClick($('#button-import').prop('files')[0], 'basicInfo')
		},
		diycolClick: function(){
			$('#popup').show()
		},
		modalCloseClick: function() {
			$('#popup').hide()
		},
		studentClick: function(event){
			alert('您点击的学生学号是：' +  event.currentTarget.getAttribute('sid'))
			//跳转,在跳转完成后再请求数据
      this.$router.push({
        name: 'detail',
        params: {
          sid: event.currentTarget.getAttribute('sid')
        }
      })
		},
		statClick: function(){
			var data = {
				table: 'basicInfo',
				fields: [],
				condition: {}
			}
			$('.stat-checkbox').each(function(){
				if($(this).prop("checked")){
					var recordId = $(this).attr('record-id')
					data['fields'].push(recordId)
					if( $('#basicInfo-stat-' + String(recordId)) != ''){
						data['condition'][recordId] = $('#basicInfo-stat-' + recordId).val()
					}
				}
			})
			if(data['fields'].length == 0 ){
				alert('请选择想要统计的字段打勾！')
			}
			var postData = JSON.stringify(data)
			console.log(postData)
			// 图表配置
      var options = {
        chart: {
          type: 'bar'
        },
        title: {
          text: '基本信息表统计'
        },
        xAxis: {
          categories: []   // x 轴分类
        },
        yAxis: {
          title: {
              text: ''       // y 轴标题
          },
          allowDecimals: false
        },
        series: [],
        credits: {
        	enabled: true
        }
      }
	    /*$.ajax({
	      type: 'POST',
	      url: '/students/statistic',
	      data: postData,
	      contentType: 'application/json;charset=utf-8',
	      dataType: 'json',
	      timeout: 5000,
	      success: function(result, xhr) {
	      	for(let key in result){
	      		if(key == 'content'){
	      			//操作成功，配置图表
	      			
	      		} else if (key == 'err'){
	      			//操作错误
	      			alert('统计错误: ' + result[key]['sqlMessage'])
	      		}
	      	}
	      },
	      error: function(result, xhr) {
	      	//连接错误
	        //console.log(result)
	        alert('服务器连接错误: ' + xhr)
	      }
	    })*/
	    let statData = [
		    {gender: '女', major: null, statistic: 2},
		    {gender: '女', major: 123, statistic: 1},
		    {gender: '男', major: 123, statistic: 3},
		    {gender: '男', major: '数学', statistic: 1}
	    ]
			for(let i = 0; i < statData.length; i++){
				let statArr = statData[i]
				//xAxis
				let str = ''
				for(let item in statArr){
					if(item != 'statistic')
					str = str + tableData['basicInfo']['records'][item]['name'] + ':' + statArr[item] + ' '
				}
				options['xAxis']['categories'].push(str)
				//series
				let arr = []
				for(let j = 0; j < statData.length; j++){
					arr[j] = 0
				}
				arr[i] = statArr['statistic']
				options['series'][i] = {}
				options['series'][i]['name'] = str
				options['series'][i]['data'] = arr
			}
			console.log(JSON.stringify(options))
      // 图表初始化函数
      var chart = Highcharts.chart('stat-chart', options)
		}
	}
}
</script>

<style>

#manager-basicInfo .container-header {
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
	transition: 0.3s;
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-basicInfo .header-button span:hover {
	color: var(--blue);
  cursor: pointer;
}

#manager-basicInfo .container-card {
  margin: 25px;
  padding: 20px;
  text-align: left;
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

#manager-basicInfo .container-record .hide-container {
	height: 24px;
	width: 200px;
}

#manager-basicInfo .manager-button {
	float: left;
	clear: both;
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

#manager-basicInfo .manager-button:hover {
	background-color: var(--blue-hover);
}

#manager-basicInfo .container-card-list {
  margin: 25px;
  text-align: left;
  padding: 20px;
  /*alert($('#manager-basicInfo .container-card-list').width())不包含margin，但是会减去padding
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

#manager-basicInfo .container-card-list table {
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;
	min-width: 100%;
	font-size: 14px;
	border-color: var(--grey-shadow);
}

#manager-basicInfo .container-card-list th, td {
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 4px;
	padding-bottom: 4px;
}

#manager-basicInfo .container-card-list tr{
	transition: background 0.3s;
  -moz-transition: background 0.3s;  /* Firefox 4 */
  -webkit-transition: background 0.3s; /* Safari 和 Chrome */
  -o-transition: background 0.3s;  /* Opera */
}

#manager-basicInfo .container-card-list tr:not(.table-head):hover{
	background-color: var(--grey-hover);
}

#manager-basicInfo #button-import {
	display: none;
}

/* 弹窗 (background) */
#manager-basicInfo .popup-background {
  display: none; /* 默认隐藏 */
  position: absolute; /* 定位 */
  z-index: 10; /* 设置在顶层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

/* 弹窗内容 */
#manager-basicInfo .popup-content {
  background-color: white;
  margin: 8% auto;
  padding: 30px;
  width: 600px;
	height: 400px;
	/*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#manager-basicInfo .popup-cell {
	float: left;
	width: 160px;
	height: 40px;
	text-align: left;
}

/* 关闭按钮 */
#manager-basicInfo #popup-close {
	position: relative;
	float: right;
	width: 50px;
	height: 50px;
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  text-align: right;
}

#manager-basicInfo #popup-close:hover, #popup-close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

#manager-basicInfo .stat-cell {
	float: left;
	width: 300px;
	height: 30px;
	text-align: left;
}

#manager-basicInfo .stat-record {
	float: left;
	width: 300px;
	height: 35px;
	text-align: right;
	font-size: 14px;
}

#manager-basicInfo .stat-record .hide-container {
	height: 22px;
	width: 150px;
}

#manager-basicInfo .stat-record input[type="checkbox"] {
	width: 13px;
	height: 13px;
}

#manager-basicInfo .stat-input {
	width: 10px;
	height: 10px;
}

#manager-basicInfo #stat-chart {
	margin-top: 120px;
}
</style>