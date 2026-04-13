<template>
  <div class="info-dialog">
    <el-dialog
      :visible="infoVisible"
      width="50%"
      top="13px"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增公司信息" : "编辑公司信息" }}
      </div>
      <info-dialog-form ref="infoDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import infoDialogForm from "@/components/form/webConfig/about/info-form/infor-dialog-form/index.vue";
import {
  addInfoTableData,
  detailsInfoTableData,
  updateInfoTableData,
} from "@/api/webConfig/about/info/info-api";
export default {
  name: "infoDialog",
  components: { infoDialogForm },
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      infoVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.infoDialogForm.clearFormData();
      this.infoVisible = false;
    },
    openDialog() {
      this.infoVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.infoDialogForm.validate())) {
        return;
      }
      const val = this.$refs.infoDialogForm.getFormData();
      console.log(val);
      if (this.model === "Add") {
        const res = await addInfoTableData(val);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        }
      } else {
        const res = await updateInfoTableData(val);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsInfoTableData(id);
      if (res.code === 200) {
        this.$refs.infoDialogForm.setFormData(res.data);
        console.log(res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>