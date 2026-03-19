<template>
  <div class="menu">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="custom-menu"
        :collapse="isCollapse"
        background-color="#0F1E3D"
        text-color="#bfcbd9"
        active-text-color="#ff6801"
        :unique-opened="true"
        :collapse-transition="false"
        :router="true"
        :default-active="$route.path"
      >
        <sidebarItme v-for="route in routers" :key="route.id" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarItme from "./sidebarItme.vue";

export default {
  name: "Sidebar",
  components: { sidebarItme },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$store.dispatch("GetRouters");
  },
  computed: {
    ...mapGetters({
      routers: "routers",
    }),
  },
};
</script>

<style lang='scss' scoped>
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