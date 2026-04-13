<template>
  <div>
    <addBtn @updata:addNew="addNew" />
    <expandBtn @updata:expand="toggleExpandAll" />
  </div>
</template>

<script>
import addBtn from "@/components/button/headerBtn/addBtn/index.vue";
import expandBtn from "@/components/button/headerBtn/expandBtn/index.vue";
export default {
  name: "headerBtn",
  components: { addBtn, expandBtn },
  methods: {
    addNew() {
      this.$emit("updata:addNew");
    },
    toggleExpandAll() {
      this.$emit("updata:expand");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>