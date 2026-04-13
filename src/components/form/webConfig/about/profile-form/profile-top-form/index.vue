<template>
  <div class="profile-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="标题：">
            <el-input v-model="form.title" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="是否首页：">
            <el-select style="width: 100%" v-model="form.isHome">
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="开始时间：">
            <el-date-picker
              v-model="form.beginTime"
              style="width: 100%"
              type="date"
              placeholder="开始时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="结束时间：">
            <el-date-picker
              v-model="form.endTime"
              style="width: 100%"
              type="date"
              placeholder="结束时间"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form>
      <el-col :span="24">
        <search-button @updata:query="query" @updata:reset="reset" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import searchButton from "@/components/button/search-button/topBtn.vue";
export default {
  name: "profileTopForm",
  components: { searchButton },
  data() {
    return {
      form: {
        title: "",
        isHome: "",
        beginTime: "",
        endTime: "",
      },
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        title: "",
        isHome: "",
        beginTime: "",
        endTime: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>