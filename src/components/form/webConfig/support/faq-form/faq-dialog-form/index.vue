<template>
  <div class="faq-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="问题标题：" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio v-model="form.isDisplay" label="1">是</el-radio>
            <el-radio v-model="form.isDisplay" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否置顶：" prop="isTop">
            <el-radio v-model="form.isTop" label="1">是</el-radio>
            <el-radio v-model="form.isTop" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="问题答案：" prop="answer">
            <details-wang-edit :value="form.answer" @input="changeContent" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import detailsWangEdit from "@/components/details/wangEdit/index.vue";
export default {
  name: "faqDialogForm",
  components: { detailsWangEdit },
  data() {
    return {
      form: {
        title: "",
        answer: "",
        sort: undefined,
        isDisplay: "",
        isTop: "",
        id: "",
        createTime: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "change" }],
        isTop: [{ required: true, message: "请输入", trigger: "change" }],
        answer: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  methods: {
    // 设置表单数据
    setFormData(data) {
      this.form = data;
      this.form.isDisplay = String(data.isDisplay);
      this.form.isTop = String(data.isTop);
      data.sort ? "" : (this.form.sort = undefined);
    },
    // 清除表单数据
    clearFormData() {
      this.form = {
        title: "",
        answer: "",
        sort: undefined,
        isDisplay: 2,
        isTop: 2,
        id: "",
        createTime: "",
      };
      this.$refs.form.clearValidate();
    },
    // 获取表单数据
    getFormData() {
      return this.form;
    },
    // 富文本内容更改
    changeContent(val) {
      this.form.answer = val;
    },
    async validate() {
      try {
        await this.$refs.form.validate();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>