<template>
  <div class="dictate">
    <div class="top">
      <dict-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <dict-table ref="dictTable" @edit="edit" :formData="formData" />
    </div>
    <dict-dialog ref="dictDialog" @updateTable="updateTable" :formData="form" />
  </div>
</template>

<script>
import dictDialog from "@/components/dialogs/system/dict-dialog/index.vue";
import dictTopForm from "@/components/form/system/dict-form/dict-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import dictTable from "@/components/table/system/dict-table/index.vue";
export default {
  name: "dict",
  components: { dictTopForm, addBtn, dictTable, dictDialog },
  data() {
    return {
      formData: {
        pageNum: 1,
        pageSize: 10,
        name: "",
        type: "",
        status: "",
      },
      form: {},
    };
  },
  methods: {
    // 新增按钮
    addNew() {
      this.$refs.dictDialog.openDialog("Add");
    },
    // 编辑按钮
    edit(val) {
      this.form = val;
      this.$refs.dictDialog.openDialog("Edit");
    },
    // 刷新表格数据
    updateTable() {
      this.$refs.dictTable.getTabelData();
    },
    // 搜索
    query(val) {
      this.formData = val;
    },
    //重置
    reset() {
      this.formData = {
        pageNum: 1,
        pageSize: 10,
        name: "",
        type: "",
        status: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.dictate {
  width: 100%;
  height: 100%;
  padding: 20px;
  .top {
    width: 100%;
    padding: 20px;
    min-width: 0;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .bodyer {
    width: 100%;
    padding: 10px;
    min-width: 0;
    margin-top: 20px;
    background-color: #fff;
  }
}
</style>