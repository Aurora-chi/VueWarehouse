<template>
  <div>
    <div class="breadcrumb">
      <breadcrumb @update:collapse="handleCollapse" />
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
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    handleCollapse(value) {
      this.isCollapse = value;
      this.$emit("update:collapse", this.isCollapse);
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