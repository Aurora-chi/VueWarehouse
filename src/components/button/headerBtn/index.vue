<template>
  <div>
    <addBtn />
    <expandBtn />
  </div>
</template>

<script>
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import expandBtn from "@/components/button/headerBtn/expandBtn/index.vue";
export default {
  name: "headerBtn",
  components: { addBtn, expandBtn },
};
</script>

<style lang="scss" scoped>
</style>