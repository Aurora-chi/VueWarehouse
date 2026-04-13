<template>
  <div class="salesman">
    <div class="top">
      <salesman-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <salesman-table
        ref="salesmanTable"
        @edit="edit"
        @updateTable="updateTable"
        @changePage="changePage"
      />
    </div>
    <salesman-dialog
      ref="salesmanDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import salesmanDialog from "@/components/dialogs/webConfig/support/salesman-dialog/index.vue";
import salesmanTable from "@/components/table/webConfig/support/salesman-table/index.vue";
import salesmanTopForm from "@/components/form/webConfig/support/salesman-form/salesman-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
export default {
  name: "salesman",
  components: { salesmanTopForm, addBtn, salesmanTable, salesmanDialog },
  data() {
    return {
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        salesPost: "",
        contacts: "",
        phone: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query(val) {
      console.log("13");
      this.form = val;
      this.$refs.salesmanTable.getTableData(this.form);
    },
    reset(val) {
      this.form = val;
      this.$refs.salesmanTable.getTableData(this.form);
    },
    addNew() {
      this.model = "Add";
      this.$refs.salesmanDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.salesmanDialog.openDialog();
      this.$refs.salesmanDialog.detailsFormData(row.id);
    },
    // 切换页面
    changePage(page) {
      this.form = page;
      this.$refs.salesmanTable.getTableData(this.form);
    },
    // 刷新表格
    updateTable() {
      this.$refs.salesmanTable.getTableData(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.salesman {
  width: 100%;
  height: 100%;
  padding: 20px;
  .top {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    margin-bottom: 20px;
  }
  .bodyer {
    width: 100%;
    padding: 10px;
    background-color: #fff;
    margin-top: 20px;
  }
}
</style>