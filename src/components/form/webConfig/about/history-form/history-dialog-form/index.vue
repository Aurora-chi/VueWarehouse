<template>
  <div class="history-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="历史年份：" prop="time">
            <el-input v-model="form.time" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示排序：" prop="sort">
            <el-input-number
              controls-position="right"
              style="width: 100%"
              v-model="form.sort"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="display">
            <el-radio label="1" v-model="form.display">是</el-radio>
            <el-radio label="0" v-model="form.display">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="历史图片：" prop="filePath">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_history' }"
              :headers="headers"
              :on-success="handleSuccess"
              :multiple="false"
              :file-list="fileList"
              list-type="picture-card"
            >
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{ file }">
                <img
                  class="el-upload-list__item-thumbnail"
                  :src="file.url"
                  alt=""
                />
                <span class="el-upload-list__item-actions">
                  <span @click="handlePreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span>
                    <el-upload
                      :action="`http://${url}/manage/file/commonUpload`"
                      :data="{ gather: 'abouts_history' }"
                      :on-success="(res, file) => handleSuccess(res, file)"
                      :show-file-list="false"
                      :file-list="fileList"
                      :headers="headers"
                      :multiple="false"
                    >
                      <i class="el-icon-edit"></i>
                    </el-upload>
                  </span>
                  <span @click="handleRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body>
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="历史内容：" prop="content">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="form.content"
            >
            </el-input>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUrl } from "@/utils/set-url";
export default {
  name: "historyDialogForm",
  data() {
    return {
      url: "",
      headers: {},
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      form: {
        file: {},
        time: "",
        content: "",
        sort: undefined,
        display: "",
        id: "",
        filePath: "",
      },
      rules: {
        file: [{ required: true, message: "请输入", trigger: "blur" }],
        display: [{ required: true, message: "请输入", trigger: "blur" }],
        filePath: [{ required: true, message: "请输入", trigger: "blur" }],
        time: [{ required: true, message: "请输入", trigger: "blur" }],
        content: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.setUpload();
  },
  methods: {
    getFormData() {
      return this.form;
    },
    setFormData(data) {
      this.form = data;
      this.form.display = String(data.display);
      this.fileList = [
        {
          name: data.filePath.split("/").pop(),
          url: "http://" + this.url + data.filePath,
        },
      ];
    },
    clearFormData() {
      this.form = {
        file: {},
        time: "",
        content: "",
        sort: undefined,
        display: "",
        id: "",
        filePath: "",
      };
      this.fileList = [];
      this.$refs.form.clearValidate();
    },
    setUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    handlePreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    handleSuccess(res, file) {
      if (res.code === 200) {
        this.fileList = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileList.push(val);
        this.form.file = file.raw;
        this.form.filePath = res.data.filePath;
      }
    },
    handleRemove() {
      this.fileList = [];
      this.form.file = {};
      this.form.filePath = "";
    },
    async validate() {
      try {
        await this.$refs.form.validate();
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>