<template>
  <el-button
    type="primary"
    icon="el-icon-plus"
    @click="addNew"
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
    addNew() {
      this.$emit("updata:addNew", true);
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