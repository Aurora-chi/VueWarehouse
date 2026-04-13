<template>
  <div class="image-dialog">
    <el-dialog
      :visible="imageVisible"
      width="50%"
      top="15vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增导航图片" : "编辑导航图片" }}
      </div>
      <image-form ref="imageForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import imageForm from "@/components/form/webConfig/image/image-form/index.vue";
import {
  addImageTableData,
  detailsImageTableData,
  updateImageTableData,
} from "@/api/webConfig/image/image-api";
export default {
  name: "imageDialog",
  components: { imageForm },
  props: {
    model: {
      type: String,
      default: "",
    },
    navId: {
      type: [Number, String],
      default: "",
    },
  },
  data() {
    return {
      imageVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.imageForm.clearFormData();
      this.imageVisible = false;
    },
    openDialog() {
      this.imageVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.imageForm.validate())) {
        return;
      }
      const val = this.$refs.imageForm.getFormData();
      if (this.model === "Add") {
        val.navId = this.navId;
        const res = await addImageTableData(val);
        if (res.code === 200) {
          this.$emit("updateTable");
          this.$message.success("添加成功");
        }
      } else {
        const res = await updateImageTableData(val);
        if (res.code === 200) {
          this.$emit("updateTable");
          this.$message.success("编辑成功");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsImageTableData(id);
      if (res.code === 200) {
        this.$refs.imageForm.setFormData(res.data);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>