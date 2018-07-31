<template>
<div>
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
//获奖学金情况scholarship：姓名name、学号sid、学年year、奖学金类别（校内、政府、捐赠）shipClass、奖学金名称shipName、奖励金额shipAmount；
export default {
  data () {
    return {}
  },
  methods: {
    insertClick () {
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
    	/*
      $.ajax({
        type: 'POST',
        url: '/students/insert/scholarship',
        data: data
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(data) {
          console.log(data);
        }
      })
      */
    }
  }
}
</script>

<style>
input, select, button{
	margin-top: 10px;
}
</style>