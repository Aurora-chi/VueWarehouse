<template>
  <div class="menu">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :collapse="isCollapse"
        background-color="#0F1E3D"
        text-color="#bfcbd9"
        active-text-color="#ff6801"
        :unique-opened="true"
        :collapse-transition="false"
        :router="true"
        :default-active="$route.path"
      >
        <sidebarItme
          v-for="route in routers"
          :key="route.id"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItme from "./sidebarItme.vue";

export default {
  name: "Sidebar",
  computed: {
    ...mapGetters({
      routers: "routers",
    }),
  },
  components: { sidebarItme },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.menu {
  height: 100%;
}
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
.el-scrollbar {
  height: 100%;
}
.el-menu {
  border-right: none;
}
.el-menu-item i,
.el-submenu__title i {
  margin-right: 10px;
}
</style>