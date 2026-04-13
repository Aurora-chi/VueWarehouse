<template>
  <div class="profile-dialog">
    <el-dialog
      :visible="avatarVisible"
      top="15vh"
      @close="closeDialog"
      width="30%"
    >
      <div slot="title" class="custom-title">修改头像</div>
      <profile-dialog-form ref="profileDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import profileDialogForm from "@/components/form/profile-form/profile-dialog-form/index.vue";
export default {
  name: "profileDialog",
  components: { profileDialogForm },
  data() {
    return {
      avatarVisible: false,
      avatar: "",
    };
  },
  methods: {
    closeDialog() {
      this.avatarVisible = false;
    },
    openDialog(data) {
      this.avatarVisible = true;
      this.$nextTick(() => {
        if (this.$refs.profileDialogForm) {
          this.$refs.profileDialogForm.setFormData(data);
        }
      });
    },
    saveDialog() {
      const val = this.$refs.profileDialogForm.getFormData();
      this.$emit("updateUserInfo", val);
      this.closeDialog();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>