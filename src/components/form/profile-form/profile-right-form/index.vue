<template>
  <div class="profile-right-form">
    <el-tabs v-model="tabPosition">
      <el-tab-pane label="基本信息" name="first">
        <profile-info-form ref="profileInfoForm" />
        <div class="button">
          <el-button type="primary" @click="saveInfoForm">保存</el-button>
          <el-button type="danger" @click="closeInfoForm">关闭</el-button>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改密码" name="second">
        <profile-update-pwd-form ref="profileUpdatePwdForm" />
        <div class="button">
          <el-button type="primary" @click="saveUpdatePwdForm">保存</el-button>
          <el-button type="danger" @click="closeUpdatePwdForm">关闭</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  updateProfileUserInfo,
  updateProfileUserPwd,
} from "@/api/profile/profile-api";
import { logout } from "@/api/login";
import profileUpdatePwdForm from "@/components/form/profile-form/profile-update-pwd-form/index.vue";
import profileInfoForm from "@/components/form/profile-form/profile-info-form/index.vue";
export default {
  name: "profileRightForm",
  components: { profileInfoForm, profileUpdatePwdForm },
  data() {
    return {
      tabPosition: "first",
    };
  },
  methods: {
    setInfoForm(data) {
      this.$refs.profileInfoForm.setFormData(data);
    },
    async saveInfoForm() {
      const val = this.$refs.profileInfoForm.getFormData();
      const res = await updateProfileUserInfo(val);
      if (res.code === 200) {
        this.$message.success("修改成功");
        this.$emit("updateForm");
      }
    },
    async saveUpdatePwdForm() {
      const val = this.$refs.profileUpdatePwdForm.getFormData();
      // 前端验证：新密码是否一致
      if (val.newPassword !== val.finallyPwd) {
        this.$message.warning("新密码不一致");
        return;
      }
      // 前端验证：新旧密码不能相同
      if (val.oldPassword === val.newPassword) {
        this.$message.warning("新密码不能与旧密码相同");
        return;
      }
      console.log(val);
      const res = await updateProfileUserPwd(val);
      console.log(res);
      if (res.code === 200) {
        this.$message.success("密码修改成功");
        await this.$alert(`密码修改成功,请重新登入`, "提示", {
          confirmButtonText: "确定",
          type: "warning",
        });
        await logout();
        // 跳转到登录页
        this.$router.push("/login");
      }
    },
    closeInfoForm() {
      this.$router.push("/main");
    },
    closeUpdatePwdForm() {
      this.$refs.profileUpdatePwdForm.clearFormData();
      this.$router.push("/main");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  float: right;
  margin-top: 20px;
}
</style>