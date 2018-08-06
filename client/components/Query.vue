<template>
  <div class="query-container">

    <h3 class="text-center">查询条件</h3>

    <div v-for="table in tables" v-if="table.id!='family'">
      <h4 v-bind:id="table.id" @click="headClick">{{table.name}}</h4>
      <div class="table-container hide-container" v-bind:id="'table-'+table.id">
        <div v-for="record in table.records" v-if="(table.id!='basicInfo'&&record.id!='sid'&&record.id!='name')||(table.id=='basicInfo')">
          <h5 v-bind:record-id="table.id+'-'+record.id" @click="headClick">{{record.name}}</h5>
          <input type="text" class="hide-container" v-if="!record.isSelect" v-bind:id="table.id+'-'+record.id" v-model="record.value">
          <select class="hide-container" v-if="record.isSelect" v-bind:id="table.id+'-'+record.id" v-model="record.value">
            <option></option>
            <option v-for="option in record.options">{{option}}</option>
          </select>
        </div>
      </div>
    </div>
    <hr>

    <!--结果选择部分-->
    <h3 class="text-center">选择查询结果显示的字段</h3>

    <div class="record-container" v-for="table in tables">
      <h4 v-bind:id="table.id" @click="recordClick">{{table.name}}</h4>
      <div class="table-container hide-container" v-bind:id="'record-'+table.id" v-bind:table-id="table.id" v-bind:table-name="table.name">
        <div v-for="record in table.records">
          <h5 class="record-original" v-if="(table.id!='basicInfo'&&record.id!='sid'&&record.id!='name')||(table.id=='basicInfo')" v-bind:record-id="record.id" v-bind:record-name="record.name" @click="recordClick">{{record.name}}</h5>
        </div>
      </div>
    </div>
    <hr>

    <button type="button" @click="queryClick">查询</button>
  </div>
</template>

<script>
import tableData from './tableData.js'
var empty = JSON.stringify({})

export default {
  data() {
    return {
      tables: tableData
    }
  },
  methods: {
    //event是原生dom事件
    //这个函数实现了点击head标签会让紧跟的div实现toggle效果, 要求所操控的div必须有id
    headClick: function(event) {
      //console.log($('#' + event.currentTarget.nextElementSibling.id).val() == '')
      //console.log(event.currentTarget.__proto__);
      if (event.currentTarget.nodeName == 'H4') {
        var id = event.currentTarget.id
        //basicInfo表的sid和name要特殊验证
        if (id == 'basicInfo') {
          if (JSON.stringify(this.querybasicInfo()) == empty && !($('#basicInfo-sid').val() || $('#basicInfo-name').val())) {
            $('#' + event.currentTarget.nextElementSibling.id).toggle()
          }
        } else {
          //通用验证方法是，使用queryxxx函数判断内容是否为空，否则不能关闭标签
          //这个方法不科学，因为以后加入格式验证后再调用会触发判断提示
          var obj = eval('this.query' + id + '()')
          if (JSON.stringify(obj) == empty) {
            $('#' + event.currentTarget.nextElementSibling.id).toggle()
          }
        }
      }
      //表格内字段标题,'record-id'属性用来传递动态组件的id
      else if ($('#' + event.currentTarget.getAttribute('record-id')).val() == '') {
        //只有没有填写内容的时候可以关闭
        $('#' + event.currentTarget.getAttribute('record-id')).toggle()
      }
      this.querybasicInfo()
    },
    queryClick: function() {
      //验证和生成json
      var data = {}
      //有sid/name就不包含其他信息了
      if ($('#basicInfo-sid').val() || $('#basicInfo-name').val()) {
        data = {
          select: ['basicInfo'],
          where: {
            basicInfo: {}
          }
        }
        if ($('#basicInfo-sid').val()) data['where']['basicInfo']['sid'] = $('#basicInfo-sid').val()
        if ($('#basicInfo-name').val()) data['where']['basicInfo']['name'] = $('#basicInfo-name').val()
      } else {
        data = {
          select: [],
          where: {}
        }
        var basicInfo = this.querybasicInfo()
        var schoolRoll = this.queryschoolRoll()
        var course = this.querycourse()
        var partyInfo = this.querypartyInfo()
        var scholarship = this.queryscholarship()
        var aid = this.queryaid()
        var loan = this.queryloan()
        var cadre = this.querycadre()
        var award = this.queryaward()
        var paper = this.querypaper()
        var patent = this.querypatent()
        var techProject = this.querytechProject()
        var basicInfoJson = JSON.stringify(basicInfo)
        var schoolRollJson = JSON.stringify(schoolRoll)
        var courseJson = JSON.stringify(course)
        var partyInfoJson = JSON.stringify(partyInfo)
        var scholarshipJson = JSON.stringify(scholarship)
        var aidJson = JSON.stringify(aid)
        var loanJson = JSON.stringify(loan)
        var cadreJson = JSON.stringify(cadre)
        var awardJson = JSON.stringify(award)
        var paperJson = JSON.stringify(paper)
        var patentJson = JSON.stringify(patent)
        var techProjectJson = JSON.stringify(techProject)
        if (basicInfoJson != empty) {
          data['where']['basicInfo'] = basicInfo
        }
        if (schoolRollJson != empty) {
          data['where']['schoolRoll'] = schoolRoll
        }
        if (courseJson != empty) {
          data['where']['course'] = course
        }
        if (partyInfoJson != empty) {
          data['where']['partyInfo'] = partyInfo
        }
        if (scholarshipJson != empty) {
          data['where']['scholarship'] = scholarship
        }
        if (aidJson != empty) {
          data['where']['aid'] = aid
        }
        if (loanJson != empty) {
          data['where']['loan'] = loan
        }
        if (cadreJson != empty) {
          data['where']['cadre'] = cadre
        }
        if (awardJson != empty) {
          data['where']['award'] = award
        }
        if (paperJson != empty) {
          data['where']['paper'] = paper
        }
        if (patentJson != empty) {
          data['where']['patent'] = patent
        }
        if (techProjectJson != empty) {
          data['where']['techProject'] = techProject
        }

      }
      //显示结果条件的参数
      var recordFilter = this.recordFilter()
      data['select'] = recordFilter.select
      var dataJson = JSON.stringify(data)
      console.log(dataJson)
      //跳转
      this.$router.push({
        //这里只有用name导航才能通过params成功传递参数，用path就不可以,另一个问题是list页面刷新后会丢失params
        name:'list',
        params: {
          postData: dataJson,
          recordFilter: recordFilter
        }
      })
    },
    querybasicInfo: function() {
      var basicInfo = {}
      if ($('#basicInfo-gender').val()) basicInfo['gender'] = $('#basicInfo-gender').val()
      if ($('#basicInfo-birthPlace').val()) basicInfo['birthPlace'] = $('#basicInfo-birthPlace').val()
      if ($('#basicInfo-ethnic').val()) basicInfo['ethnic'] = $('#basicInfo-ethnic').val()
      if ($('#basicInfo-poliFace').val()) basicInfo['poliFace'] = $('#basicInfo-poliFace').val()
      if ($('#basicInfo-idNum').val()) basicInfo['idNum'] = $('#basicInfo-idNum').val()
      if ($('#basicInfo-birthDate').val()) basicInfo['birthDate'] = $('#basicInfo-birthDate').val()
      if ($('#basicInfo-tel').val()) basicInfo['tel'] = $('#basicInfo-tel').val()
      if ($('#basicInfo-mail').val()) basicInfo['mail'] = $('#basicInfo-mail').val()
      if ($('#basicInfo-wechat').val()) basicInfo['wechat'] = $('#basicInfo-wechat').val()
      if ($('#basicInfo-qq').val()) basicInfo['qq'] = $('#basicInfo-qq').val()
      if ($('#basicInfo-degree').val()) basicInfo['degree'] = $('#basicInfo-degree').val()
      if ($('#basicInfo-stuGroup ').val()) basicInfo['stuGroup '] = $('#basicInfo-stuGroup ').val()
      if ($('#basicInfo-grade').val()) basicInfo['grade'] = $('#basicInfo-grade').val()
      if ($('#basicInfo-major').val()) basicInfo['major'] = $('#basicInfo-major').val()
      if ($('#basicInfo-class').val()) basicInfo['class'] = $('#basicInfo-class').val()
      if ($('#basicInfo-dorm').val()) basicInfo['dorm'] = $('#basicInfo-dorm').val()
      if ($('#basicInfo-dorm-number').val()) basicInfo['dorm-number'] = $('#basicInfo-dorm-number').val()
      if ($('#basicInfo-dormRoom ').val()) basicInfo['dormRoom '] = $('#basicInfo-dormRoom ').val()
      if ($('#basicInfo-speciality').val()) basicInfo['speciality'] = $('#basicInfo-speciality').val()
      if ($('#basicInfo-highSchool').val()) basicInfo['highSchool'] = $('#basicInfo-highSchool').val()
      return basicInfo
    },
    queryschoolRoll: function() {
      var schoolRoll = {}
      if ($('#schoolRoll-isAtRoll').val()) schoolRoll['isAtRoll'] = $('#schoolRoll-isAtRoll').val()
      if ($('#schoolRoll-class').val()) schoolRoll['class'] = $('#schoolRoll-class').val()
      if ($('#schoolRoll-studyYears').val()) schoolRoll['studyYears'] = $('#schoolRoll-studyYears').val()
      if ($('#schoolRoll-timeInSchool').val()) schoolRoll['timeInSchool'] = $('#schoolRoll-timeInSchool').val()
      if ($('#schoolRoll-isFee').val()) schoolRoll['isFee'] = $('#schoolRoll-isFee').val()
      if ($('#schoolRoll-isArrive').val()) schoolRoll['isArrive'] = $('#schoolRoll-isArrive').val()
      if ($('#schoolRoll-isRollChanged').val()) schoolRoll['isRollChanged'] = $('#schoolRoll-isRollChanged').val()
      if ($('#schoolRoll-changeTime').val()) schoolRoll['changeTime'] = $('#schoolRoll-changeTime').val()
      if ($('#schoolRoll-changeClass').val()) schoolRoll['changeClass'] = $('#schoolRoll-changeClass').val()
      return schoolRoll
    },
    querycourse: function() {
      var course = {}
      if ($('#course-year').val()) course['year'] = $('#course-year').val()
      if ($('#course-semester').val()) course['semester'] = $('#course-semester').val()
      if ($('#course-courseName').val()) course['courseName'] = $('#cschoolRoll-ourseName').val()
      if ($('#course-courseId').val()) course['courseId'] = $('#course-courseId').val()
      if ($('#course-courseClass').val()) course['courseClass'] = $('#course-courseClass').val()
      if ($('#course-courseProperty').val()) course['courseProperty'] = $('#course-courseProperty').val()
      if ($('#course-courseHour').val()) course['courseHour'] = $('#course-courseHour').val()
      if ($('#course-credit').val()) course['credit'] = $('#course-credit').val()
      if ($('#course-courseGrade').val()) course['courseGrade'] = $('#course-courseGrade').val()
      if ($('#course-gpa').val()) course['gpa'] = $('#course-gpa').val()
      if ($('#course-isPass').val()) course['isPass'] = $('#course-isPass').val()
      if ($('#course-rebuild').val()) course['rebuild'] = $('#course-rebuild').val()
      if ($('#course-backup').val()) course['backup'] = $('#course-backup').val()
      return course
    },
    querypartyInfo: function() {
      var partyInfo = {}
      if ($('#partyInfo-isLeaguer').val()) partyInfo['isLeaguer'] = $('#partyInfo-isLeaguer').val()
      if ($('#partyInfo-joinGroupTime').val()) partyInfo['joinGroupTime'] = $('#partyInfo-joinGroupTime').val()
      if ($('#partyInfo-submitTime').val()) partyInfo['submitTime'] = $('#partyInfo-submitTime').val()
      if ($('#partyInfo-activerTime').val()) partyInfo['activerTime'] = $('#apartyInfo-ctiverTime').val()
      if ($('#partyInfo-contacter').val()) partyInfo['contacter'] = $('#partyInfo-contacter').val()
      if ($('#partyInfo-isVerified').val()) partyInfo['isVerified'] = $('#partyInfo-isVerified').val()
      if ($('#partyInfo-democracyTime').val()) partyInfo['democracyTime'] = $('#partyInfo-democracyTime').val()
      if ($('#partyInfo-developerTime').val()) partyInfo['developerTime'] = $('#partyInfo-developerTime').val()
      if ($('#partyInfo-partyTrainedTime').val()) partyInfo['partyTrainedTime'] = $('#partyInfo-partyTrainedTime').val()
      if ($('#partyInfo-introducerTime').val()) partyInfo['introducerTime'] = $('#partyInfo-introducerTime').val()
      if ($('#partyInfo-introducer').val()) partyInfo['introducer'] = $('#partyInfo-introducer').val()
      if ($('#partyInfo-hasAutobigraphy').val()) partyInfo['hasAutobigraphy'] = $('#partyInfo-hasAutobigraphy').val()
      if ($('#partyInfo-hasApplicatiionForm').val()) partyInfo['hasApplicatiionForm'] = $('#partyInfo-hasApplicatiionForm').val()
      if ($('#partyInfo-partyBranchTime').val()) partyInfo['partyBranchTime'] = $('#partyInfo-partyBranchTime').val()
      if ($('#partyInfo-partyTalkTime').val()) partyInfo['partyTalkTime'] = $('#partyInfo-partyTalkTime').val()
      if ($('#partyInfo-partyTalker').val()) partyInfo['partyTalker'] = $('#partyInfo-partyTalker').val()
      if ($('#partyInfo-probationaryTime').val()) partyInfo['probationaryTime'] = $('#partyInfo-probationaryTime').val()
      if ($('#partyInfo-partyOathTime').val()) partyInfo['partyOathTime'] = $('#partyInfo-partyOathTime').val()
      if ($('#partyInfo-fullSubTime').val()) partyInfo['fullSubTime'] = $('#partyInfo-fullSubTime').val()
      if ($('#partyInfo-fullMeetingTime').val()) partyInfo['fullMeetingTime'] = $('#partyInfo-fullMeetingTime').val()
      if ($('#partyInfo-fullMemberTime').val()) partyInfo['fullMemberTime'] = $('#partyInfo-fullMemberTime').val()
      if ($('#partyInfo-archiveTime').val()) partyInfo['archiveTime'] = $('#partyInfo-archiveTime').val()
      if ($('#partyInfo-temporaryTime').val()) partyInfo['temporaryTime'] = $('#partyInfo-temporaryTime').val()
      if ($('#partyInfo-outTime').val()) partyInfo['outTime'] = $('#partyInfo-outTime').val()
      if ($('#partyInfo-outUnit').val()) partyInfo['outUnit'] = $('#partyInfo-outUnit').val()
      return partyInfo
    },
    queryscholarship: function() {
      var scholarship = {}
      if ($('#scholarship-year').val()) scholarship['year'] = $('#scholarship-year').val()
      if ($('#scholarship-shipClass').val()) scholarship['shipClass'] = $('#scholarship-shipClass').val()
      if ($('#scholarship-shipName').val()) scholarship['shipName'] = $('#scholarship-shipName').val()
      if ($('#scholarship-shipAmount').val()) scholarship['shipAmount'] = $('#scholarship-shipAmount').val()
      return scholarship
    },
    queryaid: function() {
      var aid = {}
      if ($('#aid-year').val()) aid['year'] = $('#aid-year').val()
      if ($('#aid-aidClass').val()) aid['aidClass'] = $('#aid-aidClass').val()
      if ($('#aid-aidProperty').val()) aid['aidProperty'] = $('#aid-aidProperty').val()
      if ($('#aid-aidName').val()) aid['aidName'] = $('#aid-aidName').val()
      if ($('#aid-aidAmount').val()) aid['aidAmount'] = $('#aid-aidAmount').val()
      return aid
    },
    queryloan: function() {
      var loan = {}
      if ($('#loan-submitYear').val()) loan['submitYear'] = $('#loan-submitYear').val()
      if ($('#loan-loanYears').val()) loan['loanYears'] = $('#loan-loanYears').val()
      if ($('#loan-moneyPerYear').val()) loan['moneyPerYear'] = $('#loan-moneyPerYear').val()
      if ($('#loan-loanTotal').val()) loan['loanTotal'] = $('#loan-loanTotal').val()
      return loan
    },
    querycadre: function() {
      var cadre = {}
      if ($('#cadre-year').val()) cadre['year'] = $('#cadre-year').val()
      if ($('#cadre-cadreClass').val()) cadre['cadreClass'] = $('#cadre-cadreClass').val()
      if ($('#cadre-cadreName').val()) cadre['cadreName'] = $('#cadre-cadreName').val()
      if ($('#cadre-cadreJiBie').val()) cadre['cadreJiBie'] = $('#cadre-cadreJiBie').val()
      return cadre
    },
    queryaward: function() {
      var award = {}
      if ($('#award-stuClass').val()) award['stuClass'] = $('#award-stuClass').val()
      if ($('#award-awardName').val()) award['awardName'] = $('#award-awardName').val()
      if ($('#award-awardClass').val()) award['awardClass'] = $('#award-awardClass').val()
      if ($('#award-employer').val()) award['employer'] = $('#award-employer').val()
      if ($('#award-awardJiBie').val()) award['awardJiBie'] = $('#award-awardJiBie').val()
      if ($('#award-awardYearMonth').val()) award['awardYearMonth'] = $('#award-awardYearMonth').val()
      if ($('#award-teacher').val()) award['teacher'] = $('#award-teacher').val()
      return award
    },
    querypaper: function() {
      var paper = {}
      if ($('#paper-title').val()) paper['title'] = $('#paper-title').val()
      if ($('#paper-authors').val()) paper['authors'] = $('#paper-authors').val()
      if ($('#paper-journal').val()) paper['journal'] = $('#paper-journal').val()
      if ($('#paper-serialNumber').val()) paper['serialNumber'] = $('#paper-serialNumber').val()
      if ($('#paper-pagesRange').val()) paper['pagesRange'] = $('#paper-pagesRange').val()
      if ($('#paper-paperGrade').val()) paper['paperGrade'] = $('#paper-paperGrade').val()
      if ($('#paper-paperClass').val()) paper['paperClass'] = $('#paper-paperClass').val()
      if ($('#paper-time').val()) paper['time'] = $('#paper-time').val()
      if ($('#paper-insTeacher').val()) paper['insTeacher'] = $('#paper-insTeacher').val()
      return paper
    },
    querypatent: function() {
      var patent = {}
      if ($('#patent-patentName').val()) patent['patentName'] = $('#patent-patentName').val()
      if ($('#patent-class').val()) patent['class'] = $('#patent-class').val()
      if ($('#patent-submitTime').val()) patent['submitTime'] = $('#patent-submitTime').val()
      if ($('#patent-approvalTime').val()) patent['approvalTime'] = $('#patent-approvalTime').val()
      if ($('#patent-patentRange').val()) patent['patentRange'] = $('#patent-patentRange').val()
      if ($('#patent-unit').val()) patent['unit'] = $('#patent-unit').val()
      if ($('#patent-patentNumber').val()) patent['patentNumber'] = $('#patent-patentNumber').val()
      if ($('#patent-creators').val()) patent['creators'] = $('#patent-creators').val()
      return patent
    },
    querytechProject: function() {
      var techProject = {}
      if ($('#techProject-proName').val()) techProject['proName'] = $('#techProject-proName').val()
      if ($('#techProject-employer').val()) techProject['employer'] = $('#techProject-employer').val()
      if ($('#techProject-money').val()) techProject['money'] = $('#techProject-money').val()
      if ($('#techProject-proId').val()) techProject['proId'] = $('#techProject-proId').val()
      if ($('#techProject-class').val()) techProject['class'] = $('#techProject-class').val()
      if ($('#techProject-teacher').val()) techProject['teacher'] = $('#techProject-teacher').val()
      if ($('#techProject-proTime').val()) techProject['proTime'] = $('#techProject-proTime').val()
      return techProject
    },
    recordClick: function(event) {
      //用类名区别是否被选中，也用来判断是否可折叠一个表
      //console.log(event.currentTarget.__proto__);
      //点击的是标题
      if (event.currentTarget.nodeName == 'H4') {
        var childNodes = event.currentTarget.nextElementSibling.childNodes
        var check = true
        for(var i = 0; i < childNodes.length; i++){
          if(childNodes[i].childNodes[0].className == 'record-clicked'){
            check = false
          }
        }
        if(check){
          $('#' + event.currentTarget.nextElementSibling.id).toggle()
        }
      }
      //点击的是表中的记录
      else{
        if(event.currentTarget.className == 'record-original'){
          event.currentTarget.className = 'record-clicked'
        } else {
          event.currentTarget.className = 'record-original'
        }
      }
    },
    recordFilter: function() {
      var recordFilter = {
        select: [],
        show: []
      }
      for(var i = 0; i < $('.record-container').length; i++){
        var records =  $('.record-container')[i].childNodes[2].childNodes
        var tableId = $('.record-container')[i].childNodes[2].getAttribute('table-id')
        var tableName = $('.record-container')[i].childNodes[2].getAttribute('table-name')
        var recordsTemp = []
        for(var j = 0; j< records.length; j++){
          if(records[j].childNodes[0].className == 'record-clicked'){
            var recordId = records[j].childNodes[0].getAttribute('record-id')
            var recordName = records[j].childNodes[0].getAttribute('record-name')
            recordsTemp.push({name: recordName, id: recordId})
          }
        }
        if(recordsTemp.length > 0){
          recordFilter['select'].push(tableId)
          recordFilter['show'].push({name: tableName, id: tableId, records: recordsTemp})
        }
        //console.log(records.childNodes[1].id)
      }
      return recordFilter
    }
  }
}
</script>

<style>

/*-------------*/

[class*="col-"] {
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #eee;
  background-color: rgba(86, 61, 124, 0.1);
  border: 1px solid #ddd;
  border: 1px solid rgba(86, 61, 124, .2);
}

.innerCol {
  border: 0px;
  background-color: transparent;
  padding: 5px;
}

.col-md-1 {
  background-color: #fff;
  border: 0px
}

.query-container {
  text-align: left;
  padding-left: 20px;
}

h3 {
  color: green;
}

h4, h5 {
  display: inline-block;
  cursor: default;
  /*设置文字不可被选中*/
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

h4:hover {
  color: green;
}

.table-container {
  padding-left: 20px;
}

.hide-container {
  display: none;
}

.record-container {
  display: inline-block;
  float: left;
  padding-left: 5px;
}

.record-container > div {
  padding-left: 5px;
}

.record-clicked {
  color: red;
}

hr {
  clear: both;
}

button {
  margin-left: 50%;
}
</style>
