<template>
  <div class="product-left-form">
    <el-tree
      :data="tree"
      :props="{
        value: 'id',
        label: 'navName',
        children: 'children',
      }"
      :indent="8"
      accordion
      @node-click="handleNodeClick"
    >
    </el-tree>
  </div>
</template>

<script>
import axios from "axios";
import { getUrl } from "@/utils/set-url";
export default {
  name: "productLeftForm",
  data() {
    return {
      tree: [],
    };
  },
  async created() {
    await this.getNavigation();
  },
  methods: {
    // 获取树形导航
    async getNavigation() {
      const url = "http://" + getUrl() + "/web/navigation/getNavigationByPid/9";
      const res = await axios.post(url, {}, this.headers);
      if (res.data.code === 200) {
        this.tree = [
          {
            id: 9,
            navName: "产品中心",
            children: res.data.data,
          },
        ];
      } else {
        this.$message.error("导航数据获取失败", res.msg);
      }
    },
    handleNodeClick(data) {
      this.$emit("changeNavId", data.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-tree {
  color: #000;
}
</style>