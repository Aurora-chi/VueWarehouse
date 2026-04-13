<template>
  <div class="standard-dialog">
    <el-dialog
      :visible="standardVisible"
      width="45%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增行业标准" : "编辑行业标准" }}
      </div>
      <standard-dialog-form ref="standardDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addStandardTableData,
  detailsStandardTableData,
  updateStandardTableData,
} from "@/api/webConfig/support/standard/standard-api";
import standardDialogForm from "@/components/form/webConfig/support/standard-form/standard-dialog-form/index.vue";
export default {
  name: "standardDialog",
  components: { standardDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      standardVisible: false,
      detailsData: {},
    };
  },
  methods: {
    // 获取详细数据
    async getDetailsData(id) {
      const res = await detailsStandardTableData(id);
      this.$refs.standardDialogForm.setFormData(res.data);
    },
    openDialog() {
      this.standardVisible = true;
    },
    closeDialog() {
      this.$refs.standardDialogForm.clearFormData();
      this.standardVisible = false;
    },
    async saveDialog() {
      if (!(await this.$refs.standardDialogForm.validate())) {
        return;
      }
      const val = this.createForm(this.$refs.standardDialogForm.getFormData());
      if (this.model === "Add") {
        const res = await addStandardTableData(val);
        if (res.code === 200) {
          this.$message.success("添加成功");
        } else {
          this.$message.success("添加失败", res.msg);
        }
      } else {
        const res = await updateStandardTableData(val);
        if (res.code === 200) {
          this.$message.success("编辑成功");
        } else {
          this.$message.success("编辑失败", res.msg);
        }
      }
      this.$emit("updateTable");
      this.closeDialog();
    },
    // 创建表单
    createForm(data) {
      const formData = new FormData();
      formData.append("id", data.id);
      formData.append("standardNo", data.standardNo);
      formData.append("standardName", data.standardName);
      formData.append("sort", data.sort);
      formData.append("isDisplay", data.isDisplay);
      formData.append("isTop", data.isTop);
      formData.append("file", data.file);
      return formData;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>