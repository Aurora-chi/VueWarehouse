<template>
  <div class="customer-cases-dialog">
    <el-dialog
      :visible="customerCasesVisible"
      width="55%"
      top="14px"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增客户案例" : "编辑客户案例" }}
      </div>
      <customer-cases-dialog-form ref="customerCasesDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addCustomerCasesTableData,
  updateCustomerCasesTableData,
} from "@/api/webConfig/support/customer-cases/customer-cases-api";
import customerCasesDialogForm from "@/components/form/webConfig/support/customer-cases-form/customer-cases-dialog-form/index.vue";
export default {
  name: "customerCasesDialog",
  components: { customerCasesDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return { customerCasesVisible: false };
  },
  methods: {
    closeDialog() {
      this.$refs.customerCasesDialogForm.clearFormData();
      this.customerCasesVisible = false;
    },
    openDialog() {
      return new Promise((resolve) => {
        this.customerCasesVisible = true;
        // 等待 DOM 更新完成
        this.$nextTick(() => {
          resolve();
        });
      });
    },
    async saveDialog() {
      if (!(await this.$refs.customerCasesDialogForm.validate())) {
        return;
      }
      const form = this.$refs.customerCasesDialogForm.getFormData();
      if (this.model === "Add") {
        const res = await addCustomerCasesTableData(form);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        } else {
          this.$message.success("添加失败：", res.msg);
        }
      } else {
        const res = await updateCustomerCasesTableData(form);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        } else {
          this.$message.success("编辑失败：", res.msg);
        }
      }
      this.closeDialog();
    },
    details(id) {
      this.$refs.customerCasesDialogForm.detailsFormData(id);
    },
  },
};
</script>

<style>
</style>