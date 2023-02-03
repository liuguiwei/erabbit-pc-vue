<template>
  <div class="call-bind">
    <div class="userInfo">
      <img :src="userInfo.avatar" alt />
      <p>Hi，{{userInfo.nickname}} 欢迎来小兔鲜，完成绑定后可以QQ账号一键登录哦~</p>
    </div>
    <el-form :model="bindForm" :rules="bindFormRules" ref="bindForm">
      <el-form-item prop="mobile">
        <el-input v-model="bindForm.mobile" placeholder="请输入手机号">
          <a
            v-if="time===0"
            href="javascript:;"
            class="sendCode"
            slot="suffix"
            @click="sendCode"
          >发送验证码</a>
          <a v-else href="javascript:;" class="sendCode" slot="suffix">{{time}}秒后重新发送</a>
          <i class="iconfont icon-shouji" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="bindForm.code" placeholder="请输入验证码">
          <i class="iconfont icon-dunpaibaoxianrenzheng_o" slot="prefix"></i>
        </el-input>
      </el-form-item>
      <a href="javascript:;" class="btn" @click="qqBindLogin">立即绑定</a>
    </el-form>
  </div>
</template>

<script>
import { Form, FormItem, Input, Message } from 'element-ui'
import QC from 'qc'
import { getQQBindCode, userQQBindLogin } from '@/api/user'
let timer = null
export default {
  name: "CallBind",
  components: { elForm: Form, elFormItem: FormItem, elInput: Input },
  mounted () {
    if (QC.Login.check()) {
      QC.api('get_user_info').success(res => {
        this.userInfo.avatar = res.data.figureurl_1
        this.userInfo.nickname = res.data.nickname
      })
    }
  },
  props: {
    unionId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      //发送验证码倒计时
      time: 0,
      bindForm: {
        mobile: '13666666666',
        code: ''
      },
      bindFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式有误', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { pattern: /^\d{6}$/, message: '请输入6位数字验证码', trigger: 'blur' },
        ]
      },
      userInfo: {
        avatar: '',
        nickname: ''
      }
    }
  },
  methods: {
    sendCode () {
      if (this.time !== 0) return
      this.$refs.bindForm.validateField(['mobile'], error => {
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
          getQQBindCode(this.bindForm.mobile).then(res => {
            console.log(res)
          })
        }
      })
    },
    qqBindLogin () {
      this.$refs.bindForm.validate(valid => {
        if (valid) {
          userQQBindLogin(this.unionId, this.bindForm.mobile, this.bindForm.code).then(res => {
            this.$store.commit('user/setUser', res.result)
            this.$store.dispatch("cart/mergeLocalCart").then(() => {
              this.$router.push(this.$route.query.redirectUrl || '/')
              Message.success('绑定成功')
            })
          })
        }
      })
    }
  },

}
</script>

<style lang="less" scoped>
.call-bind {
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
  .userInfo {
    display: flex;
    align-content: space-between;
    align-items: center;
    width: 320px;
    height: 70px;
    margin-top: 50px;
    padding: 0 10px;
    background-color: #f2f2f2;
    img {
      width: 50px;
      height: 50px;
    }
    p {
      margin-left: 10px;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>