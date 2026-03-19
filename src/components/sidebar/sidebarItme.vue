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
      />
    </el-submenu>

    <!-- 没有子菜单 -->
    <el-menu-item v-else :key="item.id" :index="generateMenuPath(item)">
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
    generateMenuPath(menu) {
      if (!menu.path) return "";

      // 如果path以/开头，直接使用
      if (menu.path.startsWith("/")) {
        return menu.path;
      }

      // 根据父菜单类型生成完整路径
      let basePath = "";
      if (menu.parentId === 1) {
        // 系统管理下的子菜单
        basePath = "/system";
      } else if (menu.parentId === 9) {
        // 网站配置下的子菜单
        basePath = "/webConfig";
      } else if (menu.parentId === 14) {
        // 网站业务下的子菜单
        basePath = "/webBusiness";
      } else if (menu.parentId === 31) {
        // 服务与支持下的子菜单
        basePath = "/webConfig/support";
      } else if (menu.parentId === 23) {
        // 关于我们下的子菜单
        basePath = "/webConfig/about";
      }

      return basePath ? `${basePath}/${menu.path}` : `/${menu.path}`;
    },
    getMenuIcon(menu) {
      // 3. 根据菜单名匹配图标
      return this.iconMap[menu] || "el-icon-document";
    },
  },
};
</script>

<style lang="scss" scoped>
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