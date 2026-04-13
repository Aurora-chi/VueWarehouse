<template>
  <div class="message">
    <div class="top">
      <message-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <message-table
        ref="messageTable"
        @updateTable="updateTable"
        @details="details"
        @changePage="changePage"
      />
    </div>
    <message-dialog ref="messageDialog" />
  </div>
</template>

<script>
import messageDialog from "@/components/dialogs/webBusiness/message-dialog/index.vue";
import messageTable from "@/components/table/webBusiness/message-table/index.vue";
import messageTopForm from "@/components/form/webBusiness/message-form/message-top-form/index.vue";
export default {
  name: "massage",
  components: { messageTopForm, messageTable, messageDialog },
  data() {
    return {
      form: {
        pageNum: 1,
        pageSize: 10,
        cooperationType: "",
        status: "",
      },
    };
  },
  methods: {
    query(val) {
      this.form.cooperationType = val.cooperationType;
      this.form.status = val.status;
      this.updateTable();
    },
    reset(val) {
      this.form.cooperationType = val.cooperationType;
      this.form.status = val.status;
      this.updateTable();
    },
    updateTable() {
      this.$refs.messageTable.getTableData(this.form);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.updateTable();
    },
    details(row) {
      this.$refs.messageDialog.openDialog(row.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
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