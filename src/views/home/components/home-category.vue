<template>
  <div class="home-category" @mouseleave="hideLayer">
    <!-- 左侧分类菜单 -->
    <ul class="menu">
      <li
        v-for="(obj,index) in homeCategoryList"
        :key="obj.id"
        @mouseenter="handleGoods(obj.goods,index)"
        :class="{active:index===currentIndex}"
      >
        <router-link to>{{obj.name}}</router-link>
        <template v-if="obj.children">
          <router-link to v-for="subObj in obj.children" :key="subObj.id">{{subObj.name}}</router-link>
        </template>
        <template v-else>
          <Skeleton width="60px" height="18px" style="margin-right:5px" bg="rgba(255,255,255,0.2)"></Skeleton>
          <Skeleton width="50px" height="18px" bg="rgba(255,255,255,0.2)"></Skeleton>
        </template>
      </li>
    </ul>
    <!-- 右侧弹层 -->
    <div class="layer" v-show="isShowLayer">
      <h4>
        {{isShowBrand?"品牌":"分类"}}推荐
        <small>根据你的购买或浏览记录推荐</small>
      </h4>

      <!-- 品牌 -->
      <ul v-if="isShowBrand">
        <li class="brand" v-for="item in brands" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>
                {{item.place}}
              </p>
              <p class="name ellipsis">{{item.name}}</p>
              <p class="desc ellipsis-2">{{item.desc}}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 商品 -->
      <ul v-else>
        <li v-for="item in goodsList" :key="item.id">
          <router-link :to="`/product/${item.id}`">
            <img :src="item.picture" />
            <div class="info">
              <p class="name ellipsis-2">{{item.name}}</p>
              <p class="desc ellipsis">{{item.desc}}</p>
              <p class="price">
                <i>￥</i>
                {{item.price}}
              </p>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { getBrandList } from "@/api/home"
export default {
  name: "HomeCategory",
  data () {
    return {
      goodsList: [],
      // 品牌数据
      brands: [],
      // 是否显示弹层
      isShowLayer: false,
      isShowBrand: false,
      // 左侧菜单激活索引
      currentIndex: -1
    }
  },
  created () {
    this.getBrands()
  },
  computed: {
    homeCategoryList () {
      const brand = {
        id: "brand",
        name: "品牌",
        children: [{ id: "brand-children", name: "品牌推荐" }],
        //推荐商品数据
        brands: this.brands
      }
      const newMenuList = this.$store.state.category.categoryList.map(item => {
        return {
          id: item.id,
          name: item.name,
          goods: item.goods,
          children: item.children && item.children.slice(0, 2)
        }
      })
      newMenuList.push(brand)
      return newMenuList
    },
  },
  methods: {
    //右侧商品弹层数据
    handleGoods (goods, index) {
      this.currentIndex = index
      this.goodsList = goods
      this.isShowLayer = true
      if (index === this.homeCategoryList.length - 1) {
        this.isShowBrand = true
      }
      else {
        this.isShowBrand = false
      }
    },
    //品牌数据
    async getBrands () {
      const res = await getBrandList(6)
      this.brands = res.result
    },
    hideLayer () {
      this.isShowLayer = false
      this.currentIndex = -1
    }
  }

}
</script>

<style lang="less" scoped>
.home-category {
  position: relative;
  width: 250px;
  height: 500px;
  z-index: 99;
  background: rgba(0, 0, 0, 0.8);
  .menu {
    li {
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding-left: 50px;
      // &:hover {
      //   background-color: @xtxColor;
      // }
      a {
        color: #fff;
        padding-right: 5px;
        font-size: 15px;
      }
      &.active {
        background-color: @xtxColor;
      }
    }
  }

  .layer {
    position: absolute;
    top: 0;
    left: 250px;
    width: 990px;
    height: 500px;
    padding: 0 15px;
    background-color: pink;
    background: rgba(255, 255, 255, 0.8);
    h4 {
      line-height: 80px;
      font-size: 20px;
      font-weight: normal;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      height: 420px;
      justify-content: space-between;
      align-content: space-around;
      li {
        background-color: #fff;
        height: 120px;
        width: 310px;
        border: 1px solid #eee;
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
      li.brand {
        height: 180px;
        a {
          align-items: flex-start;
          img {
            width: 120px;
            height: 160px;
          }
          .info {
            p {
              margin-top: 8px;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
}
.xtx-skeleton {
  animation: fade 1s linear infinite alternate;
}
@keyframes fade {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>