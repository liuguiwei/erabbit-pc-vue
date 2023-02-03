<template>
  <div class="app-header-sticky" :class="{show:scrollTop>=78}">
    <div class="container" v-show="scrollTop>=78">
      <div class="logo">
        <router-link to="/"></router-link>
      </div>
      <AppHeaderNav />
      <div class="right">
        <router-link to>品牌</router-link>
        <router-link to>专题</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeaderNav from './app-header-nav.vue'
export default {
  components: {
    AppHeaderNav
  },
  data () {
    return {
      scrollTop: 0
    }
  },
  mounted () {
    window.onscroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop = scrollTop
    }
  }
}
</script>

<style lang="less" scoped>
.app-header-sticky {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  transition: all 0.3s linear;
  transform: translateY(-100%);
  opacity: 0;
  &.show {
    transform: none;
    opacity: 1;
  }
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  .container {
    display: flex;
    align-items: center;
    .logo {
      width: 200px;
      a {
        display: block;
        height: 80px;
        background: url(../assets/images/logo.png) no-repeat right 2px;
        background-size: 160px auto;
      }
    }
    .right {
      display: flex;
      width: 220px;
      justify-content: space-around;
      padding-left: 40px;
      border-left: 2px solid #27ba9b;
      a {
        font-size: 16px;
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
</style>