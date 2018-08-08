<template>
	<div>
		<div id="container-insert-router">
			<router-link to="/insert/basicInfo">基本信息basicInfo</router-link><br/>
			<router-link to="/insert/family">家庭情况family</router-link><br/>
			<router-link to="/insert/paper">发表论文情况paper</router-link><br/>
			<router-link to="/insert/patent">获得专利情况patent</router-link><br/>
			<router-link to="/insert/techProject">科研项目情况techProject</router-link><br/>
			<!--<router-link to="/insert/course">课程成绩记录course</router-link><br/>-->
			<router-link to="/insert/cadre">学生干部任职情况cadre</router-link><br/>
			<!--<router-link to="/insert/scholarship">获奖学金情况scholarship</router-link><br/>-->
		</div>
		<div id="container-insert-main">
			<router-view></router-view>
		</div>
	</div>
</template>

<style>
#container-insert-router {
  margin: 2%;
  text-align: left;
  padding: 2%;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px #888888;
}

#container-insert-main {
	margin: 2%;
  text-align: left;
  padding: 2%;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px #888888;
}
</style>