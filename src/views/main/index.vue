
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
      <div class="content-right">
        <navigator class="navigator" @update:collapse="handleCollapse" />
        <div class="router-content"></div>
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
      routers: [],
    };
  },
  mounted() {
    this.$store.dispatch("GetRouters");
  },
  methods: {
    handleCollapse(value) {
      this.isCollapse = value;
    },
    // 回到首页
    go_main() {
      this.$router.push("/main");
    },
  },
};
</script>

<style lang="scss" scoped>
.Mian {
  width: 100%;
  height: 100%;
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
    .top {
      height: 50px;
      background-color: #f65b23;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  @media screen and (max-width: 990px) {
    .content-left {
      display: none;
    }
  }
  .content-right {
    flex: 1;
    height: 100%;
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
    }
  }
}
</style>