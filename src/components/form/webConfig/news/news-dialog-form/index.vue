<template>
  <div class="news-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="导航ID：" prop="">
            <el-input-number
              v-model="form.navId"
              controls-position="right"
              style="width: 100%"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="副标题：" prop="subTitle">
            <el-input v-model="form.subTitle" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="display">
            <el-radio v-model="form.display" label="1">是</el-radio>
            <el-radio v-model="form.display" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否置顶：" prop="top">
            <el-radio v-model="form.top" label="1">是</el-radio>
            <el-radio v-model="form.top" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="文件路径：" prop="filePath">
            <el-input v-model="form.filePath" disabled />
            <el-upload
              ref="upload"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'journalism' }"
              :on-success="handleSuccess"
              :headers="headers"
              :on-exceed="handleExceed"
              :file-list="filePath"
              :multiple="false"
              :limit="1"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="详情：" prop="content">
            <details-wang-edit :value="form.content" @input="changeDetails" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import detailsWangEdit from "@/components/details/wangEdit/index.vue";
import { getUrl } from "@/utils/set-url";
export default {
  name: "newsDialogForm",
  components: { detailsWangEdit },
  data() {
    return {
      filePath: [],
      form: {
        navId: "",
        title: "",
        subTitle: "",
        sort: undefined,
        display: "",
        top: "",
        filePath: "",
        content: "",
      },
      rules: {
        navId: [{ required: true, message: "请输入", trigger: "blur" }],
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        subTitle: [{ required: true, message: "请输入", trigger: "blur" }],
        display: [{ required: true, message: "请输入", trigger: "change" }],
        top: [{ required: true, message: "请输入", trigger: "change" }],
        filePath: [{ required: true, message: "请输入", trigger: "blur" }],
        content: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.setFileUpload();
  },
  methods: {
    setFileUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    // 详情内容变化
    changeDetails(val) {
      this.form.content = val;
    },
    // 上传成功
    handleSuccess(respresponse, file) {
      if (respresponse.code === 200) {
        this.form.filePath = respresponse.data.filePath;
        this.filePath = [
          {
            name: file.name,
            url: "http://" + this.url + respresponse.data.filePath,
            uid: file.uid,
            status: "success",
          },
        ];
        this.$message.success("文件上传成功");
      } else {
        this.form.filePath = [];
        this.form.filePath = "";
        this.$message.error("文件上传失败：", respresponse.msg);
      }
    },
    // 文件数量超出限制
    handleExceed(files) {
      // 清除当前已上传的文件
      this.form.filePath = [];
      this.form.filePath = "";

      // 获取新选择的文件
      const newFile = files[0];
      this.currentFile = newFile;

      // 手动清除 upload 组件中的文件列表，避免冲突
      if (this.$refs.upload) {
        this.$refs.upload.clearFiles();
      }

      // 重新添加上传队列
      this.$nextTick(() => {
        if (this.$refs.upload && newFile) {
          // 手动将文件添加到上传队列
          this.$refs.upload.handleStart(newFile);
          this.$refs.upload.submit();
        }
      });
    },
    // 设置表单内容
    setFormData(data) {
      this.form = data;
      this.form.display = String(data.display);
      this.form.top = String(data.top);
    },
    // 获取表单数据
    getFormData() {
      return this.form;
    },
    // 清除表单数据
    clearFormData() {
      this.form = {
        navId: "",
        title: "",
        subTitle: "",
        sort: undefined,
        display: "",
        top: "",
        filePath: "",
        content: "",
      };
      this.filePath = [];
      this.$refs.form.clearValidate();
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

<style lang='scss' scoped>
</style>