<template>
  <div>
    <!-- 有子菜单 -->
    <el-submenu
      v-if="item.children && item.children.length > 0"
      :key="item.id"
      :index="item.id.toString()"
    >
      <template slot="title">
        <i :class="getMenuIcon(item.menuName)" />
        <span slot="title">{{ item.menuName }}</span>
      </template>

      <!-- 遍历子菜单，递归调用自身 -->
      <sidebarItem
        v-for="child in item.children"
        :key="child.id"
        :item="child"
        :base-path="child.componentPath"
      />
    </el-submenu>

    <!-- 没有子菜单 -->
    <el-menu-item
      v-else
      :key="item.id"
      :index="item.componentPath || item.id.toString()"
    >
      <i :class="getMenuIcon(item.menuName)" />
      <span slot="title">{{ item.menuName }}</span>
    </el-menu-item>
  </div>
</template>

<script>
export default {
  name: "sidebarItem", // 这个名字很重要，用于递归调用

  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      // 1. 定义 iconMap
      iconMap: {
        系统管理: "el-icon-xtgl",
        网站配置: "el-icon-wzpz",
        网站业务: "el-icon-wzyw",
        服务与支持: "el-icon-folder-opened",
        关于我们: "el-icon-folder-opened",
      },
    };
  },

  methods: {
    getMenuIcon(menu) {
      // 3. 根据菜单名匹配图标
      return this.iconMap[menu] || "el-icon-document";
    },
  },
};
</script>

<style scoped>
.el-icon-xtgl,
.el-icon-wzpz,
.el-icon-wzyw {
  font-size: 0 !important;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.el-icon-xtgl {
  background-image: url("../../assets/images/sidebar/set.svg");
}
.el-icon-wzpz {
  background-image: url("../../assets/images/sidebar/IE.svg");
}
.el-icon-wzyw {
  background-image: url("../../assets/images/sidebar/pc.svg");
}
</style>