<template>
  <el-button
    type="danger"
    icon="el-icon-delete"
    :disabled="disabled"
    @click="charge"
    class="el-button"
    >批量删除</el-button
  >
</template>

<script>
export default {
  name: "batchDel",
  props: {
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    charge() {
      this.$emit("batchDel");
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