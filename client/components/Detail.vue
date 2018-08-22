<template>
<div id="container-detail">
	<div class="container">
		<h3 class="text-center heading">学生信息</h3>
		<div class="info col-md-12">
			<!--以表循环-->
			<div v-for="table in tables">
				<div class="info-heading">{{table.name}}</div>
				<!--若表中有数据，以字段循环-->
				<!--最多有一条数据的-->
				<div class="clearfix" v-if="student[table.id].length!=0&&(table.id=='basicInfo'||table.id=='family'||table.id=='schoolRoll'||table.id=='partyInfo')">
					<div class="table-array" v-for="tableArr in student[table.id]">
						<span class="info-text" v-for="record in table.records">
							{{record.name}}:
							<input v-bind:style="{width: 20+tableArr[record.id].length*10+'px'}" v-if="tableArr[record.id]!=undefined" class="record-changable" disabled="disabled" v-model:text="tableArr[record.id]">
							<input style="width: 20px" v-else class="record-changable" disabled="true" v-model:text="tableArr[record.id]">
						</span>
					</div>
				</div>
				<!--有多条数据的-->
				<table border="1" v-else-if="student[table.id].length!=0">
					<tr>
  					<th v-for="record in table.records">{{record.name}}</th>
					</tr>
					<tr v-for="tableArr in student[table.id]">
  					<td v-for="record in table.records">
							<input v-bind:style="{width: 20+tableArr[record.id].length*10+'px'}" v-if="tableArr[record.id]!=undefined" class="record-changable" disabled="disabled" v-model:text="tableArr[record.id]">
							<input style="width: 20px" v-else class="record-changable" disabled="true" v-model:text="tableArr[record.id]">
						</td>
					</tr>
				</table>
				<!--空-->
				<div v-else>---</div>
			</div>
		</div>
	</div>

	<div class="btn-show">
		<button class="btn btn-info btn-sm" id="info-update" button-type="begin" @click="updateClick">修改</button>
		<button class="btn btn-info btn-sm" id="info-print" @click="printClick">导出</button>
	</div>
</div>
</template>


<script>
import tableData from './javascripts/tableData.js'
import html2canvas from './javascripts/js/html2canvas.js'
import jsPDF from './javascripts/js/jspdf.debug.js'
import './javascripts/js/renderPDF.js'
import downLoad from './javascripts/js/paper_download.js'

export default {
	data: function(){
		return {
			sid: null,
			tables: tableData,
			student: {},
			//backup用于更新数据后判断哪些被更新了
			studentBackup: {}
		}
	},
	created: function(){
		//这样传参刷新页面就会丢失参数
		this.sid = this.$route.params.sid
		//alert('sid: ' + sid)
		var data = {
			tables: ['basicInfo', 'family', 'schoolRoll', 'course', 'partyInfo', 'scholarship', 'aid', 'loan', 'cadre', 'award', 'paper', 'patent', 'techProject'],
			id: this.sid
		}
		var postData = JSON.stringify(data)
    console.log('请求全部信息的data： ' + postData)
    var testdata = {basicInfo: [{sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', tel: '15521336318', mail: 'jack@126.com', wechat: 'wxid_123456', qq: '12345678', idNum: '142701198912221549' }], cadre: [{year: '2013', cadreClass: 'homeAddress', cadreName: '321'}], paper: [{serialNumber: '2012'}, {serialNumber: '2013'}]}
    this.student = this.dataMakeup(testdata)
    //深复制，才能起到backup之用
    this.studentBackup = JSON.parse(JSON.stringify(this.student))
    var _self = this
    $.ajax({
      type: 'POST',
      url: '/students/queryAll',
      data: postData,
      contentType: 'application/json;charset=utf-8',
      dataType: 'json',
      timeout: 5000,
      success: function(data, xhr) {
      	console.log(xhr.status)
        console.log(data)
        _self.student = _self.dataMakeup(data['content'])
        //深复制，才能起到backup之用
    		_self.studentBackup = JSON.parse(JSON.stringify(_self.student))
    		console.log(data['content']['scholarship'].length!=0)
      },
      error: function(data) {
        console.log(data.status)
        alert(data.responseJSON.err)
      }
     })
    /*
    var imgArray = $('.container')[0]
		var down = new downLoad.downLoad(imgArray)
		down.init($('#info-print') ,$('.container')[0], '[学生姓名]信息','a4')
		*/
	},
	methods: {
		dataMakeup: function(data) {
			//把数据中不全的表中没有的字段全部赋值为空
	    for(let table in tableData){
	    	if(data[table] != undefined){
	    		for(let i = 0; i < data[table].length; i++){
			  		for(let record in tableData[table]['records']){
			  			if(data[table][i][record] == undefined){
			  				data[table][i][record] = ''
			  			}
			  		}
			  	}
	    	}
	    }
	    return data
		},
		updateClick: function(){
			if($('#info-update').attr('button-type') == 'begin'){
				//开始修改
				$('#info-update').text('上传')
				$('#info-update').attr('button-type', 'end')
				$('.record-changable').each(function(){
					$(this).attr('disabled', false)
					//$(this).css('border', '1px solid')
				})
			} else if ($('#info-update').attr('button-type') == 'end'){
				//修改完成进行上传
				$('.record-changable').each(function(){
					$(this).attr('disabled', true)
					//$(this).css('border', 'none')
				})
				$('#info-update').text('修改')
				$('#info-update').attr('button-type', 'begin')
				//处理数据变化
				var data = {}
				for(let table in this.student){
					for(let i = 0; i< this.student[table].length; i++){
						let tableArr = this.student[table][i]
						for(let record in tableArr){
							if(tableArr[record] != this.studentBackup[table][i][record]){
								//console.log(record + ': ' + tableArr[record])
								if(data[table] == undefined){
									data[table] = {primary: {}, new: {}}
									//把这个表的主键写入
									for(let recordInOld in tableData[table]['records']){
										if(tableData[table]['records'][recordInOld]['isPrimary']){
											data[table]['primary'][recordInOld] = this.studentBackup[table][i][recordInOld]
										}
									}
								}
								data[table]['new'][record] = tableArr[record]
							}
						}
					}
				}
				var postData = JSON.stringify(data)
				console.log(postData)
				var _self = this
		    $.ajax({
		      type: 'POST',
		      url: '/students/update',
		      data: data,
		      contentType: 'application/json;charset=utf-8',
		      dataType: 'json',
		      timeout: 5000,
		      success: function(data, xhr) {
		      	console.log(xhr.status)
		        console.log(data)
		        //成功后backup变为现在的数据
		    		_self.studentBackup = JSON.parse(JSON.stringify(_self.student))
		      },
		      error: function(data) {
		        console.log(data.status)
		        alert(data.responseJSON.err)
		      }
		     })
			}
		},
  	printClick: function() {
  		/*
  		html2canvas($(".container"), {
				onrendered: function(canvas) {
				  //通过html2canvas将html渲染成canvas，然后获取图片数据
				   var imgData = canvas.toDataURL('jpeg')

				   //初始化pdf，设置相应格式
				   var doc = new jsPDF("p", "mm", "a4")

				   //这里设置的是a4纸张尺寸
				   doc.addImage(imgData, 'JPEG', 0, 0, 210, 297)

				   //输出保存命名为content的pdf
				   doc.save(this.sid + '.pdf')
				}
     })
  	}
		*/
		}
	}
}
</script>

<style>
#container-detail {
	margin: 25px;
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}

#container-detail .container {
	padding-bottom: 20px;
}

#container-detail .container .heading {
	border-color: #eee;
	border-width: 1px;
	border-style: solid;
	padding: 5px;
}

#container-detail .info {
	border-color: #eee;
	border-width: 1px;
	border-style: solid;
	margin: 10px 0;
}

#container-detail .info .info-heading {
	background-color: #eee;
	padding: 5px;
	margin: 10px;
}

#container-detail .table-array{
	margin: 5px;
	margin-left: 20px;
	float: left;
}

#container-detail .info-text {
	float: left;
	margin: 5px;
	width: 300px;
}

#container-detail .clearfix {
	zoom:1;
}

#container-detail .clearfix:before, .clearfix:after {
	content: "";
	display: table;
}

#container-detail .clearfix:after {
	clear: both;
}

#container-detail .btn-show {
	text-align: center;
}

#container-detail table {
	margin-left: 25px;
	margin-right: 25px;
	font-size: 14px;
	border-color: var(--grey-shadow);
	min-width: 96%;
	/*不会自动换行*/
	word-break: keep-all;
	white-space: nowrap;

}

#container-detail th {
	background-color: var(--blue)
}

#container-detail th{
	text-align: center;
	padding-left: 8px;
	padding-right: 8px;
	padding-top: 5px;
	padding-bottom: 5px;
}

#container-detail #info-update {
	right: 25px;
	bottom: 45px;
	font-size: 15px;
	color: white;
	display: flex;
	align-items: center;
	padding: 4px 8px 4px 8px;
	position: fixed;
	background-color: rgb(0, 100, 200);
	cursor: pointer;
	transition: background-color 0.4s;
}

#container-detail #info-update:hover{
  	background-color: rgb(0, 132, 255);
}

#container-detail #info-update:active{
  	background-color: rgb(0, 255, 255);
}

#container-detail #info-print {
	right: 25px;
	bottom: 8px;
	font-size: 15px;
	color: white;
	display: flex;
	align-items: center;
	padding: 4px 8px 4px 8px;
	position: fixed;
	background-color: rgb(0, 100, 200);
	cursor: pointer;
	transition: background-color 0.4s;
}

#container-detail #info-print:hover{
  	background-color: rgb(0, 132, 255);
}

#container-detail #info-print:active{
  	background-color: rgb(0, 255, 255);
}

#container-detail .record-changable {
	padding-left: 4px;
	padding-right: 4px;
	padding-top: 2px;
	padding-bottom: 2px;
	border: none;
	background-color: white;
}
</style>