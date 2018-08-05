var tableData = [{
  name: '基本信息',
  id: 'basicInfo',
  records: [
    { name: '学号', id: 'sid' },
    { name: '姓名', id: 'name' },
    { name: '性别', id: 'gender' },
    { name: '籍贯', id: 'birthPlace' },
    { name: '民族', id: 'ethnic' },
    { name: '政治面貌', id: 'poliFace' },
    { name: '身份证号码', id: 'idNum' },
    { name: '出生年月日', id: 'birthDate' },
    { name: '联系电话', id: 'tel' },
    { name: '邮箱', id: 'mail' },
    { name: '微信', id: 'wechat' },
    { name: 'QQ号', id: 'qq' },
    { name: '培养层次', id: 'degree' },
    { name: '学生类别', id: 'stuGroup' },
    { name: '年级', id: 'grade' },
    { name: '专业', id: 'major' },
    { name: '行政班别', id: 'class' },
    { name: '宿舍楼栋', id: 'dorm' },
    { name: '宿舍房号', id: 'dormRoom' },
    { name: '特长', id: 'speciality' },
    { name: '毕业中学', id: 'highSchool ' }
  ]
}, {
  name: '家庭情况',
  id: 'family',
  records: [
    { name: '家庭地址', id: 'homeAddress' },
    { name: '父亲姓名', id: 'fatherName' },
    { name: '父亲电话', id: 'fatherTel' },
    { name: '父亲工作单位及职务', id: 'fatherJob' },
    { name: '母亲姓名', id: 'motherName' },
    { name: '母亲电话', id: 'motherTel' },
    { name: '母亲工作单位及职务', id: 'motherJob' },
    { name: '家庭人均月收入', id: 'familyAveIncome' },
    { name: '是否家庭经济困难学生(经学校认定)', id: 'isHard' },
    { name: '困难等级', id: 'hardDegree' },
    { name: '家庭经济困难情况简述', id: 'hardFamDes' }
  ]
}, {
  name: '学籍情况',
  id: 'schoolRoll',
  records: [
    { name: '学籍状态', id: 'isAtRoll' },
    { name: '教务班别', id: 'class' },
    { name: '学制', id: 'studyYears' },
    { name: '入学年月', id: 'timeInSchool' },
    { name: '缴费状态', id: 'isFee' },
    { name: '注册（报到）状态', id: 'isArrive' },
    { name: '在校期间学籍是否有变动', id: 'isRollChanged' },
    { name: '变动时间', id: 'changeTime' },
    { name: '变动类别', id: 'changeClass' },
    { name: '变动原因', id: 'changeReason' },
    { name: '学校批文', id: 'changeSchoolPage' }
  ]
}, {
  name: '课程成绩记录',
  id: 'course',
  records: [
    { name: '学年', id: 'year' },
    { name: '学期', id: 'semester' },
    { name: '课程名称', id: 'courseName' },
    { name: '课程编号', id: 'courseId' },
    { name: '课程类别', id: 'courseClass' },
    { name: '课程性质', id: 'courseProperty' },
    { name: '学时', id: 'courseHour' },
    { name: '学分', id: 'credit' },
    { name: '成绩', id: 'courseGrade' },
    { name: '绩点', id: 'gpa' },
    { name: '是否已通过', id: 'isPass' },
    { name: '重修补考标识', id: 'rebuild' },
    { name: '备注', id: 'backup' }
  ]
}, {
  name: '党员信息',
  id: 'partyInfo',
  records: [
    { name: '是否团员', id: 'isLeaguer' },
    { name: '参加党章学习小组时间', id: 'joinGroupTime' },
    { name: '递交入党申请书时间', id: 'submitTime' },
    { name: '确定为入党积极分子时间', id: 'activerTime' },
    { name: '入党培养联系人', id: 'contacter' },
    { name: '是否完成政审', id: 'isVerified' },
    { name: '民主评议时间', id: 'democracyTime' },
    { name: '确定为重点发展对象时间', id: 'developerTime' },
    { name: '选送党校培训时间', id: 'partyTrainedTime' },
    { name: '确定入党介绍人时间', id: 'introducerTime' },
    { name: '入党介绍人', id: 'introducer' },
    { name: '是否有自传', id: 'hasAutobigraphy' },
    { name: '是否有入党志愿书', id: 'hasApplicatiionForm' },

    { name: '入党支部大会时间', id: 'partyBranchTime' },
    { name: '入党谈话时间', id: 'partyTalkTime' },
    { name: '入党谈话人', id: 'partyTalker' },
    { name: '预备党员起始时间（党委批准时间）', id: 'probationaryTime' },
    { name: '入党宣誓时间', id: 'partyOathTime' },
    { name: '转正申请书时间', id: 'fullSubTime' },
    { name: '转正支部大会时间', id: 'fullMeetingTime' },
    { name: '正式党员起始时间（党委批准时间）', id: 'fullMemberTime' },
    { name: '移交档案馆时间', id: 'archiveTime' },
    { name: '暂缓就业起始时间', id: 'temporaryTime' },
    { name: '关系转出时间', id: 'outTime' },
    { name: '关系转往单位名称', id: 'outUnit' }
  ]
}, {
  name: '获奖学金情况',
  id: 'scholarship',
  records: [
    { name: '学年', id: 'year' },
    { name: '资助类别', id: 'aidClass' },
    { name: '资助性质', id: 'aidProperty' },
    { name: '资助名称', id: 'aidName' },
    { name: '资助金额', id: 'aidAmount' }
  ]
}, {
  name: '助学贷款',
  id: 'loan',
  records: [
    { name: '申请学年', id: 'submitYear' },
    { name: '贷款年数', id: 'loanYears' },
    { name: '每年放款金额', id: 'moneyPerYear' },
    { name: '贷款总额', id: 'loanTotal' }
  ]
}, {
  name: '学生干部任职情况',
  id: 'cadre',
  records: [
    { name: '学年', id: 'year' },
    { name: '职务类别', id: 'cadreClass' },
    { name: '职务名称', id: 'cadreName' },
    { name: '职务级别', id: 'cadreJiBie' }
  ]
}, {
  name: '获得奖励情况',
  id: 'award',
  records: [
    { name: '学生类别', id: 'stuClass' },
    { name: '奖励名称', id: 'awardName' },
    { name: '奖励等级', id: 'awardClass' },
    { name: '颁发（主办）单位', id: 'employer' },
    { name: '级别', id: 'awardJiBie' },
    { name: '获奖年月', id: 'awardYearMonth' },
    { name: '指导老师', id: 'teacher' }
  ]
}, {
  name: '发表论文情况',
  id: 'paper',
  records: [
    { name: '题目', id: 'title' },
    { name: '作者序', id: 'authors' },
    { name: '刊物', id: 'journal' },
    { name: '期号', id: 'serialNumber' },
    { name: '页码范围', id: 'pagesRange' },
    { name: '刊物级别', id: 'paperGrade' },
    { name: '论文类型', id: 'paperClass' },
    { name: '发表时间', id: 'time' },
    { name: '指导老师', id: 'insTeacher' }
  ]
}, {
  name: '获得专利情况',
  id: 'patent',
  records: [
    { name: '专利名称', id: 'patentName' },
    { name: '类别', id: 'class' },
    { name: '申请时间', id: 'submitTime' },
    { name: '授权时间', id: 'approvalTime' },
    { name: '专利范围', id: 'patentRange ' },
    { name: '申请单位', id: 'unit' },
    { name: '专利申请号', id: 'patentNumber' },
    { name: '发明人', id: 'creators' }
  ]
}, {
  name: '科研项目情况',
  id: 'techProject',
  records: [
    { name: '项目名称', id: 'proName' },
    { name: '主办单位', id: 'employer' },
    { name: '资助金额', id: 'money' },
    { name: '项目编号', id: 'proId' },
    { name: '类别', id: 'class' },
    { name: '指导老师', id: 'teacher' },
    { name: '立项时间', id: 'proTime' }
  ]
}]

export default tableData