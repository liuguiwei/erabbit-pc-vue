<template>
  <!-- 顶部通栏 -->
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="$store.state.user.profile.token">
          <li>
            <router-link to="/member">
              <i class="iconfont icon-user"></i>
              {{$store.state.user.profile.account}}
            </router-link>
          </li>
          <li>
            <a href="javascript:;" @click="loginOut">退出登录</a>
          </li>
        </template>
        <template v-else>
          <li>
            <router-link to="/login">请先登录</router-link>
          </li>
          <li>
            <a href="javascript:;">免费注册</a>
          </li>
        </template>

        <li>
          <a href="javascript:;">我的订单</a>
        </li>
        <li>
          <a href="javascript:;">会员中心</a>
        </li>
        <li>
          <a href="javascript:;">帮助中心</a>
        </li>
        <li>
          <a href="javascript:;">关于我们</a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont icon-phone"></i>手机版
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppTopNav',
  methods: {
    loginOut () {
      this.$store.commit('user/setUser', {})
      this.$store.commit('cart/setCartList', [])
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.app-topnav {
  background-color: #333;
  ul {
    display: flex;
    justify-content: flex-end;
    height: 53px;
    align-items: center;
    li {
      a {
        color: #cdcdcd;
        padding: 0 15px;
        font-size: 14px;
        &:hover {
          color: @xtxColor;
        }
      }
      ~ li {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>