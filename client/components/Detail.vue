<template>
<div id="container-detail">
	<div class="container">
		<h3 class="text-center heading">学生信息</h3>
		<div class="info col-md-12">
			<!--以表循环-->
			<div v-for="table in tables">
				<div class="info-heading">{{table.name}}</div>
				<!--若表中有数据，以字段循环-->
				<div class="clearfix" v-if="student[table.id]!=undefined">
					<div class="table-array" v-for="tableArr in student[table.id]">
						<span class="info-text" v-for="record in table.records">
							<span v-if="tableArr[record.id]!=undefined">{{record.name}}: {{tableArr[record.id]}}</span>
							<span v-else>{{record.name}}: ---</span>
						</span>
					</div>
				</div>
				<div v-else>---</div>
			</div>
		</div>
	</div>

	<div class="btn-show">
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
			tables: tableData,
			student: {}
		}
	},
	created: function(){
		//这样传参刷新页面就会丢失参数
		var sid = this.$route.params.sid
		//alert('sid: ' + sid)
		var data = {
			tables: ['basicInfo', 'family', 'schoolRoll', 'course', 'partyInfo', 'scholarship', 'aid', 'loan', 'cadre', 'award', 'paper', 'patent', 'techProject'],
			id: sid
		}
		var postData = JSON.stringify(data)
    console.log(postData)
    //this.student = {basicInfo: [{sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', tel: '15521336318', mail: 'jack@126.com', wechat: 'wxid_123456', qq: '12345678', idNum: '142701198912221549' },{sid: 'id', name: 'name', gender: '男', birthPlace: '新疆', tel: '15521336318', mail: 'jack@126.com', wechat: 'wxid_123456', qq: '12345678', idNum: '142701198912221549' }], cadre: [{year: '2013', cadreClass: 'homeAddress', cadreName: '321'}], paper: [{serialNumber: '2012'}, {serialNumber: '2013'}]}
    //post
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
        _self.student = data['content']
      },
      error: function(data) {
        console.log(data.status)
        alert(data.responseJSON.err)
      }
     })
    //导出按钮的初始化，要在数据加载完后进行
    var imgArray = $('.container')[0].getElementsByTagName('img');
		var down = new downLoad(imgArray);
		down.init(document.getElementById('info-print'),$('.container')[0],'[学生姓名]信息','a4');
	},
	methods: {
  	printClick: function() {
  		html2canvas($(".container"), {
				onrendered: function(canvas) {
				  //通过html2canvas将html渲染成canvas，然后获取图片数据
				   var imgData = canvas.toDataURL('jpeg')

				   //初始化pdf，设置相应格式
				   var doc = new jsPDF("p", "mm", "a4")

				   //这里设置的是a4纸张尺寸
				   doc.addImage(imgData, 'JPEG', 0, 0,210,297)

				   //输出保存命名为content的pdf
				   doc.save('content.pdf')
				}
     })
  	}

	}
}
</script>

<style>
#container-detail {
	margin: 20px;
  text-align: left;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
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

/*
#container-detail th {
	background-color: rgb(0, 132, 255);
}

#container-detail th, td {
	text-align: center;
}
*/

#container-detail #info-print {
  	right: 20px;
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
</style>