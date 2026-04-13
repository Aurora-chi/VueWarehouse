<template>
  <div class="log-dialog-form">
    <el-form label-width="100px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="操作模块：">
            <div class="form-content">{{ logDialogData.module }}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="操作名称：">
            <div class="form-content">{{ logDialogData.name }}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="操作类型：">
            <div class="form-content">{{ logDialogData.type }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="操作用户：">
            <div class="form-content">{{ logDialogData.userName }}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="用户IP：">
            <div class="form-content">{{ logDialogData.userIp }}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="浏览器类型：">
            <div class="form-content">{{ logDialogData.browserType }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="系统类型：">
            <div class="form-content">{{ logDialogData.systemType }}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="运行时长：">
            <div class="form-content">{{ logDialogData.duration }}</div>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :lx="8">
          <el-form-item label="操作时间：">
            <div class="form-content">{{ logDialogData.startTime }}</div>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item label="请求方法：">
            <div class="form-content">{{ logDialogData.reqMethod }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="请求参数：">
            <div class="form-content">{{ logDialogData.reqArgs }}</div>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="响应参数：">
            <div class="form-content">{{ logDialogData.respArgs }}</div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "logDialogForm",
  props: {
    logDialogData: {
      type: Object,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.log-dialog-form {
  padding: 10px;
}
.form-content {
  margin-left: 10px;
}
</style>