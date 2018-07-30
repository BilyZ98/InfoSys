<template>
<ul id="list-student">
  <li v-for="student in students">{{ student.name }}---{{student.sid}}</li>
</ul>
</template>

<script>
export default {
  data() {
    return {
      students: []
    }
  },
  created() {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData() {
      //为了把this传进ajax
      var _self = this;
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/users/query',
        data: JSON.stringify({
          //数据丢失问题，要用vue-router路由之间传参数的办法
          'sid': $('#studentID').val()
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        success: function(data) {
          console.log(data);
          _self.students = [{name:'zhangsan', sid:'123'}];
        }
      })
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
