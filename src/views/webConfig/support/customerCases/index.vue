<template>
  <div class="customer-cases">
    <div class="top">
      <customer-cases-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <customer-cases-table
        ref="customerCasesTable"
        @changePage="changePage"
        @edit="edit"
        @updateTable="updateTable"
      />
    </div>
    <customer-cases-dialog
      ref="customerCasesDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import customerCasesTopForm from "@/components/form/webConfig/support/customer-cases-form/customer-cases-top-form/index.vue";
import customerCasesTable from "@/components/table/webConfig/support/customer-cases-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import customerCasesDialog from "@/components/dialogs/webConfig/support/customer-cases-dialog/index.vue";
export default {
  name: "customerCases",
  components: {
    customerCasesTopForm,
    addBtn,
    customerCasesTable,
    customerCasesDialog,
  },
  data() {
    return {
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query(val) {
      this.form = val;
      this.$refs.customerCasesTable.getTableData(this.form);
    },
    reset(val) {
      this.form = val;
      this.$refs.customerCasesTable.getTableData(this.form);
    },
    // 新增
    addNew() {
      this.model = "Add";
      this.$refs.customerCasesDialog.openDialog();
    },
    // 编辑
    async edit(row) {
      this.model = "Edit";
      await this.$refs.customerCasesDialog.openDialog();
      this.$refs.customerCasesDialog.details(row.id);
    },
    // 刷新表格
    updateTable() {
      this.$refs.customerCasesTable.getTableData(this.form);
    },
    // 切换页面
    changePage(page) {
      this.form = page;
      this.$refs.customerCasesTable.getTableData(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.customer-cases {
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