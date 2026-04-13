<template>
  <div class="role-dialog">
    <el-dialog
      :visible="roleVisible"
      width="45%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增角色" : "编辑角色" }}
      </div>
      <role-dialog-form
        ref="roleDialogForm"
        :roleId="roleid"
        @closeDialog="closeDialog"
      />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import roleDialogForm from "@/components/form/system/role-form/role-dialog-form/index.vue";
export default {
  name: "roleDialog",
  components: { roleDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
    id: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      roleVisible: false,
      roleid: "",
    };
  },
  methods: {
    openDialog() {
      if (this.model !== "Add") {
        this.roleid = String(this.id);
        this.$nextTick(() => {
          this.$refs.roleDialogForm.updateForm();
        });
      }
      this.roleVisible = true;
    },
    closeDialog() {
      this.$refs.roleDialogForm.clearFormData();
      this.roleVisible = false;
    },
    async saveDialog() {
      await this.$refs.roleDialogForm.saveDialog(this.model);
      this.$emit("updateTable");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>