<template>
  <div class="faq-dialog">
    <el-dialog :visible="faqVisible" width="50%" top="5vh" @close="closeDialog">
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增常见问题" : "编辑常见问题" }}
      </div>
      <faq-dialog-form ref="faqDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  addFaqTableData,
  detailsFaqTableData,
  updateFaqTableData,
} from "@/api/webConfig/support/faq/faq-api";
import faqDialogForm from "@/components/form/webConfig/support/faq-form/faq-dialog-form/index.vue";
export default {
  name: "faqDialog",
  components: { faqDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      faqVisible: false,
    };
  },
  methods: {
    // 打卡表单
    openDialog() {
      this.faqVisible = true;
    },
    // 关闭表单
    closeDialog() {
      this.$refs.faqDialogForm.clearFormData();
      this.faqVisible = false;
    },
    // 提交表单
    async saveDialog() {
      if (!(await this.$refs.faqDialogForm.validate())) {
        return;
      }
      const form = this.$refs.faqDialogForm.getFormData();
      if (this.model === "Add") {
        const res = await addFaqTableData(form);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        } else {
          this.$message.success("添加失败", res.msg);
        }
      } else {
        const res = await updateFaqTableData(form);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        } else {
          this.$message.success("编辑失败", res.msg);
        }
      }
      console.log(form);
      this.closeDialog();
    },
    // 设置表单内容
    setDialog(data) {
      this.$refs.faqDialogForm.setFormData(data);
    },
    // 获取表单内容详情
    async detailsFormData(id) {
      const res = await detailsFaqTableData(id);
      if (res.code === 200) {
        this.setDialog(res.data);
      } else {
        this.$message.error("内容详情获取失败", res.msg);
      }
    },
  },
};
</script>

<style lang="scss" scoped >
</style>