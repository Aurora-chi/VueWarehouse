<template>
  <div class="dict-dialog-form">
    <el-form label-width="100px" :rules="rules" :model="form" ref="form">
      <el-row>
        <el-col :span="24">
          <el-form-item label="字典名称：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="字典类型：" prop="type">
            <el-input v-model="form.type" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="状态：" prop="status">
            <el-radio v-model="form.status" label="0">正常</el-radio>
            <el-radio v-model="form.status" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="备注：">
            <el-input
              type="textarea"
              :rows="3"
              v-model="form.remark"
              placeholder="请输入备注内容"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import {
  updateDictTableData,
  addDictTableData,
} from "@/api/system/dict/dict-api";
export default {
  name: "dictDialogForm",
  props: {
    formData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    formData: {
      handler(newVal) {
        this.updateForm(newVal);
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      form: {
        name: "",
        type: "",
        status: "",
        remark: "",
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请输入", trigger: "blur" }],
        status: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  methods: {
    // 清空form
    clearFormData() {
      this.form = {
        id: "",
        name: "",
        type: "",
        status: "",
        remark: "",
      };
    },
    // 更新form数据
    updateForm(val) {
      this.form = {
        id: val.id,
        name: val.name,
        type: val.type,
        status: String(val.status),
        remark: val.remark,
      };
    },
    // dictDialog确定按钮方法
    saveDialog(val) {
      if (val === "Add") {
        this.add();
      } else {
        this.edit();
      }
    },
    async add() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await addDictTableData(this.form);
          if (res.code === 200) {
            this.$message.success("添加成功");
            this.$emit("success");
            this.$emit("closeDialog");
          } else {
            this.$message.error("添加失败：", res.msg);
          }
        }
      });
    },
    async edit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await updateDictTableData(this.form);
          if (res.code === 200) {
            this.$message.success("编辑成功");
            this.$emit("success");
            this.$emit("closeDialog");
          } else {
            this.$message.error("编辑失败：", res.msg);
          }
        }
      });
    },
    // 清空校验
    clearValidate() {
      this.$refs.form.clearValidate();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>