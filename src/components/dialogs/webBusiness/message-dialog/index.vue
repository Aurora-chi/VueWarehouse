<template>
  <div class="message-dialog">
    <el-dialog
      :visible="messageVisible"
      width="50%"
      top="13vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">客户留言详情</div>
      <message-dialog-form ref="messageDialogForm" />
      <span slot="footer">
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { detailsMessageTableData } from "@/api/webBusiness/message/message-api";
import messageDialogForm from "@/components/form/webBusiness/message-form/message-dialog-form/index.vue";
export default {
  neme: "messageDialog",
  components: { messageDialogForm },
  data() {
    return {
      messageVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.messageDialogForm.clearFormData();
      this.messageVisible = false;
    },
    async openDialog(id) {
      this.messageVisible = true;
      const res = await detailsMessageTableData(id);
      if (res.code === 200) {
        this.$refs.messageDialogForm.setFormData(res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>