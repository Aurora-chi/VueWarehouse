<template>
  <div class="metadata">
    <div class="bodyer">
      <metadata-form />
    </div>
  </div>
</template>

<script>
import metadataForm from "@/components/form/webConfig/metadata/metadata-form/index.vue";
export default {
  name: "metadata",
  components: { metadataForm },
  data() {
    return {
      form: {},
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.metadata {
  width: 100%;
  height: 100%;
  padding: 20px;
  .bodyer {
    height: 100%;
    width: 100%;
    padding: 20px;
    background-color: #fff;
  }
}
</style>