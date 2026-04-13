<template>
  <div class="navigation-dialog">
    <el-dialog
      :visible="navigationVisible"
      width="50%"
      top="13vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增导航管理" : "编辑导航管理" }}
      </div>
      <navigation-dialog-form ref="navigationDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import navigationDialogForm from "@/components/form/webConfig/navigation/navigation-dialog-form/index.vue";
import {
  addNavigationTableData,
  detailsNavigationTableData,
  updateNavigationTableData,
} from "@/api/webConfig/navigation/navigation-api";
export default {
  name: "navigationDialog",
  components: { navigationDialogForm },
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      navigationVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.navigationDialogForm.clearFormData();
      this.navigationVisible = false;
    },
    openDialog() {
      this.navigationVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.navigationDialogForm.validate())) {
        return;
      }
      const val = this.$refs.navigationDialogForm.getFormData();
      if (val.parentId !== 0) {
        val.code = "";
        val.isHomeDisplay = "";
        console.log(val);
      }
      if (this.model === "Add") {
        const res = await addNavigationTableData(val);
        if (res.code === 200) {
          this.$emit("updateTable");
          this.$message.success("添加成功");
        }
      } else {
        const res = await updateNavigationTableData(val);
        if (res.code === 200) {
          this.$emit("updateTable");
          this.$message.success("编辑成功");
        }
      }
      this.closeDialog();
    },
    setParentId(id) {
      this.$refs.navigationDialogForm.setParentId(id);
    },
    async detailsFormData(id) {
      const res = await detailsNavigationTableData(id);
      await this.$nextTick();
      if (res.code === 200) {
        this.$refs.navigationDialogForm.setFormData(res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>