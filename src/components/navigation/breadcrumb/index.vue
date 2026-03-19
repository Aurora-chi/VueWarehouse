<template>
  <div class="breadcrumb">
    <div class="left">
      <div class="collapse">
        <i
          :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          @click="collapse"
        />
      </div>
      <div class="title">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in breadcrumbList"
            :key="index"
            :to="item.path"
          >
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="right">
      <div class="fullScreen" @click="toggleFullScreen">
        <img
          :src="isFullScreen ? exitFullScreenIcon : fullScreenIcon"
          :alt="isFullScreen ? '退出全屏' : '全屏'"
        />
      </div>

      <el-dropdown
        @command="handleCommand"
        @visible-change="handleDropdownVisible"
      >
        <div class="user_info">
          <el-avatar
            shape="square"
            :size="30"
            fit="cover"
            :src="avatarUrl ? user_avatar : tx"
          >
          </el-avatar>
          <div class="name">{{ userName }}</div>
          <div>
            <i
              :class="
                dropdownVisible ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "
            ></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </div>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  data() {
    return {
      dropdownVisible: false,
      isCollapse: false,
      isFullScreen: false,
      exitFullScreenIcon: require("@/assets/images/navigation/outFull.svg"),
      fullScreenIcon: require("@/assets/images/navigation/fullScreen.svg"),
      url: "http://192.168.0.114:9012",
      tx: require("@/assets/images/navigation/tx.svg"),
      user_avatar: "",
      userInfor: [],
      userName: "",
      breadcrumbList: [],
    };
  },
  async created() {
    try {
      this.loading = true;
      // 等待两个请求都完成
      await Promise.all([this.$store.dispatch("GetInfo")]);
      // 数据加载完成后获取用户信息
      this.get_userInfor();
      this.generateBreadcrumb(); // 生成面包屑
    } catch (error) {
      console.error("初始化失败:", error);
    } finally {
      this.loading = false;
    }
  },
  computed: {
    avatarUrl() {
      if (this.user_avatar) {
        return true;
      }
      return false;
    },
  },
  watch: {
    $route: {
      handler() {
        this.generateBreadcrumb();
      },
      immediate: true, // 立即执行一次，以便在组件创建时也能触发
    },
  },

  methods: {
    // 生成面包屑
    generateBreadcrumb() {
      const routes = this.$route.matched;
      this.breadcrumbList = routes
        .map((route) => {
          return {
            name: route.name,
            path: route.path,
          };
        })
        .filter((item) => item.name); // 过滤掉没有名称的
    },
    get_userInfor() {
      this.userInfor = this.$store.state.userInfo;
      this.userName = this.userInfor.userName;
      const avatar = this.userInfor.avatar;
      this.user_avatar = this.url + avatar;
    },
    collapse() {
      this.isCollapse = !this.isCollapse;
      this.$emit("update:collapse", this.isCollapse);
    },
    // 登出
    async out_login() {
      try {
        await this.$store.dispatch("Logout");
        this.$router.push("/login");
      } catch (e) {
        console.log(e);
      }
    },
    // 切换全屏
    toggleFullScreen() {
      this.isFullScreen = !this.isFullScreen;
      if (this.isFullScreen) {
        this.enterFullScreen();
      } else {
        this.exitFullScreen();
      }
    },
    // 进入全屏
    enterFullScreen() {
      const element = document.documentElement; // 全屏整个页面

      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else {
        this.warning("您的浏览器不支持全屏功能");
      }
    },

    // 退出全屏
    exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    },
    handleCommand(command) {
      switch (command) {
        case "profile":
          this.goToProfile();
          break;
        case "logout":
          this.out_login();
          break;
      }
    },
    handleDropdownVisible(isVisible) {
      this.dropdownVisible = isVisible;
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumb {
  width: 100%;
  height: 100%;
  padding-left: 20px;
  padding-right: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  .left {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #fff;
  }
  .right {
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 24px;
    color: #fff;
  }
  i {
    margin-right: 20px;
  }
}
.title {
  color: white;
}
.fullScreen {
  height: 50px;
  width: 50px;
  display: flex;
  border-top: 3px solid #0f1e3d;
  align-items: center;
  justify-content: center;
  margin-right: 30px;
  cursor: pointer;
  img {
    height: 20px;
    width: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
}
.fullScreen:hover {
  background-color: #000000;
  border-top: 3px solid#808080;
}
.user_info {
  height: 50px;
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: end;
  color: #fff;
  border-top: 3px solid #0f1e3d;
  cursor: pointer;
  .name {
    margin: 0px 8px;
  }
  .el-avatar--square {
    border-radius: 50%;
  }
  &:hover {
    background-color: #000000;
    border-top: 3px solid#808080;
  }
}
.collapse {
  cursor: pointer;
  i {
    transition: all 0.3s ease 0s;
  }
}
</style>