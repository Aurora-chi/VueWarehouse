<template>
  <div>
    <div class="breadcrumb">
      <breadcrumb @update:collapse="handleCollapse" :isCollapse="isCollapse" />
    </div>
    <div class="navigation">
      <navigationBar />
    </div>
  </div>
</template>

<script>
import breadcrumb from "./breadcrumb/index.vue";
import navigationBar from "./navigationBar/index.vue";
export default {
  name: "navigation",
  components: { breadcrumb, navigationBar },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },

  methods: {
    handleCollapse(value) {
      this.$emit("update:collapse", value);
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  width: 100%;
  height: 50px;
  background-color: #0f1e3d;
}
.navigation {
  width: 100%;
  height: 40px;
  background-color: #fff;
}
</style>