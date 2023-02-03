<template>
  <div class="xtx-cart-page">
    <div class="container">
      <Bread>
        <BreadItem to="/">首页</BreadItem>
        <BreadItem>购物车</BreadItem>
      </Bread>
      <div class="cart">
        <table v-if="$store.getters['cart/validList'].length">
          <thead>
            <tr>
              <th width="120">
                <!-- 全选 -->
                <input
                  type="checkbox"
                  :checked="$store.getters['cart/isCheckAll']"
                  @click="checkAll($store.getters['cart/isCheckAll'])"
                />
                <span :class="{active:isChexkAll}">全选</span>
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-for="item in $store.getters['cart/validList']" :key="item.skuId">
              <!-- 单选 -->
              <td>
                <input
                  type="checkbox"
                  :checked="item.selected"
                  @change="$store.dispatch('cart/checkedOne',item)"
                />
              </td>
              <td>
                <!-- 图片及属性 -->
                <div class="goods">
                  <RouterLink :to="`/product/${item.id}`">
                    <img :src="item.picture" alt />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <!-- 选择规格组件 -->
                    <CartSku
                      @change="$event=>changeSku(item.skuId,$event)"
                      :attrsText="item.attrsText"
                      :skuId="item.skuId"
                    />
                  </div>
                </div>
              </td>
              <td class="tc">
                <!-- 单价 -->
                <p>&yen;{{item.nowPrice}}</p>
                <p v-if="item.price-item.nowPrice>0">
                  比加入时降价
                  <span class="red">&yen;{{item.price-item.nowPrice}}</span>
                </p>
              </td>
              <td class="tc">
                <!-- 数量组件 -->
                <XtxNumber
                  :count="item.count"
                  :maxNum="item.stock"
                  @changNum="$event=>changNum(item.skuId,$event)"
                ></XtxNumber>
              </td>
              <td class="tc">
                <!-- 小计 -->
                <p class="f16 red">&yen;{{Math.round((item.nowPrice*100)*item.count/100)}}</p>
              </td>
              <td class="tc">
                <!-- 操作 -->
                <p>
                  <a href="javascript:;">移入收藏夹</a>
                </p>
                <p>
                  <a class="green" href="javascript:;" @click="delCart('single',item.skuId)">删除</a>
                </p>
                <p>
                  <a href="javascript:;">找相似</a>
                </p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/inValidList'].length">
            <tr>
              <td colspan="6">
                <h3 class="tit">失效商品</h3>
              </td>
            </tr>
            <tr v-for="item in $store.getters['cart/inValidList']" :key="item.skuId">
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <div class="goods">
                  <RouterLink to="/">
                    <img :src="item.picture" alt />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{item.name}}</p>
                    <p class="attr">{{item.attrsText}}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{item.nowPrice}}</p>
              </td>
              <td class="tc">{{item.count}}</td>
              <td class="tc">
                <p>&yen;{{item.nowPrice*item.count}}</p>
              </td>
              <td class="tc">
                <p>
                  <a class="green" href="javascript:;">删除</a>
                </p>
                <p>
                  <a href="javascript:;">找相似</a>
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-else>您还没有加入商品</div>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <input
            type="checkbox"
            @click="checkAll($store.getters['cart/isCheckAll'])"
            :checked="isChexkAll"
            :class="{active:isChexkAll}"
            class="active"
          />
          <span :class="{active:isChexkAll}">全选</span>
          <a href="javascript:;" @click="delCart('selected')">删除商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{$store.getters['cart/validList'].length}} 件商品，已选择 {{$store.getters['cart/selectedGoods'].length}} 件，商品合计：
          <span
            class="red"
          >¥{{$store.getters['cart/selectedGoodsMount']}}</span>
          <XtxButton type="primary" @click.native="checkOut">下单结算</XtxButton>
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <!-- <GoodRelevant /> -->
    </div>
    <!-- 删除商品对话框 -->
    <el-dialog title="删除商品" :visible.sync="dialogVisible" width="30%">
      <span>{{delType==="single"?"确定要删除该商品吗":`确定要删除这${$store.getters['cart/selectedGoods'].length}件商品吗`}}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogClose">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import xtxButton from '@/components/library/xtx-button.vue'
import { Dialog, Button, MessageBox, Message } from 'element-ui'
import CartSku from './components/cart-sku.vue'
// import GoodRelevant from '@/views/goods/components/goods-relevant'
export default {
  components: { xtxButton, CartSku, elDialog: Dialog, elButton: Button },
  name: 'XtxCartPage',
  // components: { GoodRelevant }
  data () {
    return {
      dialogVisible: false,
      delType: '',
      skuId: null,
    }
  },
  computed: {
    isChexkAll () {
      return this.$store.getters['cart/isCheckAll']
    }
  },
  methods: {
    //下单结算/member/checkout
    checkOut () {
      if (!this.$store.getters['cart/selectedGoods'].length) return Message.warning("请至少选择一件商品")
      if (!this.$store.state.user.profile.token) {
        MessageBox.confirm('下单结算需要登录，确认现在去登录吗?', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/member/checkout')
        }).catch(() => {
          Message({
            type: 'info',
            message: '已取消登录'
          })
        })
      } else {
        this.$router.push('/member/checkout')
      }
    },
    changeSku (oldSkuId, newSku) {
      this.$store.dispatch('cart/changeSkuCart', { oldSkuId, newSku })
    },
    changNum (skuId, count) {
      this.$store.dispatch("cart/updateCountCart", { skuId, count })
    },
    dialogClose () {
      this.dialogVisible = false
      if (this.delType === 'single') {
        this.$store.dispatch('cart/deleteCart', this.skuId)
      } else if (this.delType === 'selected') {
        this.$store.dispatch('cart/deleteSelectedCart')
      }
    },
    delCart (type, skuId) {
      this.dialogVisible = true
      this.delType = type
      if (skuId) {
        this.skuId = skuId
      }
    },
    checkAll (isCheckAll) {
      isCheckAll = !isCheckAll
      this.$store.dispatch('cart/checkedAll', isCheckAll)
    }
  }
}
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .xtx-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @xtxColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  padding: 0 30px;
  .batch {
    a {
      margin-left: 20px;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.active {
  color: #27ba9b !important;
}
.xtx-cart-page {
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
  .action {
    margin: 20px 0;
    font-size: 16px;
    color: #333;
    .batch {
      span {
        color: #999;
      }
    }
  }
  input {
    width: 16px;
    height: 16px;
  }
}
</style>