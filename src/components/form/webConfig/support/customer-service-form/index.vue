<template>
  <div class="customer-service-form">
    <el-row :gutter="20">
      <el-form label-width="130px" :model="form" :rules="rules" ref="form">
        <el-col :span="14" :offset="5">
          <el-form-item label="产品保修：" prop="productRepair">
            <el-input
              autosize
              type="textarea"
              :rows="3"
              v-model="form.productRepair"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :offset="5">
          <el-form-item label="保修凭证：" prop="repairVoucher">
            <el-input
              autosize
              type="textarea"
              :rows="4"
              v-model="form.repairVoucher"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :offset="5">
          <el-form-item
            autosize
            label="用户配合细则："
            prop="userConcertDetails"
          >
            <el-input
              autosize
              type="textarea"
              :rows="4"
              v-model="form.userConcertDetails"
            />
          </el-form-item>
        </el-col>
        <el-col :span="14" :offset="5">
          <el-form-item autosize label="售后服务热线：" prop="afterSalePhone">
            <el-input type="textarea" :rows="1" v-model="form.afterSalePhone" />
          </el-form-item>
        </el-col>
        <el-col :span="6" :offset="18">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit">确 定</el-button>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import {
  getCustomerServiceTableData,
  updateCustomerServiceTableData,
} from "@/api/webConfig/support/customer-service/customer-service-api";
export default {
  name: "customerServiceForm",
  data() {
    return {
      form: {
        productRepair: "",
        repairVoucher: "",
        userConcertDetails: "",
        afterSalePhone: "",
      },
      rules: {
        productRepair: [{ required: true, message: "请输入", trigger: "blur" }],
        repairVoucher: [{ required: true, message: "请输入", trigger: "blur" }],
        userConcertDetails: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        afterSalePhone: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
    };
  },
  async created() {
    await this.getTableData();
  },
  methods: {
    // 获取数据
    async getTableData() {
      const res = await getCustomerServiceTableData();
      if (res.code === 200) {
        this.form = res.data;
      } else {
        this.$message.error("数据更新失败：", res.msg);
      }
      this.$refs.form.clearValidate();
    },
    // 取消
    cancel() {
      this.getTableData();
    },
    // 确定
    async submit() {
      try {
        await this.$refs.form.validate();
      } catch (e) {
        return false;
      }
      await this.$confirm(`确定要更改吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await updateCustomerServiceTableData(this.form);
      if (res.code === 200) {
        this.$message.success("修改成功");
      } else {
        this.$message.error("修改失败:", res.msg);
      }
    },
  },
};
</script>

<style>
</style>