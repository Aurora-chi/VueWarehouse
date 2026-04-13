<template>
  <div class="profile-dialog-form">
    <div class="avatar-upload-container">
      <!-- 头像预览区域 -->
      <div class="avatar-preview" v-if="tempAvatarUrl">
        <div
          class="avatar-wrapper"
          @mouseenter="showAvatarActions = true"
          @mouseleave="showAvatarActions = false"
        >
          <img :src="tempAvatarUrl" class="preview-img" />

          <!-- 悬浮操作按钮 -->
          <div class="avatar-actions" v-if="showAvatarActions">
            <el-tooltip content="放大查看" placement="top">
              <el-button
                type="primary"
                circle
                size="small"
                @click="handlePreviewImage"
              >
                <i class="el-icon-zoom-in"></i>
              </el-button>
            </el-tooltip>

            <el-tooltip content="更换头像" placement="top">
              <el-button
                type="primary"
                circle
                size="small"
                @click="triggerUpload"
              >
                <i class="el-icon-refresh"></i>
              </el-button>
            </el-tooltip>

            <el-tooltip content="删除头像" placement="top">
              <el-button
                type="danger"
                circle
                size="small"
                @click="handleDeleteAvatar"
              >
                <i class="el-icon-delete"></i>
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </div>

      <!-- 上传区域（没有头像时显示） -->
      <div class="upload-area" v-else>
        <el-upload
          ref="avatarUpload"
          class="avatar-uploader"
          :action="`http://${url}/manage/file/commonUpload`"
          :data="{ gather: 'user_avatar' }"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <div class="upload-placeholder">
            <i class="el-icon-plus"></i>
            <span>点击上传头像</span>
          </div>
        </el-upload>
      </div>
    </div>

    <!-- 隐藏的上传组件（用于更换头像） -->
    <el-upload
      ref="hiddenUpload"
      class="hidden-upload"
      :action="`http://${url}/manage/file/commonUpload`"
      :data="{ gather: 'user_avatar' }"
      :headers="headers"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      style="display: none"
    >
    </el-upload>
    <!-- 图片预览对话框 -->
    <el-dialog
      :visible.sync="previewVisible"
      width="45%"
      append-to-body
      :close="closeDialog"
    >
      <span slot="title" class="custom-title">
        <i class="el-icon-view"></i> 头像预览
      </span>
      <div class="preview-container">
        <img :src="tempAvatarUrl" class="preview-large-img" />
      </div>
    </el-dialog>
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
      showAvatarActions: false,
      previewVisible: false,
      tempAvatarUrl: "",
      form: { avatar: "" },
    };
  },
  created() {
    this.setUpload();
  },
  methods: {
    setFormData(data) {
      if (!data) {
        return;
      }
      this.form.avatar = data;
      this.tempAvatarUrl = "http://" + this.url + data;
    },
    getFormData() {
      return this.form;
    },
    // 设置上传参数
    setUpload() {
      this.url = getUrl();
      this.headers = { Authorization: "Bearer " + this.$store.getters.token };
    },
    // 查看头像
    handlePreviewImage() {
      this.previewVisible = true;
    },
    // 更换头像
    triggerUpload() {
      this.$refs.hiddenUpload.$children[0].handleClick();
    },
    // 删除头像
    handleDeleteAvatar() {
      this.tempAvatarUrl = "";
      this.form.avatar = "";
    },
    // 上传成功
    handleAvatarSuccess(res) {
      if (res.code === 200) {
        this.tempAvatarUrl = "http://" + this.url + res.filePath;
        this.form.avatar = res.filePath;
        this.$message.success("上传成功");
      }
    },
    // 关闭头像预览
    closeDialog() {
      this.previewVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.avatar-upload-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;

  .avatar-preview {
    .avatar-wrapper {
      position: relative;
      width: 200px;
      height: 200px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto;
      border: 3px solid #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      cursor: pointer;

      .preview-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .avatar-actions {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        transition: all 0.3s;

        .el-button {
          padding: 8px;
          transform: scale(0.9);
          transition: transform 0.2s;

          &:hover {
            transform: scale(1.1);
          }

          i {
            font-size: 16px;
          }
        }
      }
    }

    .avatar-tip {
      text-align: center;
      font-size: 12px;
      color: #909399;
      margin-top: 10px;
    }
  }

  .upload-area {
    .upload-placeholder {
      width: 200px;
      height: 200px;
      border: 2px dashed #dcdfe6;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      margin: 0 70px;
      cursor: pointer;
      background: #f5f7fa;
      transition: all 0.3s;

      i {
        font-size: 40px;
        color: #909399;
        margin-bottom: 10px;
      }

      span {
        font-size: 14px;
        color: #606266;
        margin-bottom: 5px;
      }

      .upload-tip {
        font-size: 12px;
        color: #909399;
        margin: 0;
      }

      &:hover {
        border-color: #409eff;
        background: #ecf5ff;

        i,
        span,
        p {
          color: #409eff;
        }
      }
    }
  }
}
</style>