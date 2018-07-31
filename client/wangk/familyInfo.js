var SID = /^[1-9][\d]{7}$/;
var TEL = /^[1-9][\d]{10}$/;
var INCOME = /^[\d]{1,8}$/;

$(document).ready(function() {


  //click query button then post the query and handle the callback
  $('#btnSend').click(function() {
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

    if(!SID.test(sid))
    {
      mes1+="学号有误\n";
      flag = false;
    }
    if(homeAddress.length==0)
    {
      mes1+="家庭住址字段不能为空\n";
      flag = false;
    }
    if(fatherName.length==0)
    {
      mes1+="父亲姓名字段不能为空\n";
      flag = false;
    }
    if(!TEL.test(fatherTel))
    {
      mes1+="父亲电话有误\n";
      flag = false;
    }
    if(fatherJob.length==0)
    {
      mes1+="父亲职务字段不能为空\n";
      flag = false;
    }
    if(motherName.length==0)
    {
      mes1+="母亲姓名字段不能为空\n";
      flag = false;
    }
    if(!TEL.test(motherTel))
    {
      mes1+="母亲电话有误\n";
      flag = false;
    }
    if(motherJob.length==0)
    {
      mes1+="母亲职务字段不能为空\n";
      flag = false;
    }
    if(!INCOME.test(familyAveIncome))
    {
      mes1+="家庭人均收入填写有误\n";
      flag = false;
    }
    if(hardFamDes.length==0)
    {
      mes1+="家庭状况字段不能为空\n";
      flag = false;
    }
    
    if(flag==false)
    {
      alert(mes1);
      return;
    }
    else//如果没有错误的话，就生成json并发送
    {
      var alldata = JSON.stringify({
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
      });//由于是否经济苦难和苦难等级是由老师填写，所以学生在前端无法填写，且出入的时候默认不困难，然后再让老师修改苦难等级什么的
      alert(alldata);
      //上面是验证并生成json数据，下面是发送数据。暂时注释
      /*
      $.ajax({
        type: 'POST',
        url: '/familyInfo',
        data: alldata,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(data) {
          //这里填写插入成功还是插入失败
          //需要与后端确定data的格式，通过data得知具体是否插入成功

        }
      });*/
    }
  });


  
});
