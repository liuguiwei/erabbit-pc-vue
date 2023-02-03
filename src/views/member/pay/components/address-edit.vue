<template>
  <XtxDialog :title="(addressEditForm.id?'修改':'添加')+'收货地址'" :visible="visible" @closeDialog="close">
    <el-form
      :model="addressEditForm"
      :rules="addressEditRules"
      ref="addressEditRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item prop="receiver" label="收货人">
        <el-input v-model="addressEditForm.receiver" placeholder="请输入收货人"></el-input>
      </el-form-item>
      <el-form-item prop="contact" label="手机号">
        <el-input v-model="addressEditForm.contact" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item prop="fullLocation" label="地区">
        <City @getCity="getCity" title :showCityFullName="false"></City>
        <el-input v-model="addressEditForm.fullLocation"></el-input>
      </el-form-item>
      <el-form-item prop="address" label="详细地址">
        <el-input v-model="addressEditForm.address" placeholder="请输入详细地址"></el-input>
      </el-form-item>
      <el-form-item prop="postalCode" label="邮政编码">
        <el-input v-model="addressEditForm.postalCode" placeholder="请输入邮政编码"></el-input>
      </el-form-item>
      <el-form-item prop="addressTags" label="地址标签">
        <el-input v-model="addressEditForm.addressTags" placeholder="请输入地址标签,逗号分割"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <xtx-button type="gray" style="margin:20px" @click.native="close">取消</xtx-button>
      <xtx-button type="primary" @click.native="editAddress">确定</xtx-button>
    </template>
  </XtxDialog>
</template>

<script>
import { Form, FormItem, Input, Message } from 'element-ui'
import XtxButton from '@/components/library/xtx-button.vue'
import { addAddress, addressModify } from '@/api/member'
export default {
  name: "AddressEdit",
  components: { elForm: Form, elFormItem: FormItem, elInput: Input, XtxButton },
  data () {
    return {
      visible: false,
      addressEditForm: {
        receiver: '',
        address: '',
        addressTags: "",
        cityCode: "",
        contact: "",
        countyCode: "",
        fullLocation: "",
        isDefault: 1,
        postalCode: "",
        provinceCode: "",

      },
      addressEditRules: {
        // receiver: [
        //   { required: true, message: '请输入活动名称', trigger: 'blur' },
        //   { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        // ],
        contact: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { pattern: /^1[3-9]\d{9}$/, message: '手机号格式有误', trigger: 'blur' },
        ],
      }
    }
  },
  methods: {
    close () {
      for (const key in this.addressEditForm) {
        this.addressEditForm[key] = null
      }
      this.visible = false
    },
    open (address) {
      this.visible = true
      if (address.id) {
        //有id修改地址
        for (const key in address) {
          this.addressEditForm[key] = address[key]
        }
      }
    },
    editAddress () {
      if (this.addressEditForm.id) {
        //修改地址
        addressModify(this.addressEditForm)
        Message.success("修改地址成功")
      }
      else {
        //添加地址
        addAddress(this.addressEditForm).then(res => {
          this.addressEditForm.id = res.result.id
          Message.success("添加地址成功")
        })
      }
      this.$emit("updateAdress", this.addressEditForm)
      this.close()
    },
    getCity (cityResult) {
      this.addressEditForm.fullLocation = cityResult.provinceName + cityResult.cityName + cityResult.countyName
      console.log(cityResult)
      this.addressEditForm.cityCode = cityResult.cityCode
      this.addressEditForm.countyCode = cityResult.countyCode
      this.addressEditForm.provinceCode = cityResult.provinceCode
    }
  },
}
</script>

<style lang="less" scoped>
::v-deep.el-form {
  margin-top: 30px;
  .el-form-item__content {
    position: relative;
    height: 50px;
    line-height: 50px;
    border: 1px solid #cfcdcd;
    .el-input__validateIcon {
      display: none;
    }
    .el-input__inner {
      height: 30px;
      padding-left: 3px;
    }
  }
  .el-form-item__label {
    color: #999;
  }
  .xtx-city {
    position: absolute;
    width: 100%;
    .select {
      height: 50px;
      i {
        position: absolute;
        right: 0;
        font-size: 30px;
        color: #999;
      }
    }
  }
}
</style>