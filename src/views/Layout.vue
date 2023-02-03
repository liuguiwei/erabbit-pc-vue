<template>
  <div>
    <!-- 顶部通栏 -->
    <appTopNav />
    <!-- 吸顶头部 -->
    <AppHeaderSticky />
    <!-- 头部 -->
    <AppHeader />

    <div class="main">
      <router-view />
    </div>
    <!-- 底部 -->
    <AppFooter />
  </div>
</template>

<script>
import appTopNav from '@/components/app-topnav.vue'
import AppHeader from '@/components/app-header.vue'
import AppFooter from '@/components/app-footer.vue'
import AppHeaderSticky from '@/components/app-header-sticky.vue'
export default {
  components: {
    appTopNav,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  created () {
    this.$store.dispatch('category/loadeCategoryList')
  }
}
</script>

<style lang="less" scoped>
</style>