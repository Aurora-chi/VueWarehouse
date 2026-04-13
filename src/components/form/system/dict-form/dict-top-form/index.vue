<template>
  <div class="dict-top-form">
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="字典名称：">
            <el-input v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="字典类型：">
            <el-input v-model="form.type" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="状态：">
            <el-select
              v-model="form.status"
              placeholder="请选择"
              style="width: 100%"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <search-btn @updata:query="query" @updata:reset="reset" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import searchBtn from "@/components/button/search-button/topBtn.vue";
export default {
  name: "dictTopForm",
  components: { searchBtn },
  data() {
    return {
      form: {
        name: "",
        type: "",
        status: "",
      },
      options: [
        {
          value: "0",
          label: "正常",
        },
        {
          value: "1",
          label: "禁用",
        },
      ],
    };
  },
  methods: {
    query() {
      this.$emit("query", this.form);
    },
    reset() {
      this.form = {
        name: "",
        type: "",
        status: "",
      };
      this.$emit("reset");
    },
  },
};
</script>

<style lang="scss" scoped>
</style>