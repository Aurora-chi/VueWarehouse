<template>
  <div class="charge-dialog">
    <el-dialog
      :visible.sync="localVisible"
      width="90%"
      top="20px"
      @close="handleClose"
      append-to-body
    >
      <div slot="title" class="custom-title">配置收费标准</div>
      <div>
        <charge-form v-if="localVisible" :data="data" ref="chargeFormRef" />
      </div>
      <span slot="footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 导入收费表单组件
import chargeForm from "@/components/form/charge-form/index.vue";
export default {
  name: "chargeDialog",
  data() {
    return {
      // 打印数据，调试用，方便查看
      data: [],
    };
  },
  components: { chargeForm },
  props: {
    // 接收父组件传来的 visible 值
    visible: {
      type: Boolean,
      default: false,
    },
    rawData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    // 用计算属性实现局部双向绑定
    localVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      },
    },
  },
  mounted() {
    this.getRawData();
  },
  methods: {
    // 获取原始数据并保存在data中
    getRawData() {
      this.data = JSON.parse(JSON.stringify(this.rawData));
    },
    // 关闭Dialog窗口
    handleClose() {
      this.$emit("closeChargeDialog");
    },
    // Dialog取消按钮 方法
    cancelDialog() {
      this.$message.warning("用户已取消");
      this.handleClose();
    },
    // Dialog保存按钮 方法
    saveDialog() {
      if (this.$refs.chargeFormRef) {
        try {
          const formData = this.$refs.chargeFormRef.formData;

          // 使用 for...of 循环替代 forEach
          for (const [index, data] of formData.entries()) {
            if (data.amount) {
              if (!this.isValidNumber(data.amount)) {
                this.$message.error({
                  message: "保存失败:" + data.second + "的收费标准填写不规范",
                  duration: 5000,
                });
                return;
              }
            } else {
              formData[index].amount = "0";
            }

            if (data.compAmount) {
              if (!this.isValidNumber(data.compAmount)) {
                this.$message.error({
                  message: "保存失败:" + data.second + "的综检金额填写不规范",
                  duration: 5000,
                });
                return;
              }
            }
          }
          this.data = formData;
          this.$message.success("保存成功");
          this.$emit("organizeData", this.data);
          this.handleClose();
        } catch (e) {
          this.$message.error("保存失败");
          console.error("保存失败：", e);
        }
      }
    },

    // 检查金额是否是纯数字，如果为小数是否是保留两位小数
    isValidNumber(str) {
      const pattern = /^(?:[1-9]\d*|0|[1-9]\d*\.\d{1,2}|0\.\d{1,2})$/;
      // 返回bool类型
      return pattern.test(str);
    },
  },
};
</script>

<style lang="scss">
.custom-title {
  color: #005ac4;
  font-size: 20px;
}
.el-dialog__header {
  padding: 10px 20px;
  border-bottom: 1px solid #ececec;
}
.el-dialog__body {
  padding: 20px;
  color: #000;
  max-height: 80vh; /* 限制最大高度 */
  overflow-y: auto; /* 超出滚动 */
  border-bottom: 1px solid #ececec;
}
.el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
  font-size: 16px;
  color: #000;
}
.charge-dialog {
  .el-dialog {
    margin: 20px auto;
    min-width: 1050px;
    .el-dialog__footer {
      padding: 10px 20px;
    }
  }
}
</style>