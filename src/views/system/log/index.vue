<template>
  <div class="log">
    <div class="top">
      <log-top-form @query="query" @reset="reset" />
    </div>
    <div class="bodyer">
      <log-bodyer-table ref="logBodyerTable" @details="details" />
    </div>
    <log-dialog ref="logDialog" :logDialogData="dialogData" />
  </div>
</template>

<script>
import logTopForm from "@/components/form/system/log-form/log-top-form/index.vue";
import logBodyerTable from "@/components/table/system/log-table/index.vue";
import logDialog from "@/components/dialogs/system/log-dialog/index.vue";
export default {
  name: "log",
  components: { logTopForm, logBodyerTable, logDialog },
  data() {
    return {
      dialogData: {},
    };
  },
  methods: {
    query(val) {
      this.$refs.logBodyerTable.query(val);
    },
    reset(val) {
      this.$refs.logBodyerTable.reset(val);
    },
    details(val) {
      console.log("详情", val);
      this.dialogData = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.log {
  width: 100%;
  height: 100%;
  padding: 20px;
  .top {
    width: 100%;
    padding: 20px;
    background-color: #fff;
    min-width: 0;
    margin-bottom: 20px;
  }
  .bodyer {
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    background-color: #fff;
    min-width: 0;
  }
}
</style>