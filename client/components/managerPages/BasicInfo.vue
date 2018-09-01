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
			<span @click="mubanDownload">下载模板</span>
			<span>删除</span>
			<span>编辑</span>
			<span>转毕业生</span>
			<span @click="diycolClick">自定义列</span>
			<span @click="sendEmailClick">邮件通知</span>
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
        <span class="text-range">最小值 </span><input type="text" class="min"><span class="text-range">最大值 </span><input type="text" class="max">
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
      <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="'basicInfo-stat-'+record.id">
      	<option></option>
        <option v-for="option in record.options">{{option}}</option>
      </select>
      <input class="hide-container" type="text" v-else v-bind:id="'basicInfo-stat-'+record.id">
    </div>
    <button class="manager-button" @click="statClick">统计</button>
		<span id="stat-chart-bar"></span>
		<span id="stat-chart-pie"></span>
	</div>

	<!-- 弹窗 -->
	<div id="popup-diy" class="popup-background">
	  <!-- 弹窗内容 -->
	  <div class="popup-content">
	    <span id="popup-close" @click="modalCloseClick">&times;</span>
	    <div class="popup-cell" v-for="record in table.records">
	    	{{record.name}}
	    	<input type="checkbox" v-model:checked="record.display">
	    </div>
	  </div>
	</div>
	<!--发邮件-->
	<div id="popup-email" class="popup-background">
		<div class="container-email">
			<div class="heading">
				<span class="i-text">标题：</span>
				<input type="text" id="email-title">
			</div>
      <div class="info-file">
        <span class="i-text">附件：</span>
        <input type="file" id="file-input" name="file-input" @change="emailFileUpolad" multiple="multiple" style="display: none;">
        <button @click="uploadFileClick">添加文件</button>
        <span class="file-area"></span>
      </div>
      <div class="info-text">
        <span class="i-text">正文：</span>
        <script type="text/plain" id="myEditor">
          <p>请在此输入邮件内容</p>
        </script>
      </div>
      <button class="button-email-send" @click="sendEmail">发送</button>
    	<button class="button-email-close" @click="closeSendEmail">关闭</button>
		</div>
	</div>
	<!--发短信-->
</div>
</template>

<script>
import tableData from '../javascripts/tableData.js'
import formatCheck from '../javascripts/formatCheck.js'
import downloadModule from '../javascripts/downloadModule.js'
import importModule from '../javascripts/importModule.js'
import statModule from '../javascripts/statisticModule.js'
var empty = JSON.stringify({equal: {}, range: {}, fuzzy: {}})
var emptyCell = JSON.stringify({})

export default {
	data: function(){
		return {
			table: tableData['basicInfo'],
			students: [],
			ue: null
		}
	},
	mounted: function(){
		this.ue = UE.getEditor("myEditor",
      {
        emotionLocalization:false,
        autoHeightEnabled: true,
        autoFloatEnabled: true,
        enableAutoSave: true,
        saveInterval: 1000,
        maximumWords: 12000,
        autoSyncData: false,
        initialFrameWidth: null,
        initialFrameHeight: 300,
        serverUrl: URL + "jsp/controller.jsp",//服务器接口路径
        toolbars: [['undo', 'redo',  'fontfamily', 'fontsize', 'bold', 'italic',
          'underline', 'strikethrough', 'justifyleft', 'justifyright', 'justifycenter', 'justifyjustify','forecolor', 'backcolor', 'subscript',
          'fontborder', 'superscript',  'formatmatch', 'blockquote', 'horizontal', 'insertorderedlist',
          'insertunorderedlist', 'fullscreen', 'edittip',
          'inserttable', 'insertrow', 'insertcol', 'mergeright', 'mergedown', 'deleterow', 'deletecol','splittorows',
          'splittocols', 'splittocells', 'deletecaption', 'inserttitle', 'mergecells', 'deletetable']]
    })
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
				var sid = $('#basicInfo-sid').val()
				if(!formatCheck['basicInfo']['sid']['reg'].test(sid)){
					alert(formatCheck['basicInfo']['sid']['msg'])
					return
				} else {
					basicInfo['equal']['sid'] = sid
				}
      } else {
      	//验证格式
      	var message = ''
      	for(let item in formatCheck['basicInfo']){
      		if(formatCheck['basicInfo'][item]['reg'] != null){
      			let record = $('#basicInfo-' + item).val()
      			if(record != '' && !formatCheck['basicInfo'][item]['reg'].test(record)){
      				message = message + formatCheck['basicInfo'][item]['msg']
      			}
      		}
      	}
      	if(message != ''){
      		alert(message)
      		return
      	}
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
	      if ($('#basicInfo-dorm').val()) basicInfo['equal']['dorm'] = $('#basicInfo-dorm').val()
	      if ($('#basicInfo-dormNumber').val()) basicInfo['equal']['dormNumber'] = $('#basicInfo-dormNumber').val()
	      if ($('#basicInfo-dormRoom ').val()) basicInfo['equal']['dormRoom '] = $('#basicInfo-dormRoom ').val()
	      if ($('#basicInfo-speciality').val()) basicInfo['equal']['speciality'] = $('#basicInfo-speciality').val()
	      if ($('#basicInfo-highSchool').val()) basicInfo['equal']['highSchool'] = $('#basicInfo-highSchool').val()
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
		mubanDownload: function(){
			downloadModule.mubanDownload("basicInfo")
		},
		//onchange时调用这个函数实现文件选择后上传
		importUpload: function(){
			importModule.importClick($('#button-import').prop('files')[0], 'basicInfo')
		},
		//自定义弹窗函数
		diycolClick: function(){
			$('#popup-diy').show()
		},
		modalCloseClick: function(){
			$('#popup-diy').hide()
		},
		//发送邮件函数
		sendEmailClick: function(){
			//console.log(this.ue)
			$('#popup-email').show()
		},
		sendEmail: function(){
			var sid = []
			for(let i = 0; i < this.students.length; i++){
				sid.push(this.students[i]['basicInfo']['sid'])
			}
			if(sid.length == 0){
				alert('没有要发送邮件的学生~')
				return
			} else if ($("#email-title").val() == '') {
        alert("请填写邮件标题！")
        return
      } else {
      	var formData = new FormData()
      	//字段
      	formData.append('title', $("#email-title").val())
      	formData.append('content', this.ue.getContent())
      	formData.append('sid', sid)
      	//附件
      	var files = $('#file-input').prop('files')
      	if(files.length > 5) {
      		alert('上传附件的数量不能超过五个！')
      		return
      	}
      	formData.append('fileNum', files.length)
      	for(let i = 0; i < files.length; i++ ){
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
            for(let key in result) {
              if(key == "content") {
                alert("发送成功!")
                $("#popup-email").hide()
              } else if(key == "err") {
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
		closeSendEmail: function(){
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
      for(var i = 0; i < length; i++) {
        var temp = obj.files[i].name
        str += '<span>' + temp + '<span>'
      }
      $('.file-area').append(str)
    },
    //查询学生点击事件
		studentClick: function(event){
			//alert('您点击的学生学号是：' +  event.currentTarget.getAttribute('sid'))
			//跳转,在跳转完成后再请求数据,使用query在url内传参，这样不会有刷新就丢失的问题
      var routeData = this.$router.resolve({
        name: 'detail',
        query: {
          sid: event.currentTarget.getAttribute('sid')
        }
      })
      window.open(routeData.href, '_blank')
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
					if( $('#basicInfo-stat-' + recordId).val() != ''){
						data['condition'][recordId] = $('#basicInfo-stat-' + recordId).val()
					}
				}
			})
			if(data['fields'].length == 0 ){
				alert('请选择想要统计的字段打勾！')
				return
			}
			var postData = JSON.stringify(data)
			console.log(postData)
	    $.ajax({
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
	      			/*let statData = [
						    {gender: '女', major: null, statistic: 2},
						    {gender: '女', major: 123, statistic: 1},
						    {gender: '男', major: 123, statistic: 3},
						    {gender: '男', major: '数学', statistic: 1}
					    ]*/
					    console.log(result[key])
					    statModule.createCharts('basicInfo', result[key], 'stat-chart-bar', 'stat-chart-pie')
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
	    })
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
	width: 360px;
	height: 35px;
	text-align: right;
}

#manager-basicInfo .container-record .text-range {
	font-size: 12px;
}

#manager-basicInfo .container-record .min, #manager-basicInfo .container-record .max {
	width: 50px;
}

#manager-basicInfo .container-record .hide-container {
	height: 24px;
	width: 180px;
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
  padding-left: 225px;
  padding-top: 60px;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

/* 弹窗内容 */
#manager-basicInfo .popup-content {
  background-color: white;
  margin-top: 100px;
  margin-left: calc(50% - 300px);
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

/*发邮件*/
#manager-basicInfo .container-email {
  background-color: white;
  width: 800px;
  height: 630px;
  margin: auto;
  margin-top: 50px;
  padding: 20px;
  text-align: left;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#manager-basicInfo .container-email #email-title{
	width: 200px;
}

#manager-basicInfo .container-email .i-text {
  font-size: 16px;
}

#manager-basicInfo .container-email .info-file {
  margin-top: 20px;
}

#manager-basicInfo .container-email .file-area span{
  font-size: 12px;
  margin-left: 7px;
}

#manager-basicInfo .container-email .info-text {
  margin-top: 20px;
}

#manager-basicInfo .container-email #myEditor{
	margin-top: 10px;
}

#manager-basicInfo .container-email .button-email-send, #manager-basicInfo .container-email .button-email-close {
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
  -moz-transition: 0.3s;  /* Firefox 4 */
  -webkit-transition: 0.3s; /* Safari 和 Chrome */
  -o-transition: 0.3s;  /* Opera */
}

#manager-basicInfo .container-email .button-email-send {
	margin-left: 275px;
}

#manager-basicInfo .container-email .button-email-send:hover {
	background-color: var(--blue-hover);
	cursor: pointer;
}

#manager-basicInfo .container-email .button-email-close {
	margin-left: 10px;
}

#manager-basicInfo .container-email .button-email-close:hover {
	background-color: var(--blue-hover);
	cursor: pointer;
}

/*统计*/

#manager-basicInfo .stat-record {
	float: left;
	width: 300px;
	height: 35px;
	text-align: right;
	font-size: 13px;
}

#manager-basicInfo .stat-record .hide-container {
	height: 22px;
	width: 140px;
}

#manager-basicInfo .stat-record input[type="checkbox"] {
	width: 13px;
	height: 13px;
}

#manager-basicInfo .stat-input {
	width: 10px;
	height: 10px;
}

#manager-basicInfo #stat-chart-bar {
	float: left;
	margin-top: 20px;
	width: 50%;
}

#manager-basicInfo #stat-chart-pie {
	float: left;
	margin-top: 20px;
	width: 50%;
}
</style>