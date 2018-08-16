<template>
<div id="container-home">
  <div class="container-card">
    <label>待办事项：37</label>
  </div>
  <div class="container-card">
    <label>公告：10</label>
  </div>
  <div class="container-card">
    <label>其他</label>
  </div>
</div>
</template>

<script>
</script>

<style>
#container-home .container-card {
  float: left;
  margin: 20px;
  margin-right: 0;
  height: 500px;
  width: 400px;
  text-align: left;
  padding-top: 2%;
  padding-left: 2%;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px var(--grey-shadow);
}
</style>
