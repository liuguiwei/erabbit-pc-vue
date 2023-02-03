<template>
  <div>
    <div class="home-entry">
      <div class="container">
        <!-- 左侧分类 -->
        <HomeCategory />
        <!-- 轮播图 -->
        <HomeBanner />
      </div>
    </div>
    <!-- 新鲜好物 -->
    <HomeNew />
    <!-- 人气推荐 -->
    <HomeHot />
    <!-- 热门品牌 -->
    <HomeBrand />
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue'
import HomeBanner from "./components/home-banner.vue"
import HomeNew from "./components/home-new.vue"
import HomeHot from "./components/home-hot.vue"
import HomeBrand from "./components/home-brand.vue"
export default {
  name: 'HomePage',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand
  }
}
</script>

<style lang="less" scoped>
.home-entry {
  background-color: #f5f5f5;
}
</style>