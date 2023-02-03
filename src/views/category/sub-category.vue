<template>
  <div class="sub-category">
    <div class="container">
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem :to="`/category/${categoryBread.top.id}`">{{categoryBread.top.name}}</BreadItem>
        <BreadItem>{{categoryBread.sub.name}}</BreadItem>
      </Bread>
      <!-- 商品属性筛选 -->
      <div class="sub-properties" v-if="salePropertiesList&&dataLoading">
        <div class="sub-filter">
          <div class="head">品牌</div>
          <div class="body">
            <a
              href="javascript:void(0)"
              v-for="item in salePropertiesList.brands"
              :key="item.id"
              @click="brandsActiveId=item.id"
              :class="{active:item.id===brandsActiveId}"
            >{{item.name}}</a>
          </div>
        </div>
        <div class="sub-filter" v-for="item in salePropertiesList.saleProperties" :key="item.id">
          <div class="head">{{item.name}}</div>
          <div class="body">
            <a
              href="javascript:void(0)"
              v-for="(subItem) in item.properties"
              :key="subItem.id"
              @click="item.activeId=subItem.id"
              :class="{active:item.activeId===subItem.id}"
            >{{subItem.name}}</a>
          </div>
        </div>
      </div>
      <div v-else>数据加载中,请稍等...</div>
      <!-- 商品列表 -->
      <div class="goods">
        <!-- 商品排序 -->
        <div class="sort">
          <div class="sort-button">
            <a
              href="javascript:;"
              :class="{active:sortField===null}"
              @click="changeField(null)"
            >默认排序</a>
            <a
              href="javascript:;"
              :class="{active:sortField==='publishTime'}"
              @click="changeField('publishTime')"
            >最新商品</a>
            <a
              href="javascript:;"
              :class="{active:sortField==='orderNum'}"
              @click="changeField('orderNum')"
            >最高人气</a>
            <a
              href="javascript:;"
              :class="{active:sortField==='evaluateNum'}"
              @click="changeField('evaluateNum')"
            >评论最多</a>
            <a href="javascript:;" class="price" @click="changeField('price')">
              价格排序
              <i class="iconfont icon-shengxu" :class="{active:sortMethod==='asc'}"></i>
              <i class="iconfont icon-jiangxu" :class="{active:sortMethod==='desc'}"></i>
            </a>
          </div>
          <div class="sort-check">2</div>
        </div>
        <div class="goods-list">
          <ul>
            <li v-for="item in goodsList" :key="item.id">
              <GoodsItem :goods="item" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSubFilterList } from "@/api/category"
import GoodsItem from "./components/goods-item.vue"
import { getSubGoodsList } from "@/api/category"
export default {
  name: "SubCategory",
  components: {
    GoodsItem
  },
  props: {
    id: {
      type: String
    }
  },
  data () {
    return {
      //商品属性
      salePropertiesList: null,
      dataLoading: false,
      //品牌激活
      brandsActiveId: null,

      //商品分类排序
      sortField: null,
      //价格排序
      sortMethod: null,
      //商品列表查询参数
      queryParams: {
        categoryId: this.id,
        page: 2,
        pageSize: 40
      },
      goodsList: [],
    }
  },
  created () {
    this.getSubGoodsList(this.queryParams)
  },
  methods: {
    //获取排序列表
    async getSubFilterList (id) {
      this.dataLoading = false
      const { result } = await getSubFilterList(id)
      result.brands.unshift({ activeId: null }, { id: null, name: "全部" })
      result.saleProperties.forEach(item => {
        item.activeId = null
        item.properties.unshift({ id: null, name: "全部" })
      })
      this.salePropertiesList = result
      this.dataLoading = true
    },
    //商品排序
    changeField (sortParams) {
      if (sortParams === 'price') {
        if (this.sortMethod === null) {
          this.sortMethod = "desc"
        }
        else {
          this.sortMethod = this.sortMethod === "desc" ? "asc" : "desc"
        }
      }
      this.sortField = sortParams
    },
    //获取商品列表数据
    async getSubGoodsList (queryParams) {
      const { result } = await getSubGoodsList(queryParams)
      this.goodsList = result.items
    }
  },
  watch: {
    id: {
      handler (newId) {
        this.getSubFilterList(newId)
        this.queryParams = {
          categoryId: newId,
          page: 2,
          pageSize: 40
        }
        this.getSubGoodsList(this.queryParams)
      },
      immediate: true
    }
  },
  computed: {
    //面包屑数据
    categoryBread () {
      const obj = {}
      this.$store.state.category.categoryList.forEach(top => {
        top.children && top.children.find(sub => {
          if (sub.id === this.$route.params.id) {
            obj.top = { name: top.name, id: top.id }
            obj.sub = { name: sub.name, id: sub.id }
          }
        })
      })
      return obj
    },
  },

}
</script>

<style lang="less" scoped>
.sub-category {
  .sub-properties {
    background-color: #fff;
    padding: 25px;
    .sub-filter {
      display: flex;
      line-height: 40px;
      .head {
        width: 80px;
        color: #999;
      }
      .body {
        flex: 1;
        a {
          margin-right: 36px;
          &:hover {
            color: @xtxColor;
          }
          &.active {
            color: @xtxColor;
          }
        }
      }
    }
  }
  //商品列表
  .goods {
    background-color: #fff;
    margin-top: 30px;
    padding: 20px;
    .sort {
      display: flex;
      justify-content: space-between;
      .sort-button {
        a {
          display: inline-block;
          width: 100px;
          margin-left: 15px;
          text-align: center;
          line-height: 30px;
          color: #999;
          border: 1px solid #ccc;
          &.active {
            background-color: @xtxColor;
            color: #fff;
          }
          &.price {
            position: relative;
            i {
              position: absolute;
              left: 78px;
              &.active {
                color: @xtxColor;
              }
            }
            i:nth-child(1) {
              top: -3px;
            }
            i:nth-child(2) {
              top: 4px;
            }
          }
        }
      }
    }
    .goods-list {
      padding: 25px;
      ul {
        display: flex;
        flex-wrap: wrap;
      }
    }
  }
}
</style>