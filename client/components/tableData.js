var tableData = [{
  name: '基本信息',
  id: 'basicInfo',
  records: [
    { name: '学号', id: 'sid', value: '', isSelect: false },
    { name: '姓名', id: 'name', value: '', isSelect: false },
    { name: '性别', id: 'gender', value: '', isSelect: true, options: ['男', '女'] },
    { name: '籍贯', id: 'birthPlace', value: '', isSelect: true, options: ['安徽', '澳门', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江'] },
    { name: '民族', id: 'ethnic', value: '', isSelect: true, options: ['阿昌族', '白族', '保安族', '布朗族', '布依族', '藏族', '朝鲜族', '达斡尔族', '傣族', '德昂族', '东乡族', '侗族', '独龙族', '俄罗斯族', '鄂伦春族', '鄂温克族', '高山族', '哈尼族', '哈萨克族', '汉族', '赫哲族', '回族', '基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '傈僳族', '满族', '毛南族', '门巴族', '蒙古族', '苗族', '纳西族', '怒族', '普米族', '羌族', '撒拉族', '水族', '塔吉克族', '塔塔尔族', ' 土家族', ' 土族', ' 维吾尔族', ' 乌兹别克族', ' 锡伯族', '瑶族', '彝族', '裕固族', '壮族', '仡佬族', '仫佬族', '佤族', '珞巴族', '畲族'] },
    { name: '政治面貌', id: 'poliFace', value: '', isSelect: true, options: ['群众', '团员', '党员'] },
    { name: '身份证号码', id: 'idNum', value: '', isSelect: false },
    { name: '出生年月日', id: 'birthDate', value: '', isSelect: false },
    { name: '联系电话', id: 'tel', value: '', isSelect: false },
    { name: '邮箱', id: 'mail', value: '', isSelect: false },
    { name: '微信', id: 'wechat', value: '', isSelect: false },
    { name: 'QQ号', id: 'qq', value: '', isSelect: false },
    { name: '培养层次', id: 'degree', value: '', isSelect: true, options: ['本科', '硕士', '博士'] },
    { name: '学生类别', id: 'stuGroup', value: '', isSelect: true, options: ['统招', '港澳台', '国际学生'] },
    { name: '年级', id: 'grade', value: '', isSelect: true, options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '专业', id: 'major', value: '', isSelect: false },
    { name: '行政班别', id: 'class', value: '', isSelect: true, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
    { name: '宿舍楼栋', id: 'dorm', value: '', isSelect: true, options: ['至善园', '明德园', '慎思园', '格致园'] },
    { name: '楼栋号', id: 'dorm-number', value: '', isSelect: true, options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
    { name: '宿舍房号', id: 'dormRoom', value: '', isSelect: false },
    { name: '特长', id: 'speciality', value: '', isSelect: false },
    { name: '毕业中学', id: 'highSchool ', value: '', isSelect: false }
  ]
}, {
  name: '家庭情况',
  id: 'family',
  records: [
    { name: '家庭地址', id: 'homeAddress', value: '', isSelect: false },
    { name: '父亲姓名', id: 'fatherName', value: '', isSelect: false },
    { name: '父亲电话', id: 'fatherTel', value: '', isSelect: false },
    { name: '父亲工作单位及职务', id: 'fatherJob', value: '', isSelect: false },
    { name: '母亲姓名', id: 'motherName', value: '', isSelect: false },
    { name: '母亲电话', id: 'motherTel', value: '', isSelect: false },
    { name: '母亲工作单位及职务', id: 'motherJob', value: '', isSelect: false },
    { name: '家庭人均月收入', id: 'familyAveIncome', value: '', isSelect: false },
    { name: '是否家庭经济困难学生(经学校认定)', id: 'isHard', value: '', isSelect: true, options: ['是', '否'] },
    { name: '困难等级', id: 'hardDegree', value: '', isSelect: false },
    { name: '家庭经济困难情况简述', id: 'hardFamDes', value: '', isSelect: false }
  ]
}, {
  name: '学籍情况',
  id: 'schoolRoll',
  records: [
    { name: '学籍状态', id: 'isAtRoll', value: '', isSelect: true, options: ['在籍', '在校'] },
    { name: '教务班别', id: 'class', value: '', isSelect: false },
    { name: '学制', id: 'studyYears', value: '', isSelect: true, options: ['四年制', '五年制'] },
    { name: '入学年月', id: 'timeInSchool', value: '', isSelect: false },
    { name: '缴费状态', id: 'isFee', value: '', isSelect: true, options: ['已缴费', '已缴费'] },
    { name: '注册（报到）状态', id: 'isArrive', value: '', isSelect: true, options: ['已注册', '未注册'] },
    { name: '在校期间学籍是否有变动', id: 'isRollChanged', value: '', isSelect: true, options: ['是', '否'] },
    { name: '变动时间', id: 'changeTime', value: '', isSelect: false },
    { name: '变动类别', id: 'changeClass', value: '', isSelect: true, options: ['留级', '休学', '复学', '转专业'] },
    { name: '变动原因', id: 'changeReason', value: '', isSelect: false },
    { name: '学校批文', id: 'changeSchoolPage', value: '', isSelect: false }
  ]
}, {
  name: '课程成绩记录',
  id: 'course',
  records: [
    { name: '学年', id: 'year', value: '', isSelect: true, options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '学期', id: 'semester', value: '', isSelect: true, options: ['第一学期', '第二学期', '第三学期'] },
    { name: '课程名称', id: 'courseName', value: '', isSelect: false },
    { name: '课程编号', id: 'courseId', value: '', isSelect: false },
    { name: '课程类别', id: 'courseClass', value: '', isSelect: true, options: ['必修', '选修'] },
    { name: '课程性质', id: 'courseProperty', value: '', isSelect: true, options: ['主修', '辅修'] },
    { name: '学时', id: 'courseHour', value: '', isSelect: false },
    { name: '学分', id: 'credit', value: '', isSelect: false },
    { name: '成绩', id: 'courseGrade', value: '', isSelect: false },
    { name: '绩点', id: 'gpa', value: '', isSelect: false },
    { name: '是否已通过', id: 'isPass', value: '', isSelect: true, options: ['是', '否'] },
    { name: '重修补考标识', id: 'rebuild', value: '', isSelect: true, options: ['重修', '补考'] },
    { name: '备注', id: 'backup', value: '', isSelect: false }
  ]
}, {
  name: '党员信息',
  id: 'partyInfo',
  records: [
    { name: '是否团员', id: 'isLeaguer', value: '', isSelect: true, options: ['是', '否'] },
    { name: '参加党章学习小组时间', id: 'joinGroupTime', value: '', isSelect: false },
    { name: '递交入党申请书时间', id: 'submitTime', value: '', isSelect: false },
    { name: '确定为入党积极分子时间', id: 'activerTime', value: '', isSelect: false },
    { name: '入党培养联系人', id: 'contacter', value: '', isSelect: false },
    { name: '是否完成政审', id: 'isVerified', value: '', isSelect: true, options: ['是', '否'] },
    { name: '民主评议时间', id: 'democracyTime', value: '', isSelect: false },
    { name: '确定为重点发展对象时间', id: 'developerTime', value: '', isSelect: false },
    { name: '选送党校培训时间', id: 'partyTrainedTime', value: '', isSelect: false },
    { name: '确定入党介绍人时间', id: 'introducerTime', value: '', isSelect: false },
    { name: '入党介绍人', id: 'introducer', value: '', isSelect: false },
    { name: '是否有自传', id: 'hasAutobigraphy', value: '', isSelect: true, options: ['是', '否'] },
    { name: '是否有入党志愿书', id: 'hasApplicatiionForm', value: '', isSelect: true, options: ['是', '否'] },
    { name: '入党支部大会时间', id: 'partyBranchTime', value: '', isSelect: false },
    { name: '入党谈话时间', id: 'partyTalkTime', value: '', isSelect: false },
    { name: '入党谈话人', id: 'partyTalker', value: '', isSelect: false },
    { name: '预备党员起始时间（党委批准时间）', id: 'probationaryTime', value: '', isSelect: false },
    { name: '入党宣誓时间', id: 'partyOathTime', value: '', isSelect: false },
    { name: '转正申请书时间', id: 'fullSubTime', value: '', isSelect: false },
    { name: '转正支部大会时间', id: 'fullMeetingTime', value: '', isSelect: false },
    { name: '正式党员起始时间（党委批准时间）', id: 'fullMemberTime', value: '', isSelect: false },
    { name: '移交档案馆时间', id: 'archiveTime', value: '', isSelect: false },
    { name: '暂缓就业起始时间', id: 'temporaryTime', value: '', isSelect: false },
    { name: '关系转出时间', id: 'outTime', value: '', isSelect: false },
    { name: '关系转往单位名称', id: 'outUnit', value: '', isSelect: false }
  ]
}, {
  name: '获奖学金情况',
  id: 'scholarship',
  records: [
    { name: '学年', id: 'year', value: '', isSelect: true, options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '奖学金类别', id: 'shipClass', value: '', isSelect: true, options: ['校内', '政府', '捐赠'] },
    { name: '奖学金名称', id: 'shipName', value: '', isSelect: false },
    { name: '奖励金额', id: 'shipAmount', value: '', isSelect: false }
  ]
}, {
  name: '获资助情况',
  id: 'aid',
  records: [
    { name: '学年', id: 'year', value: '', isSelect: true, options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '资助类别', id: 'aidClass', value: '', isSelect: true, options: ['校内', '政府', '捐赠'] },
    { name: '资助性质', id: 'aidProperty', value: '', isSelect: true, options: ['新评', '续评'] },
    { name: '资助名称', id: 'aidName', value: '', isSelect: false },
    { name: '资助金额', id: 'aidAmount', value: '', isSelect: false }
  ]
}, {
  name: '助学贷款',
  id: 'loan',
  records: [
    { name: '申请学年', id: 'submitYear', value: '', isSelect: true, options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '贷款年数', id: 'loanYears', value: '', isSelect: false },
    { name: '每年放款金额', id: 'moneyPerYear', value: '', isSelect: false },
    { name: '贷款总额', id: 'loanTotal', value: '', isSelect: false }
  ]
}, {
  name: '学生干部任职情况',
  id: 'cadre',
  records: [
    { name: '学年', id: 'year', value: '', isSelect: true, options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
    { name: '职务类别', id: 'cadreClass', value: '', isSelect: true, options: ['学生会', '团委', '研究生会', '学生学术发展中心', '职发办', '社团', '院队', '班干部'] },
    { name: '职务名称', id: 'cadreName', value: '', isSelect: false },
    { name: '职务级别', id: 'cadreJiBie', value: '', isSelect: true, options: ['校级', '校区级', '院级'] }
  ]
}, {
  name: '获得奖励情况',
  id: 'award',
  records: [
    { name: '学生类别', id: 'stuClass', value: '', isSelect: true, options: ['本科生', '硕士生', '博士生'] },
    { name: '奖励名称', id: 'awardName', value: '', isSelect: false },
    { name: '奖励等级', id: 'awardClass', value: '', isSelect: false },
    { name: '颁发（主办）单位', id: 'employer', value: '', isSelect: false },
    { name: '级别', id: 'awardJiBie', value: '', isSelect: false },
    { name: '获奖年月', id: 'awardYearMonth', value: '', isSelect: false },
    { name: '指导老师', id: 'teacher', value: '', isSelect: false }
  ]
}, {
  name: '发表论文情况',
  id: 'paper',
  records: [
    { name: '题目', id: 'title', value: '', isSelect: false },
    { name: '作者序', id: 'authors', value: '', isSelect: false },
    { name: '刊物', id: 'journal', value: '', isSelect: false },
    { name: '期号', id: 'serialNumber', value: '', isSelect: false },
    { name: '页码范围', id: 'pagesRange', value: '', isSelect: false },
    { name: '刊物级别', id: 'paperGrade', value: '', isSelect: false },
    { name: '论文类型', id: 'paperClass', value: '', isSelect: false },
    { name: '发表时间', id: 'time', value: '', isSelect: false },
    { name: '指导老师', id: 'insTeacher', value: '', isSelect: false }
  ]
}, {
  name: '获得专利情况',
  id: 'patent',
  records: [
    { name: '专利名称', id: 'patentName', value: '', isSelect: false },
    { name: '类别', id: 'class', value: '', isSelect: false },
    { name: '申请时间', id: 'submitTime', value: '', isSelect: false },
    { name: '授权时间', id: 'approvalTime', value: '', isSelect: false },
    { name: '专利范围', id: 'patentRange ', value: '', isSelect: false },
    { name: '申请单位', id: 'unit', value: '', isSelect: false },
    { name: '专利申请号', id: 'patentNumber', value: '', isSelect: false },
    { name: '发明人', id: 'creators', value: '', isSelect: false }
  ]
}, {
  name: '科研项目情况',
  id: 'techProject',
  records: [
    { name: '项目名称', id: 'proName', value: '', isSelect: false },
    { name: '主办单位', id: 'employer', value: '', isSelect: false },
    { name: '资助金额', id: 'money', value: '', isSelect: false },
    { name: '项目编号', id: 'proId', value: '', isSelect: false },
    { name: '类别', id: 'class', value: '', isSelect: false },
    { name: '指导老师', id: 'teacher', value: '', isSelect: false },
    { name: '立项时间', id: 'proTime', value: '', isSelect: false }
  ]
}]

export default tableData