<template>
  <div class="login">
    <LoginHead>欢迎登录</LoginHead>
    <div class="login-body">
      <div class="warpper">
        <nav>
          <a
            href="javascript:;"
            @click="activeName='account'"
            :class="{active:activeName==='account'}"
          >账户登录</a>
          <a
            href="javascript:;"
            @click="activeName='qrcode'"
            :class="{active:activeName==='qrcode'}"
          >扫码登录</a>
        </nav>
        <div class="account-box" v-if="activeName==='account'">
          <div class="toggle">
            <a href="javascript:;" v-if="isMessageLogin" @click="isMessageLogin=false">使用账号登录</a>
            <a href="javascript:;" v-if="!isMessageLogin" @click="isMessageLogin=true">使用短信登录</a>
          </div>
          <div class="form">
            <template v-if="!isMessageLogin">
              <el-form :model="userInfo" :rules="rules" ref="userInfo" class="demo-userInfo">
                <el-form-item prop="username">
                  <el-input v-model="userInfo.username" placeholder="请输入用户名">
                    <i class="iconfont icon-user" slot="prefix"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input v-model="userInfo.password" placeholder="请输入密码">
                    <i class="iconfont icon-user" slot="prefix"></i>
                  </el-input>
                </el-form-item>
              </el-form>
            </template>
            <template v-if="isMessageLogin">短信登录表单</template>
            <div class="agree">
              <span>
                <input type="checkbox" v-model="agreeItem" />我已同意
              </span>
              <a href="javascripe:;">《隐私条款》</a>
              <span>和</span>
              <a href="javascripe:;">《服务条款》</a>
            </div>
            <a href="javascript:;" class="btn" @click="submitForm('userInfo')">登录</a>
          </div>
          <div class="action">
            <a
              href="https://graph.qq.com/oauth2.0/authorize?client_id=100556005&response_type=token&scope=all&redirect_uri=http%3A%2F%2Fwww.corho.com%3A8080%2F%23%2Flogin%2Fcallback"
            >
              <img
                src="https://qzonestyle.gtimg.cn/qzone/vas/opensns/res/img/Connect_logo_7.png"
                alt
              />
            </a>
            <div class="url">
              <a href="javascript:;">忘记密码</a>
              <a href="javascript:;">免费注册</a>
            </div>
          </div>
        </div>
        <div class="qrcode-box" v-if="activeName==='qrcode'">
          <img src="@/assets/images/qrcode.jpg" alt />
          <p>
            打开
            <a href="javascript:;">小兔鲜App</a> 扫码登录
          </p>
        </div>
      </div>
    </div>
    <LoginFooter />
  </div>
</template>

<script>
import LoginHead from './components/login-head.vue'
import LoginFooter from './components/login-footer.vue'
import { getUserInfo } from "@/api/user"
import { Form, FormItem, Input, Message } from 'element-ui'
export default {
  name: 'LoginIndex',
  components: { LoginHead, LoginFooter, elForm: Form, elFormItem: FormItem, elInput: Input },
  data () {
    return {
      activeName: "account",
      isMessageLogin: false,
      agreeItem: false,
      userInfo: {
        username: 'ceshi1',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z]\w{5,19}$/, message: '字母开头且6-20个字符' },

        ],
        password: [
          { pattern: /^\w{6,24}$/, message: '密码是6-24个字符' },
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
      }
    }
  },
  mounted () {
    this.$store.commit('user/setRedirectUrl', this.$route.query.redirectUrl || '/')
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.agreeItem) return Message.warning('请同意用户协议 ')
          getUserInfo(this.userInfo.username, this.userInfo.password).then(res => {
            if (!res) return Message.error('用户名或密码有误')
            const { result: data } = res
            this.$store.commit('user/setUser', data)
            this.$store.dispatch("cart/mergeLocalCart").then(() => {
              this.$router.push(this.$route.query.redirectUrl || '/')
              Message.success('登录成功')
            })
          })
        } else {
          Message.error('用户名或密码格式有误')
          return false
        }
      })

    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .login-body {
    position: relative;
    height: 500px;
    background: url(../../assets/images/login-bg.png) no-repeat center;
    .warpper {
      position: absolute;
      top: 54px;
      right: 280px;
      width: 380px;
      height: 400px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
      background-color: #fff;
      nav {
        height: 55px;
        border-bottom: 1px solid #f5f5f5;
        display: flex;
        padding: 0 40px;
        text-align: right;
        align-items: center;
        a {
          display: inline-block;
          position: relative;
          flex: 1;
          line-height: 1;
          font-size: 18px;
          &:first-child {
            border-right: 1px solid #f5f5f5;
            text-align: left;
          }
          &.active {
            color: @xtxColor;
            font-weight: bold;
          }
        }
      }
      .qrcode-box {
        text-align: center;
        padding-top: 40px;
        p {
          margin-top: 20px;
          a {
            color: @xtxColor;
            font-size: 16px;
          }
        }
      }
      .account-box {
        padding: 0 40px;
        .toggle {
          text-align: right;
          padding: 15px 40px;
          a {
            color: @xtxColor;
          }
        }
        .form {
          ::v-deep .el-form {
            .el-form-item__content {
              position: relative;
              border: 1px solid #cfcdcd;
              height: 34px;
              line-height: 34px;
              i {
                position: absolute;
                left: -5px;
                top: 0;
                display: inline-block;
                width: 33px;
                height: 33px;
                line-height: 33px;
                background-color: #cfcdcd;
                font-size: 18px;
                color: #fff;
                text-align: center;
              }
              .el-input__inner {
                height: 30px;
                padding-left: 36px;
              }
            }
          }
          .agree {
            position: relative;
            margin: 20px 0;
            span {
              font-size: 14px;
              color: #333;
              &:first-child {
                padding-left: 15px;
              }
            }
            a {
              color: #069;
            }
            input[type='checkbox'] {
              position: absolute;
              top: 3px;
              left: 0;
            }
          }
          .btn {
            display: block;
            height: 40px;
            line-height: 40px;
            text-align: center;
            background: #27ba9b;
            color: #fff;
          }
        }
        .action {
          display: flex;
          justify-content: space-between;
          height: 65px;
          align-items: center;
          .url {
            margin-right: -5px;
            a {
              padding: 0 5px;
              color: #999;
              font-size: 14px;
            }
          }
        }
      }
    }
  }
}
</style>