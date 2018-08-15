<template>
<div id="container-insert-scholarship">
	<p>获得奖学金情况</p>
  姓名:
  <input type="text" name="name" id="name" placeholder="姓名">
  <br/> 学号:
  <input type="text" name="sid" id="sid" placeholder="学号">
  <br/> 学年:
  <select id="year">
    <option>2012</option>
    <option>2013</option>
    <option>2014</option>
    <option>2015</option>
    <option>2016</option>
    <option>2017</option>
    <option>2018</option>
  </select>
  <br/> 奖学金类别:
  <select id="shipClass">
    <option>校内</option>
    <option>政府</option>
    <option>捐赠</option>
  </select>
  <br/> 奖学金名称:
  <input type="text" name="shipName" id="shipName" placeholder="奖学金名称">
  <br/> 奖励金额:
  <input type="text" name="shipAmount" id="shipAmount" placeholder="奖励金额">
  <br/>
  <button type="button" @click="insertClick">添加信息</button>
</div>
</template>

<script>
export default {
  data: function() {
    return {}
  },
  methods: {
    insertClick: function() {
    	var data = JSON.stringify({
          'table': 'carde',
          'name': $('#name').val(),
          'sid': $('#sid').val(),
          'year': $('#year').val(),
          'shipClass': $('#shipClass').val(),
          'shipName': $('#shipName').val(),
          'shipAmount': $('#shipAmount').val()
        })
    	console.log(data);
      $.ajax({
        type: "POST",
        url: "/students/insert/scholarship",
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
</script>

<style>
#container-insert-scholarship input, select, button{
	margin-top: 10px;
}
</style>