<template>
  <div class="profile-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="公司内容：" prop="content">
            <el-input
              type="textarea"
              :rows="5"
              autosize
              placeholder="请输入内容"
              v-model="form.content"
            >
            </el-input>
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
          <el-form-item label="是否前台展示：" prop="isHome">
            <el-radio label="1" v-model="form.isHome">是</el-radio>
            <el-radio label="0" v-model="form.isHome">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="PC端图片：" prop="pcImageFilePath">
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
          <el-form-item label="APP端图片：" prop="mobileImageFilePath">
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
                      :headers="headers"
                      :on-success="(res) => handleAppSuccess(res)"
                      :show-file-list="false"
                      :file-list="fileListApp"
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
        <el-col :span="24">
          <el-form-item label="视频：" prop="videoFilePath">
            <el-upload
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_synopsis' }"
              :headers="headers"
              :on-success="handleVideoSuccess"
              :on-remove="handleVideoRemove"
              :file-list="fileListVideo"
              :multiple="false"
              accept=".mp4"
            >
              <el-button size="small" type="primary">选取文件</el-button>
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
  name: "profileDialogForm",
  data() {
    return {
      url: "",
      headers: {},
      fileListPC: [],
      fileListApp: [],
      fileListVideo: [],
      dialogVisible: false,
      dialogImageUrl: "",
      form: {
        title: "",
        content: "",
        sort: undefined,
        isHome: "",
        videoFilePath: "",
        pcImageFilePath: "",
        mobileImageFilePath: "",
        id: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        content: [{ required: true, message: "请输入", trigger: "blur" }],
        isHome: [{ required: true, message: "请输入", trigger: "change" }],
        videoFilePath: [{ required: true, message: "请输入", trigger: "blur" }],
        pcImageFilePath: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        mobileImageFilePath: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
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
      this.form.isHome = String(data.isHome);
      this.fileListPC = [
        {
          name: data.pcImageFilePath.split("/").pop(),
          url: "http://" + this.url + data.pcImageFilePath,
        },
      ];
      this.fileListApp = [
        {
          name: data.mobileImageFilePath.split("/").pop(),
          url: "http://" + this.url + data.mobileImageFilePath,
        },
      ];
      this.fileListVideo = [
        {
          name: data.videoFilePath.split("/").pop(),
          url: "http://" + this.url + data.videoFilePath,
        },
      ];
    },
    clearFormData() {
      this.form = {
        title: "",
        content: "",
        sort: undefined,
        isHome: "",
        videoFilePath: "",
        pcImageFilePath: "",
        mobileImageFilePath: "",
        id: "",
      };
      this.fileListPC = [];
      this.fileListApp = [];
      this.fileListVideo = [];
      this.$refs.form.clearValidate();
    },
    handlePCSuccess(res) {
      if (res.code === 200) {
        this.fileListPC = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListPC.push(val);
        this.form.pcImageFilePath = res.data.filePath;
      }
    },
    handlePCPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    handlePCRemove() {
      this.fileListPC = [];
      this.form.pcImageFilePath = "";
    },
    handleAppSuccess(res) {
      if (res.code === 200) {
        this.fileListApp = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListApp.push(val);
        this.form.mobileImageFilePath = res.data.filePath;
      }
    },
    handleAppPreview(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url;
    },
    handleAppRemove() {
      this.fileListApp = [];
      this.form.mobileImageFilePath = "";
    },
    handleVideoSuccess(res) {
      if (res.code === 200) {
        this.fileListVideo = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListVideo.push(val);
        this.form.videoFilePath = res.data.filePath;
      }
    },
    handleVideoRemove() {
      this.fileListVideo = [];
      this.form.videoFilePath = "";
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