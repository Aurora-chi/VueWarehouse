<template>
  <div class="product-dialog-form">
    <el-row>
      <el-form label-width="100px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="产品名称：" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品型号：" prop="type">
            <el-input v-model="form.type" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="显示顺序：" prop="sort">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            ></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否显示：" prop="display">
            <el-radio v-model="form.display" label="1">是</el-radio>
            <el-radio v-model="form.display" label="0">否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品图片：" prop="images">
            <el-upload
              ref="upload"
              :action="`http://${url}/manage/file/commonUpload`"
              :data="{ gather: 'products' }"
              :on-success="handleSuccess"
              :headers="headers"
              :file-list="fileList"
              :multiple="false"
              list-type="picture-card"
              accept="image/*"
            >
              <i class="el-icon-plus"></i>
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
                      :data="{ gather: 'products' }"
                      :on-success="(res, files) => handleEdit(res, files, file)"
                      :show-file-list="false"
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
            <el-dialog
              :visible.sync="dialogVisible"
              append-to-body
              top="10vh"
              @close="dialogVisible = false"
            >
              <img width="100%" :src="coverImagePath" alt="" />
            </el-dialog>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品介绍：" prop="content">
            <el-input type="textarea" :rows="2" v-model="form.content" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="产品属性：" prop="property">
            <details-wang-edit :value="form.property" @input="changePage" />
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import detailsWangEdit from "@/components/details/wangEdit/index.vue";
import { getUrl } from "@/utils/set-url";
// import { delProductImageTableData } from "@/api/webConfig/product/product-api";
export default {
  name: "productDialogForm",
  components: { detailsWangEdit },
  data() {
    return {
      fileList: [],
      url: "",
      headers: {},
      dialogVisible: false,
      coverImagePath: "",
      form: {
        navId: "",
        name: "",
        type: "",
        sort: undefined,
        display: "",
        content: "",
        property: "",
        id: "",
        images: [],
      },
      rules: {
        name: [{ required: true, message: "请输入", trigger: "blur" }],
        type: [{ required: true, message: "请输入", trigger: "blur" }],
        sort: [{ required: true, message: "请输入", trigger: "blur" }],
        display: [{ required: true, message: "请输入", trigger: "change" }],
        content: [{ required: true, message: "请输入", trigger: "blur" }],
        property: [{ required: true, message: "请输入", trigger: "blur" }],
        images: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.setUploadData();
  },
  methods: {
    handlePreview(file) {
      this.dialogVisible = true;
      this.coverImagePath = file.url;
    },
    handleRemove(file) {
      const index = this.fileList.findIndex((img) => img.uid === file.uid);
      if (index !== -1) {
        this.fileList.splice(index, 1); // 删除一个元素
        this.form.images.splice(index, 1);
      }
      // if (file.id) {
      //   const res = delProductImageTableData(file.id);
      //   console.log(res);
      //   if (res.code === 200) {
      //     this.$message.success("图片删除成功");
      //   }
      // }
    },
    // 上传成功
    handleSuccess(respresponse, file) {
      if (respresponse.code === 200) {
        const img = {
          uid: file.uid,
          isHome: "1",
          filePath: respresponse.data.filePath,
        };
        this.form.images.push(img);
        const val = {
          name: file.name,
          uid: file.uid,
          url: "http://" + this.url + respresponse.data.filePath,
        };
        this.fileList.push(val);
        this.$message.success("文件上传成功:");
      } else {
        this.$message.error("文件上传失败：", respresponse.msg);
      }
    },
    // 富文本变化回调
    changePage(val) {
      this.form.property = val;
    },
    // 更换图片
    handleEdit(res, files, file) {
      if (res.code === 200) {
        const img = {
          isHome: "1",
          filePath: res.data.filePath,
        };
        this.form.images.push(img);
        const val = {
          uid: files.uid,
          name: files.name,
          url: "http://" + this.url + res.data.filePath,
        };
        this.fileList.push(val);
        this.$message.success("文件上传成功:");
        this.handleRemove(file);
      } else {
        this.$message.error("更换失败：", res.msg);
      }
    },
    setUploadData() {
      this.url = getUrl();
      this.headers = {
        Authorization: "Bearer " + this.$store.getters.token,
      };
    },
    setFormData(data) {
      this.form = data;
      this.form.display = String(data.display);
      this.fileList = [];
      this.form.images.forEach((item) => {
        if (item.filePath && this.form.images.length > 0) {
          const val = {
            name: item.filePath.split("/").pop(),
            url: "http://" + this.url + "/" + item.filePath,
            id: item.id,
          };
          this.fileList.push(val);
        } else {
          // 清空文件列表和封面路径
          this.fileList = [];
          // 清除 upload 组件的缓存
          if (this.$refs.upload) {
            this.$refs.upload.clearFiles();
          }
        }
      });
    },
    getFormData() {
      return this.form;
    },
    clearFormData() {
      this.form = {
        name: "",
        type: "",
        sort: undefined,
        display: "",
        content: "",
        property: "",
        id: "",
        images: [],
      };
      this.coverImagePath = "";
      this.fileList = [];
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