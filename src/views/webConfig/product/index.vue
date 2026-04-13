<template>
  <div class="product">
    <div class="left">
      <product-left-form @changeNavId="changeNavId" />
    </div>
    <div class="right">
      <div v-if="NavId !== null">
        <add-btn @updata:addNew="addNew" />
        <product-table
          ref="productTable"
          :NavId="NavId"
          @edit="eidt"
          @changePage="changePage"
          @updateTable="updateTable"
        />
      </div>
      <div v-else>
        <el-empty description="请选择左侧导航"></el-empty>
      </div>
      <product-dialog
        ref="productDialog"
        :model="model"
        @updateTable="updateTable"
        :NavId="NavId"
      />
    </div>
  </div>
</template>

<script>
import productDialog from "@/components/dialogs/webConfig/product-dialog/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import productTable from "@/components/table/webConfig/product-table/index.vue";
import productLeftForm from "@/components/form/webConfig/product/product-left-form/index.vue";
export default {
  name: "product",
  components: { productLeftForm, productTable, addBtn, productDialog },
  data() {
    return {
      NavId: null,
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        type: "",
        navId: "",
      },
    };
  },
  methods: {
    changeNavId(val) {
      this.NavId = val;
      this.form.navId = val;
    },
    addNew() {
      this.model = "Add";
      this.$refs.productDialog.openDialog();
    },
    eidt(row) {
      this.model = "Edit";
      this.$refs.productDialog.detailsFormData(row.id);
      this.$refs.productDialog.openDialog();
    },
    updateTable() {
      this.$refs.productTable.getTableData(this.form);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.$refs.productTable.getTableData(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: hidden;
  display: flex;
  .left {
    flex: 2;
    height: 100%;
    padding: 10px;
    background-color: #fff;
    margin-right: 10px;
  }
  .right {
    flex: 14;
    height: 100%;
    padding: 0 20px 20px 20px;
    overflow-y: auto;
    background-color: #fff;
  }
}
</style>