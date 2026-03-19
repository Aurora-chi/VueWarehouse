<template>
  <div class="chargeDialog">
    <el-dialog :visible.sync="localVisible" width="70%" @close="handleClose">
      <div slot="title" class="custom-title">配置收费标准</div>
      <div>
        <charge-form v-if="localVisible" :data="data" ref="chargeFormRef" />
      </div>
      <span slot="footer" class="footerBtn">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="saveDialog">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import chargeForm from "@/components/form/chargeForm/index.vue";
export default {
  name: "chargeDialog",
  data() {
    return {
      printData: {
        securityCheck: {
          small: [],
          medium: [],
          large: [],
          special: [],
        },

        environmentCheck: [],
        threeCheck: [],
        other: [],
      },

      data: [
        // 安检 - 小型
        {
          code: "S_01",
          first: "小型",
          second: "小型轿车",
          remark: "不含面包车",
          amount: "350",
          compAmount: "",
        },
        {
          code: "S_02",
          first: "小型",
          second: "面包车",
          remark: "",
          amount: "400",
          compAmount: "",
        },
        {
          code: "S_03",
          first: "小型",
          second: "小型货车",
          remark: "行驶证上总质量3.5吨以下(不含3.5吨)",
          amount: "400",
          compAmount: "200",
        },
        {
          code: "S_04",
          first: "小型",
          second: "小型营运车辆",
          remark: "行驶证上为：营运性质，出租客运，教练车，网约车，租赁，专用",
          amount: "400",
          compAmount: "200",
        },
        {
          code: "S_05",
          first: "小型",
          second: "小型(非营运)车辆",
          remark: "",
          amount: "250",
          compAmount: "",
        },
        {
          code: "S_06",
          first: "小型",
          second: "中型电动车(货车、客车)",
          remark: "",
          amount: "350",
          compAmount: "",
        },
        // 安检 - 中型
        {
          code: "S_07",
          first: "中型",
          second: "中型客车、中型校车",
          remark: "10座-19座以内(含19座)",
          amount: "450",
          compAmount: "450",
        },
        {
          code: "S_08",
          first: "中型",
          second: "中型货车、专项作业车",
          remark: "行驶证上总质量3.5吨(含3.5吨)至12吨(不含12吨)",
          amount: "450",
          compAmount: "350",
        },
        // 安检 - 大型
        {
          code: "S_09",
          first: "大型",
          second: "大型电动车(货车、客车)",
          remark: "",
          amount: "500",
          compAmount: "",
        },
        {
          code: "S_10",
          first: "大型",
          second: "大客车、大校车",
          remark: "20座以上(含20座)",
          amount: "600",
          compAmount: "450",
        },
        {
          code: "S_11",
          first: "大型",
          second: "重型货车、专项作业车",
          remark: "总质量12吨以上",
          amount: "535",
          compAmount: "350",
        },
        // 安检 - 特种车辆
        {
          code: "S_12",
          first: "特种车辆",
          second: "危险品运输车",
          remark: "所有危货危险品运输车(除挂车)",
          amount: "600",
          compAmount: "500",
        },
        {
          code: "S_13",
          first: "特种车辆",
          second: "危险品运输挂车",
          remark: "",
          amount: "1000",
          compAmount: "",
        },
        {
          code: "S_14",
          first: "特种车辆",
          second: "路试车",
          remark: "",
          amount: "1000",
          compAmount: "",
        },
        {
          code: "S_15",
          first: "特种车辆",
          second: "挂车",
          remark: "所有挂车",
          amount: "880",
          compAmount: "",
        },
        {
          code: "S_16",
          first: "特种车辆",
          second: "沙罐车",
          remark: "",
          amount: "600",
          compAmount: "450",
        },
        {
          code: "S_17",
          first: "特种车辆",
          second: "重型自卸货车",
          remark: "25吨以上(含25吨)",
          amount: "550",
          compAmount: "450",
        },
        // 环检
        {
          code: "E_01",
          first: "环检",
          second: "汽油车",
          remark: "",
          amount: "200",
          compAmount: "",
        },
        {
          code: "E_02",
          first: "环检",
          second: "柴油车",
          remark: "",
          amount: "250",
          compAmount: "",
        },
        // 三检合一
        {
          code: "A_01",
          first: "三检合一",
          second: "货车",
          remark: "",
          amount: "600",
          compAmount: "300",
        },
        {
          code: "A_02",
          first: "三检合一",
          second: "危货车危险品运输车",
          remark: "",
          amount: "800",
          compAmount: "400",
        },
        {
          code: "A_03",
          first: "三检合一",
          second: "客车19座以下",
          remark: "含19座",
          amount: "500",
          compAmount: "250",
        },
        {
          code: "A_04",
          first: "三检合一",
          second: "客车19座以上",
          remark: "",
          amount: "600",
          compAmount: "300",
        },
        // 其他
        {
          code: "O_01",
          first: "过户",
          second: "小型货车4.5吨以下",
          remark: "不含4.5吨",
          amount: "300",
          compAmount: "",
        },
        {
          code: "O_02",
          first: "过户",
          second: "5吨以上大中型货车",
          remark: "含4.5吨以上",
          amount: "600",
          compAmount: "",
        },
      ],
    };
  },
  components: { chargeForm },
  props: {
    // 接收父组件传来的 visible 值
    visible: {
      type: Boolean,
      default: false,
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
  methods: {
    handleClose() {
      this.$emit("close-chargeDialog");
      this.$emit("update:visible", false);
    },
    cancelDialog() {
      this.$message.warning("用户已取消");
      this.handleClose();
    },
    saveDialog() {
      if (this.$refs.chargeFormRef) {
        try {
          const formData = this.$refs.chargeFormRef.formData;
          this.data = formData;
          this.organize();
          console.log("保存数据:", this.printData);
          this.$message.success("保存成功");
        } catch (e) {
          this.$message.error("保存失败");
          console.error("保存失败：", e);
        }
      }
      this.handleClose();
    },
    // 整理数据方便查看
    organize() {
      this.data.forEach((data) => {
        if (data.first === "小型") {
          this.printData.securityCheck.small.push(data);
        } else if (data.first === "中型") {
          this.printData.securityCheck.medium.push(data);
        } else if (data.first === "大型") {
          this.printData.securityCheck.large.push(data);
        } else if (data.first === "特种车辆") {
          this.printData.securityCheck.special.push(data);
        } else if (data.first === "环检") {
          this.printData.environmentCheck.push(data);
        } else if (data.first === "三检合一") {
          this.printData.threeCheck.push(data);
        } else if (data.first === "过户") {
          this.printData.other.push(data);
        }
      });
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
  border-bottom: 1px solid #ececec;
}
.el-dialog__body {
  padding: 20px;
  color: #000;
}
.el-descriptions :not(.is-bordered) .el-descriptions-item__cell {
  font-size: 16px;
  color: #000;
}
.chargeDialog {
  .el-dialog {
    .el-dialog__footer {
      padding-top: 0px;
    }
  }
}
</style>