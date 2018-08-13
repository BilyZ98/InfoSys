var tableDataTest = {
  basicInfo: {
    name: '基本信息',
    id: 'basicInfo',
    records: {
      sid: { name: '学号', id: 'sid', value: '', valueType: 'input' },
      name: { name: '姓名', id: 'name', value: '', valueType: 'input' },
      gender: { name: '性别', id: 'gender', value: '', valueType: 'select', options: ['男', '女'] },
      birthPlace: { name: '籍贯', id: 'birthPlace', value: '', valueType: 'select', options: ['安徽', '澳门', '北京', '重庆', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '山西', '陕西', '上海', '四川', '台湾', '天津', '西藏', '香港', '新疆', '云南', '浙江'] },
      ethnic: { name: '民族', id: 'ethnic', value: '', valueType: 'select', options: ['阿昌族', '白族', '保安族', '布朗族', '布依族', '藏族', '朝鲜族', '达斡尔族', '傣族', '德昂族', '东乡族', '侗族', '独龙族', '俄罗斯族', '鄂伦春族', '鄂温克族', '高山族', '哈尼族', '哈萨克族', '汉族', '赫哲族', '回族', '基诺族', '京族', '景颇族', '柯尔克孜族', '拉祜族', '黎族', '傈僳族', '满族', '毛南族', '门巴族', '蒙古族', '苗族', '纳西族', '怒族', '普米族', '羌族', '撒拉族', '水族', '塔吉克族', '塔塔尔族', ' 土家族', ' 土族', ' 维吾尔族', ' 乌兹别克族', ' 锡伯族', '瑶族', '彝族', '裕固族', '壮族', '仡佬族', '仫佬族', '佤族', '珞巴族', '畲族'] },
      poliFace: { name: '政治面貌', id: 'poliFace', value: '', valueType: 'select', options: ['群众', '团员', '党员'] },
      idNum: { name: '身份证号码', id: 'idNum', value: '', valueType: 'input' },
      birthDate: { name: '出生年月日', id: 'birthDate', value: '', valueType: 'input' },
      tel: { name: '联系电话', id: 'tel', value: '', valueType: 'input' },
      mail: { name: '邮箱', id: 'mail', value: '', valueType: 'input' },
      wechat: { name: '微信', id: 'wechat', value: '', valueType: 'input' },
      qq: { name: 'QQ号', id: 'qq', value: '', valueType: 'input' },
      degree: { name: '培养层次', id: 'degree', value: '', valueType: 'select', options: ['本科', '硕士', '博士'] },
      stuGroup: { name: '学生类别', id: 'stuGroup', value: '', valueType: 'select', options: ['统招', '港澳台', '国际学生'] },
      grade: { name: '年级', id: 'grade', value: '', valueType: 'select', options: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'] },
      major: { name: '专业', id: 'major', value: '', valueType: 'input' },
      'class': { name: '行政班别', id: 'class', value: '', valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      dorm: { name: '宿舍楼栋', id: 'dorm', value: '', valueType: 'select', options: ['至善园', '明德园', '慎思园', '格致园'] },
      'dorm-number': { name: '楼栋号', id: 'dorm-number', value: '', valueType: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] },
      dormRoom: { name: '宿舍房号', id: 'dormRoom', value: '', valueType: 'input' },
      speciality: { name: '特长', id: 'speciality', value: '', valueType: 'input' },
      highSchool: { name: '毕业中学', id: 'highSchool ', value: '', valueType: 'input' }
    }
  },
  family: {
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
  }
}

export default tableDataTest