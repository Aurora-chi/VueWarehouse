<template>
  <div class="salesmanDialogForm">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="销售岗位：" prop="salesPost">
            <el-input v-model="form.salesPost" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系人：" prop="contacts">
            <el-input v-model="form.contacts" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="联系电话：" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio v-model="form.isDisplay" label="1">是</el-radio>
            <el-radio v-model="form.isDisplay" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否置顶：" prop="isTop">
            <el-radio v-model="form.isTop" label="1">是</el-radio>
            <el-radio v-model="form.isTop" label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "salesmanDialogForm",
  data() {
    return {
      form: {
        salesPost: "",
        contacts: "",
        phone: "",
        sort: undefined,
        isDisplay: "",
        isTop: "",
        id: "",
        createTime: "",
      },
      rules: {
        salesPost: [{ required: true, message: "请输入", trigger: "blur" }],
        contacts: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "change" }],
        isTop: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  methods: {
    setFormData(data) {
      this.form = data;
      this.form.isDisplay = String(data.isDisplay);
      this.form.isTop = String(data.isTop);
    },
    getFormData() {
      return this.form;
    },
    clearFormData() {
      this.form = {
        salesPost: "",
        contacts: "",
        phone: "",
        sort: undefined,
        isDisplay: "",
        isTop: "",
        id: "",
        createTime: "",
      };
      this.$refs.form.clearValidate();
    },
    async validate() {
      try {
        await this.$refs.form.validate();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
</style>