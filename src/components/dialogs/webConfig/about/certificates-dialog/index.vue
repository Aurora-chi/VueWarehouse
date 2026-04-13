<template>
  <div class="certificates-dialog">
    <el-dialog
      :visible="certificatesVisible"
      width="50%"
      top="10vh"
      @close="closeDialog"
    >
      <div slot="title" class="custom-title">
        {{ this.model === "Add" ? "新增公司信息" : "编辑公司信息" }}
      </div>
      <certificates-dialog-form ref="certificatesDialogForm" />
      <span slot="footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import certificatesDialogForm from "@/components/form/webConfig/about/certificates-form/certificates-dialog-form/index.vue";
import {
  addCertificatesTableData,
  detailsCertificatesTableData,
  updateCertificatesTableData,
} from "@/api/webConfig/about/certificates/certificates-api";
export default {
  name: "certificatesDialog",
  components: { certificatesDialogForm },
  props: {
    model: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      certificatesVisible: false,
    };
  },
  methods: {
    closeDialog() {
      this.$refs.certificatesDialogForm.clearFormData();
      this.certificatesVisible = false;
    },
    openDialog() {
      this.certificatesVisible = true;
    },
    async saveDialog() {
      if (!(await this.$refs.certificatesDialogForm.validate())) {
        return;
      }
      const val = this.$refs.certificatesDialogForm.getFormData();
      if (this.model === "Add") {
        const res = await addCertificatesTableData(val);
        if (res.code === 200) {
          this.$emit("updateTable");
          this.$message.success("添加成功");
        }
      } else {
        const res = await updateCertificatesTableData(val);
        if (res.code === 200) {
          this.$emit("updateTable");
          this.$message.success("编辑成功");
        }
      }
      this.closeDialog();
    },
    async detailsFormData(id) {
      const res = await detailsCertificatesTableData(id);
      if (res.code === 200) {
        this.$refs.certificatesDialogForm.setFormData(res.data);
        console.log(res);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>