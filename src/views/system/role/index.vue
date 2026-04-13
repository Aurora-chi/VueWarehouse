<template>
  <div class="role">
    <div class="top">
      <role-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <role-table :formData="form" @edit="edit" ref="roleTable" />
    </div>
    <role-dialog
      ref="roleDialog"
      :model="model"
      :id="id"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import roleTopForm from "@/components/form/system/role-form/role-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import roleTable from "@/components/table/system/role-table/index.vue";
import roleDialog from "@/components/dialogs/system/role-dialog/index.vue";
export default {
  name: "role",
  components: { roleTopForm, addBtn, roleTable, roleDialog },
  data() {
    return {
      form: {},
      model: "add",
      id: "",
    };
  },
  methods: {
    // 搜索方法
    query(val) {
      this.form = val;
    },
    // 重置方法
    reset() {
      this.form = {};
    },
    // 新增方法
    addNew() {
      this.model = "Add";
      this.$nextTick(() => {
        this.$refs.roleDialog.openDialog();
      });
    },
    // 编辑方法
    edit(row) {
      this.model = "Edit";
      this.id = row.id;
      this.$nextTick(() => {
        this.$refs.roleDialog.openDialog();
      });
    },
    // 刷新表格数据
    updateTable() {
      this.$refs.roleTable.getTableData();
    },
  },
};
</script>

<style lang="scss" scoped>
.role {
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