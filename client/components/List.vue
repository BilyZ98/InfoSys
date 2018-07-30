<template>
<ul id="list-student">
  <li v-for="student in students">{{ student.name }}---{{student.sid}}</li>
</ul>
</template>

<script>
export default {
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      students:[{name: "zhangsan", sid:123456}]
    }
  }
}
</script>

<style>
#list-student {
  padding-top: 10%;
  padding-left: 30%;
  font-size: 20px;
  text-align: left;
}
</style>
