<template>
  <el-button
    type="primary"
    plain
    icon="el-icon-sort"
    @click="toggleExpandAll"
    class="el-button"
    >展开/折叠</el-button
  >
</template>

<script>
export default {
  name: "addBtn",
  data() {
    return {
      isExpand: false,
    };
  },
  methods: {
    toggleExpandAll() {
      if (this.isExpand) {
        console.log("折叠");
      } else {
        console.log("展开");
      }
      this.isExpand = !this.isExpand;
    },
  },
};
</script>

<style lang='scss' scoped>
.el-button {
  margin: 16px 0px 16px 16px;
  padding: 10px 20px;
}
</style>