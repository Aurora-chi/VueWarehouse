<template>
  <div class="navigation-dialog-form">
    <el-row :gutter="20">
      <el-form label-width="120px" :model="form" :rules="rules" ref="form">
        <el-col :span="24">
          <el-form-item label="上级导航：" prop="parentId">
            <el-cascader
              v-model="form.parentId"
              :options="treeData"
              :props="{
                value: 'id',
                label: 'navName',
                children: 'children',
                checkStrictly: true,
                emitPath: false,
              }"
              clearable
              filterable
              style="width: 100%"
              @change="handleChange"
            />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="导航名称：" prop="navName">
            <el-input v-model="form.navName" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="请求地址：">
            <el-input v-model="form.path" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="显示排序：">
            <el-input-number
              v-model="form.sort"
              controls-position="right"
              style="width: 100%"
              :min="0"
            />
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="12"
          v-if="!form.parentId || form.parentId === 0"
        >
          <el-form-item label="模块标识：" prop="code">
            <el-input v-model="form.code" />
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="是否首页：" prop="isHome">
            <el-radio label="1" v-model="form.isHome"> 是</el-radio>
            <el-radio label="0" v-model="form.isHome"> 否</el-radio>
          </el-form-item>
        </el-col>
        <el-col
          :xs="24"
          :sm="24"
          :md="24"
          :lg="12"
          :xl="12"
          v-if="!form.parentId || form.parentId === 0"
        >
          <el-form-item label="是否首页显示：" prop="isHomeDisplay">
            <el-radio label="1" v-model="form.isHomeDisplay"> 是</el-radio>
            <el-radio label="0" v-model="form.isHomeDisplay"> 否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="是否外链：" prop="isFrame">
            <el-radio label="1" v-model="form.isFrame"> 是</el-radio>
            <el-radio label="0" v-model="form.isFrame"> 否</el-radio>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
          <el-form-item label="是否显示：" prop="isDisplay">
            <el-radio label="1" v-model="form.isDisplay"> 是</el-radio>
            <el-radio label="0" v-model="form.isDisplay"> 否</el-radio>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
  </div>
</template>

<script>
import { getUrl } from "@/utils/set-url";
import axios from "axios";
export default {
  name: "navigationDialogForm",
  data() {
    return {
      url: "",
      headers: {},
      treeData: [],
      form: {
        parentId: "",
        navName: "",
        sort: undefined,
        path: "",
        isHome: "",
        isFrame: "",
        isDisplay: "",
        isHomeDisplay: "",
        code: "",
        id: "",
        createTime: "",
      },
      rules: {
        parentId: [{ required: true, message: "请输入", trigger: "blur" }],
        navName: [{ required: true, message: "请输入", trigger: "blur" }],
        isHome: [{ required: true, message: "请输入", trigger: "change" }],
        isFrame: [{ required: true, message: "请输入", trigger: "change" }],
        isDisplay: [{ required: true, message: "请输入", trigger: "change" }],
        isHomeDisplay: [
          { required: true, message: "请输入", trigger: "change" },
        ],
        code: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  async created() {
    this.setUrl();
    await this.getTreeData();
  },
  methods: {
    handleChange(val) {
      this.form.parentId = val;
    },
    setUrl() {
      this.url = getUrl();
      this.headers = { Authorization: "Bearer " + this.$store.getters.token };
    },
    async getTreeData() {
      const httpUrl =
        "http://" + this.url + "/web/navigation/getNavigationTree";
      const res = await axios.post(httpUrl, {}, this.headers);
      const val = [
        {
          id: 0,
          navName: "主目录",
          children: res.data.data,
        },
      ];
      this.treeData = val;
    },
    getFormData() {
      return this.form;
    },
    setFormData(data) {
      this.form = data;
      this.form.isHome = String(data.isHome);
      this.form.isFrame = String(data.isFrame);
      this.form.isDisplay = String(data.isDisplay);
      this.form.isHomeDisplay = String(data.isHomeDisplay);
    },
    setParentId(id) {
      this.form.parentId = id;
    },
    clearFormData() {
      this.form = {
        parentId: "",
        navName: "",
        sort: undefined,
        path: "",
        isHome: "",
        isFrame: "",
        isDisplay: "",
        isHomeDisplay: "",
        code: "",
        id: "",
        createTime: "",
      };
      this.$refs.form.clearValidate();
    },
    async validate() {
      try {
        await this.$refs.form.validate();
        return true;
      } catch (e) {
        return false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>