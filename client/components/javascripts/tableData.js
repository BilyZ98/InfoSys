/**name: 字段中文名, id: 字段英文名,  value: 字段初始值, isPrimary: 在数据库中是否为主键
 * display: 在manager页面是否显示, detailstat: 是否是可以高级统计的输入值, value: '', studentChangAble:, valueType: 值的类型
 */
export default {
  basicInfo: {
    name: '基本信息',
    id: 'basicInfo',
    tableStudentChangable: true,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      gender: { name: '性别', id: 'gender', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['男', '女'] },
      birthPlace: { name: '籍贯', id: 'birthPlace', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['安徽', '澳门', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江'] },
      ethnic: { name: '民族', id: 'ethnic', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['汉族', '阿昌族', '白族', '保安族', '布朗族', '布依族', '藏族', '朝鲜族', '达斡尔族', '傣族', '德昂族', '东乡族', '侗族', '独龙族', '俄罗斯族', '鄂伦春族', '鄂温克族', '高山族', '哈尼族', '哈萨克族', '赫哲族', '回族', '基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '傈僳族', '满族', '毛南族', '门巴族', '蒙古族', '苗族', '纳西族', '怒族', '普米族', '羌族', '撒拉族', '水族', '塔吉克族', '塔塔尔族', ' 土家族', ' 土族', ' 维吾尔族', ' 乌兹别克族', ' 锡伯族', '瑶族', '彝族', '裕固族', '壮族', '仡佬族', '仫佬族', '佤族', '珞巴族', '畲族'] },
      poliFace: { name: '政治面貌', id: 'poliFace', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['群众', '团员', '党员'] },
      idNum: { name: '身份证号码', id: 'idNum', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      birthDate: { name: '出生年月日', id: 'birthDate', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      tel: { name: '联系电话', id: 'tel', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      mail: { name: '邮箱', id: 'mail', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      wechat: { name: '微信', id: 'wechat', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      qq: { name: 'QQ号', id: 'qq', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      degree: { name: '培养层次', id: 'degree', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['本科', '硕士', '博士'] },
      stuGroup: { name: '学生类别', id: 'stuGroup', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['统招', '港澳台', '国际学生'] },
      grade: { name: '年级', id: 'grade', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      major: { name: '专业', id: 'major', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      'class': { name: '行政班别', id: 'class', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      dorm: { name: '宿舍楼栋', id: 'dorm', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['至善园', '明德园', '慎思园', '格致园'] },
      dormNumber: { name: '楼栋号', id: 'dormNumber', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      dormRoom: { name: '宿舍房号', id: 'dormRoom', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      speciality: { name: '特长', id: 'speciality', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      highSchool: { name: '毕业中学', id: 'highSchool', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  family: {
    name: '家庭情况',
    id: 'family',
    tableStudentChangable: true,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      homeAddress: { name: '家庭地址', id: 'homeAddress', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      fatherName: { name: '父亲姓名', id: 'fatherName', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      fatherTel: { name: '父亲电话', id: 'fatherTel', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      fatherJob: { name: '父亲工作单位及职务', id: 'fatherJob', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      motherName: { name: '母亲姓名', id: 'motherName', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      motherTel: { name: '母亲电话', id: 'motherTel', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      motherJob: { name: '母亲工作单位及职务', id: 'motherJob', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      familyAveIncome: { name: '家庭人均月收入', id: 'familyAveIncome', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      isHard: { name: '是否家庭经济困难', id: 'isHard', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      hardDegree: { name: '困难等级', id: 'hardDegree', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      hardFamDes: { name: '家庭经济困难情况', id: 'hardFamDes', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  schoolRoll: {
    name: '学籍情况',
    id: 'schoolRoll',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      isAtRoll: { name: '学籍状态', id: 'isAtRoll', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['在籍', '在校'] },
      'class': { name: '教务班别', id: 'class', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      studyYears: { name: '学制', id: 'studyYears', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['四年制', '五年制'] },
      timeInSchool: { name: '入学年月', id: 'timeInSchool', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      isFee: { name: '缴费状态', id: 'isFee', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['已缴费', '已缴费'] },
      isArrive: { name: '注册（报到）状态', id: 'isArrive', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['已注册', '未注册'] },
      isRollChanged: { name: '学籍是否有变动', id: 'isRollChanged', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      changeTime: { name: '变动时间', id: 'changeTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      changeClass: { name: '变动类别', id: 'changeClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['留级', '休学', '复学', '转专业'] },
      changeReason: { name: '变动原因', id: 'changeReason', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      changeSchoolPage: { name: '学校批文', id: 'changeSchoolPage', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  course: {
    name: '课程成绩记录',
    id: 'course',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      year: { name: '学年', id: 'year', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'range', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      semester: { name: '学期', id: 'semester', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'range', options: ['第一学期', '第二学期', '第三学期'] },
      courseName: { name: '课程名称', id: 'courseName', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      courseId: { name: '课程编号', id: 'courseId', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      courseClass: { name: '课程类别', id: 'courseClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['必修', '选修'] },
      courseProperty: { name: '课程性质', id: 'courseProperty', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['主修', '辅修'] },
      courseHour: { name: '学时', id: 'courseHour', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      credit: { name: '学分', id: 'credit', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      courseGrade: { name: '成绩', id: 'courseGrade', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      GPA: { name: '绩点', id: 'GPA', isPrimary: false, display: true, detailstat: true, value: '', studentChangAble: false, valueType: 'range' },
      isPass: { name: '是否已通过', id: 'isPass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      rebuild: { name: '重修补考标识', id: 'rebuild', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['重修', '补考'] },
      backup: { name: '备注', id: 'backup', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  /*course2: {
    name: '挂科学生',
    records: {
      sid
    }
  }*/
  partyInfo: {
    name: '党员信息',
    id: 'partyInfo',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      isLeaguer: { name: '是否团员', id: 'isLeaguer', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      joinGroupTime: { name: '参加党章学习小组时间', id: 'joinGroupTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      submitTime: { name: '递交入党申请书时间', id: 'submitTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      activerTime: { name: '确定入党积极分子时间', id: 'activerTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      contacter: { name: '入党培养联系人', id: 'contacter', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      isVerified: { name: '是否完成政审', id: 'isVerified', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      democracyTime: { name: '民主评议时间', id: 'democracyTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      developerTime: { name: '确定重点发展对象时间', id: 'developerTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      partyTrainedTime: { name: '选送党校培训时间', id: 'partyTrainedTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      introducerTime: { name: '确定入党介绍人时间', id: 'introducerTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      introducer: { name: '入党介绍人', id: 'introducer', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      hasAutobigraphy: { name: '是否有自传', id: 'hasAutobigraphy', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      hasApplicationForm: { name: '是否有入党志愿书', id: 'hasApplicationForm', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['是', '否'] },
      partyBranchTime: { name: '入党支部大会时间', id: 'partyBranchTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      partyTalkTime: { name: '入党谈话时间', id: 'partyTalkTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      partyTalker: { name: '入党谈话人', id: 'partyTalker', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      probationaryTime: { name: '预备党员起始时间', id: 'probationaryTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      partyOathTime: { name: '入党宣誓时间', id: 'partyOathTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      fullSubTime: { name: '转正申请书时间', id: 'fullSubTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      fullMeetingTime: { name: '转正支部大会时间', id: 'fullMeetingTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      fullMemberTime: { name: '正式党员起始时间', id: 'fullMemberTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      archiveTime: { name: '移交档案馆时间', id: 'archiveTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      temporaryTime: { name: '暂缓就业起始时间', id: 'temporaryTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      outTime: { name: '关系转出时间', id: 'outTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      outUnit: { name: '关系转往单位名称', id: 'outUnit', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  scholarship: {
    name: '获奖学金情况',
    id: 'scholarship',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      year: { name: '学年', id: 'year', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      shipClass: { name: '奖学金类别', id: 'shipClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['校内', '政府', '捐赠'] },
      shipName: { name: '奖学金名称', id: 'shipName', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      shipAmount: { name: '奖励金额', id: 'shipAmount', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' }
    }
  },
  aid: {
    name: '获资助情况',
    id: 'aid',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      year: { name: '学年', id: 'year', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      aidClass: { name: '资助类别', id: 'aidClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['校内', '政府', '捐赠'] },
      aidProperty: { name: '资助性质', id: 'aidProperty', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['新评', '续评'] },
      aidName: { name: '资助名称', id: 'aidName', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      aidAmount: { name: '资助金额', id: 'aidAmount', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' }
    }
  },
  loan: {
    name: '助学贷款',
    id: 'loan',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      submitYear: { name: '申请学年', id: 'submitYear', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      loanYears: { name: '贷款年数', id: 'loanYears', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      moneyPerYear: { name: '每年放款金额', id: 'moneyPerYear', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      loanTotal: { name: '贷款总额', id: 'loanTotal', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  cadre: {
    name: '学生干部任职情况',
    id: 'cadre',
    tableStudentChangable: true,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      year: { name: '学年', id: 'year', isPrimary: true, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      cadreClass: { name: '职务类别', id: 'cadreClass', isPrimary: true, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['学生会', '团委', '研究生会', '学生学术发展中心', '职发办', '社团', '院队', '班干部'] },
      cadreName: { name: '职务名称', id: 'cadreName', isPrimary: true, display: true, value: '', studentChangAble: true, valueType: 'input' },
      cadreJiBie: { name: '职务级别', id: 'cadreJiBie', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['校级', '校区级', '院级'] }
    }
  },
  award: {
    name: '获得奖励情况',
    id: 'award',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      stuClass: { name: '学生类别', id: 'stuClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['本科生', '硕士生', '博士生'] },
      awardName: { name: '奖励名称', id: 'awardName', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      awardClass: { name: '奖励等级', id: 'awardClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      employer: { name: '颁发（主办）单位', id: 'employer', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      awardJiBie: { name: '级别', id: 'awardJiBie', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      awardYearMonth: { name: '获奖年月', id: 'awardYearMonth', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'range' },
      teacher: { name: '指导老师', id: 'teacher', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  paper: {
    name: '发表论文情况',
    id: 'paper',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      title: { name: '题目', id: 'title', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      authors: { name: '作者序', id: 'authors', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      journal: { name: '刊物', id: 'journal', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      serialNumber: { name: '期号', id: 'serialNumber', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      pagesRange: { name: '页码范围', id: 'pagesRange', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' },
      paperGrade: { name: '刊物级别', id: 'paperGrade', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      paperClass: { name: '论文类型', id: 'paperClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      time: { name: '发表时间', id: 'time', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'range' },
      insTeacher: { name: '指导老师', id: 'insTeacher', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  patent: {
    name: '获得专利情况',
    id: 'patent',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      patentName: { name: '专利名称', id: 'patentName', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      'class': { name: '类别', id: 'class', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      submitTime: { name: '申请时间', id: 'submitTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      approvalTime: { name: '授权时间', id: 'approvalTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      patentRange: { name: '专利范围', id: 'patentRange', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      unit: { name: '申请单位', id: 'unit', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      patentNumber: { name: '专利申请号', id: 'patentNumber', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      creators: { name: '发明人', id: 'creators', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' }
    }
  },
  techProject: {
    name: '科研项目情况',
    id: 'techProject',
    tableStudentChangable: false,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      proName: { name: '项目名称', id: 'proName', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      employer: { name: '主办单位', id: 'employer', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      money: { name: '资助金额', id: 'money', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      proId: { name: '项目编号', id: 'proId', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      'class': { name: '类别', id: 'class', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      teacher: { name: '指导老师', id: 'teacher', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input' },
      proTime: { name: '立项时间', id: 'proTime', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'range' }
    }
  },
  HMT: {
    name: '港澳台学生信息',
    id: 'HMT',
    tableStudentChangable: true,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input' },
      name: { name: '姓名', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      ancesHome: { name: '祖籍', id: 'ancesHome', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      interest: { name: '兴趣特长', id: 'interest', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      religion: { name: '宗教信仰', id: 'religion', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      mail: { name: '邮箱', id: 'mail', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      wechat: { name: '微信', id: 'wechat', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      homeAddress: { name: '家庭地址', id: 'homeAddress', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      ecoContact: { name: '经济联系人姓名', id: 'ecoContact', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      ecoTel: { name: '经济联系人号码', id: 'ecoTel', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      HMTIDNum: { name: '港澳台居民身份证号码', id: 'HMTIDNum', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      homePermitNum: { name: '回乡证/台胞证号码', id: 'homePermitNum', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' }
    }
  },
  internationalStudent: {
    name: '国际生',
    id: 'internationalStudent',
    tableStudentChangable: true,
    records: {
      sid: { name: '学号', id: 'sid', isPrimary: true, display: true, value: '', studentChangAble: false, valueType: 'input'},
      passportName: { name: '护照姓名', id: 'passportName', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      studentClass: { name: '学生类别', id: 'studentClass', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['统招', '港澳台', '国际学生'] },
      chineseName: {name: '中文姓名', id: 'chineseName', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      gender: { name: '性别', id: 'gender', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['男', '女'] },
      nationality: { name: '国籍', id: 'nationality', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      passportNum: { name: '护照号码', id: 'passportNum', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      school: { name: '院系', id: 'school', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      major: { name: '专业', id: 'major', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      tutor: { name: '导师姓名', id: 'tutor', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      visaClass: { name: '签证证件类型', id: 'visaClass', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['X1', 'X2', '居留许可证', '其它']},
      residenceReason: { name: '居留许可事由', id: 'residenceReason', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['学习', '其它']},
      visaExpire: { name: '签证或居留许可到期日期', id: 'visaExpire', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      remark: { name: '留办备注', id: 'remark', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      religion: { name: '宗教信仰', id: 'religion', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      isEthnicChinese: { name: '是否华裔', id: 'isEthnicChinese', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['是', '否']},
      clubJoiningDescription: { name: '参加社团情况', id: 'clubJoiningDescription', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      activityTakingDescription: { name: '参加校内活动情况', id: 'activityTakingDescription', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      abnormalSituation: { name: '违法违纪或行为异常情况', id: 'abnormalSituation', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      tel: { name: '联系电话', id: 'tel', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input' },
      homeAddress: { name: '实际住址', id: 'homeAddress', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'},
      homeInSchool: { name: '住宿地址', id: 'homeInSchool', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['校内', '校外']},
      same: { name: '实际住址与登记是否一致', id: 'same', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'select', options: ['是', '否']},
      dormRegistryCopy: { name: '住宿登记表复印件', id: 'dormRegistryCopy', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'file'},
      visaCopy: { name: '签证/居留证复印件', id: 'visaCopy', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'file'},
      passportCopy: { name: '护照复印件', id: 'passportCopy', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'file'},
      notCompleteReason: { name: '材料不齐全的原因', id: 'notCompleteReason', isPrimary: false, display: true, value: '', studentChangAble: true, valueType: 'input'}
    },
    winners: {
      name: '学生科技竞赛获奖记录',
      id: 'winners',
      tableStudentChangable: true,
      records: {
        id: { name: '序号', id: 'id', isPrimary: true, display: false, value: '', studentChangAble: false, valueType: 'input'},
        name: { name: '名字', id: 'name', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        sid: { name: '学号', id: 'sid', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        organizer: { name: '主办单位', id: 'organizer', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        comClass: { name: '竞赛类别', id: 'comClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'select', options: ['国际级', '国家级', '省级', '市级', '校级']},
        rewardClass: { name: '获奖等级', id: 'rewardClass', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        rewardName: { name: '奖项', id: 'rewardName', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        instructor: { name: '指导老师', id: 'instructor', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        seniorSid: { name: '研究生学长学号', id: 'seniorSid', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        seniorName: { name: '研究生学长姓名', id: 'seniorName', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        principal: { name: '对接企业及负责人', id: 'principal', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'},
        principalTel: {name: '企业负责人联系方式', id: 'principalTel', isPrimary: false, display: true, value: '', studentChangAble: false, valueType: 'input'}
      }
    }
  }
}