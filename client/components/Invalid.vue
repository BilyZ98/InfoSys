<template>
  <div id="container-invaild">
    <div>404</div>
    <div>页面不存在</div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {}
  },
  mounted: function() {
    $(".app-bar-display").attr("class", "app-bar-hide")
    $(".container-info-display").attr("class", "container-info-all")
  },
  beforeDestroy: function() {
    $(".app-bar-hide").attr("class", "app-bar-display")
    $(".container-info-all").attr("class", "container-info-display")
  },
}
</script>
<style>
#container-invaild {
  font-size: 40px;
  font-color: blue;
  text-align: center;
  background-color: white;
}
</style>