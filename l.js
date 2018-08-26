const md5 = require('md5')

export default {
  name: 'LoginRegister',
  data () {
    // 注册表单，可用性检测：重复密码与密码一致性
    var passCheck = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }

    return {
      msg: 'this is LoginRegister',
      dialogRegisterVisible: false,
      dialogActiveVisible: false,
      dialogFindpassVisible: false,
      registerForm: {
        userId: '15336204',
        userName: '邢剑飞',
        password: '123456',
        password_check: '123456',
        email: 'xingjf3',
        phone: '15521030152',
        gender: 'male'
      },
      registerRules: {
        userId: [{
          type:"string",
          pattern: /^[0-9]{8}$/,
          required: true,
          message: '请输入正确的学号',
          trigger: 'blur'
        }],
        userName: [{
          required: true,
          message: '请输入姓名',
          trigger: 'blur'
        }],
        email: [{
          type: 'string',
          required: true,
          pattern: /^[0-9a-zA-Z]+$/,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请输入6-18位密码',
          trigger: 'blur',
          min: 6,
          max: 18
        }],
        password_check: [{
          required: true,
          validator: passCheck,
          trigger: 'blur'
        }],
        phone: [{
          type: 'string',
          pattern: /^1[0-9]{10}$/,
          required: true,
          message: '请输入正确的手机号码',
          trigger: 'blur'
        }],
        gender: [{
          required: true,
          message: '请选择',
          trigger: 'blur'
        }]
      },
      loginForm: {
        userId: '',
        password: ''
      },
      activeForm: {
        activeCode: ''
      },
      activeRules: {
        activeCode: [{
          type: 'string',
          pattern: /^[0-9a-z]{8}$/,
          required: true,
          message: '请输入正确的激活码',
          trigger: 'blur'
        }]
      },
      findpassForm: {
        userId: '',
        email: ''
      },
      findpassRules: {
        userId: [{
          type: 'string',
          pattern: /^[0-9]{8}$/,
          required: true,
          message: '请输入正确的学号',
          trigger: 'blur'
        }],
        email: [{
          type: 'string',
          required: true,
          pattern: /^[0-9a-zA-Z]+$/,
          message: '请输入正确的邮箱',
          trigger: 'blur'
        }]
      }
    }
  },
  beforeMount () {
    let state = this.$store.state.UserStatus
    this.$router.replace(this.$store.state.routerTable[state])
  },
  methods: {
    /**
     * 重置表单内容
     */
    resetForm: async function (formName) {
      this.$refs[formName].resetFields()
    },
    /**
     * 提交注册信息
     */
    submitRegister: async function () {
      if (await this.$store.dispatch('oplimit')) {
        return
      }
      this.$refs['registerForm'].validate((valid) => {
        if (valid) {
          this.dialogRegisterVisible=false
          // 数据处理
          let data_to_push = {
            userId: this.registerForm.userId,
            userName: this.registerForm.userName,
            password: md5(this.registerForm.password),
            email: this.registerForm.email+'@mail2.sysu.edu.cn',
            phone: this.registerForm.phone,
            gender: this.registerForm.gender
          }
          // 提交注册
          this.$store.dispatch('POST', {
            url: '/user/register',
            body: data_to_push
          }).then((res) => {
            this.$store.commit('info', {
              msg: '注册成功,已发送激活邮件，请检查邮箱',
              type: 'success'
            })
            this.loginForm.userId = this.registerForm.userId
            this.loginForm.password = this.registerForm.password
            this.resetForm('registerForm')
            this.dialogActiveVisible = true
          }).catch((res) => {
            this.$store.commit('info', {
              msg: res.body.err,
              type: "warning"
            })
            this.dialogRegisterVisible = true
          })
        } else {
          this.$store.commit('info', {
            msg: '注册表单内容存在错误',
            type: 'warning'
          })
        }
      })
    },
    /**
     * 登录
     */
    submitLogin: async function() {
      if (await this.$store.dispatch('oplimit')) {
        return
      }
      this.$store.dispatch('POST', {
        url: '/user/login',
        body: {
          userId: this.loginForm.userId,
          password: md5(this.loginForm.password)
        }
      }).then((res) => {
        this.$store.dispatch('updateUserInfo', res.body.content)
        this.$router.replace(this.$store.state.routerTable[res.body.content.userType])
      }).catch((res) => {
        this.$store.commit('info', {
          msg: res.body.err,
          type: 'warning'
        })
        if (res.status === 442) {
          this.dialogActiveVisible = true
        }
      })
    },
    /**
     * 激活
     */
    submitActive: async function () {
      if (await this.$store.dispatch('oplimit')) {
        return
      }
      this.$store.dispatch('PUT', {
        url: '/user/active',
        body: {
          userId: this.loginForm.userId,
          password: md5(this.loginForm.password),
          activeCode: this.activeForm.activeCode
        }
      }).then((res) => {
        this.$store.dispatch('updateUserInfo', res.body.content)
        // 激活成功自动跳转到登陆后页面
        this.$router.replace(this.$store.state.routerTable[res.body.content.userType])
      }).catch((res) => {
        this.$store.commit('info', {
          msg: res.body.err,
          type: 'warning'
        })
      })
    },
    /**
     * 重新发送激活邮件请求
     */
    resendActiveEmail: async function () {
      if (await this.$store.dispatch('oplimit')) {
        return
      }
      this.$store.dispatch('GET', {
        url: '/user/active-email',
        params: {
          userId: this.loginForm.userId
        }
      }).then((res) => {
        this.$store.commit('info', {
          msg: '邮件已发送，请检查邮箱',
          type: 'success'
        })
      }).catch((res) => {
        this.$store.commit('info', {
          msg: res.body.err,
          type: 'warning'
        })
      })
    },
    /*
     * @author: Jianfei2333
     * @email: xjf999999@hotmail.com
     * @function: 找回密码功能，点击找回密码dialog中提交触发
     */
    submitFindpass: async function () {
      if (await this.$store.dispatch('oplimit')) {
        return
      }
      this.$refs['findpassForm'].validate((valid) => {
        if (valid) {
          let data_to_push = {
            userId: this.findpassForm.userId,
            email: this.findpassForm.email + '@mail2.sysu.edu.cn'
          }
          this.$store.dispatch('GET', {
            url: '/user/password',
            params: data_to_push
          }).then((res) => {
            this.$store.commit('info', {
              msg: '已发送新密码至邮箱，请重新登陆',
              type: 'success'
            })
            this.dialogFindpassVisible = false
          }).catch((res) => {
            this.$store.commit('info', {
              msg: res.body.err,
              type: 'warning'
            })
          })
        } else {
          this.$store.commit('info', {
            msg: '内容出现错误',
            type: 'warning'
          })
        }
      })
    }
  }
}
