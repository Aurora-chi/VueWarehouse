<template>
  <div class="message-dialog-form">
    <el-row>
      <el-form label-width="100px">
        <el-col :span="24">
          <el-form-item label="姓名：">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="电话：">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="地址：">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="合作类型：">
            <el-input v-model="form.cooperationType" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：">
            <el-radio label="1" v-model="form.status">已查看</el-radio>
            <el-radio label="0" v-model="form.status">未查看</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="留言内容：">
            <el-input v-model="form.content" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="创建时间：">
            <el-input v-model="form.createTime" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "messageDialogForm",
  data() {
    return {
      id: "",
      name: "",
      phone: "",
      address: "",
      cooperationType: "",
      content: "",
      status: "",
      createTime: "",
    };
  },
  methods: {
    setFormData(data) {
      this.form = data;
      this.form.status = String(data.status);
    },
    clearFormData() {
      this.form = {
        id: "",
        name: "",
        phone: "",
        address: "",
        cooperationType: "",
        content: "",
        status: "",
        createTime: "",
      };
    },
  },
};
</script>

<style>
</style>