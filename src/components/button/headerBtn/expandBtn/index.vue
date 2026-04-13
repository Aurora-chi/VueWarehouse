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
    return {};
  },
  methods: {
    toggleExpandAll() {
      this.$emit("updata:expand");
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