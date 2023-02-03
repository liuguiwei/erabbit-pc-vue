<template>
  <!-- 主页轮播图 -->
  <div class="home-banner">
    <Carousel :sliders="bannerList" />
  </div>
</template>

<script>
import Carousel from "@/components/library/carousel.vue"
import { getBanner } from "@/api/home"
export default {
  name: "HomeBanner",
  components: {
    Carousel
  },
  created () {
    this.loadBanner()
  },
  methods: {
    async loadBanner () {
      const { result } = await getBanner()
      this.bannerList = result
    }
  },
  data () {
    return {
      bannerList: []
    }
  }
}
</script>

<style lang="less" scoped>
.home-banner {
  position: absolute;
  left: 0;
  top: 0;
  width: 1240px;
  height: 500px;
  z-index: 98;
  .xtx-carousel {
    ::v-deep .carousel-indicator {
      left: 120px;
    }
    ::v-deep .carousel-btn.prev {
      left: 270px;
    }
  }
}
</style>