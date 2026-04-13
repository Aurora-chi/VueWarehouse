<template>
  <div class="info-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="公司名称：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司电话：" prop="phone">
            <el-input v-model="form.phone" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio label="1" v-model="form.isDisplay">是</el-radio>
            <el-radio label="0" v-model="form.isDisplay">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司地址：" prop="address">
            <el-input v-model="form.address" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="PC端图片：" prop="pcFilePath">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_synopsis' }"
              :headers="headers"
              :on-success="handlePCSuccess"
              :multiple="false"
              :file-list="fileListPC"
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
                  <span @click="handlePCPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span>
                    <el-upload
                      :action="`http://${url}/manage/file/commonUpload`"
                      :data="{ gather: 'abouts_synopsis' }"
                      :on-success="(res) => handlePCSuccess(res)"
                      :show-file-list="false"
                      :file-list="fileListPC"
                      :headers="headers"
                      :multiple="false"
                    >
                      <i class="el-icon-edit"></i>
                    </el-upload>
                  </span>
                  <span @click="handlePCRemove(file)">
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
          <el-form-item label="APP端图片：" prop="mobileFilePath">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_synopsis' }"
              :headers="headers"
              :on-success="handleAppSuccess"
              :multiple="false"
              :file-list="fileListApp"
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
                  <span @click="handleAppPreview(file)">
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span>
                    <el-upload
                      :action="`http://${url}/manage/file/commonUpload`"
                      :data="{ gather: 'abouts_synopsis' }"
                      :on-success="(res) => handleAppSuccess(res)"
                      :show-file-list="false"
                      :file-list="fileListApp"
                      :headers="headers"
                      :multiple="false"
                    >
                      <i class="el-icon-edit"></i>
                    </el-upload>
                  </span>
                  <span @click="handleAppRemove(file)">
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUrl } from "@/utils/set-url";
export default {
  name: "info-dialog-form",
  data() {
    return {
      url: "",
      headers: {},
      dialogVisible: false,
      dialogImageUrl: "",
      fileListPC: [],
      fileListApp: [],
      form: {
        name: "",
        address: "",
        phone: "",
        isDisplay: "",
        sort: undefined,
        id: "",
        createTime: "",
        mobileFilePath: "",
        pcFilePath: "",
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        address: [{ required: true, message: "请输入", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "change" }],
        mobileFilePath: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        pcFilePath: [{ required: true, message: "请输入", trigger: "blur" }],
        phone: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.setUpload();
  },
  methods: {
    handlePCSuccess(res) {
      if (res.code === 200) {
        this.fileListPC = [];
        this.form.pcFilePath = res.data.filePath;
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListPC.push(val);
      }
    },
    handlePCPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
      console.log("file:", file);
    },
    handlePCRemove() {
      this.fileListPC = [];
      this.form.pcFilePath = "";
    },
    handleAppSuccess(res) {
      if (res.code === 200) {
        this.fileListApp = [];
        this.form.mobileFilePath = res.data.filePath;
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListApp.push(val);
      }
    },
    handleAppPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
      console.log("file:", file);
    },
    handleAppRemove() {
      this.fileListApp = [];
      this.form.mobileFilePath = "";
    },
    setUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    getFormData() {
      return this.form;
    },
    setFormData(data) {
      this.form = data;
      this.form.isDisplay = String(data.isDisplay);
      if (data.pcFilePath) {
        this.fileListPC = [
          {
            name: data.pcFilePath.split("/").pop(),
            url: "http://" + this.url + data.pcFilePath,
          },
        ];
      }
      if (data.mobileFilePath) {
        this.fileListApp = [
          {
            name: data.mobileFilePath.split("/").pop(),
            url: "http://" + this.url + data.mobileFilePath,
          },
        ];
      }
    },
    clearFormData() {
      this.form = {
        name: "",
        address: "",
        phone: "",
        isDisplay: "",
        sort: undefined,
        id: "",
        createTime: "",
        mobileFilePath: "",
        pcFilePath: "",
      };
      this.fileListPC = [];
      this.fileListApp = [];
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

<style lang="scss" scoped>
</style>