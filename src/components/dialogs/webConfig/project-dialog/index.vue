<template>
  <div class="project-dialog">
    <el-dialog
      :visible="projectVisible"
      width="50%"
      top="13px"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增项目信息" : "编辑项目信息" }}
      </div>
      <project-dialog-form ref="projectDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import projectDialogForm from "@/components/form/webConfig/project/project-dialog-form/index.vue";
import {
  addProjectTableData,
  detailsProjectTableData,
  updateProjectTableData,
} from "@/api/webConfig/project/project-api";
export default {
  name: "projectDialog",
  components: { projectDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      projectVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.projectDialogForm.clearFormData();
      this.projectVisible = false;
    },
    openDialog() {
      this.projectVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.projectDialogForm.validate())) {
        return;
      }
      const val = this.$refs.projectDialogForm.getFormData();
      console.log(val);
      if (this.model === "Add") {
        const res = await addProjectTableData(val);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        }
      } else {
        const res = await updateProjectTableData(val);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsProjectTableData(id);
      console.log("res:", res);
      this.$refs.projectDialogForm.setFormData(res.data);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>