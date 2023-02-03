<template>
  <div class="top-category">
    <div class="container">
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem :to="`/category/${id}`" v-if="subList">{{subList.name}}</BreadItem>
      </Bread>
      <!-- 轮播图 -->
      <div class="category-banner">
        <Carousel :sliders="sliders" />
      </div>
      <!-- 全部子分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul v-if="subList&&subList.children">
          <li v-for="item in subList.children" :key="item.id">
            <router-link :to="`/product/${item.id}`">
              <img :src="item.picture" />
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="goodsItems" v-for="item in categoryItems" :key="item.id">
        <div class="head">
          <h3>{{item.name}}</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <More />
        </div>
        <div class="items-body">
          <GoodsItem v-for="goods in item.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bread from "@/components/library/bread.vue"
import BreadItem from "@/components/library/bread-item.vue"
import Carousel from "@/components/library/carousel.vue"
import GoodsItem from "./components/goods-item.vue"
import { getBanner } from '@/api/home'
import { getTopCategoryById } from "@/api/category"
import More from '@/components/library/more.vue'
export default {
  name: "TopCategory",
  components: {
    Bread,
    BreadItem,
    Carousel,
    GoodsItem,
    More
  },
  props: {
    id: {
      type: String,
    }
  },
  data () {
    return {
      //轮播图
      sliders: [],
      categoryItems: []
    }
  },
  computed: {
    subList () {
      return this.$store.state.category.categoryList.find(item => {
        return item.id === this.id
      })
    }
  },
  watch: {
    id: {
      async handler (newId) {
        const { result } = await getTopCategoryById(newId)
        this.categoryItems = result.children
      },
      immediate: true
    }
  },
  created () {
    this.loadBanner()
  },

  methods: {
    async loadBanner () {
      const { result } = await getBanner()
      this.sliders = result
    }
  }
}
</script>

<style lang="less" scoped>
.top-category {
  .category-banner {
    width: 100%;
    height: 500px;
  }
  .sub-list {
    background-color: #fff;
    margin: 30px 0;
    h3 {
      font-size: 28px;
      font-weight: normal;
      color: #666;
      line-height: 100px;
      text-align: center;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      padding: 0 32px;
      li {
        width: 168px;
        height: 160px;
        a {
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
          font-size: 16px;
          img {
            width: 100px;
            width: 100px;
          }
          p {
            line-height: 40px;
          }
        }
      }
    }
  }
  .goodsItems {
    background-color: #fff;
    position: relative;
    margin: 20px 0;
    .head {
      h3 {
        line-height: 100px;
        text-align: center;
        font-size: 28px;
        font-weight: normal;
        color: #666;
      }
      .tag {
        color: #999;
        font-size: 20px;
        text-align: center;
        line-height: 58px;
      }
      .more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
    }
  }
  .items-body {
    display: flex;
    padding: 0 65px 30px;
  }
}
</style>