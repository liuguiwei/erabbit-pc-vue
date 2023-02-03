<template>
  <div class="callback-patch">
    <el-form :model="patchForm" :rules="patchFormRules" ref="patchFormRef">
      <el-form-item prop="account">
        <el-input v-model="patchForm.account" placeholder="请输入用户名">
          <i class="iconfont icon-user" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="mobile">
        <el-input v-model="patchForm.mobile" placeholder="请输入手机号">
          <i class="iconfont icon-shouji" slot="prefix"></i>
          <a
            v-if="time===0"
            href="javascript:;"
            @click="sendCode"
            class="sendCode"
            slot="suffix"
          >发送验证码</a>
          <a v-else href="javascript:;" class="sendCode" slot="suffix">{{time}}秒后重新发送</a>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="patchForm.code" placeholder="请输入验证码">
          <i class="iconfont icon-dunpaibaoxianrenzheng_o" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="patchForm.password" placeholder="请输入密码" type="password">
          <i class="iconfont icon-mima" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="rePassword">
        <el-input v-model="patchForm.rePassword" placeholder="请确认密码" type="password">
          <i class="iconfont icon-mima" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <a href="javascript:;" class="btn" @click="submitForm">立即提交</a>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Message } from 'element-ui'
import { userQQPatchLogin, getQQDispatchCode, userCheckAccount } from '@/api/user'
let timer = null
export default {
  name: "CallPatch",
  components: { elForm: Form, elFormItem: FormItem, elInput: Input },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      patchForm: {
        account: 'aas123',
        mobile: '13666666666',
        code: '123456',
        password: 'a123456',
        rePassword: 'a123456',
      },
      patchFormRules: {
        account: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z]\w{5,19}$/, message: '字母开头且6-20个字符' },
          { validator: this.checkAccount, trigger: "blur" }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式有误', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' },
        ],
        password: [
          { pattern: /^\w{6,24}$/, message: '密码是6-24个字符' },
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        rePassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { validator: this.equalToPassword, trigger: "blur" }
        ]
      },
      time: 0
    }
  },
  methods: {
    sendCode () {
      if (this.time !== 0) return
      this.$refs.patchFormRef.validateField(['mobile'], error => {
        if (!error) {
          this.time = 5
          clearInterval(timer)
          timer = setInterval(() => {
            this.time--
            if (this.time <= 0) {
              this.time = 0
              clearInterval(timer)
            }
          }, 1000)
          getQQDispatchCode(this.patchForm.mobile)
        }
      })
    },
    submitForm () {
      this.$refs.patchFormRef.validate(valid => {
        if (valid) {
          userQQPatchLogin(this.unionId, this.patchForm).then(res => {
            this.$store.commit('user/setUser', res.result)
            this.$store.dispatch("cart/mergeLocalCart").then(() => {
              this.$router.push(this.$route.query.redirectUrl || '/')
              Message.success('完善信息成功')
            })

          }).catch(err => {
            Message.warning(err.response.data.message)
          })
        }
      })
    },
    async checkAccount (rule, value, callback) {
      const res = await userCheckAccount(this.patchForm.account)
      if (res.result.valid) {
        callback(new Error("用户名已存在"))
      } else {
        callback()
      }
    },
    equalToPassword (rule, value, callback) {
      if (this.patchForm.password !== value) {
        callback(new Error("两次的密码不一致"))
      } else {
        callback()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.callback-patch {
  ::v-deep .el-form {
    margin-top: 30px;
    .el-form-item__content {
      position: relative;
      border: 1px solid #cfcdcd;
      height: 50px;
      line-height: 50px;
      .el-input__validateIcon {
        display: none;
      }
      .sendCode {
        color: #999;
        padding-right: 2px;
      }
      i {
        position: absolute;
        left: 6px;
        top: 8px;
        display: inline-block;
        line-height: 33px;
        font-size: 20px;
        text-align: center;
      }
      .el-input__inner {
        height: 30px;
        padding-left: 36px;
      }
    }
  }
  .btn {
    display: block;
    width: 320px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #27ba9b;
    color: #fff;
    border-radius: 5px;
  }
}
</style>