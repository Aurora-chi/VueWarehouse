<template>
  <div class="profile-update-pwd-form">
    <el-row>
      <el-form label-width="100px">
        <el-col :span="24">
          <el-form-item label="旧密码：">
            <el-input v-model="form.oldPassword" show-password />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="新密码：">
            <el-input v-model="form.newPassword" show-password />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="确认密码：">
            <el-input v-model="form.finallyPwd" show-password />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "profileUpdatePwdForm",
  data() {
    return {
      form: {
        oldPassword: "",
        newPassword: "",
        finallyPwd: "",
      },
    };
  },
  methods: {
    getFormData() {
      return this.form;
    },
    clearFormData() {
      this.form = {
        oldPassword: "",
        newPassword: "",
        finallyPwd: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>