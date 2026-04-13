<template>
  <div class="log-dialog">
    <el-dialog
      :visible="logVisible"
      width="50%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">日志详情</div>
      <log-dialog-form :logDialogData="data" />
      <span slot="footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import logDialogForm from "@/components/form/system/log-form/log-dialog-form/index.vue";
export default {
  name: "logDialog",
  components: { logDialogForm },
  props: {
    logDialogData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    logDialogData: {
      handler(newVal) {
        this.openDialog(newVal);
      },
      deep: true,
    },
  },
  data() {
    return {
      data: {},
      logVisible: false,
    };
  },
  methods: {
    openDialog(newVal) {
      this.data = newVal;
      this.$nextTick(() => {
        this.logVisible = true;
      });
    },
    closeDialog() {
      this.logVisible = false;
    },
  },
};
</script>

<style lang="scss">
.log-dialog {
  .el-dialog {
    .el-form {
      .el-form-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>