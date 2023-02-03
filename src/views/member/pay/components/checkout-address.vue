<template>
  <div class="address">
    <div class="text">
      <div class="none" v-if="!addressList.length">您需要先添加收货地址才可提交订单。</div>
      <ul v-else>
        <li>
          <span>
            收
            <i />货
            <i />人：
          </span>
          {{showAddress.receiver}}
        </li>
        <li>
          <span>联系方式：</span>
          {{showAddress.contact}}
        </li>
        <li>
          <span>收货地址：</span>
          {{showAddress.fullLocation+showAddress.address}}
        </li>
      </ul>
      <a href="javascript:;" @click="editAddress(showAddress)">修改地址</a>
    </div>
    <div class="action">
      <XtxButton class="btn" @click.native="openChange">切换地址</XtxButton>
      <XtxButton class="btn" @click.native="editAddress({})">添加地址</XtxButton>
    </div>
    <XtxDialog title="切换地址" :visible="ChangeVisible">
      <div class="text item" v-for="item in addressList" :key="item.id" @click="changAddress(item)">
        <ul>
          <li>
            <span>
              收
              <i />货
              <i />人：
            </span>
            {{item.receiver}}
          </li>
          <li>
            <span>联系方式：</span>
            {{item.contact}}
          </li>
          <li>
            <span>收货地址：</span>
            {{item.fullLocation+item.address}}
          </li>
        </ul>
      </div>
    </XtxDialog>
    <AdressEdite ref="AdressEditeRef" @updateAdress="updateAdress" />
  </div>
</template>
<script>
import AdressEdite from './address-edit.vue'
export default {
  name: "CheckoutAdress",
  components: {
    AdressEdite
  },
  props: {
    addressList: {
      type: Array,
    }
  },
  data () {
    return {
      //当前用户地址
      showAddress: {},
      ChangeVisible: false
    }
  },
  created () {
    this.getDefaultAddress()
    this.$emit('change', this.showAddress.id)
  },
  methods: {
    //修改或添加地址
    updateAdress (newAddress) {
      const address = this.addressList.find(item => {
        return item.id === newAddress.id
      })
      if (address) {
        //有id修改地址
        for (const key in newAddress) {
          address[key] = newAddress[key]
        }
      }
      //没有id添加地址
      else {
        this.addressList.unshift(newAddress)
        this.getDefaultAddress()
      }
      this.$emit('change', address.id)
    },
    editAddress (address) {
      this.$refs.AdressEditeRef.open(address)
    },
    changAddress (address) {
      this.showAddress = address
      this.ChangeVisible = false
      this.$emit('change', address.id)
    },
    openChange () {
      this.ChangeVisible = true
    },
    close () {
      this.visible = false
    },
    getDefaultAddress () {
      if (this.addressList.length === 0) return
      const defaultAddress = this.addressList.find(item => {
        return item.isDefault === 0
      })
      if (defaultAddress) {
        this.showAddress = defaultAddress
      }
      else {
        this.showAddress = this.addressList[0]
      }
    }
  }
}
</script>
<style lang="less" scoped>
.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }
    > ul {
      flex: 1;
      padding: 20px;
      li {
        line-height: 30px;
        span {
          color: #999;
          margin-right: 5px;
          > i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }
    > a {
      color: @xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }
  .action {
    width: 420px;
    text-align: center;
    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;
      &:first-child {
        margin-right: 10px;
      }
    }
  }
  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;
    &.item {
      border: 1px solid #f5f5f5;
      margin-bottom: 10px;
      cursor: pointer;
      &.active,
      &:hover {
        border-color: @xtxColor;
        background: lighten(@xtxColor, 50%);
      }
      > ul {
        padding: 10px;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
}
</style>