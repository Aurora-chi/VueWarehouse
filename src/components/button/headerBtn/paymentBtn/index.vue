<template>
  <el-button
    type="primary"
    plain
    icon="el-icon-money"
    @click="charge"
    class="el-button"
    >付款</el-button
  >
</template>

<script>
export default {
  name: "charge",
  methods: {
    charge() {
      this.$emit("openPaymentDialog");
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