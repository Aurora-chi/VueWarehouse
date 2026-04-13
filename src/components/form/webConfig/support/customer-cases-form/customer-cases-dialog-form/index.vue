<template>
  <div class="customer-cases-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" ref="form" :rules="rules">
        <el-col :span="24">
          <el-form-item label="标题：" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="概述：" prop="remarks">
            <el-input v-model="form.remarks" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示排序：" prop="sort">
            <el-input-number
              style="width: 100%"
              v-model="form.sort"
              controls-position="right"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio v-model="form.isDisplay" label="1">是</el-radio>
            <el-radio v-model="form.isDisplay" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="封面图：" prop="coverImagePath">
            <el-upload
              ref="upload"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'support_cases' }"
              :on-preview="handlePictureCardPreview"
              :on-success="uploadSuccess"
              :headers="headers"
              :on-exceed="exceed"
              :file-list="fileList"
              :multiple="false"
              :limit="1"
              list-type="picture-card"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible" append-to-body top="10vh">
              <img width="100%" :src="coverImagePath" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="案例详情：" prop="details">
            <details-wang-edit
              :value="form.details"
              @input="handleDetailsChange"
            />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import detailsWangEdit from "@/components/details/wangEdit/index.vue";
import { detailsCustomerCasesTableData } from "@/api/webConfig/support/customer-cases/customer-cases-api";
import { getUrl } from "@/utils/set-url";
export default {
  name: "customerCasesDialogForm",
  components: { detailsWangEdit },
  data() {
    return {
      coverImagePath: "",
      fileList: [],
      dialogVisible: false,
      headers: {},
      form: {
        title: "",
        remarks: "",
        coverImagePath: "",
        details: "",
        sort: undefined,
        isDisplay: "",
        id: "",
        createTime: "",
      },
      rules: {
        title: [{ required: true, message: "请输入", trigger: "blur" }],
        remarks: [{ required: true, message: "请输入", trigger: "blur" }],
        coverImagePath: [
          { required: true, message: "请输入", trigger: "blur" },
        ],
        details: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.setFileUpload();
  },
  methods: {
    // 设置文件上传的参数
    setFileUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    // 查看图片回调
    handlePictureCardPreview() {
      this.dialogVisible = true;
    },
    // 上传form数据
    getFormData() {
      return this.form;
    },
    // 上传成功
    uploadSuccess(respresponse, file) {
      if (respresponse.code === 200) {
        this.form.coverImagePath = respresponse.data.filePath;
        this.fileList = [
          {
            name: file.name,
            url: "http://" + this.url + respresponse.data.filePath,
          },
        ];
        this.$message.success("文件上传成功:");
      } else {
        this.form.fileList = [];
        this.$message.error("文件上传失败：", respresponse.msg);
      }
    },
    // 文件数量超出限制
    exceed(files) {
      // 清除当前已上传的文件
      this.fileList = [];

      // 获取新选择的文件
      const newFile = files[0];

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
    // 修改富文本内容
    handleDetailsChange(html) {
      this.form.details = html;
    },
    async detailsFormData(id) {
      const res = await detailsCustomerCasesTableData(id);
      if (res.code === 200) {
        this.form = res.data;
        this.form.isDisplay = String(res.data.isDisplay);
        this.coverImagePath = "http://" + getUrl + this.form.coverImagePath;
        this.fileList = [
          {
            name: this.form.coverImagePath.split("/").pop(),
            url: "http://" + this.url + this.form.coverImagePath,
          },
        ];
      } else {
        this.$message.error("详情信息获取失败：", res.msg);
      }
    },
    clearFormData() {
      this.fileList = [];
      this.form = {
        title: "",
        remarks: "",
        coverImagePath: "",
        details: "",
        sort: undefined,
        isDisplay: "",
        id: "",
        createTime: "",
      };
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

<style>
</style>