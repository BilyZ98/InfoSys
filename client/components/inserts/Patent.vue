<template>
<div id="container-insert-patent">
    <h3 class="text-center">获得专利情况</h3>
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
              <label for="patentName" class="col-md-2 control-label" style="text-align: left;">专利名称：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="patentName">
              </div>
            </div>
            <div class="form-group">
              <label for="creators" class="col-md-2 control-label" style="text-align: left;">发明人：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="creators">
              </div>
            </div>
            <div class="form-group">
              <label for="unit" class="col-md-2 control-label" style="text-align: left;">申请单位：</label>
              <div class="col-md-12">
                <input type="text" class="form-control" id="unit">
              </div>
            </div>
          </form>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="class">类别：</label>
              <select class="form-control" id="class">
                <option>发明</option>
                <option>实用新型</option>
              </select>
            </div>
            <div class="form-group">
              <label for="patentRange">专利范围：</label>
              <select class="form-control" id="patentRange">
                <option>国内</option>
                <option>国际</option>
              </select>
            </div>
          </form>
          <br>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="submitTime">申请时间：</label>
              <input type="text" id="submitTime" class="form-control" placeholder="如：2000-01-01">
            </div>
            <div class="form-group">
              <label for="approvalTime">授权时间：</label>
              <input type="text" id="approvalTime" class="form-control" placeholder="如：2000-01-01">
            </div>
          </form>
          <br>
          <form class="form-inline">
            <div class="form-group col-md-6">
              <label for="patentNumber">申请编号：</label>
              <input type="text" id="patentNumber" class="form-control">
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
      var name = $("#name").val();
      var sid = $("#sid").val();
      var patentName = $("#patentName").val();
      var pClass = $("#class").val();
      var submitTime = $("#submitTime").val();
      var approvalTime = $("#approvalTime").val();
      var patentRange = $("#patentRange").val();
      var unit = $("#unit").val();
      var patentNumber = $("#patentNumber").val();
      var creators = $("#creators").val();

      var isNULL = this.isNULL;
      var isValidSid = this.isValidSid;
      var isValidTime = this.isValidTime;
      if (isNULL(name) || isNULL(sid) || isNULL(patentName) || isNULL(submitTime) || isNULL(approvalTime) || isNULL(unit) ||
        isNULL(patentNumber) || isNULL(creators)) {
        alert("还有内容未填写，请填写完整！");
      } else if (!isValidSid(sid)) {
        alert("学号格式或长度错误，请检查！");
      } else if (!isValidTime(submitTime)) {
        alert("申请时间输入错误！");
      } else if (!isValidTime(approvalTime)) {
        alert("授权时间格式错误！");
      } else {
        var data = JSON.stringify({
          "table": "patent",
          "name": name,
          "sid": sid,
          "patentName": patentName,
          "class": pClass,
          "submitTime": submitTime,
          "approvalTime": approvalTime,
          "patentRange": patentRange,
          "unit": unit,
          "patentNumber": patentNumber,
          "creators": creators
        });
        console.log(data);
        $.ajax({
          type: "POST",
          url: "/students/insert/patent",
          contentType: "application/json; charset=utf-8",
          data: data,
          dataType: "json",
          //timeous 5s
          timeout: 5000,
          success: function(data, xhr) {
            console.log(xhr.status);
            console.log(data);
            alert('插入成功！');
          },
          error: function(data) {
            console.log(data.status);
            alert(data.responseJSON.err);
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
