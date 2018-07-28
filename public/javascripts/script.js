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


  /*
  var app = new Vue({
    el: '#homeButton',
    methods: {
      greet: function() {
        $.get('/myprecius', function(result) {
          console.log(result);
          $('#infoWrapper').empty();
          $('#infoWrapper').append(result);
        });
      }
    }
  });


  //da wei's js function
  function loadXMLDoc() {
        var xmlhttp;
        if (window.XMLHttpRequest) {
          xmlhttp=new XMLHttpRequest();
        }
        else {
          xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange=function() {
        if (xmlhttp.readyState==4 && xmlhttp.status==200) {
            document.write("return");
        }
        else {
          console.log("sending!");
        }
      }
      xmlhttp.open("POST","demo_post2.php",true);
      xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
      xmlhttp.send(JSON.stringify(GetJsonData()));
    }
    function GetJsonData() {
          var json = {
            "searchId": document.getElementById("studentID").value
          };
          // console.log(json);
          return json;
      }
  */
});