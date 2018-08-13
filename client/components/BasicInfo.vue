<template>
<div>
	<div>
		<div v-for="record in table.records">{{record.name}}</div>
	</div>
</div>
</template>

<script>
import tableDataTest from './tableDataTest.js'
import tableData from './tableData.js'

export default {
	data: function(){
		return {
			table: tableDataTest['basicInfo']
		}
	},
	mounted: function(){
		console.log(tableDataTest['basicInfo']['records']['birthPlace']['name'])
	}
}
</script>