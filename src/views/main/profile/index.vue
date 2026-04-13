<template>
  <div class="profile">
    <div class="left">
      <profile-left-form ref="profileLeftForm" />
    </div>
    <div class="right">
      <profile-right-form ref="profileRightForm" @updateForm="updateForm" />
    </div>
  </div>
</template>

<script>
import { getProfileUserInfo } from "@/api/profile/profile-api";
import profileLeftForm from "@/components/form/profile-form/profile-left-form/index.vue";
import profileRightForm from "@/components/form/profile-form/profile-right-form/index.vue";
export default {
  name: "profile",
  components: { profileLeftForm, profileRightForm },
  data() {
    return {};
  },
  async created() {
    await this.setInfoForm();
  },
  methods: {
    updateForm() {
      this.$refs.profileLeftForm.getUserInfo();
    },
    // 设置基本信息
    async setInfoForm() {
      const res = await getProfileUserInfo();
      console.log(res);
      if (res.code === 200) {
        const val = res.data.user;
        this.$refs.profileRightForm.setInfoForm(val);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
  width: 100%;
  height: auto !important;
  padding: 20px;
  display: flex;
  .left {
    flex: 3;
    background-color: #fff;
    margin-right: 10px;
  }
  .right {
    flex: 11;
    padding: 20px;
    background-color: #fff;
    margin-left: 10px;
  }
}
</style>