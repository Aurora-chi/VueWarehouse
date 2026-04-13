<template>
  <div class="image-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="导航图片：" prop="imagePath">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'navigation' }"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleSuccess"
              :file-list="fileList"
            >
              <img v-if="ImageUrl" :src="ImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示顺序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio label="1" v-model="form.isDisplay">是</el-radio>
            <el-radio label="0" v-model="form.isDisplay">否</el-radio>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUrl } from "@/utils/set-url";
export default {
  name: "imageForm",
  data() {
    return {
      url: "",
      headers: {},
      fileList: [],
      ImageUrl: "",
      form: {
        navId: "",
        imagePath: "",
        sort: undefined,
        isDisplay: "",
        id: "",
      },
      rules: {
        imagePath: [{ required: true, message: "请输入", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "change" }],
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
      this.form.isDisplay = String(data.isDisplay);
      const val = {
        name: data.imagePath.split("/").pop(),
        url: "http://" + this.url + data.imagePath,
      };
      this.fileList.push(val);
      this.ImageUrl = "http://" + this.url + data.imagePath;
    },
    clearFormData() {
      this.form = {
        navId: "",
        imagePath: "",
        sort: undefined,
        isDisplay: "",
        id: "",
      };
      this.fileList = [];
      this.ImageUrl = "";
      this.$refs.form.clearValidate();
    },
    setUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    handleSuccess(res) {
      if (res.code === 200) {
        this.fileList = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileList.push(val);
        this.form.imagePath = res.data.filePath;
        this.ImageUrl = "http://" + this.url + res.data.filePath;
      }
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

<style lang="scss" >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>