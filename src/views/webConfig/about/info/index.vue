<template>
  <div class="info">
    <div class="top">
      <info-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <info-table
        ref="infoTable"
        @edit="edit"
        @updateTable="updateTable"
        @changePage="changePage"
      />
    </div>
    <info-dialog ref="infoDialog" :model="model" @updateTable="updateTable" />
  </div>
</template>

<script>
import infoDialog from "@/components/dialogs/webConfig/about/info-dialog/index.vue";
import infoTable from "@/components/table/webConfig/about/info-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import infoTopForm from "@/components/form/webConfig/about/info-form/info-top-form/index.vue";
export default {
  name: "info",
  components: { infoTopForm, addBtn, infoTable, infoDialog },
  data() {
    return {
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query(val) {
      this.form.name = val.name;
      this.form.isDisplay = val.isDisplay;
      this.updateTable();
    },
    reset(val) {
      this.form.name = val.name;
      this.form.isDisplay = val.isDisplay;
      this.updateTable();
    },
    addNew() {
      this.model = "Add";
      this.$refs.infoDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.infoDialog.openDialog();
      this.$refs.infoDialog.detailsFormData(row.id);
    },
    updateTable() {
      this.$refs.infoTable.getTableData(this.form);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.updateTable();
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
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