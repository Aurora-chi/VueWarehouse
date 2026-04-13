<template>
  <div class="certificates-top-form">
    <el-row :gutter="20">
      <el-form label-width="100px">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="资质年份：">
            <el-select
              v-model="form.year"
              placeholder="请选择"
              style="width: 100%"
              v-infinite-scroll="load"
            >
              <el-option
                v-for="item in yearOptions"
                :key="item"
                :label="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="资质名称：">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
          <el-form-item label="是否显示：">
            <el-select
              v-model="form.display"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option label="是" value="1" />
              <el-option label="否" value="0" />
            </el-select>
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
  name: "certificatesTopForm",
  components: { searchButton },
  data() {
    return {
      year: 2000,
      yearOptions: [],
      form: {
        year: "",
        name: "",
        display: "",
      },
    };
  },
  methods: {
    load() {
      const nowDate = new Date();
      if (this.year <= nowDate.getFullYear()) {
        this.yearOptions.push(this.year);
        this.year = this.year + 1;
      }
    },
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        year: "",
        name: "",
        display: "",
      };
      this.$emit("reset", this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>