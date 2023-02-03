<template>
  <div class="goods-image">
    <div
      class="large"
      :style="{background:`url(${images[currentIndex]})`}"
      ref="largeImg"
      v-show="show"
    ></div>
    <div class="middle" ref="middle">
      <img :src="images[currentIndex]" alt @mousemove="getMousePosition" @mouseleave="show=false" />
      <div class="layer" :style="{left:position.X+'px',top:position.Y+'px'}" v-if="show"></div>
    </div>
    <ul class="small">
      <li
        v-for="(item,index) in images"
        :key="index"
        @mouseenter="currentIndex=index"
        :class="{active:index===currentIndex}"
      >
        <img :src="item" alt />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "GoodsImage",
  data () {
    return {
      currentIndex: 0,
      show: false,
      position: {
        X: 0,
        Y: 0
      }
    }
  },
  props: {
    images: {
      type: Array,
    }
  },
  methods: {
    getMousePosition () {
      this.show = true
      var event = window.event || event
      let X = event.offsetX || event.layerX
      let Y = event.offsetY || event.layerY
      if (X <= 100) {
        this.position.X = 0

      }
      else if (100 < X && X <= 300) {
        this.position.X = X - 100
      }
      else {
        this.position.X = 200
      }
      //
      if (Y <= 100) {
        this.position.Y = 0

      }
      else if (100 < Y && Y <= 300) {
        this.position.Y = Y - 100
      }
      else {
        this.position.Y = 200
      }
      this.$refs.largeImg.style.backgroundPositionX = -2 * this.position.X + "px"
      this.$refs.largeImg.style.backgroundPositionY = -2 * this.position.Y + "px"
    }
  }
}
</script>

<style lang="less" scoped>
.goods-image {
  display: flex;
  position: relative;
  .large {
    z-index: 999;
    position: absolute;
    top: 0;
    left: 410px;
    width: 400px;
    height: 400px;
    background-size: 800px 800px !important;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  }
  .middle {
    position: relative;
    width: 480px;
    height: 400px;
    img {
      width: 400px;
      height: 400px;
    }
  }
  .small {
    width: 80px;
    height: 400px;
    li {
      width: 68px;
      height: 68px;
      margin-bottom: 15px;
      &:hover,
      &.active {
        border: 2px solid @xtxColor;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    pointer-events: none;
    background: rgba(0, 0, 0, 0.2);
  }
}
</style>