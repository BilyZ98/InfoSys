<template>
<div>
  <header>
    <div id="button-home">HOME</div>
    <p>SDCS学生信息系统</p>
  </header>
  <aside>
    <div class="info-side">some info here</div>
    <div class="button-side">button1</div>
    <div class="button-side">button2</div>
    <div class="button-side">button3</div>
  </aside>
  <router-view> </router-view>
</div>
</template>

<script>
  console.log("123");
  /*
var students = [];

$(document).ready(function() {
  //click query button then post the query and handle the callback
  $('#btnSend').click(function() {
    $.ajax({
      type: 'GET',
      url: '/list',
      success: function(data) {
        console.log(data);
        $('#container-info').empty();
        $('#container-info').append(data);
        $.ajax({
          type: 'POST',
          url: '/users/query',
          data: JSON.stringify({
            'sid': $('#studentID').val()
          }),
          contentType: 'application/json;charset=utf-8',
          dataType: 'json',
          success: function(data) {
            console.log(data);
            var app = new Vue({
              el: "#list-student",
              data: {
                students: students
              }
            });
            app.students = data.students;
          }
        });
      }
    });
  });
  */
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  width: 100%;
  height: 100%;
}

header {
  position: fixed;
  width: 100%;
  height: 60px;
  background-color: rgb(150, 150, 150);
  text-align: center;
  color: white;
}

#button-home {
  position: fixed;
  height: 100%;
  width: 15%;
  background-color: rgb(150, 150, 150);
  padding-top: 20px;
}

#button-home:hover {
  background-color: rgb(10, 10, 10);
}

header p {
  padding-top: 15px;
  font-size: 1.3em;
  font-weight: lighter;
}

aside {
  position: fixed;
  height: 100%;
  width: 15%;
  top: 60px;
  background-color: rgb(50, 50, 50);
  color: white;
}

.info-side {
  height: 100px;
  text-align: center;
  /*make text in div vertical-align to center*/
  line-height: 100px;
  margin: auto;
}

.button-side {
  float: left;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: auto;
  border-top: 1px solid black;
}

.button-side:hover {
  background-color: rgb(120, 120, 120);
}
</style>
