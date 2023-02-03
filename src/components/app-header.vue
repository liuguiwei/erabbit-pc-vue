<template>
  <div class="app-header">
    <div class="container">
      <h1 class="logo">
        <a href>小兔鲜</a>
      </h1>
      <AppHeaderNav />
      <div class="search">
        <i class="iconfont icon-sousuo"></i>
        <input type="text" placeholder="搜一搜" />
      </div>
      <AppHeaderCart />
    </div>
  </div>
</template>

<script>
import AppHeaderNav from '@/components/app-header-nav.vue'
import AppHeaderCart from './app-header-cart.vue'
export default {
  name: 'AppHeader',
  components: {
    AppHeaderNav, AppHeaderCart
  }
}
</script>

<style lang="less" scoped>
.app-header {
  background-color: #fff;
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      a {
        display: block;
        width: 100%;
        height: 132px;
        text-indent: -9999px;
        background: url(../assets/images/logo.png) center no-repeat;
        background-size: contain;
      }
    }
    .search {
      width: 170px;
      height: 32px;
      border-bottom: 1px solid #e7e7e7;
      line-height: 32px;
      .icon-sousuo {
        font-size: 20px;
        margin-left: 5px;
      }
      input {
        width: 140px;
        padding-left: 5px;
        color: #666;
      }
    }
  }
}
</style>