<template>
	<div id="container-invaild">
		<header class="app-bar-display">
    <div class="button-home" @click="homeClick">SDCS学生信息系统</div>
  	</header>
		<div>404</div>
		<div>页面不存在</div>
	</div>
</template>

<script>
export default {
	data: function(){
		return {
			sid: null,
			tables: tableData,
			student: {},
			//backup用于更新数据后判断哪些被更新了
			studentBackup: {}
		}
	},
	mounted: function(){
	  $(".app-bar-display").attr("class", "app-bar-hide")
	  $(".container-info-display").attr("class", "container-info-all")
	}
}
</script>

<style>
#container-invaild {
	font-size: 40px;
	font-color: blue;
	text-align: center;
}
</style>