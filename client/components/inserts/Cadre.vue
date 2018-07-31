<template>
<div>
	<p>学生干部任职情况</p>
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
  <br/> 职务类别:
  <select id="cadreClass">
    <option>学生会</option>
    <option>团委</option>
    <option>研究生会</option>
    <option>学生学术发展中心</option>
    <option>职发办</option>
    <option>社团</option>
    <option>院队</option>
    <option>班干部</option>
  </select>
  <br/> 职务名称:
  <input type="text" name="cadreName" id="cadreName" placeholder="职务名称">
  <br/> 职务级别:
  <select id="cadreJiBie">
    <option>校级</option>
    <option>校区级</option>
    <option>院级</option>
  </select>
  <br/>
  <button type="button" @click="insertClick">添加信息</button>
</div>
</template>

<script>
//姓名name、学号sid、学年year、职务类别（学生会、团委、研究生会、学生学术发展中心、职发办、社团、院队、班干部）cadreClass、职务名称cadreName、职务级别（校级、校区级、院级）cadreJiBie
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
          'cadreClass': $('#cadreClass').val(),
          'cadreName': $('#cadreName').val(),
          'cadreJiBie': $('#cadreJiBie').val()
        })
    	console.log(data);
    	/*
      $.ajax({
        type: 'POST',
        url: '/students/insert/cadre',
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