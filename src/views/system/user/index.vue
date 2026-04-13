<template>
  <div class="user">
    <div class="top">
      <user-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <user-table
        ref="userTable"
        @edit="edit"
        @resetPwd="resetPwd"
        @updateTable="updateTable"
      />
    </div>
    <user-dialog :model="model" ref="userDialog" @updateTable="updateTable" />
  </div>
</template>

<script>
import userDialog from "@/components/dialogs/system/user-dialog/index.vue";
import userTable from "@/components/table/system/user-table/index.vue";
import userTopForm from "@/components/form/system/user-form/user-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
export default {
  name: "user",
  components: { userTopForm, userTable, addBtn, userDialog },
  data() {
    return {
      model: "Add",
    };
  },
  methods: {
    query(val) {
      this.$refs.userTable.getTableData(val);
    },
    reset(val) {
      this.$refs.userTable.getTableData(val);
    },
    // 新增
    addNew() {
      this.model = "Add";
      this.$refs.userDialog.openDialog();
    },
    // 编辑
    edit(id) {
      this.model = "Edit";
      this.$refs.userDialog.getDetailsData(id);
      this.$refs.userDialog.openDialog();
    },
    // 重置密码
    resetPwd(id) {
      console.log(id);
    },
    // 刷新表格
    updateTable() {
      const val = {
        pageNum: 1,
        pageSize: 10,
        loginName: "",
        userName: "",
        status: "",
      };
      this.$refs.userTable.getTableData(val);
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
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