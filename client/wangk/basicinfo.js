var SID = /^[1-9][\d]{7}$/;
var TEL = /^[1-9][\d]{10}$/;
var EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
var IDNUM = /^[\d]{17}[0-9x]$/;
var QQ = /^[\d]{5,11}$/;
var ROOM = /^[\d]{3}$/;

$(document).ready(function() {


  //click query button then post the query and handle the callback
  $('#btnSend').click(function() {
    var mes1 = "";
    var flag = true;
    

    
    var sid = $('#sid').val();
    var name = $('#name').val();
    var gender = $('#gender').val();
    var birthPlace = $('#birthPlace').val();
    var ethnic = $('#ethnic').val();
    var poliFace = $('#poliFace').val();
    var idNum = $('#idNum').val();
    var birthDate = idNum.slice(6,10)+'-'+idNum.slice(10,12)+'-'+idNum.slice(12,14);
    var tel = $('#tel').val();
    var mail = $('#mail').val();
    var wechat = $('#wechat').val();
    var qq = $('#qq').val();
    var degree = $('#degree').val();
    var stuGroup = $('#stuGroup').val();
    var grade = $('#grade').val();
    var major = $('#major').val();
    var classs = $('#class').val();
    var dorm = $('#dorm').val()+$('#dorm-number').val()+'号';
    var dormRoom = $('#dormRoom').val();
    var speciality = $('#speciality').val();
    var highSchool = $('#highSchool').val();

    if(!SID.test(sid))
    {
      mes1+="学号有误\n";
      flag = false;
    }
    if(name.length==0)
    {
      mes1+="姓名字段不能为空\n";
      flag = false;
    }
    if(wechat.length==0)
    {
      mes1+="微信字段不能为空\n";
      flag = false;
    }
    if(major.length==0)
    {
      mes1+="专业字段不能为空\n";
      flag = false;
    }
    if(speciality.length==0)
    {
      mes1+="特长字段不能为空，可填无\n";
      flag = false;
    }
    if(highSchool.length==0)
    {
      mes1+="毕业学校字段不能为空\n";
      flag = false;
    }
    if(!IDNUM.test(idNum))
    {
      mes1+="身份证号填写有误\n";
      flag = false;
    }
    if(!TEL.test(tel))
    {
      mes1+="电话有误\n";
      flag = false;
    }
    if(!EMAIL.test(mail))
    {
      mes1+="邮箱格式有误\n";
      flag = false;
    }
    if(!QQ.test(qq))
    {
      mes1+="qq格式错误\n";
      flag = false;
    }
    if(!ROOM.test(dormRoom))
    {
      mes1+="房间号该格式错误\n";
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
        'table': 'basicInfo',
        'sid': sid,
        'name': name,
        'gender': gender,
        'birthPlace': birthPlace,
        'ethnic': ethnic,
        'poliFace': poliFace,
        'idNum': idNum,
        'birthDate': birthDate,
        'tel': tel,
        'mail': mail,
        'wechat': wechat,
        'qq': qq,
        'degree': degree,
        'stuGroup': stuGroup,
        'grade': grade,
        'major': major,
        'class': classs,
        'dorm': dorm,
        'dormRoom': dormRoom,
        'speciality': speciality,
        'highSchool': highSchool
      });
     
      //上面是验证并生成json数据，下面是发送数据。暂时注释
      /*
      $.ajax({
        type: 'POST',
        url: '/basicinfo',
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
