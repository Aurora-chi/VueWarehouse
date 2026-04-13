<template>
  <div class="profile-left-form">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class="avatar-container">
        <div
          class="tx"
          @mouseenter="showAddIcon = true"
          @mouseleave="showAddIcon = false"
        >
          <!-- 默认头像图标或图片 -->
          <i v-if="!form.avatar" class="el-icon-user"></i>
          <img v-else :src="imgUrl" alt="" />

          <!-- 悬浮时显示的添加图标 -->

          <div class="add-overlay" v-if="showAddIcon" @click="handleAddImage">
            <i class="el-icon-plus"></i>
            <span>上传头像</span>
          </div>
        </div>
      </div>
      <div class="text item">
        <ul class="no-dot-list">
          <li>
            <span><i class="el-icon-user-solid i" />用户名称</span
            ><span>{{ form.userName }}</span>
          </li>
          <li>
            <span><i class="el-icon-mobile-phone i" />手机号码</span
            ><span>{{ form.phone }}</span>
          </li>
          <li>
            <span><i class="el-icon-message i" />用户邮箱</span
            ><span>{{ form.email }}</span>
          </li>
          <li>
            <span><i class="el-icon-s-check i" />所属角色</span>
            <span v-for="item in roleList" :key="item.roleCode"
              >{{ item.roleName }}
            </span>
          </li>
          <li>
            <span><i class="el-icon-date i" />创建日期</span
            ><span>{{ form.createTime }}</span>
          </li>
        </ul>
      </div>
    </el-card>
    <profile-dialog ref="profileDialog" @updateUserInfo="updateUserInfo" />
  </div>
</template>

<script>
import profileDialog from "@/components/dialogs/profile-dialog/index.vue";
import {
  getProfileUserInfo,
  updateProfileUserInfo,
} from "@/api/profile/profile-api";
import { getUrl } from "@/utils/set-url";
export default {
  name: "profileLeftForm",
  components: { profileDialog },
  data() {
    return {
      url: "",
      headers: {},
      imgUrl: "",
      form: {},
      roleList: [],
      showAddIcon: false,
    };
  },
  async created() {
    this.setUpload();
    await this.getUserInfo();
  },
  methods: {
    handleAddImage() {
      this.$refs.profileDialog.openDialog(this.form.avatar);
    },
    async getUserInfo() {
      const res = await getProfileUserInfo();
      this.form = res.data.user;
      this.roleList = res.data.roleList;
      this.imgUrl = "http://" + this.url + this.form.avatar;
    },
    async updateUserInfo(avatar) {
      this.form = avatar;
      const res = await updateProfileUserInfo(this.form);
      if (res.code === 200) {
        this.$message.success("头像修改成功");
      }
    },
    setUpload() {
      this.url = getUrl();
      this.headers = { Authorization: "Bearer " + this.$store.getters.token };
    },
  },
};
</script>

<style lang='scss' >
.profile-left-form {
  width: 100%;
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;

    .no-dot-list {
      list-style: none;
      padding-left: 0;
      i {
        margin-right: 10px;
      }
      li {
        padding: 11px 0px;
        border-bottom: 1px solid #ebeef5;
        &::before {
          margin-right: 8px;
        }
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 100%;
  }

  // 头像容器
  .avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;

    .tx {
      position: relative;
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: #f0f2f5;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      overflow: hidden;
      border: 2px solid #fff;
      transition: all 0.3s;
      margin-bottom: 15px;

      .el-icon-user {
        font-size: 50px;
        color: #909399;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .add-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: #fff;
        transition: all 0.3s;

        i {
          font-size: 24px;
          margin-bottom: 5px;
        }
        span {
          font-size: 12px;
        }
        &:hover {
          background: rgba(127, 127, 127, 0.5);
          i,
          span {
            transform: scale(1.1);
          }
        }
      }
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2);
      }
    }
  }
}
</style>