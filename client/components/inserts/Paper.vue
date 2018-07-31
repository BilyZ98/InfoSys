<template>
<div id="container-info">
    <h3 class="text-center">发表论文情况</h3>
      <div class="container">
        <div class="col-md-12">
          <form class="form-inline">
            <div class="form-group col-md-4">
              <label for="name">姓名：</label>
              <input type="text" id="name" class="form-control" placeholder="请输入姓名">
            </div>
            <div class="form-group col-md-8">
              <label for="sid">学号：</label>
              <input type="text" id="sid" class="form-control" placeholder="请输入学号">
            </div>
          </form>
          <br><br>
          <form class="form-horizontal">
            <div class="form-group">
              <label for="title" class="col-md-2 control-label" style="text-align: left;">题目：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="title">
              </div>
            </div>
            <div class="form-group">
              <label for="authors" class="col-md-2 control-label" style="text-align: left;">作者序：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="authors">
              </div>
            </div>
            <div class="form-group">
              <label for="journal" class="col-md-2 control-label" style="text-align: left;">刊物：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="journal">
              </div>
            </div>
          </form>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="serialNumber">期号：</label>
              <input type="text" id="serialNumber" class="form-control">
            </div>
            <div class="form-group">
              <label for = "pagesRange">页码范围：</label>
                <div class="form-group" id="pagesRange">
                  <input type="text" id="pagesBegin" class="form-control">
                  <strong>~</strong>
                  <input type="text" id="pagesEnd" class="form-control">
                </div>
            </div>
          </form>
          <br>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="paperGrade">刊物级别：</label>
              <select class="form-control" id="paperGrade">
                <option>国际期刊</option>
                <option>国际学术会议论文集</option>
                <option>国内核心</option>
                <option>国内一般</option>
              </select>
            </div>
            <div class="form-group">
              <label for="paperClass">论文类型：</label>
              <select class="form-control" id="paperClass">
                <option>期刊论文</option>
                <option>会议论文集</option>
                <option>其他</option>
              </select>
            </div>
          </form>
          <br>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="time">发表时间：</label>
              <input type="text" id="time" class="form-control" placeholder="如：2000-01-01">
            </div>
            <div class="form-group">
              <label for="insTeacher">指导老师：</label>
              <input type="text" id="insTeacher" class="form-control">
            </div>
          </form>
          <div class="col-md-1 col-md-offset-11">
            <input class="btn btn-primary" type="submit" value="提交" id="subBtn">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  $(document).ready(function() {
	$("#subBtn").click(function() {
		var name = $("#name").val();
		var sid = $("#sid").val();
		var title = $("#title").val();
		var authors = $("#authors").val();
		var journal = $("#journal").val();
		var serialNumber = $("#serialNumber").val();
		var pagesBegin = $("#pagesBegin").val();
		var pagesEnd = $("#pagesEnd").val();
		var paperGrade = $("#paperGrade").val();
		var paperClass = $("#paperClass").val();
		var time = $("#time").val();
		var insTeacher = $("#insTeacher").val();

		if(isNULL(name)||isNULL(sid)||isNULL(title)||isNULL(authors)||isNULL(journal)||isNULL(serialNumber)
			||isNULL(pagesBegin)||isNULL(pagesEnd)||isNULL(time)||isNULL(insTeacher)) {
			alert("还有内容未填写，请填写完整！");
		} else if(!isValidSid(sid)) {
			alert("学号格式或长度错误，请检查！");
		} else if(!isValidTime(time)) {
			alert("发表时间格式错误！");
		} else if(!(pagesBegin.match(/^([0-9]*)$/)&&pagesEnd.match(/^([0-9]*)$/))) {
			alert("页码输入错误！")
		} else {
			var data = {
				"table":"paper",
				"name":name,
				"sid":sid,
				"title":title,
				"authors":authors,
				"journal":journal,
				"serialNumber":serialNumber,
				"pagesRange":pagesBegin + "~" + pagesEnd,
				"paperGrade":paperGrade,
				"paperClass":paperClass,
				"time":time,
				"insTeacher":insTeacher
			}
			// alert(JSON.stringify(data));
			$.ajax({
          		type: "POST",
          		url: "/students/insert/paper",
          		contentType: "application/json; charset=utf-8",
          		data: JSON.stringify(data),
          		dataType: "json",
          		success: function (message) {
             		if (message > 0) {
                		alert("请求已提交！请稍候！");
              		}
          		},
          		error: function (message) {
              		$("#container-info").html("<b>提交数据失败！</b>");
          		}	
     		});
		}
	});
});

function isNULL(data) {
	if(data.length == 0)
		return true;
	else return false;
}

function isValidSid(data) {
	if(data.match(/^([0-9]*)$/) && data.length == 8)
		return true;
	return false;
}

function isValidTime(data) {
	var reg = /[1-2]\d{3}-[0-1]?[0-9]-[0-3]?[0-9]/;
	if(reg.test(data))
		return true;
	else return false;
}
</script>
