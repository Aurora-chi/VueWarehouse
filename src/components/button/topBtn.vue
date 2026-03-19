<template>
  <div class="btn-group">
    <el-button type="primary" icon="el-icon-search" @click="query"
      >搜索</el-button
    >
    <el-button type="primary" icon="el-icon-search" @click="reset" plain
      >重置</el-button
    >
  </div>
</template>

<script>
export default {
  name: "topBtn",
  data() {
    return {};
  },
  methods: {
    // 搜索按钮
    query() {},
    // 重置按钮
    reset() {},
  },
};
</script>

<style lang="scss" scoped>
.btn-group {
  float: right;
  margin: 16px 12px 0 0;
}
</style>