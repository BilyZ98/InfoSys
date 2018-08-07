var tableData = [{
  name: '基本信息',
  id: 'basicInfo',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '性别', id: 'gender', value: '', valueType: 'select', options: ['男', '女'] },
    { name: '籍贯', id: 'birthPlace', value: '', valueType: 'select', options: ['安徽', '澳门', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江'] },
    { name: '民族', id: 'ethnic', value: '', valueType: 'select', options: ['阿昌族', '白族', '保安族', '布朗族', '布依族', '藏族', '朝鲜族', '达斡尔族', '傣族', '德昂族', '东乡族', '侗族', '独龙族', '俄罗斯族', '鄂伦春族', '鄂温克族', '高山族', '哈尼族', '哈萨克族', '汉族', '赫哲族', '回族', '基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '傈僳族', '满族', '毛南族', '门巴族', '蒙古族', '苗族', '纳西族', '怒族', '普米族', '羌族', '撒拉族', '水族', '塔吉克族', '塔塔尔族', ' 土家族', ' 土族', ' 维吾尔族', ' 乌兹别克族', ' 锡伯族', '瑶族', '彝族', '裕固族', '壮族', '仡佬族', '仫佬族', '佤族', '珞巴族', '畲族'] },
    { name: '政治面貌', id: 'poliFace', value: '', valueType: 'select', options: ['群众', '团员', '党员'] },
    { name: '身份证号码', id: 'idNum', value: '', valueType: 'input' },
    { name: '出生年月日', id: 'birthDate', value: '', valueType: 'input' },
    { name: '联系电话', id: 'tel', value: '', valueType: 'input' },
    { name: '邮箱', id: 'mail', value: '', valueType: 'input' },
    { name: '微信', id: 'wechat', value: '', valueType: 'input' },
    { name: 'QQ号', id: 'qq', value: '', valueType: 'input' },
    { name: '培养层次', id: 'degree', value: '', valueType: 'select', options: ['本科', '硕士', '博士'] },
    { name: '学生类别', id: 'stuGroup', value: '', valueType: 'select', options: ['统招', '港澳台', '国际学生'] },
    { name: '年级', id: 'grade', value: '', valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '专业', id: 'major', value: '', valueType: 'input' },
    { name: '行政班别', id: 'class', value: '', valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
    { name: '宿舍楼栋', id: 'dorm', value: '', valueType: 'select', options: ['至善园', '明德园', '慎思园', '格致园'] },
    { name: '楼栋号', id: 'dorm-number', value: '', valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
    { name: '宿舍房号', id: 'dormRoom', value: '', valueType: 'input' },
    { name: '特长', id: 'speciality', value: '', valueType: 'input' },
    { name: '毕业中学', id: 'highSchool ', value: '', valueType: 'input' }
  ]
}, {
  name: '家庭情况',
  id: 'family',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '家庭地址', id: 'homeAddress', value: '', valueType: 'input' },
    { name: '父亲姓名', id: 'fatherName', value: '', valueType: 'input' },
    { name: '父亲电话', id: 'fatherTel', value: '', valueType: 'input' },
    { name: '父亲工作单位及职务', id: 'fatherJob', value: '', valueType: 'input' },
    { name: '母亲姓名', id: 'motherName', value: '', valueType: 'input' },
    { name: '母亲电话', id: 'motherTel', value: '', valueType: 'input' },
    { name: '母亲工作单位及职务', id: 'motherJob', value: '', valueType: 'input' },
    { name: '家庭人均月收入', id: 'familyAveIncome', value: '', valueType: 'input' },
    { name: '是否家庭经济困难学生(经学校认定)', id: 'isHard', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '困难等级', id: 'hardDegree', value: '', valueType: 'input' },
    { name: '家庭经济困难情况简述', id: 'hardFamDes', value: '', valueType: 'input' }
  ]
}, {
  name: '学籍情况',
  id: 'schoolRoll',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '学籍状态', id: 'isAtRoll', value: '', valueType: 'select', options: ['在籍', '在校'] },
    { name: '教务班别', id: 'class', value: '', valueType: 'input' },
    { name: '学制', id: 'studyYears', value: '', valueType: 'select', options: ['四年制', '五年制'] },
    { name: '入学年月', id: 'timeInSchool', value: '', valueType: 'range' },
    { name: '缴费状态', id: 'isFee', value: '', valueType: 'select', options: ['已缴费', '已缴费'] },
    { name: '注册（报到）状态', id: 'isArrive', value: '', valueType: 'select', options: ['已注册', '未注册'] },
    { name: '在校期间学籍是否有变动', id: 'isRollChanged', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '变动时间', id: 'changeTime', value: '', valueType: 'input' },
    { name: '变动类别', id: 'changeClass', value: '', valueType: 'select', options: ['留级', '休学', '复学', '转专业'] },
    { name: '变动原因', id: 'changeReason', value: '', valueType: 'input' },
    { name: '学校批文', id: 'changeSchoolPage', value: '', valueType: 'input' }
  ]
}, {
  name: '课程成绩记录',
  id: 'course',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '学年', id: 'year', value: '', valueType: 'range', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '学期', id: 'semester', value: '', valueType: 'range', options: ['第一学期', '第二学期', '第三学期'] },
    { name: '课程名称', id: 'courseName', value: '', valueType: 'input' },
    { name: '课程编号', id: 'courseId', value: '', valueType: 'input' },
    { name: '课程类别', id: 'courseClass', value: '', valueType: 'select', options: ['必修', '选修'] },
    { name: '课程性质', id: 'courseProperty', value: '', valueType: 'select', options: ['主修', '辅修'] },
    { name: '学时', id: 'courseHour', value: '', valueType: 'input' },
    { name: '学分', id: 'credit', value: '', valueType: 'input' },
    { name: '成绩', id: 'courseGrade', value: '', valueType: 'range' },
    { name: '绩点', id: 'gpa', value: '', valueType: 'range' },
    { name: '是否已通过', id: 'isPass', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '重修补考标识', id: 'rebuild', value: '', valueType: 'select', options: ['重修', '补考'] },
    { name: '备注', id: 'backup', value: '', valueType: 'input' }
  ]
}, {
  name: '党员信息',
  id: 'partyInfo',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '是否团员', id: 'isLeaguer', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '参加党章学习小组时间', id: 'joinGroupTime', value: '', valueType: 'input' },
    { name: '递交入党申请书时间', id: 'submitTime', value: '', valueType: 'range' },
    { name: '确定为入党积极分子时间', id: 'activerTime', value: '', valueType: 'input' },
    { name: '入党培养联系人', id: 'contacter', value: '', valueType: 'input' },
    { name: '是否完成政审', id: 'isVerified', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '民主评议时间', id: 'democracyTime', value: '', valueType: 'input' },
    { name: '确定为重点发展对象时间', id: 'developerTime', value: '', valueType: 'input' },
    { name: '选送党校培训时间', id: 'partyTrainedTime', value: '', valueType: 'range' },
    { name: '确定入党介绍人时间', id: 'introducerTime', value: '', valueType: 'input' },
    { name: '入党介绍人', id: 'introducer', value: '', valueType: 'input' },
    { name: '是否有自传', id: 'hasAutobigraphy', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '是否有入党志愿书', id: 'hasApplicatiionForm', value: '', valueType: 'select', options: ['是', '否'] },
    { name: '入党支部大会时间', id: 'partyBranchTime', value: '', valueType: 'range' },
    { name: '入党谈话时间', id: 'partyTalkTime', value: '', valueType: 'input' },
    { name: '入党谈话人', id: 'partyTalker', value: '', valueType: 'input' },
    { name: '预备党员起始时间（党委批准时间）', id: 'probationaryTime', value: '', valueType: 'range' },
    { name: '入党宣誓时间', id: 'partyOathTime', value: '', valueType: 'input' },
    { name: '转正申请书时间', id: 'fullSubTime', value: '', valueType: 'input' },
    { name: '转正支部大会时间', id: 'fullMeetingTime', value: '', valueType: 'range' },
    { name: '正式党员起始时间（党委批准时间）', id: 'fullMemberTime', value: '', valueType: 'range' },
    { name: '移交档案馆时间', id: 'archiveTime', value: '', valueType: 'input' },
    { name: '暂缓就业起始时间', id: 'temporaryTime', value: '', valueType: 'input' },
    { name: '关系转出时间', id: 'outTime', value: '', valueType: 'range' },
    { name: '关系转往单位名称', id: 'outUnit', value: '', valueType: 'input' }
  ]
}, {
  name: '获奖学金情况',
  id: 'scholarship',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '学年', id: 'year', value: '', valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '奖学金类别', id: 'shipClass', value: '', valueType: 'select', options: ['校内', '政府', '捐赠'] },
    { name: '奖学金名称', id: 'shipName', value: '', valueType: 'input' },
    { name: '奖励金额', id: 'shipAmount', value: '', valueType: 'range' }
  ]
}, {
  name: '获资助情况',
  id: 'aid',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '学年', id: 'year', value: '', valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '资助类别', id: 'aidClass', value: '', valueType: 'select', options: ['校内', '政府', '捐赠'] },
    { name: '资助性质', id: 'aidProperty', value: '', valueType: 'select', options: ['新评', '续评'] },
    { name: '资助名称', id: 'aidName', value: '', valueType: 'input' },
    { name: '资助金额', id: 'aidAmount', value: '', valueType: 'range' }
  ]
}, {
  name: '助学贷款',
  id: 'loan',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '申请学年', id: 'submitYear', value: '', valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '贷款年数', id: 'loanYears', value: '', valueType: 'input' },
    { name: '每年放款金额', id: 'moneyPerYear', value: '', valueType: 'input' },
    { name: '贷款总额', id: 'loanTotal', value: '', valueType: 'input' }
  ]
}, {
  name: '学生干部任职情况',
  id: 'cadre',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '学年', id: 'year', value: '', valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '职务类别', id: 'cadreClass', value: '', valueType: 'select', options: ['学生会', '团委', '研究生会', '学生学术发展中心', '职发办', '社团', '院队', '班干部'] },
    { name: '职务名称', id: 'cadreName', value: '', valueType: 'input' },
    { name: '职务级别', id: 'cadreJiBie', value: '', valueType: 'select', options: ['校级', '校区级', '院级'] }
  ]
}, {
  name: '获得奖励情况',
  id: 'award',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '学生类别', id: 'stuClass', value: '', valueType: 'select', options: ['本科生', '硕士生', '博士生'] },
    { name: '奖励名称', id: 'awardName', value: '', valueType: 'input' },
    { name: '奖励等级', id: 'awardClass', value: '', valueType: 'input' },
    { name: '颁发（主办）单位', id: 'employer', value: '', valueType: 'input' },
    { name: '级别', id: 'awardJiBie', value: '', valueType: 'input' },
    { name: '获奖年月', id: 'awardYearMonth', value: '', valueType: 'range' },
    { name: '指导老师', id: 'teacher', value: '', valueType: 'input' }
  ]
}, {
  name: '发表论文情况',
  id: 'paper',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '题目', id: 'title', value: '', valueType: 'input' },
    { name: '作者序', id: 'authors', value: '', valueType: 'input' },
    { name: '刊物', id: 'journal', value: '', valueType: 'input' },
    { name: '期号', id: 'serialNumber', value: '', valueType: 'input' },
    { name: '页码范围', id: 'pagesRange', value: '', valueType: 'range' },
    { name: '刊物级别', id: 'paperGrade', value: '', valueType: 'input' },
    { name: '论文类型', id: 'paperClass', value: '', valueType: 'input' },
    { name: '发表时间', id: 'time', value: '', valueType: 'range' },
    { name: '指导老师', id: 'insTeacher', value: '', valueType: 'input' }
  ]
}, {
  name: '获得专利情况',
  id: 'patent',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'input' },
    { name: '姓名', id: 'name', value: '', valueType: 'input' },
    { name: '专利名称', id: 'patentName', value: '', valueType: 'input' },
    { name: '类别', id: 'class', value: '', valueType: 'input' },
    { name: '申请时间', id: 'submitTime', value: '', valueType: 'input' },
    { name: '授权时间', id: 'approvalTime', value: '', valueType: 'input' },
    { name: '专利范围', id: 'patentRange ', value: '', valueType: 'input' },
    { name: '申请单位', id: 'unit', value: '', valueType: 'input' },
    { name: '专利申请号', id: 'patentNumber', value: '', valueType: 'input' },
    { name: '发明人', id: 'creators', value: '', valueType: 'input' }
  ]
}, {
  name: '科研项目情况',
  id: 'techProject',
  records: [
    { name: '学号', id: 'sid', value: '', valueType: 'range' },
    { name: '姓名', id: 'name', value: '', valueType: 'range' },
    { name: '项目名称', id: 'proName', value: '', valueType: 'range' },
    { name: '主办单位', id: 'employer', value: '', valueType: 'input' },
    { name: '资助金额', id: 'money', value: '', valueType: 'input' },
    { name: '项目编号', id: 'proId', value: '', valueType: 'input' },
    { name: '类别', id: 'class', value: '', valueType: 'input' },
    { name: '指导老师', id: 'teacher', value: '', valueType: 'input' },
    { name: '立项时间', id: 'proTime', value: '', valueType: 'range' }
  ]
}]

export default tableData