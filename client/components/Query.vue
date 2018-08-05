<template>
  <div class="query-container">

    <h3 class="text-center">查询条件</h3>
    <div>
      <h4 id="basicInfo" @click="headClick">基本信息</h4>
      <div class="table-container hide-container" id="table-basicInfo">
        <h5 @click="headClick">学号</h5>
        <input type="text" class="hide-container" id="sid">
        <br/>
        <h5 @click="headClick">姓名</h5>
        <input type="text" class="hide-container" id="name">
        <br/>
        <h5 @click="headClick">性别</h5>
        <select class="hide-container" id="gender">
          <option></option>
          <option>男</option>
          <option>女</option>
        </select>
        <br/>
        <h5 @click="headClick">籍贯</h5>
        <select class="hide-container" id="birthPlace">
          <option></option>
          <option>安徽</option>
          <option>澳门</option>
          <option>北京</option>
          <option>重庆</option>
          <option>福建</option>
          <option>甘肃</option>
          <option>广东</option>
          <option>广西</option>
          <option>贵州</option>
          <option>海南</option>
          <option>河北</option>
          <option>河南</option>
          <option>黑龙江</option>
          <option>湖北</option>
          <option>湖南</option>
          <option>吉林</option>
          <option>江苏</option>
          <option>江西</option>
          <option>辽宁</option>
          <option>内蒙古</option>
          <option>宁夏</option>
          <option>青海</option>
          <option>山东</option>
          <option>山西</option>
          <option>陕西</option>
          <option>上海</option>
          <option>四川</option>
          <option>台湾</option>
          <option>天津</option>
          <option>西藏</option>
          <option>香港</option>
          <option>新疆</option>
          <option>云南</option>
          <option>浙江</option>
        </select>
        <br/>
        <h5 @click="headClick">民族</h5>
        <select class="hide-container" id="ethnic">
          <option></option>
          <option>阿昌族</option>
          <option>白族</option>
          <option>保安族</option>
          <option>布朗族</option>
          <option>布依族</option>
          <option>藏族</option>
          <option>朝鲜族</option>
          <option>达斡尔族</option>
          <option>傣族</option>
          <option>德昂族</option>
          <option>东乡族</option>
          <option>侗族</option>
          <option>独龙族</option>
          <option>俄罗斯族</option>
          <option>鄂伦春族</option>
          <option>鄂温克族</option>
          <option>高山族</option>
          <option>哈尼族</option>
          <option>哈萨克族</option>
          <option>汉族</option>
          <option>赫哲族</option>
          <option>回族</option>
          <option>基诺族</option>
          <option>京族</option>
          <option>景颇族</option>
          <option>柯尔克孜族</option>
          <option>拉祜族</option>
          <option>黎族</option>
          <option>傈僳族</option>
          <option>满族</option>
          <option>毛南族</option>
          <option>门巴族</option>
          <option>蒙古族</option>
          <option>苗族</option>
          <option>纳西族</option>
          <option>怒族</option>
          <option>普米族</option>
          <option>羌族</option>
          <option>撒拉族</option>
          <option>水族</option>
          <option>塔吉克族</option>
          <option>塔塔尔族</option>
          <option>土家族</option>
          <option>土族</option>
          <option>维吾尔族</option>
          <option>乌兹别克族</option>
          <option>锡伯族</option>
          <option>瑶族</option>
          <option>彝族</option>
          <option>裕固族</option>
          <option>壮族</option>
          <option>仡佬族</option>
          <option>仫佬族</option>
          <option>佤族</option>
          <option>珞巴族</option>
          <option>畲族</option>
        </select>
        <br/>
        <h5 @click="headClick">政治面貌</h5>
        <select class="hide-container" id="poliFace">
          <option></option>
          <option>群众</option>
          <option>团员</option>
          <option>党员</option>
        </select>
        <br/>
        <h5 @click="headClick">身份证号</h5>
        <input type="text" class="hide-container" id="idNum">
        <br/>
        <h5 @click="headClick">联系电话</h5>
        <input type="text" class="hide-container" id="tel">
        <br/>
        <h5 @click="headClick">邮箱</h5>
        <input type="text" class="hide-container" id="mail">
        <br/>
        <h5 @click="headClick">微信</h5>
        <input type="text" class="hide-container" id="wechat">
        <br/>
        <h5 @click="headClick">QQ</h5>
        <input type="text" class="hide-container" id="qq">
        <br/>
        <h5 @click="headClick">培养层次</h5>
        <select class="hide-container" id="degree">
          <option></option>
          <option>本科</option>
          <option>硕士</option>
          <option>博士</option>
        </select>
        <h5 @click="headClick">学生类别</h5>
        <select class="hide-container" id="stuGroup">
          <option></option>
          <option>统招</option>
          <option>港澳台</option>
          <option>国际学生</option>
        </select>
        <br/>
        <h5 @click="headClick">年级</h5>
        <select class="hide-container" id="grade">
          <option></option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
        <br/>
        <h5 @click="headClick">专业</h5>
        <input class="hide-container" type="text" id="major">
        <br/>
        <h5 @click="headClick">行政班别</h5>
        <select class="hide-container" id="class-xz">
          <option></option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
          <option>13</option>
          <option>14</option>
          <option>15</option>
          <option>16</option>
          <option>17</option>
          <option>18</option>
          <option>19</option>
          <option>20</option>
        </select>
        <br/>
        <h5 @click="headClick">宿舍楼栋</h5>
        <select class="hide-container" id="dorm">
          <option></option>
          <option>至善园</option>
          <option>明德园</option>
          <option>慎思园</option>
          <option>格致园</option>
        </select>
        <h5 @click="headClick">楼栋号</h5>
        <select class="hide-container" id="dorm-number">
          <option></option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
        </select>
        <br/>
        <h5 @click="headClick">宿舍房号</h5>
        <input type="text" class="hide-container" id="dormRoom">
        <br/>
        <h5 @click="headClick">特长</h5>
        <input type="text" class="hide-container" id="speciality">
        <br/>
        <h5 @click="headClick">毕业中学</h5>
        <input type="text" class="hide-container" id="highSchool">
      </div>
    </div>

    <div>
      <h4 id="schoolRoll" @click="headClick">学籍情况</h4>
      <div class="table-container hide-container" id="table-schoolRoll">
        <h5 @click="headClick">学籍状态</h5>
        <select class="hide-container" id="isAtRoll">
          <option></option>
          <option>在籍</option>
          <option>在校</option>
        </select>
        <br/>
        <h5 @click="headClick">教务班别</h5>
        <input type="text" class="hide-container" id="class-jw">
        <br/>
        <h5 @click="headClick">学制</h5>
        <select class="hide-container" id="studyYears">
          <option></option>
          <option>四年制</option>
          <option>五年制</option>
        </select>
        <br/>
        <h5 @click="headClick">入学年月</h5>
        <input type="text" class="hide-container" id="timeInSchool">
        <br/>
        <h5 @click="headClick">缴费状态</h5>
        <select class="hide-container" id="isFee">
          <option></option>
          <option>已缴费</option>
          <option>未缴费</option>
        </select>
        <br/>
        <h5 @click="headClick">注册（报到）状态</h5>
        <select class="hide-container" id="isArrive">
          <option></option>
          <option>已注册</option>
          <option>未注册</option>
        </select>
        <br/>
        <h5 @click="headClick">在校期间学籍是否有变动</h5>
        <select class="hide-container" id="isRollChanged">
          <option></option>
          <option>是</option>
          <option>否</option>
        </select>
        <br/>
        <h5 @click="headClick">变动时间</h5>
        <input type="text" class="hide-container" id="changeTime">
        <br/>
        <h5 @click="headClick">变动类别</h5>
        <select class="hide-container" id="changeClass">
          <option></option>
          <option>留级</option>
          <option>休学</option>
          <option>复学</option>
          <option>转专业</option>
        </select>
      </div>
    </div>

    <div>
      <h4 id="course" @click="headClick">课程成绩记录</h4>
      <div class="table-container hide-container" id="table-course">
        <h5 @click="headClick">学年</h5>
        <select class="hide-container" id="year-course">
          <option></option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
        <br/>
        <h5 @click="headClick">学期</h5>
        <select class="hide-container" id="semester">
          <option></option>
          <option>第一学期</option>
          <option>第二学期</option>
          <option>第三学期</option>
        </select>
        <br/>
        <h5 @click="headClick">课程名称</h5>
        <input type="text" class="hide-container" id="courseName">
        <br/>
        <h5 @click="headClick">课程编号</h5>
        <input type="text" class="hide-container" id="courseId">
        <br/>
        <h5 @click="headClick">课程类别</h5>
        <select class="hide-container" id="courseClass">
          <option></option>
          <option>必修</option>
          <option>选修</option>
        </select>
        <br/>
        <h5 @click="headClick">课程性质</h5>
        <select class="hide-container" id="courseProperty">
          <option></option>
          <option>主修</option>
          <option>辅修</option>
        </select>
        <br/>
        <h5 @click="headClick">学时</h5>
        <input type="text" class="hide-container" id="courseHour">
        <br/>
        <h5 @click="headClick">学分</h5>
        <input type="text" class="hide-container" id="credit">
        <br/>
        <h5 @click="headClick">成绩</h5>
        <input type="text" class="hide-container" id="courseGrade">
        <br/>
        <h5 @click="headClick">绩点</h5>
        <input type="text" class="hide-container" id="gpa">
        <br/>
        <h5 @click="headClick">是否已通过</h5>
        <select class="hide-container" id="isPass">
          <option></option>
          <option>是</option>
          <option>否</option>
        </select>
        <br/>
        <h5 @click="headClick">重修补考标识</h5>
        <select class="hide-container" id="rebuild">
          <option></option>
          <option>重修</option>
          <option>补考</option>
        </select>
        <br/>
        <h5 @click="headClick">备注</h5>
        <input type="text" class="hide-container" id="backup">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="partyInfo" @click="headClick">党员信息</h4>
      <div class="table-container hide-container" id="table-partyInfo">
        <h5 @click="headClick">是否团员</h5>
        <select class="hide-container" id="isLeaguer">
          <option></option>
          <option>是</option>
          <option>否</option>
        </select>
        <br/>
        <h5 @click="headClick">参加党章学习小组时间</h5>
        <input type="text" class="hide-container" id="joinGroupTime">
        <br/>
        <h5 @click="headClick">递交入党申请书时间</h5>
        <input type="text" class="hide-container" id="submitTime-partyInfo">
        <br/>
        <h5 @click="headClick">确定为入党积极分子时间</h5>
        <input type="text" class="hide-container" id="activerTime">
        <br/>
        <h5 @click="headClick">入党培养联系人</h5>
        <input type="text" class="hide-container" id="contacter">
        <br/>
        <h5 @click="headClick">是否完成政审</h5>
        <select class="hide-container" id="isVerified">
          <option></option>
          <option>是</option>
          <option>否</option>
        </select>
        <br/>
        <h5 @click="headClick">民主评议时间</h5>
        <input type="text" class="hide-container" id="democracyTime">
        <br/>
        <h5 @click="headClick">确定为重点发展对象时间</h5>
        <input type="text" class="hide-container" id="developerTime">
        <br/>
        <h5 @click="headClick">选送党校培训时间</h5>
        <input type="text" class="hide-container" id="partyTrainedTime">
        <br/>
        <h5 @click="headClick">确定入党介绍人时间</h5>
        <input type="text" class="hide-container" id="introducerTime">
        <br/>
        <h5 @click="headClick">入党介绍人</h5>
        <input type="text" class="hide-container" id="introducer">
        <br/>
        <h5 @click="headClick">是否有自传</h5>
        <select class="hide-container" id="hasAutobigraphy">
          <option></option>
          <option>是</option>
          <option>否</option>
        </select>
        <br/>
        <h5 @click="headClick">是否有入党志愿书</h5>
        <select class="hide-container" id="hasApplicatiionForm">
          <option></option>
          <option>是</option>
          <option>否</option>
        </select>
        <br/>
        <h5 @click="headClick">入党支部大会时间</h5>
        <input type="text" class="hide-container" id="partyBranchTime">
        <br/>
        <h5 @click="headClick">入党谈话时间</h5>
        <input type="text" class="hide-container" id="partyTalkTime">
        <br/>
        <h5 @click="headClick">入党谈话人</h5>
        <input type="text" class="hide-container" id="partyTalker">
        <br/>
        <h5 @click="headClick">预备党员起始时间（党委批准时间）</h5>
        <input type="text" class="hide-container" id="probationaryTime">
        <br/>
        <h5 @click="headClick">入党宣誓时间</h5>
        <input type="text" class="hide-container" id="partyOathTime">
        <br/>
        <h5 @click="headClick">转正申请书时间</h5>
        <input type="text" class="hide-container" id="fullSubTime">
        <br/>
        <h5 @click="headClick">转正支部大会时间</h5>
        <input type="text" class="hide-container" id="fullMeetingTime">
        <br/>
        <h5 @click="headClick">正式党员起始时间（党委批准时间）</h5>
        <input type="text" class="hide-container" id="fullMemberTime">
        <br/>
        <h5 @click="headClick">移交档案馆时间</h5>
        <input type="text" class="hide-container" id="archiveTime">
        <br/>
        <h5 @click="headClick">暂缓就业起始时间</h5>
        <input type="text" class="hide-container" id="temporaryTime">
        <br/>
        <h5 @click="headClick">关系转出时间</h5>
        <input type="text" class="hide-container" id="outTime">
        <br/>
        <h5 @click="headClick">关系转往单位名称</h5>
        <input type="text" class="hide-container" id="outUnit">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="scholarship" @click="headClick">奖学金情况</h4>
      <div class="table-container hide-container" id="table-scholarship">
        <h5 @click="headClick">学年</h5>
        <select class="hide-container" id="year-scholarship">
          <option></option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
        <br/>
        <h5 @click="headClick">奖学金类别</h5>
        <select class="hide-container" id="shipClass">
          <option></option>
          <option>校内</option>
          <option>政府</option>
          <option>捐赠</option>
        </select>
        <br/>
        <h5 @click="headClick">奖学金名称</h5>
        <input type="text" class="hide-container" id="shipName">
        <br/>
        <h5 @click="headClick">奖励金额</h5>
        <input type="text" class="hide-container" id="shipAmount">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="aid" @click="headClick">获资助情况</h4>
      <div class="table-container hide-container" id="table-aid">
        <h5 @click="headClick">学年</h5>
        <select class="hide-container" id="year-aid">
          <option></option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
        <br/>
        <h5 @click="headClick">资助类别</h5>
        <select class="hide-container" id="aidClass">
          <option></option>
          <option>校内</option>
          <option>政府</option>
          <option>捐赠</option>
        </select>
        <br/>
        <h5 @click="headClick">资助性质</h5>
        <select class="hide-container" id="aidProperty">
          <option></option>
          <option>新评</option>
          <option>续评</option>
        </select>
        <br/>
        <h5 @click="headClick">资助名称</h5>
        <input type="text" class="hide-container" id="aidName">
        <br/>
        <h5 @click="headClick">资助金额</h5>
        <input type="text" class="hide-container" id="aidAmount">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="loan" @click="headClick">助学贷款</h4>
      <div class="table-container hide-container" id="table-loan">
        <h5 @click="headClick">申请学年</h5>
        <select class="hide-container" id="submitYear">
          <option></option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
        <br/>
        <h5 @click="headClick">贷款年数</h5>
        <input type="text" class="hide-container" id="loanYears">
        <br/>
        <h5 @click="headClick">每年放款金额</h5>
        <input type="text" class="hide-container" id="moneyPerYear">
        <br/>
        <h5 @click="headClick">贷款总额</h5>
        <input type="text" class="hide-container" id="loanTotal">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="cadre" @click="headClick">学生干部任职情况</h4>
      <div class="table-container hide-container" id="table-cadre">
        <h5 @click="headClick">学年</h5>
        <select class="hide-container" id="year-cadre">
          <option></option>
          <option>2012</option>
          <option>2013</option>
          <option>2014</option>
          <option>2015</option>
          <option>2016</option>
          <option>2017</option>
          <option>2018</option>
        </select>
        <br/>
        <h5 @click="headClick">职务类别</h5>
        <select class="hide-container" id="cadreClass">
          <option></option>
          <option>学生会</option>
          <option>团委</option>
          <option>研究生会</option>
          <option>学生学术发展中心</option>
          <option>职发办</option>
          <option>社团</option>
          <option>院队</option>
          <option>班干部</option>
        </select>
        <br/>
        <h5 @click="headClick">职务类别</h5>
        <input type="text" class="hide-container" id="cadreName" placeholder="职务名称">
        <br/>
        <h5 @click="headClick">职务级别</h5>
        <select class="hide-container" id="cadreJiBie">
          <option></option>
          <option>校级</option>
          <option>校区级</option>
          <option>院级</option>
        </select>
        <br/>
      </div>
    </div>

    <div>
      <h4 id="award" @click="headClick">获得奖励情况</h4>
      <div class="table-container hide-container" id="table-award">
        <h5 @click="headClick">学生类别</h5>
        <select class="hide-container" id="stuClass">
          <option></option>
          <option>本科生</option>
          <option>硕士生</option>
          <option>博士生</option>
        </select>
        <br/>
        <h5 @click="headClick">奖励名称</h5>
        <input type="text" class="hide-container" id="awardName">
        <br/>
        <h5 @click="headClick">奖励等级</h5>
        <input type="text" class="hide-container" id="awardClass">
        <br/>
        <h5 @click="headClick">颁发（主办）单位</h5>
        <input type="text" class="hide-container" id="employer-award">
        <br/>
        <h5 @click="headClick">级别</h5>
        <input type="text" class="hide-container" id="awardJiBie">
        <br/>
        <h5 @click="headClick">获奖年月</h5>
        <input type="text" class="hide-container" id="awardYearMonth">
        <br/>
        <h5 @click="headClick">指导老师</h5>
        <input type="text" class="hide-container" id="teacher-award">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="paper" @click="headClick">发表论文情况</h4>
      <div class="table-container hide-container" id="table-paper">
        <h5 @click="headClick">题目</h5>
        <input type="text" class="hide-container" id="title">
        <br/>
        <h5 @click="headClick">作者序</h5>
        <input type="text" class="hide-container" id="authors">
        <br/>
        <h5 @click="headClick">刊物</h5>
        <input type="text" class="hide-container" id="journal">
        <br/>
        <h5 @click="headClick">期号</h5>
        <input type="text" class="hide-container" id="serialNumber">
        <br/>
        <h5 @click="headClick">页码范围</h5>
        <input type="text" class="hide-container" id="pagesRange">
        <br/>
        <h5 @click="headClick">刊物级别</h5>
        <input type="text" class="hide-container" id="paperGrade">
        <br/>
        <h5 @click="headClick">论文类型</h5>
        <input type="text" class="hide-container" id="paperClass">
        <br/>
        <h5 @click="headClick">发表时间</h5>
        <input type="text" class="hide-container" id="time">
        <br/>
        <h5 @click="headClick">指导老师</h5>
        <input type="text" class="hide-container" id="insTeacher">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="patent" @click="headClick">获得专利情况</h4>
      <div class="table-container hide-container" id="table-patent">
        <h5 @click="headClick">专利名称</h5>
        <input type="text" class="hide-container" id="patentName">
        <br/>
        <h5 @click="headClick">类别</h5>
        <input type="text" class="hide-container" id="class-patent">
        <br/>
        <h5 @click="headClick">申请时间</h5>
        <input type="text" class="hide-container" id="submitTime-patent">
        <br/>
        <h5 @click="headClick">授权时间</h5>
        <input type="text" class="hide-container" id="approvalTime">
        <br/>
        <h5 @click="headClick">专利范围</h5>
        <input type="text" class="hide-container" id="patentRange">
        <br/>
        <h5 @click="headClick">申请单位</h5>
        <input type="text" class="hide-container" id="uni">
        <br/>
        <h5 @click="headClick">专利申请号</h5>
        <input type="text" class="hide-container" id="patentNumber">
        <br/>
        <h5 @click="headClick">发明人</h5>
        <input type="text" class="hide-container" id="creators">
        <br/>
      </div>
    </div>

    <div>
      <h4 id="techProject" @click="headClick">科研项目情况</h4>
      <div class="table-container hide-container" id="table-techProject">
        <h5 @click="headClick">项目名称</h5>
        <input type="text" class="hide-container" id="proName">
        <br/>
        <h5 @click="headClick">主办单位</h5>
        <input type="text" class="hide-container" id="employer-techProject">
        <br/>
        <h5 @click="headClick">资助金额</h5>
        <input type="text" class="hide-container" id="money-techProject">
        <br/>
        <h5 @click="headClick">项目编号</h5>
        <input type="text" class="hide-container" id="proId">
        <br/>
        <h5 @click="headClick">类别</h5>
        <input type="text" class="hide-container" id="class-techProject">
        <br/>
        <h5 @click="headClick">指导老师</h5>
        <input type="text" class="hide-container" id="teacher-techProject">
        <br/>
        <h5 @click="headClick">立项时间</h5>
        <input type="text" class="hide-container" id="proTime">
        <br/>
      </div>
    </div>
    <hr>

    <!--结果选择部分-->
    <h3 class="text-center">选择查询结果显示的字段</h3>

    <div class="record-container" v-for="table in tables">
      <h4 v-bind:id="table.id" @click="recordClick">{{table.name}}</h4>
      <div class="table-container hide-container" id="record"  v-bind:id="'record-'+table.id">
        <div v-for="record in table.records">
          <h5 class="record-original" v-bind:record-id="record.id" @click="recordClick">{{record.name}}</h5>
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
      //console.log(event.currentTarget.__proto__);
      if (event.currentTarget.nodeName == 'H4') {
        var id = event.currentTarget.id
        //basicInfo表的sid和name要特殊验证
        if (id == 'basicInfo') {
          if (JSON.stringify(this.querybasicInfo()) == empty && !($('#sid').val() || $('#name').val())) {
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
      //表格内字段标题
      else if ($('#' + event.currentTarget.nextElementSibling.id).val() == '') {
        //只有没有填写内容的时候可以关闭
        $('#' + event.currentTarget.nextElementSibling.id).toggle()
      }
    },
    queryClick: function() {
      //验证和生成json
      var data = {}
      //有sid/name就不包含其他信息了
      if ($('#sid').val() || $('#name').val()) {
        data = {
          select: ['basicInfo'],
          where: {
            basicInfo: {}
          }
        }
        if ($('#sid').val()) data['where']['basicInfo']['sid'] = $('#sid').val()
        if ($('#name').val()) data['where']['basicInfo']['name'] = $('#name').val()
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
      //console.log(recordFilter)
      data['select'] = recordFilter.select
      var dataJson = JSON.stringify(data)
      //console.log(dataJson)
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
      if ($('#gender').val()) basicInfo['gender'] = $('#gender').val()
      if ($('#birthPlace').val()) basicInfo['birthPlace'] = $('#birthPlace').val()
      if ($('#ethnic').val()) basicInfo['ethnic'] = $('#ethnic').val()
      if ($('#poliFace').val()) basicInfo['poliFace'] = $('#poliFace').val()
      if ($('#idNum').val()) basicInfo['idNum'] = $('#idNum').val()
      if ($('#birthDate').val()) basicInfo['birthDate'] = $('#birthDate').val()
      if ($('#tel').val()) basicInfo['tel'] = $('#tel').val()
      if ($('#mail').val()) basicInfo['mail'] = $('#mail').val()
      if ($('#wechat').val()) basicInfo['wechat'] = $('#wechat').val()
      if ($('#qq').val()) basicInfo['qq'] = $('#qq').val()
      if ($('#degree').val()) basicInfo['degree'] = $('#degree').val()
      if ($('#stuGroup ').val()) basicInfo['stuGroup '] = $('#stuGroup ').val()
      if ($('#grade').val()) basicInfo['grade'] = $('#grade').val()
      if ($('#major').val()) basicInfo['major'] = $('#major').val()
      if ($('#class-xz').val()) basicInfo['class'] = $('#class-xz').val()
      if ($('#dorm').val()) basicInfo['dorm'] = $('#dorm').val()
      if ($('#dorm-number').val()) basicInfo['dorm-number'] = $('#dorm-number').val()
      if ($('#dormRoom ').val()) basicInfo['dormRoom '] = $('#dormRoom ').val()
      if ($('#speciality').val()) basicInfo['speciality'] = $('#speciality').val()
      if ($('#highSchool').val()) basicInfo['highSchool'] = $('#highSchool').val()
      return basicInfo
    },
    queryschoolRoll: function() {
      var schoolRoll = {}
      if ($('#isAtRoll').val()) schoolRoll['isAtRoll'] = $('#isAtRoll').val()
      if ($('#class-jw').val()) schoolRoll['class'] = $('#class-jw').val()
      if ($('#studyYears').val()) schoolRoll['studyYears'] = $('#studyYears').val()
      if ($('#timeInSchool').val()) schoolRoll['timeInSchool'] = $('#timeInSchool').val()
      if ($('#isFee').val()) schoolRoll['isFee'] = $('#isFee').val()
      if ($('#isArrive').val()) schoolRoll['isArrive'] = $('#isArrive').val()
      if ($('#isRollChanged').val()) schoolRoll['isRollChanged'] = $('#isRollChanged').val()
      if ($('#changeTime').val()) schoolRoll['changeTime'] = $('#changeTime').val()
      if ($('#changeClass').val()) schoolRoll['changeClass'] = $('#changeClass').val()
      return schoolRoll
    },
    querycourse: function() {
      var course = {}
      if ($('#year-course').val()) course['year'] = $('#year-course').val()
      if ($('#semester').val()) course['semester'] = $('#semester').val()
      if ($('#courseName').val()) course['courseName'] = $('#courseName').val()
      if ($('#courseId').val()) course['courseId'] = $('#courseId').val()
      if ($('#courseClass').val()) course['courseClass'] = $('#courseClass').val()
      if ($('#courseProperty').val()) course['courseProperty'] = $('#courseProperty').val()
      if ($('#courseHour').val()) course['courseHour'] = $('#courseHour').val()
      if ($('#credit').val()) course['credit'] = $('#credit').val()
      if ($('#courseGrade').val()) course['courseGrade'] = $('#courseGrade').val()
      if ($('#gpa').val()) course['gpa'] = $('#gpa').val()
      if ($('#isPass').val()) course['isPass'] = $('#isPass').val()
      if ($('#rebuild').val()) course['rebuild'] = $('#rebuild').val()
      if ($('#backup').val()) course['backup'] = $('#backup').val()
      return course
    },
    querypartyInfo: function() {
      var partyInfo = {}
      if ($('#isLeaguer').val()) partyInfo['isLeaguer'] = $('#isLeaguer').val()
      if ($('#joinGroupTime').val()) partyInfo['joinGroupTime'] = $('#joinGroupTime').val()
      if ($('#submitTime-partyInfo').val()) partyInfo['submitTime'] = $('#submitTime-partyInfo').val()
      if ($('#activerTime').val()) partyInfo['activerTime'] = $('#activerTime').val()
      if ($('#contacter').val()) partyInfo['contacter'] = $('#contacter').val()
      if ($('#isVerified').val()) partyInfo['isVerified'] = $('#isVerified').val()
      if ($('#democracyTime').val()) partyInfo['democracyTime'] = $('#democracyTime').val()
      if ($('#developerTime').val()) partyInfo['developerTime'] = $('#developerTime').val()
      if ($('#partyTrainedTime').val()) partyInfo['partyTrainedTime'] = $('#partyTrainedTime').val()
      if ($('#introducerTime').val()) partyInfo['introducerTime'] = $('#introducerTime').val()
      if ($('#introducer').val()) partyInfo['introducer'] = $('#introducer').val()
      if ($('#hasAutobigraphy').val()) partyInfo['hasAutobigraphy'] = $('#hasAutobigraphy').val()
      if ($('#hasApplicatiionForm').val()) partyInfo['hasApplicatiionForm'] = $('#hasApplicatiionForm').val()
      if ($('#partyBranchTime').val()) partyInfo['partyBranchTime'] = $('#partyBranchTime').val()
      if ($('#partyTalkTime').val()) partyInfo['partyTalkTime'] = $('#partyTalkTime').val()
      if ($('#partyTalker').val()) partyInfo['partyTalker'] = $('#partyTalker').val()
      if ($('#probationaryTime').val()) partyInfo['probationaryTime'] = $('#probationaryTime').val()
      if ($('#partyOathTime').val()) partyInfo['partyOathTime'] = $('#partyOathTime').val()
      if ($('#fullSubTime').val()) partyInfo['fullSubTime'] = $('#fullSubTime').val()
      if ($('#fullMeetingTime').val()) partyInfo['fullMeetingTime'] = $('#fullMeetingTime').val()
      if ($('#fullMemberTime').val()) partyInfo['fullMemberTime'] = $('#fullMemberTime').val()
      if ($('#archiveTime').val()) partyInfo['archiveTime'] = $('#archiveTime').val()
      if ($('#temporaryTime').val()) partyInfo['temporaryTime'] = $('#temporaryTime').val()
      if ($('#outTime').val()) partyInfo['outTime'] = $('#outTime').val()
      if ($('#outUnit').val()) partyInfo['outUnit'] = $('#outUnit').val()
      return partyInfo
    },
    queryscholarship: function() {
      var scholarship = {}
      if ($('#year-scholarship').val()) scholarship['year'] = $('#year-scholarship').val()
      if ($('#shipClass').val()) scholarship['shipClass'] = $('#shipClass').val()
      if ($('#shipName').val()) scholarship['shipName'] = $('#shipName').val()
      if ($('#shipAmount').val()) scholarship['shipAmount'] = $('#shipAmount').val()
      return scholarship
    },
    queryaid: function() {
      var aid = {}
      if ($('#year-aid').val()) aid['year'] = $('#year-aid').val()
      if ($('#aidClass').val()) aid['aidClass'] = $('#aidClass').val()
      if ($('#aidProperty').val()) aid['aidProperty'] = $('#aidProperty').val()
      if ($('#aidName').val()) aid['aidName'] = $('#aidName').val()
      if ($('#aidAmount').val()) aid['aidAmount'] = $('#aidAmount').val()
      return aid
    },
    queryloan: function() {
      var loan = {}
      if ($('#submitYear').val()) loan['submitYear'] = $('#submitYear').val()
      if ($('#loanYears').val()) loan['loanYears'] = $('#loanYears').val()
      if ($('#moneyPerYear').val()) loan['moneyPerYear'] = $('#moneyPerYear').val()
      if ($('#loanTotal').val()) loan['loanTotal'] = $('#loanTotal').val()
      return loan
    },
    querycadre: function() {
      var cadre = {}
      if ($('#year-cadre').val()) cadre['year'] = $('#year-cadre').val()
      if ($('#cadreClass').val()) cadre['cadreClass'] = $('#cadreClass').val()
      if ($('#cadreName').val()) cadre['cadreName'] = $('#cadreName').val()
      if ($('#cadreJiBie').val()) cadre['cadreJiBie'] = $('#cadreJiBie').val()
      return cadre
    },
    queryaward: function() {
      var award = {}
      if ($('#stuClass').val()) award['stuClass'] = $('#stuClass').val()
      if ($('#awardName').val()) award['awardName'] = $('#awardName').val()
      if ($('#awardClass').val()) award['awardClass'] = $('#awardClass').val()
      if ($('#employer-award').val()) award['employer'] = $('#employer-award').val()
      if ($('#awardJiBie').val()) award['awardJiBie'] = $('#awardJiBie').val()
      if ($('#awardYearMonth').val()) award['awardYearMonth'] = $('#awardYearMonth').val()
      if ($('#teacher').val()) award['teacher'] = $('#teacher').val()
      return award
    },
    querypaper: function() {
      var paper = {}
      if ($('#title').val()) paper['title'] = $('#title').val()
      if ($('#authors').val()) paper['authors'] = $('#authors').val()
      if ($('#journal').val()) paper['journal'] = $('#journal').val()
      if ($('#serialNumber').val()) paper['serialNumber'] = $('#serialNumber').val()
      if ($('#pagesRange').val()) paper['pagesRange'] = $('#pagesRange').val()
      if ($('#paperGrade').val()) paper['paperGrade'] = $('#paperGrade').val()
      if ($('#paperClass').val()) paper['paperClass'] = $('#paperClass').val()
      if ($('#time').val()) paper['time'] = $('#time').val()
      if ($('#insTeacher').val()) paper['insTeacher'] = $('#insTeacher').val()
      return paper
    },
    querypatent: function() {
      var patent = {}
      if ($('#patentName').val()) patent['patentName'] = $('#patentName').val()
      if ($('#class-patent').val()) patent['class'] = $('#class-patent').val()
      if ($('#submitTime-patent').val()) patent['submitTime'] = $('#submitTime-patent').val()
      if ($('#approvalTime').val()) patent['approvalTime'] = $('#approvalTime').val()
      if ($('#patentRange').val()) patent['patentRange'] = $('#patentRange').val()
      if ($('#unit').val()) patent['unit'] = $('#unit').val()
      if ($('#patentNumber').val()) patent['patentNumber'] = $('#patentNumber').val()
      if ($('#creators').val()) patent['creators'] = $('#creators').val()
      return patent
    },
    querytechProject: function() {
      var techProject = {}
      if ($('#proName').val()) techProject['proName'] = $('#proName').val()
      if ($('#employer-techProject').val()) techProject['employer'] = $('#employer-techProject').val()
      if ($('#money-techProject').val()) techProject['money'] = $('#money-techProject').val()
      if ($('#proId').val()) techProject['proId'] = $('#proId').val()
      if ($('#class-techProject').val()) techProject['class'] = $('#class-techProject').val()
      if ($('#teacher-techProject').val()) techProject['teacher'] = $('#teacher-techProject').val()
      if ($('#proTime').val()) techProject['proTime'] = $('#proTime').val()
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
        show: {}
      }
      for(var i = 0; i < $('.record-container').length; i++){
        var table =  $('.record-container')[i].childNodes[2].childNodes
        var tableName = $('.record-container')[i].childNodes[0].id
        //console.log(table)
        var check = false
        for(var j = 0; j< table.length; j++){
          if(table[j].childNodes[0].className == 'record-clicked'){
            if(!check){
              recordFilter['select'].push(tableName)
              recordFilter['show'][tableName]=[]
              check = true
            }
            recordFilter['show'][tableName].push(table[j].childNodes[0].getAttribute('record-id'))
          }
        }
        //console.log(table.childNodes[1].id)
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
