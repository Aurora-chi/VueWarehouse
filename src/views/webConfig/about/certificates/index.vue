<template>
  <div class="certificates">
    <div class="top">
      <certificates-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <batch-btn :disabled="isBatchDelDisabled" @batchDel="batchDel" />
      <certificates-table
        ref="certificatesTable"
        @edit="edit"
        @updateTable="updateTable"
        @changePage="changePage"
        @selectTableID="selectTableID"
      />
    </div>
    <certificates-dialog ref="certificatesDialog" :model="model" />
  </div>
</template>

<script>
import certificatesDialog from "@/components/dialogs/webConfig/about/certificates-dialog/index.vue";
import batchBtn from "@/components/button/headerBtn/batchDelBtn/index.vue";
import certificatesTable from "@/components/table/webConfig/about/certificates-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import certificatesTopForm from "@/components/form/webConfig/about/certificates-form/certificates-top-form/index.vue";
import { batchDelCertificatesTableData } from "@/api/webConfig/about/certificates/certificates-api";
export default {
  name: "certificates",
  components: {
    certificatesTopForm,
    addBtn,
    certificatesTable,
    batchBtn,
    certificatesDialog,
  },
  data() {
    return {
      batchDelId: [],
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        year: "",
        name: "",
        display: "",
      },
    };
  },
  computed: {
    isBatchDelDisabled() {
      return this.batchDelId.length === 0;
    },
  },
  methods: {
    query(val) {
      this.form.year = val.year;
      this.form.name = val.name;
      this.form.display = val.display;
      this.updateTable();
    },
    reset(val) {
      this.form.year = val.year;
      this.form.name = val.name;
      this.form.display = val.display;
      this.updateTable();
    },
    addNew() {
      this.model = "Add";
      this.$refs.certificatesDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.certificatesDialog.openDialog();
      this.$refs.certificatesDialog.detailsFormData(row.id);
    },
    updateTable() {
      this.$refs.certificatesTable.getTableData(this.form);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.updateTable();
    },
    selectTableID(val) {
      this.batchDelId = val;
    },
    async batchDel() {
      const res = await batchDelCertificatesTableData(this.batchDelId);
      if (res.code === 200) {
        this.$message.success("批量删除成功");
        this.updateTable();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.certificates {
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