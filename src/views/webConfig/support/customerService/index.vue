<template>
  <div class="customer-service">
    <div class="bodyer">
      <customer-service-top-form />
    </div>
  </div>
</template>

<script>
import customerServiceTopForm from "@/components/form/webConfig/support/customer-service-form/index.vue";
export default {
  name: "customerService",
  components: { customerServiceTopForm },
};
</script>

<style lang="scss" scoped>
.customer-service {
  width: 100%;
  height: 100%;
  padding: 20px;
  .bodyer {
    width: 100%;
    height: 826px;
    padding: 20px 20px;
    background-color: #fff;
  }
}
</style>