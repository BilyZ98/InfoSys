<template>
	<div>
		<router-link to="/insert/basicInfo">基本信息basicInfo</router-link><br/>
		<router-link to="/insert/family">家庭情况family</router-link><br/>
		<router-link to="/insert/paper">发表论文情况paper</router-link><br/>
		<router-link to="/insert/patent">获得专利情况patent</router-link><br/>
		<router-link to="/insert/techProject">科研项目情况techProject</router-link><br/>
		<router-link to="/insert/course">课程成绩记录course</router-link><br/>
		<router-link to="/insert/cadre">学生干部任职情况cadre</router-link><br/>
		<router-link to="/insert/scholarship">获奖学金情况scholarship</router-link><br/>
		<hr>
		<div id="container-insert">
			<router-view></router-view>
		</div>
	</div>
</template>

<style>
#container-insert {
	text-align: left;
	padding-left: 40%;
	padding-top: 10px;
}
</style>