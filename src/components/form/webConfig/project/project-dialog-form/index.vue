<template>
  <div class="project-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="导航：" prop="navId">
            <el-cascader
              v-model="form.navId"
              placeholder="可搜索选择"
              :options="tree"
              :props="{
                value: 'id',
                label: 'navName',
                children: 'children',
                checkStrictly: true,
                emitPath: false,
              }"
              clearable
              filterable
              style="width: 100%"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目标注：" prop="tag">
            <el-input v-model="form.tag" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目介绍：">
            <el-input v-model="form.tag" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="启用状态：" prop="enableStatus">
            <el-radio v-model="form.enableStatus" label="0">启用</el-radio>
            <el-radio v-model="form.enableStatus" label="1">禁用</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="项目封面图：">
            <el-upload
              ref="upload"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'project' }"
              :on-preview="handlePictureCardPreview"
              :on-success="handleSuccess"
              :on-remove="handleRemove"
              :headers="headers"
              :on-exceed="handleExceed"
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
          <el-form-item label="项目详情：">
            <details-wang-edit :value="form.details" @input="changeDetails" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import detailsWangEdit from "@/components/details/wangEdit/index.vue";
import axios from "axios";
import { getUrl } from "@/utils/set-url";
export default {
  name: "projectDialogForm",
  components: { detailsWangEdit },
  data() {
    return {
      url: "",
      tree: [],
      fileList: [],
      dialogVisible: false,
      coverImagePath: "",
      form: {
        navId: "",
        tag: "",
        introduction: "",
        details: "",
        coverPicture: "",
        enableStatus: "",
        id: "",
      },
      rules: {
        navId: [{ required: true, message: "请输入", trigger: "blur" }],
        tag: [{ required: true, message: "请输入", trigger: "blur" }],
        enableStatus: [
          { required: true, message: "请输入", trigger: "change" },
        ],
      },
    };
  },
  async created() {
    this.setFileUpload();
    await this.getNavigation();
  },
  methods: {
    // 设置文件上传参数
    setFileUpload() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    // 获取树形导航
    async getNavigation() {
      const url = "http://" + this.url + "/web/navigation/getNavigationTree";
      const res = await axios.post(url, {}, this.headers);
      if (res.data.code === 200) {
        this.tree = res.data.data;
      } else {
        this.$message.error("导航数据获取失败", res.msg);
      }
    },
    getFormData() {
      return this.form;
    },
    setFormData(data) {
      this.form = data;
      this.form.enableStatus = String(data.enableStatus);
      // 明确判断 coverPicture 是否存在且不为空字符串
      if (this.form.coverPicture && this.form.coverPicture.trim() !== "") {
        this.fileList = [
          {
            name: this.form.coverPicture.split("/").pop(),
            url: "http://" + this.url + this.form.coverPicture,
          },
        ];
        this.coverImagePath = "http://" + this.url + this.form.coverPicture;
      } else {
        // 清空文件列表和封面路径
        this.fileList = [];
        this.coverImagePath = "";
        // 清除 upload 组件的缓存
        if (this.$refs.upload) {
          this.$refs.upload.clearFiles();
        }
      }
    },
    clearFormData() {
      this.form = {
        navId: "",
        tag: "",
        introduction: "",
        details: "",
        coverPicture: "",
        enableStatus: "",
        id: "",
      };
      this.coverImagePath = "";
      this.fileList = [];
      this.$refs.form.clearValidate();
    },
    // 富文本变化
    changeDetails(val) {
      this.form.details = val;
    },
    // 导航ID切换
    handleChange(value) {
      this.form.navId = value;
    },
    // 上传成功
    handleSuccess(respresponse, file) {
      if (respresponse.code === 200) {
        this.form.coverPicture = respresponse.data.filePath;
        this.fileList = [
          {
            name: file.name,
            url: "http://" + this.url + respresponse.data.filePath,
          },
        ];
        this.$message.success("文件上传成功:");
      } else {
        this.form.fileList = [];
        this.form.coverPicture = "";
        this.$message.error("文件上传失败：", respresponse.msg);
      }
    },
    // 删除回调
    handleRemove() {
      this.fileList = [];
      this.form.coverPicture = "";
    },
    // 文件数量超出限制
    handleExceed(files) {
      // 清除当前已上传的文件
      this.fileList = [];
      this.form.coverPicture = "";
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
    // 查看上传图片
    handlePictureCardPreview() {
      this.coverImagePath = "http://" + this.url + this.form.coverPicture;
      this.dialogVisible = true;
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