<template>
  <div class="dictDialog">
    <el-dialog
      :visible="dictVisible"
      width="50%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ model === "Add" ? "新增字典" : "编辑字典" }}
      </div>
      <dict-dialog-form
        :dictDialogData="data"
        ref="dictDialogForm"
        :formData="formData"
        @success="success"
        @closeDialog="closeDialog"
      />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dictDialogForm from "@/components/form/system/dict-form/dict-dialog-form/index.vue";
export default {
  name: "dictDialog",
  components: { dictDialogForm },
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      data: {},
      model: "Add",
      dictVisible: false,
    };
  },
  methods: {
    // 打开表单
    openDialog(val) {
      this.model = val;
      this.dictVisible = true;
    },
    // 关闭表单
    closeDialog() {
      this.$refs.dictDialogForm.clearValidate();
      this.$refs.dictDialogForm.clearFormData();
      this.dictVisible = false;
    },
    // 确定按钮方法
    async saveDialog() {
      this.$refs.dictDialogForm.saveDialog(this.model);
    },
    // 操作成功方法
    success() {
      this.$emit("updateTable");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>