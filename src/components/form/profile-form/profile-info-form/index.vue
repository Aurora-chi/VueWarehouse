<template>
  <div class="profile-info-form">
    <el-row>
      <el-form label-width="100px">
        <el-col :span="24">
          <el-form-item label="用户昵称：">
            <el-input v-model="form.userName" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="手机号码：">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="邮箱：">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="性别：">
            <el-radio v-model="form.sex" label="1">男</el-radio>
            <el-radio v-model="form.sex" label="0">女</el-radio>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "profileInfoForm",
  data() {
    return {
      form: {
        userName: "",
        phone: "",
        email: "",
        sex: "",
      },
    };
  },
  methods: {
    getFormData() {
      return this.form;
    },
    setFormData(data) {
      this.form = data;
      this.form.sex = String(data.sex);
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-info-form {
  padding: 0 20px;
}
</style>