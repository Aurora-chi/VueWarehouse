<template>
  <el-button
    type="primary"
    plain
    icon="el-icon-money"
    @click="charge"
    class="el-button"
    >收费表单</el-button
  >
</template>

<script>
export default {
  name: "charge",
  methods: {
    charge() {
      this.$emit("open-chargeDialog");
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