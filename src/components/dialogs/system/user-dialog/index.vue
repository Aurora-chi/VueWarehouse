<template>
  <div class="user-dialog">
    <el-dialog
      :visible="userVisible"
      width="45%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增用户" : "编辑用户" }}
      </div>
      <user-dialog-form ref="userDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addUserTableData,
  detailsUserTableData,
  updateUserTableData,
} from "@/api/system/user/user-api";
import userDialogForm from "@/components/form/system/user-form/user-dailog-form/index.vue";
export default {
  name: "userDialog",
  components: { userDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      userVisible: false,
      detailsData: {},
    };
  },
  methods: {
    // 获取列表详细数据
    async getDetailsData(id) {
      const res = await detailsUserTableData(id);
      this.detailsData = res.data;
      this.$refs.userDialogForm.setFormData(this.detailsData, "Edit");
    },
    closeDialog() {
      this.$refs.userDialogForm.clearFormData();
      this.userVisible = false;
    },
    openDialog() {
      this.userVisible = true;
    },
    async saveDialog() {
      if (await this.$refs.userDialogForm.validate()) {
        const val = this.$refs.userDialogForm.getFormData();
        if (this.model === "Add") {
          const res = await addUserTableData(val);
          if (res.code === 200) {
            this.$message.success("新增成功");
            this.$emit("updateTable");
            this.closeDialog();
          }
        } else {
          const res = await updateUserTableData(val);
          if (res.code === 200) {
            this.$message.success("编辑成功");
            this.$emit("updateTable");
            this.closeDialog();
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>