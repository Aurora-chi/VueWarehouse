<template>
  <div class="navigationBar">
    <div class="tabs">
      <!-- 标签页容器 -->
      <div class="tabs-container" ref="tabsContainer">
        <transition-group name="tab">
          <div
            v-for="tab in tabs"
            :key="tab.path"
            class="tab-item"
            :class="{
              active: activeTab === tab.path,
              closable: tab.closable,
            }"
            @click="switchTab(tab)"
          >
            <span class="tab-title">{{ tab.title }}</span>
            <i
              v-if="tab.closable"
              class="el-icon-close tab-close"
              @click.stop="closeTab(tab)"
              @mouseenter="$event.target.classList.add('hover')"
              @mouseleave="$event.target.classList.remove('hover')"
            ></i>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "navigationBar",
  data() {
    return {
      tabs: [],
      activeTab: "",
      maxTabs: 10,
      dynamicMenus: [], // 从 store 获取的动态菜单
    };
  },
  created() {
    // 从 store 获取动态菜单
    this.dynamicMenus = this.$store.state.routers || [];
    // 监听路由变化
    this.$watch("$route", this.handleRouteChange, { immediate: true });
  },
  methods: {
    // 处理路由变化
    handleRouteChange(newRoute) {
      this.addTab(newRoute);
    },

    // 添加或激活标签页
    addTab(route) {
      // 忽略重定向路由
      if (route.path === "/redirect") return;

      const existingTab = this.tabs.find((tab) => tab.path === route.path);

      if (existingTab) {
        this.activeTab = route.path;
        this.scrollToActiveTab();
      } else {
        if (this.tabs.length >= this.maxTabs) {
          this.$message.warning(
            `最多只能打开${this.maxTabs}个标签页,刷新页面重置标签页数`
          );
          return;
        }
        const tabInfo = route;
        const newTab = {
          title: tabInfo.name,
          path: route.path,
          fullPath: route.fullPath || route.path,
          closable: route.path !== "/main",
          params: route.params,
          query: route.query,
        };

        this.tabs.push(newTab);
        this.activeTab = route.path;
        // 滚动到新标签页
        this.$nextTick(() => {
          this.scrollToActiveTab();
        });
      }
    },

    // 关闭标签页
    closeTab(tab) {
      if (!tab.closable) return;

      const index = this.tabs.findIndex((t) => t.path === tab.path);
      if (index === -1) return;

      this.tabs.splice(index, 1);

      // 如果关闭的是当前激活的标签页
      if (this.activeTab === tab.path) {
        if (this.tabs.length > 0) {
          // 优先激活上一个，如果没有则激活下一个
          const newActiveIndex = Math.min(index, this.tabs.length - 1);
          const newActiveTab = this.tabs[newActiveIndex];
          this.activeTab = newActiveTab.path;
          this.$router.push(newActiveTab.path);
        } else {
          // 如果没有标签页了，跳转到首页
          this.activeTab = "/main";
          this.$router.push("/main");
        }
      }
    },

    // 切换标签页
    switchTab(tab) {
      if (tab.path !== this.activeTab) {
        this.activeTab = tab.path;
        this.$router.push(tab.fullPath || tab.path);
        this.scrollToActiveTab();
      }
    },
    // 滚动到激活的标签页
    scrollToActiveTab() {
      const container = this.$refs.tabsScroll;
      if (!container) return;

      const activeTab = container.querySelector(".tab-item.active");
      if (activeTab) {
        const containerWidth = container.offsetWidth;
        const tabLeft = activeTab.offsetLeft;
        const tabWidth = activeTab.offsetWidth;

        // 计算滚动位置，使标签页居中显示
        const scrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;

        container.scrollTo({
          left: scrollLeft,
          behavior: "smooth",
        });
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.navigationBar {
  width: 100%;
  height: 100%;
  user-select: none;
}
.tabs {
  width: 100%;
  height: 40px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  align-items: center;
  padding: 0 8px;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

  .tabs-container {
    flex: 1;
    display: flex;
    align-items: center;
    height: 100%;
    position: relative;
    margin: 0 8px;
  }

  .tab-item {
    display: inline-flex;
    align-items: center;
    height: 32px;
    padding: 0 10px 0 12px;
    margin-right: 5px;
    background-color: #fff;
    border: 1px solid #e8e8e8;
    border-radius: 4px 4px 0 0;
    font-size: 13px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
    position: relative;
    white-space: nowrap;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);

    &:hover {
      background-color: #e8f4ff;
      border-color: #409eff;
      color: #409eff;
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(64, 158, 255, 0.2);

      .tab-close {
        opacity: 1;
        visibility: visible;
      }
    }

    &.active {
      background-color: #409eff;
      border-color: #409eff;
      color: #fff;
      transform: translateY(-1px);
      box-shadow: 0 2px 6px rgba(64, 158, 255, 0.3);

      .tab-close {
        color: #fff;
        opacity: 1;
        visibility: visible;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
        }
      }
    }

    &.closable {
      padding-right: 6px;
    }

    .tab-title {
      margin-right: 6px;
    }

    .tab-close {
      font-size: 12px;
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s;
      padding: 2px;
      border-radius: 50%;

      &.hover,
      &:hover {
        background-color: #ddd;
      }
    }
  }

  // 标签页过渡动画
  .tab-enter-active,
  .tab-leave-active {
    transition: all 0.3s;
  }

  .tab-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }

  .tab-leave-to {
    opacity: 0;
    transform: translateX(-30px);
  }

  .tab-leave-active {
    position: absolute;
  }
}
</style>