<template>
  <div class="history-dialog">
    <el-dialog
      :visible="historyVisible"
      width="50%"
      top="13vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增历史" : "编辑历史" }}
      </div>
      <history-dialog-form ref="historyDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import historyDialogForm from "@/components/form/webConfig/about/history-form/history-dialog-form/index.vue";
import {
  addHistoryTableData,
  detailsHistoryTableData,
  updateHistoryTableData,
} from "@/api/webConfig/about/history/history-api";
export default {
  name: "historyDialog",
  components: { historyDialogForm },
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      historyVisible: false,
      form: {},
    };
  },
  methods: {
    closeDialog() {
      this.$refs.historyDialogForm.clearFormData();
      this.historyVisible = false;
    },
    openDialog() {
      this.historyVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.historyDialogForm.validate())) {
        return;
      }
      const val = this.$refs.historyDialogForm.getFormData();
      console.log(val);
      const formData = new FormData();
      formData.append("time", val.time || "");
      formData.append("content", val.content || "");
      formData.append("sort", val.sort || undefined);
      formData.append("display", val.display || "");
      formData.append("id", val.id || "");
      formData.append("file", val.file || {});
      formData.append("filePath", val.filePath || "");
      if (this.model === "Add") {
        const res = await addHistoryTableData(formData);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        }
      } else {
        const res = await updateHistoryTableData(formData);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsHistoryTableData(id);
      if (res.code === 200) {
        this.$refs.historyDialogForm.setFormData(res.data);
        console.log(res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>