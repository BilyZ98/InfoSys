<template>
<div class="query-container">

  <!--条件输入部分-->
  <div class="container-card-query">
    <h3>查询条件</h3>

    <div v-for="table in tables" v-if="table.id!='family'">
      <h4 v-bind:id="table.id" @click="headClick">{{table.name}}</h4>
      <div class="table-container hide-container" v-bind:id="'table-'+table.id">
        <div v-for="record in table.records" v-if="(table.id!='basicInfo'&&record.id!='sid'&&record.id!='name')||(table.id=='basicInfo')">
          <h5 v-bind:record-id="table.id+'-'+record.id" @click="headClick">{{record.name}}</h5>
          <input type="text" class="hide-container" v-if="record.valueType=='input'" v-bind:id="table.id+'-'+record.id" v-model="record.value">
          <select class="hide-container" v-if="record.valueType=='select'" v-bind:id="table.id+'-'+record.id" v-model="record.value">
            <option></option>
            <option v-for="option in record.options">{{option}}</option>
          </select>
          <span class="hide-container" v-if="record.valueType=='range'" v-bind:id="table.id+'-'+record.id">
            <h6>最小值：</h6><input type="text" class="min"><h6> 最大值：</h6><input type="text" class="max">
          </span>
        </div>
      </div>
    </div>
  </div>

  <!--结果选择部分-->
  <div class="container-card-query">
    <h3>选择查询结果显示的字段</h3>

    <div v-for="table in tables">
      <h4 v-bind:id="table.id" @click="recordClick">{{table.name}}</h4>
      <div class="table-container hide-container" v-bind:id="'record-'+table.id" v-bind:table-id="table.id" v-bind:table-name="table.name">
        <div class="record-span-container" v-for="record in table.records">
          <h5 class="record-original" v-if="(table.id!='basicInfo'&&record.id!='sid'&&record.id!='name')||(table.id=='basicInfo')" v-bind:record-id="record.id" v-bind:record-name="record.name" @click="recordClick">{{record.name}}</h5>
        </div>
      </div>
    </div>
  </div>

  <button type="button" @click="queryClick">查询</button>
</div>
</template>

<script>
import tableData from './tableData.js'
var empty = JSON.stringify({equal: {}, range: {}, fuzzy: {}})
var emptyCell = JSON.stringify({})

export default {
  data() {
    return {
      tables: tableData
    }
  },
  mounted: function(){
    //$( "#slider" ).slider()
  },
  methods: {
    //event是原生dom事件
    //这个函数实现了点击head标签会让紧跟的div实现toggle效果, 要求所操控的div必须有id
    headClick: function(event) {
      //console.log($('#' + event.currentTarget.nextElementSibling.id).val() == '')
      //console.log(event.currentTarget.__proto__);
      if (event.currentTarget.nodeName == 'H4') {
        if($('#' + event.currentTarget.nextElementSibling.id).is(":hidden")){
          $('#' + event.currentTarget.nextElementSibling.id).toggle()
          return
        }
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
      else {
        if($('#' + event.currentTarget.getAttribute('record-id')).is('span')){
          if($('#' + event.currentTarget.getAttribute('record-id') + ' .min').val() =='' || $('#' + event.currentTarget.getAttribute('record-id') + ' .max').val() =='' || $('#' + event.currentTarget.nextElementSibling.id).is(":hidden")){
            $('#' + event.currentTarget.getAttribute('record-id')).toggle()
          }
        } else {
          if($('#' + event.currentTarget.getAttribute('record-id')).val() == '' || $('#' + event.currentTarget.nextElementSibling.id).is(":hidden")) {
            //只有没有填写内容的时候可以关闭
            $('#' + event.currentTarget.getAttribute('record-id')).toggle()
          }
        }
      }
    },
    queryClick: function() {
      //验证和生成json
      var data = {}
      //有sid/name就不包含其他信息了
      if ($('#basicInfo-sid').val() || $('#basicInfo-name').val()) {
        data = {
          select: ['basicInfo'],
          where: {
            equal: {'basicInfo': {}},
            range: {},
            fuzzy: {}
          }
        }
        if ($('#basicInfo-sid').val()) data['where']['equal']['basicInfo']['sid'] = $('#basicInfo-sid').val()
        if ($('#basicInfo-name').val()) data['where']['equal']['basicInfo']['name'] = $('#basicInfo-name').val()
      } else {
        data = {
          select: [],
          where: {
            equal: {},
            range: {},
            fuzzy: {}
          }
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
        //basicInfo
        if(JSON.stringify(basicInfo['equal']) != emptyCell) data['where']['equal']['basicInfo'] = basicInfo['equal']
        if(JSON.stringify(basicInfo['range']) != emptyCell) data['where']['range']['basicInfo'] = basicInfo['range']
        if(JSON.stringify(basicInfo['fuzzy']) != emptyCell) data['where']['fuzzy']['basicInfo'] = basicInfo['fuzzy']
        //schoolRoll
        if(JSON.stringify(schoolRoll['equal']) != emptyCell) data['where']['equal']['schoolRoll'] = schoolRoll['equal']
        if(JSON.stringify(schoolRoll['range']) != emptyCell) data['where']['range']['schoolRoll'] = schoolRoll['range']
        if(JSON.stringify(schoolRoll['fuzzy']) != emptyCell) data['where']['fuzzy']['schoolRoll'] = schoolRoll['fuzzy']
        //course
        if(JSON.stringify(course['equal']) != emptyCell) data['where']['equal']['course'] = course['equal']
        if(JSON.stringify(course['range']) != emptyCell) data['where']['range']['course'] = course['range']
        if(JSON.stringify(course['fuzzy']) != emptyCell) data['where']['fuzzy']['course'] = course['fuzzy']
        //partyInfo
        if(JSON.stringify(partyInfo['equal']) != emptyCell) data['where']['equal']['partyInfo'] = partyInfo['equal']
        if(JSON.stringify(partyInfo['range']) != emptyCell) data['where']['range']['partyInfo'] = partyInfo['range']
        if(JSON.stringify(partyInfo['fuzzy']) != emptyCell) data['where']['fuzzy']['partyInfo'] = partyInfo['fuzzy']
        //scholarship
        if(JSON.stringify(scholarship['equal']) != emptyCell) data['where']['equal']['scholarship'] = scholarship['equal']
        if(JSON.stringify(scholarship['range']) != emptyCell) data['where']['range']['scholarship'] = scholarship['range']
        if(JSON.stringify(scholarship['fuzzy']) != emptyCell) data['where']['fuzzy']['scholarship'] = scholarship['fuzzy']
        //aid
        if(JSON.stringify(aid['equal']) != emptyCell) data['where']['equal']['aid'] = aid['equal']
        if(JSON.stringify(aid['range']) != emptyCell) data['where']['range']['aid'] = aid['range']
        if(JSON.stringify(aid['fuzzy']) != emptyCell) data['where']['fuzzy']['aid'] = aid['fuzzy']
        //loan
        if(JSON.stringify(loan['equal']) != emptyCell) data['where']['equal']['loan'] = loan['equal']
        if(JSON.stringify(loan['range']) != emptyCell) data['where']['range']['loan'] = loan['range']
        if(JSON.stringify(loan['fuzzy']) != emptyCell) data['where']['fuzzy']['loan'] = loan['fuzzy']
        //cadre
        if(JSON.stringify(cadre['equal']) != emptyCell) data['where']['equal']['cadre'] = cadre['equal']
        if(JSON.stringify(cadre['range']) != emptyCell) data['where']['range']['cadre'] = cadre['range']
        if(JSON.stringify(cadre['fuzzy']) != emptyCell) data['where']['fuzzy']['cadre'] = cadre['fuzzy']
        //award
        if(JSON.stringify(award['equal']) != emptyCell) data['where']['equal']['award'] = award['equal']
        if(JSON.stringify(award['range']) != emptyCell) data['where']['range']['award'] = award['range']
        if(JSON.stringify(award['fuzzy']) != emptyCell) data['where']['fuzzy']['award'] = award['fuzzy']
        //paper
        if(JSON.stringify(paper['equal']) != emptyCell) data['where']['equal']['paper'] = paper['equal']
        if(JSON.stringify(paper['range']) != emptyCell) data['where']['range']['paper'] = paper['range']
        if(JSON.stringify(paper['fuzzy']) != emptyCell) data['where']['fuzzy']['paper'] = paper['fuzzy']
        //patent
        if(JSON.stringify(patent['equal']) != emptyCell) data['where']['equal']['patent'] = patent['equal']
        if(JSON.stringify(patent['range']) != emptyCell) data['where']['range']['patent'] = patent['range']
        if(JSON.stringify(patent['fuzzy']) != emptyCell) data['where']['fuzzy']['patent'] = patent['fuzzy']
        //techProject
        if(JSON.stringify(techProject['equal']) != emptyCell) data['where']['equal']['techProject'] = techProject['equal']
        if(JSON.stringify(techProject['range']) != emptyCell) data['where']['range']['techProject'] = techProject['range']
        if(JSON.stringify(techProject['fuzzy']) != emptyCell) data['where']['fuzzy']['techProject'] = techProject['fuzzy']
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
      var basicInfo = {equal: {}, range: {}, fuzzy: {}}
      if ($('#basicInfo-gender').val()) basicInfo['equal']['gender'] = $('#basicInfo-gender').val()
      if ($('#basicInfo-birthPlace').val()) basicInfo['equal']['birthPlace'] = $('#basicInfo-birthPlace').val()
      if ($('#basicInfo-ethnic').val()) basicInfo['equal']['ethnic'] = $('#basicInfo-ethnic').val()
      if ($('#basicInfo-poliFace').val()) basicInfo['equal']['poliFace'] = $('#basicInfo-poliFace').val()
      if ($('#basicInfo-idNum').val()) basicInfo['equal']['idNum'] = $('#basicInfo-idNum').val()
      if ($('#basicInfo-birthDate').val()) basicInfo['equal']['birthDate'] = $('#basicInfo-birthDate').val()
      if ($('#basicInfo-tel').val()) basicInfo['equal']['tel'] = $('#basicInfo-tel').val()
      if ($('#basicInfo-mail').val()) basicInfo['equal']['mail'] = $('#basicInfo-mail').val()
      if ($('#basicInfo-wechat').val()) basicInfo['equal']['wechat'] = $('#basicInfo-wechat').val()
      if ($('#basicInfo-qq').val()) basicInfo['equal']['qq'] = $('#basicInfo-qq').val()
      if ($('#basicInfo-degree').val()) basicInfo['equal']['degree'] = $('#basicInfo-degree').val()
      if ($('#basicInfo-stuGroup ').val()) basicInfo['equal']['stuGroup '] = $('#basicInfo-stuGroup ').val()
      if ($('#basicInfo-grade').val()) basicInfo['equal']['grade'] = $('#basicInfo-grade').val()
      if ($('#basicInfo-major').val()) basicInfo['equal']['major'] = $('#basicInfo-major').val()
      if ($('#basicInfo-class').val()) basicInfo['equal']['class'] = $('#basicInfo-class').val()
      if ($('#basicInfo-dorm').val()) basicInfo['equal']['dorm'] = $('#basicInfo-dorm').val()
      if ($('#basicInfo-dorm-number').val()) basicInfo['equal']['dorm-number'] = $('#basicInfo-dorm-number').val()
      if ($('#basicInfo-dormRoom ').val()) basicInfo['equal']['dormRoom '] = $('#basicInfo-dormRoom ').val()
      if ($('#basicInfo-speciality').val()) basicInfo['equal']['speciality'] = $('#basicInfo-speciality').val()
      if ($('#basicInfo-highSchool').val()) basicInfo['equal']['highSchool'] = $('#basicInfo-highSchool').val()
      return basicInfo
    },
    queryschoolRoll: function() {
      var schoolRoll = {equal: {}, range: {}, fuzzy: {}}
      if ($('#schoolRoll-isAtRoll').val()) schoolRoll['equal']['isAtRoll'] = $('#schoolRoll-isAtRoll').val()
      if ($('#schoolRoll-class').val()) schoolRoll['equal']['class'] = $('#schoolRoll-class').val()
      if ($('#schoolRoll-studyYears').val()) schoolRoll['equal']['studyYears'] = $('#schoolRoll-studyYears').val()
      //range value
      var rangeVal = {min: $('#schoolRoll-timeInSchool .min').val(), max: $('#schoolRoll-timeInSchool .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        schoolRoll['range']['timeInSchool'] = rangeVal
      }
      if ($('#schoolRoll-isFee').val()) schoolRoll['equal']['isFee'] = $('#schoolRoll-isFee').val()
      if ($('#schoolRoll-isArrive').val()) schoolRoll['equal']['isArrive'] = $('#schoolRoll-isArrive').val()
      if ($('#schoolRoll-isRollChanged').val()) schoolRoll['equal']['isRollChanged'] = $('#schoolRoll-isRollChanged').val()
      if ($('#schoolRoll-changeTime').val()) schoolRoll['equal']['changeTime'] = $('#schoolRoll-changeTime').val()
      if ($('#schoolRoll-changeClass').val()) schoolRoll['equal']['changeClass'] = $('#schoolRoll-changeClass').val()
      return schoolRoll
    },
    querycourse: function() {
      var course = {equal: {}, range: {}, fuzzy: {}}
      //range value
      var rangeVal = {min: $('#course-year .min').val(), max: $('#course-year .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        course['range']['year'] = rangeVal
      }
      //range value
      rangeVal = {min: $('#course-semester .min').val(), max: $('#course-semester .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        course['range']['semester'] = rangeVal
      }
      if ($('#course-courseName').val()) course['equal']['courseName'] = $('#cschoolRoll-ourseName').val()
      if ($('#course-courseId').val()) course['equal']['courseId'] = $('#course-courseId').val()
      if ($('#course-courseClass').val()) course['equal']['courseClass'] = $('#course-courseClass').val()
      if ($('#course-courseProperty').val()) course['equal']['courseProperty'] = $('#course-courseProperty').val()
      if ($('#course-courseHour').val()) course['equal']['courseHour'] = $('#course-courseHour').val()
      if ($('#course-credit').val()) course['equal']['credit'] = $('#course-credit').val()
      //range value
      rangeVal = {min: $('#course-courseGrade .min').val(), max: $('#course-courseGrade .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        course['range']['courseGrade'] = rangeVal
      }
      //range value
      rangeVal = {min: $('#course-gpa .min').val(), max: $('#course-gpa .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        course['range']['gpa'] = rangeVal
      }
      if ($('#course-isPass').val()) course['equal']['isPass'] = $('#course-isPass').val()
      if ($('#course-rebuild').val()) course['equal']['rebuild'] = $('#course-rebuild').val()
      if ($('#course-backup').val()) course['equal']['backup'] = $('#course-backup').val()
      return course
    },
    querypartyInfo: function() {
      var partyInfo = {equal: {}, range: {}, fuzzy: {}}
      if ($('#partyInfo-isLeaguer').val()) partyInfo['equal']['isLeaguer'] = $('#partyInfo-isLeaguer').val()
      if ($('#partyInfo-joinGroupTime').val()) partyInfo['equal']['joinGroupTime'] = $('#partyInfo-joinGroupTime').val()
      //range value
      var rangeVal = {min: $('#partyInfo-submitTime .min').val(), max: $('#partyInfo-submitTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['submitTime'] = rangeVal
      }
      if ($('#partyInfo-activerTime').val()) partyInfo['equal']['activerTime'] = $('#apartyInfo-ctiverTime').val()
      if ($('#partyInfo-contacter').val()) partyInfo['equal']['contacter'] = $('#partyInfo-contacter').val()
      if ($('#partyInfo-isVerified').val()) partyInfo['equal']['isVerified'] = $('#partyInfo-isVerified').val()
      if ($('#partyInfo-democracyTime').val()) partyInfo['equal']['democracyTime'] = $('#partyInfo-democracyTime').val()
      if ($('#partyInfo-developerTime').val()) partyInfo['equal']['developerTime'] = $('#partyInfo-developerTime').val()
      //range value
      var rangeVal = {min: $('#partyInfo-partyTrainedTime .min').val(), max: $('#partyInfo-partyTrainedTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['partyTrainedTime'] = rangeVal
      }
      if ($('#partyInfo-introducerTime').val()) partyInfo['equal']['introducerTime'] = $('#partyInfo-introducerTime').val()
      if ($('#partyInfo-introducer').val()) partyInfo['equal']['introducer'] = $('#partyInfo-introducer').val()
      if ($('#partyInfo-hasAutobigraphy').val()) partyInfo['equal']['hasAutobigraphy'] = $('#partyInfo-hasAutobigraphy').val()
      if ($('#partyInfo-hasApplicatiionForm').val()) partyInfo['equal']['hasApplicatiionForm'] = $('#partyInfo-hasApplicatiionForm').val()
      //range value
      var rangeVal = {min: $('#partyInfo-partyBranchTime .min').val(), max: $('#partyInfo-partyBranchTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['partyBranchTime'] = rangeVal
      }
      if ($('#partyInfo-partyTalkTime').val()) partyInfo['equal']['partyTalkTime'] = $('#partyInfo-partyTalkTime').val()
      if ($('#partyInfo-partyTalker').val()) partyInfo['equal']['partyTalker'] = $('#partyInfo-partyTalker').val()
      //range value
      var rangeVal = {min: $('#partyInfo-probationaryTime .min').val(), max: $('#partyInfo-probationaryTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['probationaryTime'] = rangeVal
      }
      if ($('#partyInfo-partyOathTime').val()) partyInfo['equal']['partyOathTime'] = $('#partyInfo-partyOathTime').val()
      if ($('#partyInfo-fullSubTime').val()) partyInfo['equal']['fullSubTime'] = $('#partyInfo-fullSubTime').val()
      //range value
      var rangeVal = {min: $('#partyInfo-fullMeetingTime .min').val(), max: $('#partyInfo-fullMeetingTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['fullMeetingTime'] = rangeVal
      }
      //range value
      var rangeVal = {min: $('#partyInfo-fullMemberTime .min').val(), max: $('#partyInfo-fullMemberTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['fullMemberTime'] = rangeVal
      }
      if ($('#partyInfo-archiveTime').val()) partyInfo['equal']['archiveTime'] = $('#partyInfo-archiveTime').val()
      if ($('#partyInfo-temporaryTime').val()) partyInfo['equal']['temporaryTime'] = $('#partyInfo-temporaryTime').val()
      //range value
      var rangeVal = {min: $('#partyInfo-outTime .min').val(), max: $('#partyInfo-outTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        partyInfo['range']['outTime'] = rangeVal
      }
      if ($('#partyInfo-outUnit').val()) partyInfo['equal']['outUnit'] = $('#partyInfo-outUnit').val()
      return partyInfo
    },
    queryscholarship: function() {
      var scholarship = {equal: {}, range: {}, fuzzy: {}}
      if ($('#scholarship-year').val()) scholarship['equal']['year'] = $('#scholarship-year').val()
      if ($('#scholarship-shipClass').val()) scholarship['equal']['shipClass'] = $('#scholarship-shipClass').val()
      if ($('#scholarship-shipName').val()) scholarship['equal']['shipName'] = $('#scholarship-shipName').val()
      //range value
      var rangeVal = {min: $('#scholarship-shipAmount .min').val(), max: $('#scholarship-shipAmount .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        scholarship['range']['shipAmount'] = rangeVal
      }
      return scholarship
    },
    queryaid: function() {
      var aid = {equal: {}, range: {}, fuzzy: {}}
      if ($('#aid-year').val()) aid['equal']['year'] = $('#aid-year').val()
      if ($('#aid-aidClass').val()) aid['equal']['aidClass'] = $('#aid-aidClass').val()
      if ($('#aid-aidProperty').val()) aid['equal']['aidProperty'] = $('#aid-aidProperty').val()
      if ($('#aid-aidName').val()) aid['equal']['aidName'] = $('#aid-aidName').val()
      //range value
      var rangeVal = {min: $('#aid-aidAmount .min').val(), max: $('#aid-aidAmount .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        aid['range']['aidAmount'] = rangeVal
      }
      return aid
    },
    queryloan: function() {
      var loan = {equal: {}, range: {}, fuzzy: {}}
      if ($('#loan-submitYear').val()) loan['equal']['submitYear'] = $('#loan-submitYear').val()
      if ($('#loan-loanYears').val()) loan['equal']['loanYears'] = $('#loan-loanYears').val()
      if ($('#loan-moneyPerYear').val()) loan['equal']['moneyPerYear'] = $('#loan-moneyPerYear').val()
      if ($('#loan-loanTotal').val()) loan['equal']['loanTotal'] = $('#loan-loanTotal').val()
      return loan
    },
    querycadre: function() {
      var cadre = {equal: {}, range: {}, fuzzy: {}}
      if ($('#cadre-year').val()) cadre['equal']['year'] = $('#cadre-year').val()
      if ($('#cadre-cadreClass').val()) cadre['equal']['cadreClass'] = $('#cadre-cadreClass').val()
      if ($('#cadre-cadreName').val()) cadre['equal']['cadreName'] = $('#cadre-cadreName').val()
      if ($('#cadre-cadreJiBie').val()) cadre['equal']['cadreJiBie'] = $('#cadre-cadreJiBie').val()
      return cadre
    },
    queryaward: function() {
      var award = {equal: {}, range: {}, fuzzy: {}}
      if ($('#award-stuClass').val()) award['equal']['stuClass'] = $('#award-stuClass').val()
      if ($('#award-awardName').val()) award['fuzzy']['awardName'] = $('#award-awardName').val()
      if ($('#award-awardClass').val()) award['fuzzy']['awardClass'] = $('#award-awardClass').val()
      if ($('#award-employer').val()) award['equal']['employer'] = $('#award-employer').val()
      if ($('#award-awardJiBie').val()) award['equal']['awardJiBie'] = $('#award-awardJiBie').val()
      //range value
      var rangeVal = {min: $('#award-awardYearMonth .min').val(), max: $('#award-awardYearMonth .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        award['range']['awardYearMonth'] = rangeVal
      }
      if ($('#award-teacher').val()) award['equal']['teacher'] = $('#award-teacher').val()
      return award
    },
    querypaper: function() {
      var paper = {equal: {}, range: {}, fuzzy: {}}
      if ($('#paper-title').val()) paper['equal']['title'] = $('#paper-title').val()
      if ($('#paper-authors').val()) paper['equal']['authors'] = $('#paper-authors').val()
      if ($('#paper-journal').val()) paper['equal']['journal'] = $('#paper-journal').val()
      if ($('#paper-serialNumber').val()) paper['equal']['serialNumber'] = $('#paper-serialNumber').val()
      //range value
      var rangeVal = {min: $('#paper-pagesRange .min').val(), max: $('#paper-pagesRange .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        paper['range']['pagesRange'] = rangeVal
      }
      if ($('#paper-paperGrade').val()) paper['equal']['paperGrade'] = $('#paper-paperGrade').val()
      if ($('#paper-paperClass').val()) paper['equal']['paperClass'] = $('#paper-paperClass').val()
      //range value
      var rangeVal = {min: $('#paper-time .min').val(), max: $('#paper-time .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        paper['range']['time'] = rangeVal
      }
      if ($('#paper-insTeacher').val()) paper['equal']['insTeacher'] = $('#paper-insTeacher').val()
      return paper
    },
    querypatent: function() {
      var patent = {equal: {}, range: {}, fuzzy: {}}
      if ($('#patent-patentName').val()) patent['equal']['patentName'] = $('#patent-patentName').val()
      if ($('#patent-class').val()) patent['equal']['class'] = $('#patent-class').val()
      if ($('#patent-submitTime').val()) patent['equal']['submitTime'] = $('#patent-submitTime').val()
      if ($('#patent-approvalTime').val()) patent['equal']['approvalTime'] = $('#patent-approvalTime').val()
      if ($('#patent-patentRange').val()) patent['equal']['patentRange'] = $('#patent-patentRange').val()
      if ($('#patent-unit').val()) patent['equal']['unit'] = $('#patent-unit').val()
      if ($('#patent-patentNumber').val()) patent['equal']['patentNumber'] = $('#patent-patentNumber').val()
      if ($('#patent-creators').val()) patent['equal']['creators'] = $('#patent-creators').val()
      return patent
    },
    querytechProject: function() {
      var techProject = {equal: {}, range: {}, fuzzy: {}}
      //range value
      var rangeVal = {min: $('#techProject-proName .min').val(), max: $('#techProject-proName .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        techProject['range']['proName'] = rangeVal
      }
      if ($('#techProject-employer').val()) techProject['equal']['employer'] = $('#techProject-employer').val()
      if ($('#techProject-money').val()) techProject['equal']['money'] = $('#techProject-money').val()
      if ($('#techProject-proId').val()) techProject['equal']['proId'] = $('#techProject-proId').val()
      if ($('#techProject-class').val()) techProject['equal']['class'] = $('#techProject-class').val()
      if ($('#techProject-teacher').val()) techProject['equal']['teacher'] = $('#techProject-teacher').val()
      //range value
      var rangeVal = {min: $('#techProject-proTime .min').val(), max: $('#techProject-proTime .max').val()}
      if(rangeVal['min']!='' && rangeVal['max']!=''){
        techProject['range']['proTime'] = rangeVal
      }
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
  border: 0px;
}

.query-container {
  text-align: left;
  padding-left: 20px;
}

h3 {
  color: green;
}

h4, h5, h6 {
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

.container-card-query {
  margin: 2%;
  text-align: left;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 2%;
  background-color: white;
  /*radius*/
  border-radius: 3px;
  /*shadow*/
  box-shadow: -1px 1px 5px #888888;
}

.table-container {
  padding-left: 20px;
}

.hide-container {
  display: none;
}

.record-span-container {
  display: inline-block;
  padding-left: 5px;
}

.record-clicked {
  color: red;
  transition: 0.2s;
  -moz-transition: 0.2s;  /* Firefox 4 */
  -webkit-transition: 0.2s; /* Safari 和 Chrome */
  -o-transition: 0.2s;  /* Opera */
}

hr {
  clear: both;
}

button {
  margin-left: 50%;
}
</style>
