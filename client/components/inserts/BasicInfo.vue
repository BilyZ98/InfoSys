<template>
<div id="container-insert-basicInfo">
  <h3 class="text-center">基本信息插入</h3>
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
          <label>性别：</label>
          <select class="form-control" id="gender">
            <option>男</option>
            <option>女</option>
          </select>
        </div>
        <div>
          <label>籍贯：</label>
          <select class="form-control" id="birthPlace">
            <option>安徽</option>
            <option>澳门</option>
            <option>北京</option>
            <option>重庆</option>
            <option>福建</option>
            <option>甘肃</option>
            <option>广东</option>
            <option>广西</option>
            <option>贵州</option>
            <option>海南</option>
            <option>河北</option>
            <option>河南</option>
            <option>黑龙江</option>
            <option>湖北</option>
            <option>湖南</option>
            <option>吉林</option>
            <option>江苏</option>
            <option>江西</option>
            <option>辽宁</option>
            <option>内蒙古</option>
            <option>宁夏</option>
            <option>青海</option>
            <option>山东</option>
            <option>山西</option>
            <option>陕西</option>
            <option>上海</option>
            <option>四川</option>
            <option>台湾</option>
            <option>天津</option>
            <option>西藏</option>
            <option>香港</option>
            <option>新疆</option>
            <option>云南</option>
            <option>浙江</option>
          </select>
        </div>
        <div>
          <label>民族：</label>
          <select class="form-control" id="ethnic">
            <option>阿昌族</option>
            <option>白族</option>
            <option>保安族</option>
            <option>布朗族</option>
            <option>布依族</option>
            <option>藏族</option>
            <option>朝鲜族</option>
            <option>达斡尔族</option>
            <option>傣族</option>
            <option>德昂族</option>
            <option>东乡族</option>
            <option>侗族</option>
            <option>独龙族</option>
            <option>俄罗斯族</option>
            <option>鄂伦春族</option>
            <option>鄂温克族</option>
            <option>高山族</option>
            <option>哈尼族</option>
            <option>哈萨克族</option>
            <option>汉族</option>
            <option>赫哲族</option>
            <option>回族</option>
            <option>基诺族</option>
            <option>京族</option>
            <option>景颇族</option>
            <option>柯尔克孜族</option>
            <option>拉祜族</option>
            <option>黎族</option>
            <option>傈僳族</option>
            <option>满族</option>
            <option>毛南族</option>
            <option>门巴族</option>
            <option>蒙古族</option>
            <option>苗族</option>
            <option>纳西族</option>
            <option>怒族</option>
            <option>普米族</option>
            <option>羌族</option>
            <option>撒拉族</option>
            <option>水族</option>
            <option>塔吉克族</option>
            <option>塔塔尔族</option>
            <option>土家族</option>
            <option>土族</option>
            <option>维吾尔族</option>
            <option>乌兹别克族</option>
            <option>锡伯族</option>
            <option>瑶族</option>
            <option>彝族</option>
            <option>裕固族</option>
            <option>壮族</option>
            <option>仡佬族</option>
            <option>仫佬族</option>
            <option>佤族</option>
            <option>珞巴族</option>
            <option>畲族</option>
          </select>
        </div>
        <div>
          <label>政治面貌：</label>
          <select class="form-control" id="poliFace">
            <option>群众</option>
            <option>团员</option>
            <option>党员</option>
          </select>
        </div>
        <div>
          <label>身份证号：</label>
          <input type="text" class="form-control" id="idNum">
        </div>
        <div>
          <label>联系电话：</label>
          <input type="text" class="form-control" id="tel">
        </div>
        <div>
          <label>邮箱：</label>
          <input type="text" class="form-control" id="mail">
        </div>
        <div>
          <label>微信：</label>
          <input type="text" class="form-control" id="wechat">
        </div>
        <div>
          <label>QQ：</label>
          <input type="text" class="form-control" id="qq">
        </div>
        <div>
          <label>培养层次：</label>
          <select class="form-control" id="degree">
            <option>本科</option>
            <option>硕士</option>
            <option>博士</option>
          </select>
        </div>
        <div>
          <label>学生类别：</label>
          <select class="form-control" id="stuGroup">
            <option>统招</option>
            <option>港澳台</option>
            <option>国际学生</option>
          </select>
        </div>
        <div>
          <label>年级：</label>
          <select class="form-control" id="grade">
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
          </select>
        </div>
        <div>
          <label>专业：</label>
          <input type="text" class="form-control" id="major">
        </div>
        <div>
          <label>行政班别：</label>
          <select class="form-control" id="class">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
          </select>
        </div>
        <div>
          <label>宿舍楼栋：</label>
          <select class="form-control" id="dorm">
            <option>至善园</option>
            <option>明德园</option>
            <option>慎思园</option>
            <option>格致园</option>
          </select>
          <select class="form-control" id="dorm-number">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
          </select>
          <label>号</label>
        </div>
        <div>
          <label>宿舍房号：</label>
          <input type="text" class="form-control" id="dormRoom">
        </div>
        <div>
          <label>特长：</label>
          <input type="text" class="form-control" id="speciality">
        </div>
        <div>
          <label>毕业中学：</label>
          <input type="text" class="form-control" id="highSchool">
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
  data: function() {
    return {}
  },
  methods: {
    insertClick: function() {
    	var SID = /^[1-9][\d]{7}$/;
			var TEL = /^[1-9][\d]{10}$/;
			var EMAIL = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
			var IDNUM = /^[\d]{17}[0-9x]$/;
			var QQ = /^[\d]{5,11}$/;
			var ROOM = /^[\d]{3}$/;
			//data objects
      var mes1 = "";
      var flag = true;
      var sid = $('#sid').val();
      var name = $('#name').val();
      var gender = $('#gender').val();
      var birthPlace = $('#birthPlace').val();
      var ethnic = $('#ethnic').val();
      var poliFace = $('#poliFace').val();
      var idNum = $('#idNum').val();
      var birthDate = idNum.slice(6, 10) + '-' + idNum.slice(10, 12) + '-' + idNum.slice(12, 14);
      var tel = $('#tel').val();
      var mail = $('#mail').val();
      var wechat = $('#wechat').val();
      var qq = $('#qq').val();
      var degree = $('#degree').val();
      var stuGroup = $('#stuGroup').val();
      var grade = $('#grade').val();
      var major = $('#major').val();
      var classs = $('#class').val();
      var dorm = $('#dorm').val() + $('#dorm-number').val() + '号';
      var dormRoom = $('#dormRoom').val();
      var speciality = $('#speciality').val();
      var highSchool = $('#highSchool').val();

      if (!SID.test(sid)) {
        mes1 += "学号有误\n";
        flag = false;
      }
      if (name.length == 0) {
        mes1 += "姓名字段不能为空\n";
        flag = false;
      }
      if (wechat.length == 0) {
        mes1 += "微信字段不能为空\n";
        flag = false;
      }
      if (major.length == 0) {
        mes1 += "专业字段不能为空\n";
        flag = false;
      }
      if (speciality.length == 0) {
        mes1 += "特长字段不能为空，可填无\n";
        flag = false;
      }
      if (highSchool.length == 0) {
        mes1 += "毕业学校字段不能为空\n";
        flag = false;
      }
      if (!IDNUM.test(idNum)) {
        mes1 += "身份证号填写有误\n";
        flag = false;
      }
      if (!TEL.test(tel)) {
        mes1 += "电话有误\n";
        flag = false;
      }
      if (!EMAIL.test(mail)) {
        mes1 += "邮箱格式有误\n";
        flag = false;
      }
      if (!QQ.test(qq)) {
        mes1 += "qq格式错误\n";
        flag = false;
      }
      if (!ROOM.test(dormRoom)) {
        mes1 += "房间号该格式错误\n";
        flag = false;
      }
      if (flag == false) {
        alert(mes1);
        return;
      } else //如果没有错误的话，就生成json并发送
      {
        var data = JSON.stringify({
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
        console.log(data);
        $.ajax({
          type: "POST",
          url: "/students/insert/basicInfo",
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
    }
  }
}
</script>
