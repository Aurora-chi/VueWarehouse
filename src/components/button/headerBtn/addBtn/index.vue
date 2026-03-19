<template>
  <el-button
    type="primary"
    icon="el-icon-plus"
    @click="addZhu"
    class="el-button"
    >新增</el-button
  >
</template>

<script>
export default {
  name: "addBtn",
  data() {
    return {};
  },
  methods: {
    addZhu() {
      console.log("新增");
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