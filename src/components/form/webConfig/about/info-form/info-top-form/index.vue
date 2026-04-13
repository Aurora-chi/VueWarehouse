<template>
  <div class="info-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="公司名称：">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
          <el-form-item label="是否显示：">
            <el-select
              v-model="form.isDisplay"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="是" value="1"> </el-option>
              <el-option label="否" value="0"> </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "infoTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        name: "",
        isDisplay: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        name: "",
        isDisplay: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>