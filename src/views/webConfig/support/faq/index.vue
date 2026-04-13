<template>
  <div class="faq">
    <div class="top">
      <faq-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <add-btn @updata:addNew="addNew" />
      <faq-table
        ref="faqTable"
        @edit="edit"
        @changePage="changePage"
        @updateTable="updateTable"
      />
    </div>
    <faq-dialog ref="faqDialog" :model="model" @updateTable="updateTable" />
  </div>
</template>

<script>
import faqTopForm from "@/components/form/webConfig/support/faq-form/faq-top-form/index.vue";
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import faqTable from "@/components/table/webConfig/support/faq-table/index.vue";
import faqDialog from "@/components/dialogs/webConfig/support/faq-dialog/index.vue";
export default {
  name: "faq",
  components: { faqTopForm, addBtn, faqTable, faqDialog },
  data() {
    return {
      model: "",
      form: {
        pageNum: 1,
        pageSize: 10,
        title: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query(val) {
      this.form = val;
      this.$refs.faqTable.getFormData(this.form);
    },
    reset(val) {
      this.form = val;
      this.$refs.faqTable.getFormData(this.form);
    },
    addNew() {
      this.model = "Add";
      this.$refs.faqDialog.openDialog();
    },
    edit(id) {
      this.model = "Edit";
      this.$refs.faqDialog.openDialog();
      this.$refs.faqDialog.detailsFormData(id);
    },
    changePage(page) {
      this.form = page;
      this.$refs.faqTable.getFormData(this.form);
    },
    updateTable() {
      this.$refs.faqTable.getFormData(this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.faq {
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