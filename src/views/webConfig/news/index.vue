<template>
  <div class="news">
    <div class="top">
      <news-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <batch-del-btn @batchDel="batchDel" :disabled="disabled" />
      <news-table
        ref="newsTable"
        @edit="edit"
        @updateTable="updateTable"
        @batchDelId="batchDelId"
      />
    </div>
    <news-dialog ref="newsDialog" :model="model" @updateTable="updateTable" />
  </div>
</template>

<script>
import { batchDelNewsTableData } from "@/api/webConfig/news/news-api";
import newsDialog from "@/components/dialogs/webConfig/news-dialog/index.vue";
import newsTable from "@/components/table/webConfig/news-table/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import batchDelBtn from "@/components/button/headerBtn/batchDelBtn/index.vue";
import newsTopForm from "@/components/form/webConfig/news/news-top-form/index.vue";
export default {
  name: "news",
  components: { newsTopForm, addBtn, newsTable, newsDialog, batchDelBtn },
  data() {
    return {
      model: "Add",
      batchDelIds: [],
      disabled: true,
      form: {
        navId: "1",
        title: "",
        subTitle: "",
        sort: "0",
        display: "",
        top: "",
        filePath: "",
        content: "",
      },
    };
  },
  methods: {
    query(data) {
      this.form = data;
      this.$refs.newsTable.getTableData(this.form);
    },
    reset(data) {
      this.form = data;
      this.$refs.newsTable.getTableData(this.form);
    },
    addNew() {
      this.model = "Add";
      this.$refs.newsDialog.openDialog();
    },
    edit(row) {
      this.model = "Edit";
      this.$refs.newsDialog.detailsFormData(row.id);
      this.$refs.newsDialog.openDialog();
    },
    updateTable() {
      this.$refs.newsTable.getTableData(this.form);
    },
    // 选中的表格ID
    batchDelId(Ids) {
      this.batchDelIds = Ids;
      if (this.batchDelIds.length !== 0) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    // 批量删除
    async batchDel() {
      const res = await batchDelNewsTableData(this.batchDelIds);
      if (res.code === 200) {
        this.$message.success("删除成功");
        this.updateTable();
      } else {
        this.$message.error("删除失败", res.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.news {
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