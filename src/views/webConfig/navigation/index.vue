<template>
  <div class="navigation">
    <div class="top">
      <navigation-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <expand-btn @updata:expand="expand" />
      <navigation-table
        ref="navigationTable"
        @updateTable="updateTable"
        @edit="edit"
        @add="add"
      />
    </div>
    <navigation-dialog
      ref="navigationDialog"
      :model="model"
      @updateTable="updateTable"
    />
  </div>
</template>

<script>
import navigationDialog from "@/components/dialogs/webConfig/navigation-dialog/index.vue";
import navigationTable from "@/components/table/webConfig/navigation-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import expandBtn from "@/components/button/headerBtn/expandBtn/index.vue";
import navigationTopForm from "@/components/form/webConfig/navigation/navigation-top-form/index.vue";
export default {
  name: "navigation",
  components: {
    navigationTopForm,
    addBtn,
    expandBtn,
    navigationTable,
    navigationDialog,
  },
  data() {
    return {
      model: "",
      isExpand: false,
      form: {
        navName: "",
      },
    };
  },
  methods: {
    query(val) {
      this.form = val;
      this.updateTable();
    },
    reset(val) {
      this.form = val;
      this.updateTable();
    },
    addNew() {
      this.model = "Add";
      this.$refs.navigationDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.navigationDialog.openDialog();
      this.$refs.navigationDialog.detailsFormData(row.id);
    },
    add(row) {
      this.model = "Add";
      this.$refs.navigationDialog.openDialog();
      this.$refs.navigationDialog.setParentId(row.id);
    },
    updateTable() {
      this.$refs.navigationTable.getTableData(this.form);
    },
    expand() {
      this.isExpand = !this.isExpand;
      this.$refs.navigationTable.toggleTreeExpand(this.isExpand);
    },
  },
};
</script>

<style lang="scss" scoped>
.navigation {
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