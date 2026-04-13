<template>
  <div class="metadata-form">
    <el-row>
      <el-form label-width="180px" :model="form" :rules="rules" ref="form">
        <el-col :span="12" :offset="4">
          <el-form-item label="公司logo图片：" prop="logoPicture">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_history' }"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :file-list="fileListLogo"
            >
              <img v-if="logoImageUrl" :src="logoImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item label="微信公众号二维码图片：" prop="qrCodePicture">
            <el-upload
              class="avatar-uploader"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'abouts_history' }"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleWeiXinSuccess"
              :file-list="fileListWeiXin"
            >
              <img v-if="weiXinImageUrl" :src="weiXinImageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item label="联系电话：" prop="unifiedHotline">
            <el-input v-model="form.unifiedHotline" />
          </el-form-item>
        </el-col>
        <el-col :span="12" :offset="4">
          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-model="form.email" />
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="12" :offset="4">
        <div class="button">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="save">保 存</el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  detailsMetadataTableData,
  updateMetadataTableData,
} from "@/api/webConfig/metadata/metadata-api";
import { getUrl } from "@/utils/set-url";
export default {
  name: "metadataTopForm",
  data() {
    return {
      url: "",
      headers: {},
      logoImageUrl: "",
      weiXinImageUrl: "",
      fileListLogo: [],
      fileListWeiXin: [],
      form: {
        email: "",
        logoPicture: "",
        qrCodePicture: "",
        unifiedHotline: "",
      },
      rules: {
        email: [{ required: true, message: "请输入", trigger: "blur" }],
        logoPicture: [{ required: true, message: "请输入", trigger: "blur" }],
        qrCodePicture: [{ required: true, message: "请输入", trigger: "blur" }],
        unifiedHotline: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
      },
    };
  },
  async created() {
    this.setUpload();
    await this.getFormData();
  },
  methods: {
    async getFormData() {
      const res = await detailsMetadataTableData();
      if (res.code === 200) {
        this.form = res.data;
        console.log(res);
        this.fileListLogo = [];
        this.fileListWeiXin = [];
        const logoval = {
          name: res.data.logoPicture.split("/").pop(),
          url: "http://" + this.url + res.data.logoPicture,
        };
        const weiXinVal = {
          name: res.data.qrCodePicture.split("/").pop(),
          url: "http://" + this.url + res.data.qrCodePicture,
        };
        this.fileListLogo.push(logoval);
        this.fileListWeiXin.push(weiXinVal);
        this.logoImageUrl = "http://" + this.url + res.data.logoPicture;
        this.weiXinImageUrl = "http://" + this.url + res.data.qrCodePicture;
      }
      this.$refs.form.clearValidate();
    },
    setUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    cancel() {
      this.getFormData();
    },
    async save() {
      if (!(await this.validate())) {
        return;
      }
      await this.$confirm(`确定要修改 "元数据配置" 吗?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      const res = await updateMetadataTableData(this.form);
      if (res.code === 200) {
        this.$message.success("修改成功");
      }
    },
    handleLogoSuccess(res) {
      if (res.code === 200) {
        this.fileListLogo = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListLogo.push(val);
        this.form.logoPicture = res.data.filePath;
        this.logoImageUrl = "http://" + this.url + res.data.filePath;
      }
    },
    handleWeiXinSuccess(res) {
      if (res.code === 200) {
        this.fileListWeiXin = [];
        const val = {
          name: res.data.fileName,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileListWeiXin.push(val);
        this.form.qrCodePicture = res.data.filePath;
        this.weiXinImageUrl = "http://" + this.url + res.data.filePath;
      }
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

<style lang="scss" >
.metadata-form {
  .button {
    float: right;
    margin-top: 20px;
  }
}
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