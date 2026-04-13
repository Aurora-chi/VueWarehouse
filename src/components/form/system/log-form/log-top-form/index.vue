<template>
  <div class="log-top-form">
    <el-form class="form" label-width="100px" @submit.native.prevent>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="操作模块：">
            <el-input @keyup.enter.native="query" v-model="form.module" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="操作名称：">
            <el-input @keyup.enter.native="query" v-model="form.name" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="操作类型：">
            <el-input @keyup.enter.native="query" v-model="form.type" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="状态：">
            <el-select
              v-model="form.status"
              style="width: 100%"
              @keyup.enter.native="query"
            >
              <el-option
                v-for="item in status"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option
            ></el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="开始时间：">
            <el-date-picker
              type="datetime"
              style="width: 100%"
              @keyup.enter.native="query"
              v-model="form.beginTime"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="6" :lx="6">
          <el-form-item label="结束时间：">
            <el-date-picker
              type="datetime"
              align="right"
              style="width: 100%"
              v-model="form.endTime"
              :picker-options="pickerOptions"
              @keyup.enter.native="query"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :lx="12">
          <search-btn @updata:query="query" @updata:reset="reset" />
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import searchBtn from "@/components/button/search-button/topBtn.vue";
export default {
  name: "logTopForm",
  components: { searchBtn },
  data() {
    return {
      form: {
        module: "",
        name: "",
        type: "",
        status: "",
        beginTime: "",
        endTime: "",
      },
      status: [
        {
          value: true,
          label: "成功",
        },
        {
          value: false,
          label: "失败",
        },
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    // 搜索
    query() {
      this.$emit("query", this.form);
    },
    // 重置
    reset() {
      this.clearFormData();
      this.$emit("reset", this.form);
    },
    // 清空表单数据
    clearFormData() {
      this.form = {
        module: "",
        name: "",
        type: "",
        status: "",
        beginTime: "",
        endTime: "",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>