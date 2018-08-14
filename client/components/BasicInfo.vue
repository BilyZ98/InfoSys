<template>
<div class="container-card-basicInfo">
	<div>
		<div v-for="tab in table">
			<label>{{tab.name}}</label>
			<p v-for="record in tab.records">{{record.name}}</p>
		</div>
	</div>
</div>
</template>

<script>
import tableData from './tableData.js'

export default {
	data: function(){
		return {
			table: tableData
		}
	},
	mounted: function(){
		console.log(tableData['basicInfo']['records']['birthPlace']['name'])
	}
}
</script>

<style>
.container-card-basicInfo {
  margin: 30px;
  text-align: left;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2%;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px #888888;
}
</style>