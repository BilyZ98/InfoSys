<template>
<div>
  <h3 class="text-center">家庭信息插入</h3>
  <div class="container">
    <div class="col-md-6">
      <form class="form-horizontal">
        <div class="form-group">
          <label for="sid" class="col-md-2 control-label innerCol">学号：</label>
          <input type="text" class="form-control" id="sid">
        </div>
        <div class="form-group innerCol">
          <label for="name" class="col-md-2 control-label innerCol">姓名：</label>
          <input type="text" class="form-control" id="name">
        </div>
        <div>
          <label>家庭地址：</label>
          <input type="text" class="form-control" id="homeAddress">
        </div>
        <div>
          <label>父亲姓名：</label>
          <input type="text" class="form-control" id="fatherName">
        </div>
        <div>
          <label>父亲电话：</label>
          <input type="text" class="form-control" id="fatherTel">
        </div>
        <div>
          <label>父亲工作单位及职务：</label>
          <input type="text" class="form-control" id="fatherJob">
        </div>
        <div>
          <label>母亲姓名：</label>
          <input type="text" class="form-control" id="motherName">
        </div>
        <div>
          <label>母亲电话：</label>
          <input type="text" class="form-control" id="motherTel">
        </div>
        <div>
          <label>母亲工作单位及职务：</label>
          <input type="text" class="form-control" id="motherJob">
        </div>
        <div>
          <label>家庭人均月收入：</label>
          <input type="text" class="form-control" id="familyAveIncome">
        </div>
        <!--div>
            <label>是否家庭经济困难：</label>
            <select class="form-control" id="isHard">
              <option>是</option>
              <option>否</option>
            </select>
          </div-->
        <!--div>
            <label>困难等级：</label>
            <select class="form-control" id="hardDegree">
              <option>特别困难</option>
              <option>困难</option>
              <option>一般困难</option>
              <option>不困难</option>
            </select>
          </div-->
        <div>
          <label>家庭经济状况简述：</label>
          <input type="text" class="form-control" id="hardFamDes">
        </div>
        <button type="button" class="btn btn-primary" id="btnSend" @click="insertClick">提交</button>
      </form>
    </div>
    <!--div class="col-md-6">
        <div>其他查询条件</div>
        <div class="col-dm-4 col-dm-offset-1 innerCol">
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked> 男
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 女
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 其他
          </label>
        </div>
        <div class="col-md-5 col-dm-offset-1 innerCol">
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1"> test1
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox2" value="option2"> test2
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox3" value="option3"> test3
          </label>
        </div>
      </div>
      <div class="col-md-1 col-md-offset-11">
        <button type="button" class="btn btn-primary" id="btnSend">提交</button>
      </div>

    </div-->
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    insertClick: function() {
      var SID = /^[1-9][\d]{7}$/;
      var TEL = /^[1-9][\d]{10}$/;
      var INCOME = /^[\d]{1,8}$/;
      var mes1 = "";
      var flag = true;

      var sid = $('#sid').val();
      var name = $('#name').val();
      var homeAddress = $('#homeAddress').val();
      var fatherName = $('#fatherName').val();
      var fatherTel = $('#fatherTel').val();
      var fatherJob = $('#fatherJob').val();
      var motherName = $('#motherName').val();
      var motherTel = $('#motherTel').val();
      var motherJob = $('#motherJob').val();
      var familyAveIncome = $('#familyAveIncome').val();
      var hardFamDes = $('#hardFamDes').val();

      if (!SID.test(sid)) {
        mes1 += "学号有误\n";
        flag = false;
      }
      if (homeAddress.length == 0) {
        mes1 += "家庭住址字段不能为空\n";
        flag = false;
      }
      if (fatherName.length == 0) {
        mes1 += "父亲姓名字段不能为空\n";
        flag = false;
      }
      if (!TEL.test(fatherTel)) {
        mes1 += "父亲电话有误\n";
        flag = false;
      }
      if (fatherJob.length == 0) {
        mes1 += "父亲职务字段不能为空\n";
        flag = false;
      }
      if (motherName.length == 0) {
        mes1 += "母亲姓名字段不能为空\n";
        flag = false;
      }
      if (!TEL.test(motherTel)) {
        mes1 += "母亲电话有误\n";
        flag = false;
      }
      if (motherJob.length == 0) {
        mes1 += "母亲职务字段不能为空\n";
        flag = false;
      }
      if (!INCOME.test(familyAveIncome)) {
        mes1 += "家庭人均收入填写有误\n";
        flag = false;
      }
      if (hardFamDes.length == 0) {
        mes1 += "家庭状况字段不能为空\n";
        flag = false;
      }
      if (flag == false) {
        alert(mes1);
        return;
      } else //如果没有错误的话，就生成json并发送
      {
        var data = JSON.stringify({
          'table': 'family',
          'sid': sid,
          'name': name,
          'homeAddress': homeAddress,
          'fatherName': fatherName,
          'fatherTel': fatherTel,
          'fatherJob': fatherJob,
          'motherName': motherName,
          'motherTel': motherTel,
          'motherJob': motherJob,
          'familyAveIncome': familyAveIncome,
          'isHard': '否',
          'hardDegree': '不困难',
          'hardFamDes': hardFamDes
        }); //由于是否经济苦难和苦难等级是由老师填写，所以学生在前端无法填写，且出入的时候默认不困难，然后再让老师修改苦难等级什么的
        console.log(data);
        //上面是验证并生成json数据，下面是发送数据。暂时注释
        $.ajax({
          type: "POST",
          url: "/students/insert/techProject",
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
    }
  }
}
</script>