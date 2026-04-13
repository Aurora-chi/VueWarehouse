<template>
  <div class="news-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="导航ID：">
            <el-input-number
              v-model="form.navId"
              controls-position="right"
              style="width: 100%"
              :min="1"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标题：">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="副标题：">
            <el-input v-model="form.subTitle" />
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "newsTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        navId: "1",
        title: "",
        subTitle: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        navId: "1",
        title: "",
        subTitle: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>