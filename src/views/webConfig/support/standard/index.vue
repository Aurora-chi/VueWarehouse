<template>
  <div class="standard">
    <div class="top">
      <standard-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <standard-table
        ref="standardTable"
        @changePage="changePage"
        @downlaod="downlaod"
        @edit="edit"
        @updatetable="updateTable"
      />
    </div>
    <standard-dialog
      ref="standardDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import standardTopForm from "@/components/form/webConfig/support/standard-form/standard-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import standardTable from "@/components/table/webConfig/support/standard-table/index.vue";
import standardDialog from "@/components/dialogs/webConfig/support/standard-dialog/index.vue";
export default {
  name: "standard",
  components: { standardTopForm, addBtn, standardTable, standardDialog },
  data() {
    return {
      model: "",
      id: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        standardNo: "",
        standardName: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    // 搜索
    query(val) {
      this.form = val;
      this.$refs.standardTable.getTableData(this.form);
    },
    // 重置
    reset(val) {
      this.form = val;
      this.$refs.standardTable.getTableData(this.form);
    },
    // 新增
    addNew() {
      this.model = "Add";
      this.$refs.standardDialog.openDialog();
    },
    // 切换页面
    changePage(page) {
      this.form.pageNum = page.pageNum;
      this.form.pageSize = page.pageSize;
      this.$refs.standardTable.getTableData(this.form);
    },
    // 下载
    downlaod(row) {
      console.log("downlaod:", row);
    },
    // 编辑
    async edit(row) {
      this.model = "Edit";
      this.$refs.standardDialog.getDetailsData(row.id);
      this.$refs.standardDialog.openDialog();
    },
    // 刷新表格
    updateTable() {
      this.$refs.standardTable.getTableData(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.standard {
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