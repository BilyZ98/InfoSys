<template>
<div id="container-insert-techProject">
    <h3 class="text-center">科研项目情况</h3>
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
              <label for="proName" class="col-md-2 control-label" style="text-align: left;">项目名称：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="proName">
              </div>
            </div>
            <div class="form-group">
              <label for="employer" class="col-md-2 control-label" style="text-align: left;">主办单位：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="employer">
              </div>
            </div>
          </form>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="money">资助金额：</label>
              <input type="text" id="money" class="form-control" placeholder="单位：元">
            </div>
            <div class="form-group">
              <label for="proId">项目编号：</label>
              <input type="text" id="proId" class="form-control">
            </div>
          </form>
          <br>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="class">类别：</label>
              <input type="text" id="class" class="form-control">
            </div>
            <div class="form-group">
              <label for="teacher">指导老师：</label>
              <input type="text" id="teacher" class="form-control">
            </div>
          </form>
          <br>
          <form class="form-inline">
            <div class="form-group">
              <label for="proTime">立项时间：</label>
              <input type="text" id="proTime" class="form-control" placeholder="如：2000-01-01">
            </div>
          </form>
          <div class="col-md-1 col-md-offset-11">
            <input class="btn btn-primary" type="submit" value="提交" id="subBtn" @click="insertClick">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  methods: {
    insertClick: function() {
      var stuName = $("#name").val();
      var stuId = $("#sid").val();
      var proName = $("#proName").val();
      var employer = $("#employer").val();
      var money = $("#money").val();
      var proId = $("#proId").val();
      var proClass = $("#class").val();
      var teacher = $("#teacher").val();
      var proTime = $("#proTime").val();

      var isNULL = this.isNULL;
      var isValidSid = this.isValidSid;
      var isValidTime = this.isValidTime;
      if (isNULL(stuName) || isNULL(stuId) || isNULL(proName) || isNULL(employer) || isNULL(money) || isNULL(proId) || isNULL(proClass) ||
        isNULL(teacher) || isNULL(proTime)) {
        alert("还有内容未填写，请填写完整！");
      } else if (!isValidSid(stuId)) {
        alert("学号格式或长度错误，请检查！");
      } else if (!money.match(/^([1-9][0-9]*)$/)) {
        alert("资助金额输入错误！");
      } else if (!isValidTime(proTime)) {
        alert("立项时间格式错误！");
      } else {
        var data = JSON.stringify({
          "table": "techProject",
          "name": stuName,
          "sid": stuId,
          "proName": proName,
          "employer": employer,
          "money": money,
          "proId": proId,
          "class": proClass,
          "teacher": teacher,
          "proTime": proTime
        });
        console.log(data);
        $.ajax({
          type: "POST",
          url: "/students/insert/techProject",
          contentType: "application/json; charset=utf-8",
          data: data,
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
        });
      }
    },
    isNULL: function(data) {
      if (data.length == 0)
        return true;
      else return false;
    },
    isValidSid: function(data) {
      if (data.match(/^([0-9]*)$/) && data.length == 8)
        return true;
      return false;
    },
    isValidTime: function(data) {
      var reg = /[1-2]\d{3}-[0-1]?[0-9]-[0-3]?[0-9]/;
      if (reg.test(data))
        return true;
      else return false;
    }
  }
}
</script>
