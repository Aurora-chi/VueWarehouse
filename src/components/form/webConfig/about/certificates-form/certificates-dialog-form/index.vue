<template>
  <div class="certificates-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="资历年份：" prop="year">
            <el-input v-model="form.year" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="资历名称：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              style="width: 100%"
              controls-position="right"
              :min="1"
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
          <el-form-item label="资历图片：" prop="filePath">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_aptitudes' }"
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
                      :data="{ gather: 'abouts_aptitudes' }"
                      :on-success="(res) => handleSuccess(res)"
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
          <el-form-item label="历史内容：">
            <el-input
              type="textarea"
              autosize
              placeholder="请输入内容"
              v-model="form.remark"
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
  name: "certificatesDialogForm",
  data() {
    return {
      url: "",
      headers: {},
      fileList: [],
      dialogVisible: false,
      dialogImageUrl: "",
      form: {
        year: "",
        name: "",
        sort: undefined,
        display: "",
        filePath: "",
        remark: "",
        id: "",
      },
      rules: {
        year: [{ required: true, message: "请输入", trigger: "blur" }],
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        display: [{ required: true, message: "请输入", trigger: "change" }],
        filePath: [{ required: true, message: "请输入", trigger: "blur" }],
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
        year: "",
        name: "",
        sort: undefined,
        display: "",
        filePath: "",
        remark: "",
        id: "",
      };
      this.fileList = [];
      this.$refs.form.clearValidate();
    },
    handleSuccess(res) {
      if (res.code === 200) {
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileList.push(val);
        this.form.filePath = res.data.filePath;
      }
    },
    handlePreview(file) {
      console.log(file);
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    handleRemove() {
      this.fileList = [];
      this.form.filePath = "";
    },
    setUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
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