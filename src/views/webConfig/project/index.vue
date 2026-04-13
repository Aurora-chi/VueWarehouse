<template>
  <div class="project">
    <div class="top">
      <project-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <project-table
        ref="projectTable"
        @updateTable="updateTable"
        @changePage="changePage"
        @edit="edit"
      />
    </div>
    <project-dialog
      ref="projectDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import projectDialog from "@/components/dialogs/webConfig/project-dialog/index.vue";
import projectTable from "@/components/table/webConfig/project-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import projectTopForm from "@/components/form/webConfig/project/project-top-form/index.vue";
export default {
  name: "project",
  components: { projectTopForm, addBtn, projectTable, projectDialog },
  data() {
    return {
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        tag: "",
        enableStatus: "",
      },
    };
  },
  methods: {
    query(val) {
      this.form = val;
      this.$refs.projectTable.getTableData(this.form);
    },
    reset(val) {
      this.form = val;
      this.$refs.projectTable.getTableData(this.form);
    },
    addNew() {
      this.model = "Add";
      this.$refs.projectDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.projectDialog.detailsFormData(row.id);
      this.$refs.projectDialog.openDialog();
    },
    // 刷新表格数据
    updateTable() {
      this.$refs.projectTable.getTableData(this.form);
    },
    // 切换表格页面
    changePage(page) {
      this.form = page;
      this.$refs.projectTable.getTableData(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.project {
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
    margin-top: 20px;
    background-color: #fff;
  }
}
</style>