<template>
  <div class="profile-dialog">
    <el-dialog
      :visible="profileVisible"
      width="50%"
      top="13px"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增公司简介" : "编辑公司简介" }}
      </div>
      <profile-dialog-form ref="profileDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import profileDialogForm from "@/components/form/webConfig/about/profile-form/profile-dialog-form/index.vue";
import {
  addProfileTableData,
  detailsProfileTableData,
  updateProfileTableData,
} from "@/api/webConfig/about/profile/profile-api";
export default {
  name: "profileDialog",
  components: { profileDialogForm },
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      profileVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.profileDialogForm.clearFormData();
      this.profileVisible = false;
    },
    openDialog() {
      this.profileVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.profileDialogForm.validate())) {
        return;
      }
      const val = this.$refs.profileDialogForm.getFormData();
      if (this.model === "Add") {
        const res = await addProfileTableData(val);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        }
      } else {
        const res = await updateProfileTableData(val);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsProfileTableData(id);
      if (res.code === 200) {
        this.$refs.profileDialogForm.setFormData(res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>