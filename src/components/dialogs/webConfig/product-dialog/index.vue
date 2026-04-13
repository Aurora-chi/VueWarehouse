<template>
  <div class="product-dialog">
    <el-dialog
      :visible="productVisible"
      width="50%"
      top="13px"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增项目信息" : "编辑项目信息" }}
      </div>
      <product-dialog-form ref="productDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addProductTableData,
  updateProductTableData,
  detailsProductTableData,
} from "@/api/webConfig/product/product-api";
import productDialogForm from "@/components/form/webConfig/product/product-dialog-form/index.vue";
export default {
  name: "productDialog",
  components: { productDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
    NavId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      productVisible: false,
    };
  },
  methods: {
    openDialog() {
      this.productVisible = true;
    },
    closeDialog() {
      this.$refs.productDialogForm.clearFormData();
      this.productVisible = false;
    },
    async saveDialog() {
      if (!(await this.$refs.productDialogForm.validate())) {
        return;
      }
      const val = this.$refs.productDialogForm.getFormData();
      val.navId = this.NavId;

      if (this.model === "Add") {
        const res = await addProductTableData(val);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        }
      } else {
        const res = await updateProductTableData(val);
        console.log(res);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsProductTableData(id);

      this.$refs.productDialogForm.setFormData(res.data);
    },
  },
};
</script>

<style lang='scss' scoped>
</style>