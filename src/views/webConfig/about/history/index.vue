<template>
  <div class="history">
    <div class="top">
      <history-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <batch-del-btn @batchDel="batchDel" :disabled="isBatchDelDisabled" />
      <history-table
        ref="historyTable"
        @updateTable="updateTable"
        @edit="edit"
        @changePage="changePage"
        @changeBatchDel="changeBatchDel"
      />
    </div>
    <history-dialog
      ref="historyDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import { batchDelHistoryTableData } from "@/api/webConfig/about/history/history-api.js";
import batchDelBtn from "@/components/button/headerBtn/batchDelBtn/index.vue";
import historyDialog from "@/components/dialogs/webConfig/about/history-dialog/index.vue";
import historyTable from "@/components/table/webConfig/about/history-table/index.vue";
import historyTopForm from "@/components/form/webConfig/about/history-form/history-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
export default {
  name: "history",
  components: {
    addBtn,
    historyTopForm,
    historyTable,
    historyDialog,
    batchDelBtn,
  },
  data() {
    return {
      model: "",
      batchDelId: [],
      form: { pageNum: 1, pageSize: 10, display: "" },
    };
  },
  computed: {
    isBatchDelDisabled() {
      return this.batchDelId.length === 0;
    },
  },
  methods: {
    query(val) {
      this.form.display = val.display;
      this.updateTable();
    },
    reset(val) {
      this.form.display = val.display;
      this.updateTable();
    },
    addNew() {
      this.model = "Add";
      this.$refs.historyDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.historyDialog.openDialog();
      this.$refs.historyDialog.detailsFormData(row.id);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.updateTable();
    },
    updateTable() {
      this.$refs.historyTable.getTableData(this.form);
    },
    changeBatchDel(val) {
      this.batchDelId = val;
    },
    // 批量删除
    async batchDel() {
      const res = await batchDelHistoryTableData(this.batchDelId);
      if (res.code === 200) {
        this.$message.success("批量删除成功");
        this.updateTable();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.history {
  width: 100%;
  height: 100%;
  padding: 20px;
  .top {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .bodyer {
    width: 100%;
    padding: 10px;
    margin-top: 20px;
    background-color: #fff;
  }
}
</style>