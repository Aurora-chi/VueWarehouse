<template>
  <div class="standard-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col>
          <el-form-item label="标准号：" prop="standardNo">
            <el-input v-model="form.standardNo" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="标准名称：" prop="standardName">
            <el-input v-model="form.standardName" />
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="上传附件：" prop="filePath">
            <el-upload
              ref="upload"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'support_standard' }"
              :on-success="uploadSuccess"
              :headers="headers"
              :on-exceed="exceed"
              :file-list="form.filePath"
              :multiple="false"
              :limit="1"
            >
              <el-button size="small" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio v-model="form.isDisplay" label="1">是</el-radio>
            <el-radio v-model="form.isDisplay" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="是否置顶：" prop="isTop">
            <el-radio v-model="form.isTop" label="1">是</el-radio>
            <el-radio v-model="form.isTop" label="0">否</el-radio>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUrl } from "@/utils/set-url";
export default {
  name: "standardDialogForm",
  props: {
    detailsdata: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.setFileUpload();
  },
  data() {
    return {
      url: "",
      headers: {},
      form: {
        standardNo: "",
        standardName: "",
        sort: null,
        isDisplay: null,
        isTop: null,
        id: "",
        file: {},
        filePath: [],
        createTime: "",
      },
      rules: {
        standardNo: [{ required: true, message: "请输入", trigger: "blur" }],
        standardName: [{ required: true, message: "请输入", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "change" }],
        isTop: [{ required: true, message: "请输入", trigger: "change" }],
        filePath: [{ required: true, message: "请输入", trigger: "change" }],
      },
    };
  },
  methods: {
    // 设置文件上传的参数
    setFileUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    // 上传成功
    uploadSuccess(respresponse, file) {
      if (respresponse.code === 200) {
        this.form.file = file.raw;
        this.form.filePath = [
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
        this.$message.error("文件上传失败：", respresponse.msg);
      }
    },
    // 文件数量超出限制
    exceed(files) {
      // 清除当前已上传的文件
      this.form.filePath = [];
      this.form.file = {};

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
    // 获取表单数据
    getFormData() {
      return this.form;
    },
    // 清除表单数据
    clearFormData() {
      this.form = {
        standardNo: "",
        standardName: "",
        sort: null,
        isDisplay: null,
        isTop: null,
        id: "",
        filePath: [],
        createTime: "",
      };
      this.$refs.form.clearValidate();
    },
    // 设置表单数据
    setFormData(data) {
      this.form = {
        standardNo: data.standardNo,
        standardName: data.standardName,
        sort: data.sort,
        isDisplay: String(data.isDisplay),
        isTop: String(data.isTop),
        id: data.id,
        filePath: [
          {
            name: data.filePath.split("/").pop(),
            url: "http://" + this.url + data.filePath,
          },
        ],
        createTime: data.createTime,
      };
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