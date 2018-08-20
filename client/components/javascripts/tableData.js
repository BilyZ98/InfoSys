var tableData = {
  basicInfo: {
    name: '基本信息',
    id: 'basicInfo',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      gender: { name: '性别', id: 'gender', value: '', display: true, valueType: 'select', options: ['男', '女'] },
      birthPlace: { name: '籍贯', id: 'birthPlace', value: '', display: true, valueType: 'select', options: ['安徽', '澳门', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江'] },
      ethnic: { name: '民族', id: 'ethnic', value: '', display: true, valueType: 'select', options: ['阿昌族', '白族', '保安族', '布朗族', '布依族', '藏族', '朝鲜族', '达斡尔族', '傣族', '德昂族', '东乡族', '侗族', '独龙族', '俄罗斯族', '鄂伦春族', '鄂温克族', '高山族', '哈尼族', '哈萨克族', '汉族', '赫哲族', '回族', '基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '傈僳族', '满族', '毛南族', '门巴族', '蒙古族', '苗族', '纳西族', '怒族', '普米族', '羌族', '撒拉族', '水族', '塔吉克族', '塔塔尔族', ' 土家族', ' 土族', ' 维吾尔族', ' 乌兹别克族', ' 锡伯族', '瑶族', '彝族', '裕固族', '壮族', '仡佬族', '仫佬族', '佤族', '珞巴族', '畲族'] },
      poliFace: { name: '政治面貌', id: 'poliFace', value: '', display: true, valueType: 'select', options: ['群众', '团员', '党员'] },
      idNum: { name: '身份证号码', id: 'idNum', value: '', display: true, valueType: 'input' },
      birthDate: { name: '出生年月日', id: 'birthDate', value: '', display: true, valueType: 'input' },
      tel: { name: '联系电话', id: 'tel', value: '', display: true, valueType: 'input' },
      mail: { name: '邮箱', id: 'mail', value: '', display: true, valueType: 'input' },
      wechat: { name: '微信', id: 'wechat', value: '', display: true, valueType: 'input' },
      qq: { name: 'QQ号', id: 'qq', value: '', display: true, valueType: 'input' },
      degree: { name: '培养层次', id: 'degree', value: '', display: true, valueType: 'select', options: ['本科', '硕士', '博士'] },
      stuGroup: { name: '学生类别', id: 'stuGroup', value: '', display: true, valueType: 'select', options: ['统招', '港澳台', '国际学生'] },
      grade: { name: '年级', id: 'grade', value: '', display: true, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      major: { name: '专业', id: 'major', value: '', display: true, valueType: 'input' },
      'class': { name: '行政班别', id: 'class', value: '', display: true, valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      dorm: { name: '宿舍楼栋', id: 'dorm', value: '', display: true, valueType: 'select', options: ['至善园', '明德园', '慎思园', '格致园'] },
      dormNumber: { name: '楼栋号', id: 'dormNumber', value: '', display: true, valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      dormRoom: { name: '宿舍房号', id: 'dormRoom', value: '', display: true, valueType: 'input' },
      speciality: { name: '特长', id: 'speciality', value: '', display: true, valueType: 'input' },
      highSchool: { name: '毕业中学', id: 'highSchool ', value: '', display: true, valueType: 'input' }
    }
  },
  family: {
    name: '家庭情况',
    id: 'family',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      homeAddress: { name: '家庭地址', id: 'homeAddress', value: '', display: true, valueType: 'input' },
      fatherName: { name: '父亲姓名', id: 'fatherName', value: '', display: true, valueType: 'input' },
      fatherTel: { name: '父亲电话', id: 'fatherTel', value: '', display: true, valueType: 'input' },
      fatherJob: { name: '父亲工作单位及职务', id: 'fatherJob', value: '', display: true, valueType: 'input' },
      motherName: { name: '母亲姓名', id: 'motherName', value: '', display: true, valueType: 'input' },
      motherTel: { name: '母亲电话', id: 'motherTel', value: '', display: true, valueType: 'input' },
      motherJob: { name: '母亲工作单位及职务', id: 'motherJob', value: '', display: true, valueType: 'input' },
      familyAveIncome: { name: '家庭人均月收入', id: 'familyAveIncome', value: '', display: true, valueType: 'input' },
      isHard: { name: '是否家庭经济困难学生(经学校认定)', id: 'isHard', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      hardDegree: { name: '困难等级', id: 'hardDegree', value: '', display: true, valueType: 'input' },
      hardFamDes: { name: '家庭经济困难情况简述', id: 'hardFamDes', value: '', display: true, valueType: 'input' }
    }
  },
  schoolRoll: {
    name: '学籍情况',
    id: 'schoolRoll',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      isAtRoll: { name: '学籍状态', id: 'isAtRoll', value: '', display: true, valueType: 'select', options: ['在籍', '在校'] },
      'class': { name: '教务班别', id: 'class', value: '', display: true, valueType: 'input' },
      studyYears: { name: '学制', id: 'studyYears', value: '', display: true, valueType: 'select', options: ['四年制', '五年制'] },
      timeInSchool: { name: '入学年月', id: 'timeInSchool', value: '', display: true, valueType: 'range' },
      isFee: { name: '缴费状态', id: 'isFee', value: '', display: true, valueType: 'select', options: ['已缴费', '已缴费'] },
      isArrive: { name: '注册（报到）状态', id: 'isArrive', value: '', display: true, valueType: 'select', options: ['已注册', '未注册'] },
      isRollChanged: { name: '在校期间学籍是否有变动', id: 'isRollChanged', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      changeTime: { name: '变动时间', id: 'changeTime', value: '', display: true, valueType: 'input' },
      changeClass: { name: '变动类别', id: 'changeClass', value: '', display: true, valueType: 'select', options: ['留级', '休学', '复学', '转专业'] },
      changeReason: { name: '变动原因', id: 'changeReason', value: '', display: true, valueType: 'input' },
      changeSchoolPage: { name: '学校批文', id: 'changeSchoolPage', value: '', display: true, valueType: 'input' }
    }
  },
  course: {
    name: '课程成绩记录',
    id: 'course',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      year: { name: '学年', id: 'year', value: '', display: true, valueType: 'range', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      semester: { name: '学期', id: 'semester', value: '', display: true, valueType: 'range', options: ['第一学期', '第二学期', '第三学期'] },
      courseName: { name: '课程名称', id: 'courseName', value: '', display: true, valueType: 'input' },
      courseId: { name: '课程编号', id: 'courseId', value: '', display: true, valueType: 'input' },
      courseClass: { name: '课程类别', id: 'courseClass', value: '', display: true, valueType: 'select', options: ['必修', '选修'] },
      courseProperty: { name: '课程性质', id: 'courseProperty', value: '', display: true, valueType: 'select', options: ['主修', '辅修'] },
      courseHour: { name: '学时', id: 'courseHour', value: '', display: true, valueType: 'input' },
      credit: { name: '学分', id: 'credit', value: '', display: true, valueType: 'input' },
      courseGrade: { name: '成绩', id: 'courseGrade', value: '', display: true, valueType: 'range' },
      gpa: { name: '绩点', id: 'gpa', value: '', display: true, valueType: 'range' },
      isPass: { name: '是否已通过', id: 'isPass', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      rebuild: { name: '重修补考标识', id: 'rebuild', value: '', display: true, valueType: 'select', options: ['重修', '补考'] },
      backup: { name: '备注', id: 'backup', value: '', display: true, valueType: 'input' }
    }
  },
  partyInfo: {
    name: '党员信息',
    id: 'partyInfo',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      isLeaguer: { name: '是否团员', id: 'isLeaguer', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      joinGroupTime: { name: '参加党章学习小组时间', id: 'joinGroupTime', value: '', display: true, valueType: 'input' },
      submitTime: { name: '递交入党申请书时间', id: 'submitTime', value: '', display: true, valueType: 'range' },
      activerTime: { name: '确定为入党积极分子时间', id: 'activerTime', value: '', display: true, valueType: 'input' },
      contacter: { name: '入党培养联系人', id: 'contacter', value: '', display: true, valueType: 'input' },
      isVerified: { name: '是否完成政审', id: 'isVerified', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      democracyTime: { name: '民主评议时间', id: 'democracyTime', value: '', display: true, valueType: 'input' },
      developerTime: { name: '确定为重点发展对象时间', id: 'developerTime', value: '', display: true, valueType: 'input' },
      partyTrainedTime: { name: '选送党校培训时间', id: 'partyTrainedTime', value: '', display: true, valueType: 'range' },
      introducerTime: { name: '确定入党介绍人时间', id: 'introducerTime', value: '', display: true, valueType: 'input' },
      introducer: { name: '入党介绍人', id: 'introducer', value: '', display: true, valueType: 'input' },
      hasAutobigraphy: { name: '是否有自传', id: 'hasAutobigraphy', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      hasApplicatiionForm: { name: '是否有入党志愿书', id: 'hasApplicatiionForm', value: '', display: true, valueType: 'select', options: ['是', '否'] },
      partyBranchTime: { name: '入党支部大会时间', id: 'partyBranchTime', value: '', display: true, valueType: 'range' },
      partyTalkTime: { name: '入党谈话时间', id: 'partyTalkTime', value: '', display: true, valueType: 'input' },
      partyTalker: { name: '入党谈话人', id: 'partyTalker', value: '', display: true, valueType: 'input' },
      probationaryTime: { name: '预备党员起始时间（党委批准时间）', id: 'probationaryTime', value: '', display: true, valueType: 'range' },
      partyOathTime: { name: '入党宣誓时间', id: 'partyOathTime', value: '', display: true, valueType: 'input' },
      fullSubTime: { name: '转正申请书时间', id: 'fullSubTime', value: '', display: true, valueType: 'input' },
      fullMeetingTime: { name: '转正支部大会时间', id: 'fullMeetingTime', value: '', display: true, valueType: 'range' },
      fullMemberTime: { name: '正式党员起始时间（党委批准时间）', id: 'fullMemberTime', value: '', display: true, valueType: 'range' },
      archiveTime: { name: '移交档案馆时间', id: 'archiveTime', value: '', display: true, valueType: 'input' },
      temporaryTime: { name: '暂缓就业起始时间', id: 'temporaryTime', value: '', display: true, valueType: 'input' },
      outTime: { name: '关系转出时间', id: 'outTime', value: '', display: true, valueType: 'range' },
      outUnit: { name: '关系转往单位名称', id: 'outUnit', value: '', display: true, valueType: 'input' }
    }
  },
  scholarship: {
    name: '获奖学金情况',
    id: 'scholarship',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      year: { name: '学年', id: 'year', value: '', display: true, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      shipClass: { name: '奖学金类别', id: 'shipClass', value: '', display: true, valueType: 'select', options: ['校内', '政府', '捐赠'] },
      shipName: { name: '奖学金名称', id: 'shipName', value: '', display: true, valueType: 'input' },
      shipAmount: { name: '奖励金额', id: 'shipAmount', value: '', display: true, valueType: 'range' }
    }
  },
  aid: {
    name: '获资助情况',
    id: 'aid',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      year: { name: '学年', id: 'year', value: '', display: true, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      aidClass: { name: '资助类别', id: 'aidClass', value: '', display: true, valueType: 'select', options: ['校内', '政府', '捐赠'] },
      aidProperty: { name: '资助性质', id: 'aidProperty', value: '', display: true, valueType: 'select', options: ['新评', '续评'] },
      aidName: { name: '资助名称', id: 'aidName', value: '', display: true, valueType: 'input' },
      aidAmount: { name: '资助金额', id: 'aidAmount', value: '', display: true, valueType: 'range' }
    }
  },
  loan: {
    name: '助学贷款',
    id: 'loan',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      submitYear: { name: '申请学年', id: 'submitYear', value: '', display: true, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      loanYears: { name: '贷款年数', id: 'loanYears', value: '', display: true, valueType: 'input' },
      moneyPerYear: { name: '每年放款金额', id: 'moneyPerYear', value: '', display: true, valueType: 'input' },
      loanTotal: { name: '贷款总额', id: 'loanTotal', value: '', display: true, valueType: 'input' }
    }
  },
  cadre: {
    name: '学生干部任职情况',
    id: 'cadre',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      year: { name: '学年', id: 'year', value: '', display: true, valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      cadreClass: { name: '职务类别', id: 'cadreClass', value: '', display: true, valueType: 'select', options: ['学生会', '团委', '研究生会', '学生学术发展中心', '职发办', '社团', '院队', '班干部'] },
      cadreName: { name: '职务名称', id: 'cadreName', value: '', display: true, valueType: 'input' },
      cadreJiBie: { name: '职务级别', id: 'cadreJiBie', value: '', display: true, valueType: 'select', options: ['校级', '校区级', '院级'] }
    }
  },
  award: {
    name: '获得奖励情况',
    id: 'award',
    records: {
      award: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      stuClass: { name: '学生类别', id: 'stuClass', value: '', display: true, valueType: 'select', options: ['本科生', '硕士生', '博士生'] },
      awardName: { name: '奖励名称', id: 'awardName', value: '', display: true, valueType: 'input' },
      awardClass: { name: '奖励等级', id: 'awardClass', value: '', display: true, valueType: 'input' },
      employer: { name: '颁发（主办）单位', id: 'employer', value: '', display: true, valueType: 'input' },
      awardJiBie: { name: '级别', id: 'awardJiBie', value: '', display: true, valueType: 'input' },
      awardYearMonth: { name: '获奖年月', id: 'awardYearMonth', value: '', display: true, valueType: 'range' },
      teacher: { name: '指导老师', id: 'teacher', value: '', display: true, valueType: 'input' }
    }
  },
  paper: {
    name: '发表论文情况',
    id: 'paper',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      title: { name: '题目', id: 'title', value: '', display: true, valueType: 'input' },
      authors: { name: '作者序', id: 'authors', value: '', display: true, valueType: 'input' },
      journal: { name: '刊物', id: 'journal', value: '', display: true, valueType: 'input' },
      serialNumber: { name: '期号', id: 'serialNumber', value: '', display: true, valueType: 'input' },
      pagesRange: { name: '页码范围', id: 'pagesRange', value: '', display: true, valueType: 'range' },
      paperGrade: { name: '刊物级别', id: 'paperGrade', value: '', display: true, valueType: 'input' },
      paperClass: { name: '论文类型', id: 'paperClass', value: '', display: true, valueType: 'input' },
      time: { name: '发表时间', id: 'time', value: '', display: true, valueType: 'range' },
      insTeacher: { name: '指导老师', id: 'insTeacher', value: '', display: true, valueType: 'input' }
    }
  },
  patent: {
    name: '获得专利情况',
    id: 'patent',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'input' },
      patentName: { name: '专利名称', id: 'patentName', value: '', display: true, valueType: 'input' },
      'class': { name: '类别', id: 'class', value: '', display: true, valueType: 'input' },
      submitTime: { name: '申请时间', id: 'submitTime', value: '', display: true, valueType: 'input' },
      approvalTime: { name: '授权时间', id: 'approvalTime', value: '', display: true, valueType: 'input' },
      patentRange: { name: '专利范围', id: 'patentRange', value: '', display: true, valueType: 'input' },
      unit: { name: '申请单位', id: 'unit', value: '', display: true, valueType: 'input' },
      patentNumber: { name: '专利申请号', id: 'patentNumber', value: '', display: true, valueType: 'input' },
      creators: { name: '发明人', id: 'creators', value: '', display: true, valueType: 'input' }
    }
  },
  techProject: {
    name: '科研项目情况',
    id: 'techProject',
    records: {
      sid: { name: '学号', id: 'sid', value: '', display: true, valueType: 'range' },
      name: { name: '姓名', id: 'name', value: '', display: true, valueType: 'range' },
      proName: { name: '项目名称', id: 'proName', value: '', display: true, valueType: 'range' },
      employer: { name: '主办单位', id: 'employer', value: '', display: true, valueType: 'input' },
      money: { name: '资助金额', id: 'money', value: '', display: true, valueType: 'input' },
      proId: { name: '项目编号', id: 'proId', value: '', display: true, valueType: 'input' },
      'class': { name: '类别', id: 'class', value: '', display: true, valueType: 'input' },
      teacher: { name: '指导老师', id: 'teacher', value: '', display: true, valueType: 'input' },
      proTime: { name: '立项时间', id: 'proTime', value: '', display: true, valueType: 'range' }
    }
  }
}

export default tableData