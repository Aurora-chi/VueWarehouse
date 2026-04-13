
<template>
  <div class="Mian">
    <div class="content">
      <div
        class="content-left"
        :class="{ 'content-left-collapsed': isCollapse }"
      >
        <div class="top" @click="go_main">
          <img
            :src="
              isCollapse
                ? require('../../assets/images/userMain/smallLogo.fbad1a4f.svg')
                : require('../../assets/images/userMain/logo.e29077e5.svg')
            "
            alt="LOGO"
          />
        </div>
        <Sidebar :isCollapse="isCollapse" />
      </div>
      <el-drawer
        :visible.sync="drawerVisible"
        direction="ltr"
        :with-header="false"
        :before-close="closeDrawer"
      >
        <div class="top" @click="go_main">
          <img
            :src="require('@/assets/images/userMain/logo.e29077e5.svg')"
            alt="LOGO"
          />
        </div>
        <Sidebar :isCollapse="false" />
      </el-drawer>
      <div class="content-right">
        <navigator
          class="navigator"
          @update:collapse="handleCollapse"
          :isCollapse="isCollapse"
        />
        <div class="router-content">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Sidebar from "../../components/sidebar/sidebar.vue";
import navigator from "../../components/navigation/index.vue";
export default {
  name: "UserMain",
  components: { Sidebar, navigator },
  data() {
    return {
      isCollapse: false,
      drawerVisible: false,
      routers: [],
      userInfor: [],
    };
  },
  mounted() {
    // 组件挂载时检查屏幕宽度
    this.checkScreenWidth();
    // 监听窗口大小变化
    window.addEventListener("resize", this.handleResize);
  },
  beforeDestroy() {
    // 组件销毁前移除监听器
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    // 关闭drawer回调
    closeDrawer() {
      this.drawerVisible = false;
      this.isCollapse = !this.isCollapse;
    },
    handleCollapse(value) {
      this.isCollapse = value;
      if (!this.isCollapse) {
        if (window.innerWidth < 990) {
          this.drawerVisible = true;
        }
      } else {
        if (!window.innerWidth < 990) {
          this.drawerVisible = false;
        }
      }
    },
    // 回到首页
    go_main() {
      this.$router.push("/main");
    },
    // 检查屏幕宽度并设置折叠状态
    checkScreenWidth() {
      const screenWidth = window.innerWidth;
      this.isCollapse = screenWidth < 990;
    },
    // 处理窗口大小变化
    handleResize() {
      this.checkScreenWidth();
    },
  },
};
</script>

<style lang="scss" scoped>
.Mian {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .content {
    width: 100%;
    height: 100%;
    display: inline-flex;
  }
  .content-left {
    width: 220px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #0f1e3d !important;
    background: url("../../assets/images/userMain/bg.8650a5f2.png") no-repeat;
    background-position: 0 100%;
    background-attachment: fixed;
    /* 折叠状态样式 */
    &.content-left-collapsed {
      width: 64px; /* 折叠时的宽度 */

      .top img {
        padding: 0 10px; /* 小图标内边距 */
      }
    }
  }
  .top {
    cursor: pointer;
    height: 50px;
    background-color: #f65b23;
    img {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 790px) {
    .content-left {
      display: none;
    }
  }
  .content-right {
    flex: 1;
    height: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    .navigator {
      width: 100%;
      height: 90px;
    }
    .router-content {
      width: 100%;
      height: 100%;
      background-color: #f0f2f5;
      overflow-y: auto; // 垂直方向滚动
      > div {
        height: 100%;
      }
    }
  }
}
</style>