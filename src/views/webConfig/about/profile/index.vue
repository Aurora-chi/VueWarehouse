<template>
  <div class="profile">
    <div class="top">
      <profile-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <batch-del-btn :disabled="isBatchDelDisabled" @batchDel="bacthDel" />
      <profile-table
        ref="profileTable"
        @updateTable="updateTable"
        @edit="edit"
        @changePage="changePage"
        @bacthDel="changeBatchDel"
      />
    </div>
    <profile-dialog
      ref="profileDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import profileDialog from "@/components/dialogs/webConfig/about/profile-dialog/index.vue";
import batchDelBtn from "@/components/button/headerBtn/batchDelBtn/index.vue";
import profileTable from "@/components/table/webConfig/about/profile-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import profileTopForm from "@/components/form/webConfig/about/profile-form/profile-top-form/index.vue";
import { batchDelProfileTableData } from "@/api/webConfig/about/profile/profile-api";
export default {
  name: "profile",
  components: {
    profileTopForm,
    addBtn,
    profileTable,
    batchDelBtn,
    profileDialog,
  },
  data() {
    return {
      model: "",
      bacthDelID: [],
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        isHome: "",
        beginTime: "",
        endTime: "",
      },
    };
  },
  computed: {
    isBatchDelDisabled() {
      return this.bacthDelID.length === 0;
    },
  },
  methods: {
    query(val) {
      this.form.title = val.title;
      this.form.isHome = val.isHome;
      this.form.beginTime = val.beginTime;
      this.form.endTime = val.endTime;
      this.updateTable();
    },
    reset(val) {
      this.form.title = val.title;
      this.form.isHome = val.isHome;
      this.form.beginTime = val.beginTime;
      this.form.endTime = val.endTime;
      this.updateTable();
    },
    addNew() {
      this.model = "Add";
      this.$refs.profileDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.profileDialog.detailsFormData(row.id);
      this.$refs.profileDialog.openDialog();
    },
    updateTable() {
      this.$refs.profileTable.getTableData(this.form);
    },
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.updateTable();
    },
    changeBatchDel(val) {
      this.bacthDelID = val;
    },
    async bacthDel() {
      const res = await batchDelProfileTableData(this.bacthDelID);
      if (res.code === 200) {
        this.$message.success("批量删除成功");
        this.updateTable();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.profile {
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