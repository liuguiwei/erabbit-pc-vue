<template>
  <div class="login-head">
    <div class="container">
      <h1 class="logo">
        <router-link to="/">小兔鲜</router-link>
      </h1>
      <div class="title">
        <slot />
      </div>
      <router-link class="entry" to="/">进入网站首页</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginHead"
}
</script>

<style lang="less" scoped>
.login-head {
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    color: #666;
    align-items: flex-end;
    .logo {
      width: 200px;
      margin: 0;
      a {
        display: block;
        width: 100%;
        height: 132px;
        background: url(../../../assets/images/logo.png) no-repeat center;
        background-size: contain;
        text-indent: -9999px;
      }
    }
    .title {
      flex: 1;
      font-size: 24px;
      margin-bottom: 30px;
      margin-left: 20px;
    }
    .entry {
      margin-bottom: 30px;
      font-size: 16px;
      color: #333;
    }
  }
}
</style>