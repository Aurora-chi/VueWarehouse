<template>
  <div class="new-dialog">
    <el-dialog
      :visible="newsVisible"
      width="50%"
      top="13px"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增新闻动态" : "编辑新闻动态" }}
      </div>
      <news-dialog-form ref="newsDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import newsDialogForm from "@/components/form/webConfig/news/news-dialog-form/index.vue";
import {
  addNewsTableData,
  detailsNewsTableData,
  updateNewsTableData,
} from "@/api/webConfig/news/news-api";
export default {
  name: "newDialog",
  components: { newsDialogForm },
  props: {
    model: {
      type: String,
      default: "Add",
    },
  },
  data() {
    return {
      newsVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.newsDialogForm.clearFormData();
      this.newsVisible = false;
    },
    openDialog() {
      this.newsVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.newsDialogForm.validate())) {
        return;
      }
      const data = this.$refs.newsDialogForm.getFormData();
      if (this.model === "Add") {
        const res = await addNewsTableData(data);
        if (res.code === 200) {
          this.$message.success("添加成功");
          this.$emit("updateTable");
        } else {
          this.$message.error("添加失败", res.msg);
        }
      } else {
        const res = await updateNewsTableData(data);
        if (res.code === 200) {
          this.$message.success("编辑成功");
          this.$emit("updateTable");
        } else {
          this.$message.error("编辑失败", res.msg);
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsNewsTableData(id);
      if (res.code === 200) {
        this.$refs.newsDialogForm.setFormData(res.data);
      } else {
        this.$message.error("详情信息获取失败", res.msg);
      }
    },
  },
};
</script>

<style>
</style>