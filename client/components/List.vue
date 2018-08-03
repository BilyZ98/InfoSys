<template>
<ul class="list-student">
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
    console.log(this.$route.params.postData)
    this.fetchData(this.$route.params.postData)
  },
  methods: {
    fetchData(dataJson) {
      //为了把this传进ajax
      var _self = this;
      // replace getPost with your data fetching util / API wrapper
      $.ajax({
        type: 'POST',
        url: '/students/query',
        data: dataJson,
        contentType: 'application/json;charset=utf-8',
        dataType: 'json',
        timeout: 5000,
        success: function(data, xhr) {
          //_self.students = [{name:'zhangsan', sid:'123'}];
          console.log(xhr.status);
          console.log(data);
        },
        error: function(data) {
          console.log(data.status);
          alert(data.responseJSON.err);
        }
      })
    }
  }
}
</script>

<style>
.list-student {
  font-size: 20px;
  text-align: center;
  padding: 0;
}
</style>
