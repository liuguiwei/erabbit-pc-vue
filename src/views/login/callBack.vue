<template>
  <div class="login-callback">
    <LoginHead>联合登录</LoginHead>
    <div class="container" v-if="isBind">
      <nav>
        <a href="javascript:;" @click="hasAccount=true" :class="{active:hasAccount}">
          <i></i>
          <span>已有小兔鲜账号，绑定手机</span>
        </a>
        <a href="javascript:;" @click="hasAccount=false" :class="{active:!hasAccount}">
          <i></i>
          <span>没有小兔鲜账号，请完善资料</span>
        </a>
      </nav>
      <div class="tab-box" v-if="hasAccount">
        <CallbackBind :unionId="unionId" />
      </div>
      <div class="tab-box" v-if="!hasAccount">
        <CallbackPatch :unionId="unionId" />
      </div>
    </div>
    <div class="loading" v-else>正在登录,请稍等...</div>
    <LoginFooter />
  </div>
</template>

<script>
import LoginHead from './components/login-head.vue'
import LoginFooter from './components/login-footer.vue'
import CallbackBind from './components/callback-bind.vue'
import CallbackPatch from './components/callback-patch.vue'
import QC from 'qc'
import { useQqLogin } from '@/api/user'
export default {
  name: "LoginCallback",
  components: {
    LoginHead, LoginFooter, CallbackBind, CallbackPatch
  },
  data () {
    return {
      hasAccount: true,
      isBind: true,
      unionId: ''
    }
  },
  mounted () {
    if (QC.Login.check()) {
      QC.Login.getMe(openId => {
        this.unionId = openId
        useQqLogin(openId).then(res => {
          if (!res) {
            this.isBind = false
          }
          else {
            this.$store.commit('user/setUser', res.result)
            this.$router.push(this.$store.state.user.redirectUrl)
          }
        })

      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-callback {
  .container {
    height: 730px;
    background-color: #fff;
    nav {
      text-align: center;
      height: 80px;
      font-size: 18px;
      padding-top: 40px;
      a {
        display: inline-block;
        width: 350px;
        height: 40px;
        color: #666;
        border-bottom: 2px solid #e4e4e4;
        &.active {
          color: @xtxColor;
          border-bottom: 2px solid @xtxColor;
        }
      }
    }
    .tab-box {
      width: 320px;
      margin: 0 auto;
    }
  }
}
</style>