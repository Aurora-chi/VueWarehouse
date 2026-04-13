<template>
  <div class="salesman-dialog">
    <el-dialog
      :visible="salesmanVisible"
      width="45%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增销售人员" : "编辑销售人员" }}
      </div>
      <salesman-dialog-form ref="salesmanDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import salesmanDialogForm from "@/components/form/webConfig/support/salesman-form/salesman-dialog-form/index.vue";
import {
  addSalesmanTableData,
  detailsSalesmanTableData,
  updateSalesmanTableData,
} from "@/api/webConfig/support/salesman/salesman-api";
export default {
  name: "salesmanDialog",
  components: { salesmanDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      salesmanVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.salesmanDialogForm.clearFormData();
      this.salesmanVisible = false;
    },
    openDialog() {
      this.salesmanVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.salesmanDialogForm.validate())) {
        return;
      }
      const data = this.$refs.salesmanDialogForm.getFormData();
      if (this.model === "Add") {
        const res = await addSalesmanTableData(data);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        } else {
          this.$message.error("添加失败", res.msg);
        }
      } else {
        const res = await updateSalesmanTableData(data);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        } else {
          this.$message.error("编辑失败", res.msg);
        }
      }
      this.closeDialog();
    },
    // 获取详细数据
    async detailsFormData(id) {
      const res = await detailsSalesmanTableData(id);
      if (res.code === 200) {
        this.$refs.salesmanDialogForm.setFormData(res.data);
      } else {
        this.$message.error("获取详细数据失败", res.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>