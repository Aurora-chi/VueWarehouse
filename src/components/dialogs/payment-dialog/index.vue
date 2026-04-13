<template>
  <div class="payment-dialog">
    <el-dialog
      :visible.sync="localVisible"
      width="50%"
      top="10vh"
      @close="handleClose"
    >
      <charge-dialog
        :visible.sync="chargeDialogVisible"
        @closeChargeDialog="closeChargeDialog"
        @organizeData="organizeData"
        :rawData="data"
      />
      <div slot="title" class="custom-title">
        {{ carInfor.licensePlate }}-收费确认
        <span v-if="carInfor.examineType.length === 3">
          （三检合一
          <span v-if="carInfor.examineType.isFree">有减免</span>
          ）
        </span>
        <span v-if="carInfor.examineType.length === 2">
          （{{ carInfor.examineType[0] }}+{{ carInfor.examineType[1] }}
          <span v-if="carInfor.isFree"> 有减免</span>
          ）
        </span>
        <div v-if="carInfor.examineType.length === 1">
          （{{ carInfor.examineType[0] }}
          <div v-if="carInfor.examineType.isFree">有减免</div>
          ）
        </div>
      </div>
      <div class="body-dialog">
        <payment-form
          v-if="localVisible"
          :data="organiData"
          ref="paymentFormRef"
          @carInfor="sumbitCarInfor"
        />
      </div>
      <div slot="footer" class="foot-dialog">
        <div v-if="carInfor.threeAmount !== '0'">
          <div class="check-amount">
            <div>安检+环检金额</div>
            <div class="amount">¥ {{ carInfor.threeAmount }}</div>
          </div>
        </div>
        <div v-if="carInfor.safetyAmount !== '0'">
          <div class="check-amount">
            <div>安检金额</div>
            <div class="amount">¥ {{ carInfor.safetyAmount }}</div>
          </div>
        </div>
        <div v-if="carInfor.environmentalAmount !== '0'">
          <div class="check-amount">
            <div>环检金额</div>
            <div class="amount">¥ {{ carInfor.environmentalAmount }}</div>
          </div>
        </div>
        <div v-if="carInfor.compAmount !== '0'">
          <div class="check-amount">
            <div>综检金额</div>
            <div class="amount">¥ {{ carInfor.compAmount }}</div>
          </div>
        </div>

        <div v-if="carInfor.isFree" class="reduction-amount">
          <div>
            减免费用
            <span class="remark"
              >（此车辆为 2026-3-10
              仅退办车辆，在同一检测周期内，本次安检无需收费）</span
            >
          </div>
          <div class="reduction">- 减 {{ carInfor.safetyAmount }}</div>
        </div>
        <div class="ultimately-amount">
          <div>
            <div>
              <el-tooltip
                class="item"
                effect="dark"
                content="查看收费标准"
                placement="top"
              >
                <img
                  @mouseenter="hover = true"
                  @mouseleave="hover = false"
                  :src="hover ? hoverImage : normalImage"
                  style="position: relative; top: 2px; cursor: pointer"
                  @click="openChargeDialog"
                />
              </el-tooltip>

              需支付金额（元）
            </div>
            <div style="margin-top: 10px; color: #ff6a00">
              <span style="font-size: 20px">¥</span>
              <span
                style="
                  font-size: 28px;
                  font-family: DIN Black;
                  font-weight: 600;
                "
              >
                {{ finalAmount }}</span
              >
            </div>
          </div>
          <div style="display: flex; padding: 20px 10px">
            <el-button
              icon="el-icon-upload"
              style="font-size: 16px; border-radius: 10px"
              @click="submit"
              >提交登记</el-button
            >
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import normalImage from "@/assets/images/login/attention.svg";
import hoverImage from "@/assets/images/login/attention-hover.svg";
import paymentForm from "@/components/form/payment-form/index.vue";
import chargeDialog from "@/components/dialogs/charge-dialog/index.vue";
export default {
  name: "paymentDialog",
  components: { paymentForm, chargeDialog },
  data() {
    return {
      normalImage,
      hoverImage,
      hover: false,
      chargeDialogVisible: false,
      chargeData: [],
      finalAmount: "0.00",
      carInfor: {
        licensePlate: "", // 车牌
        model: "", // 车辆型号
        codeName: "", // 识别代号
        serialNumber: "", // 流水号
        carType: "", // 车辆类别
        oilType: "", // 燃油类别
        examineType: [], // 检验类别
        isFree: false, // 是否有减免
        safetyAmount: "0", // 此车的安检金额
        environmentalAmount: "0", // 此车的环检金额
        compAmount: "0", // 此车的综检金额
        threeAmount: "0", // 三检合一金额
      },
      organiData: {
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
          first: "中型",
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
  mounted() {
    this.organize(this.data);
  },
  methods: {
    // 提交车辆信息
    sumbitCarInfor(val) {
      this.carInfor = Object.assign({}, this.carInfor, val);
      this.calculateFinalAmount(this.carInfor);
    },
    // 计算最终金额
    calculateFinalAmount(val) {
      if (val.examineType.length === 3) {
        if (val.isFree) {
          this.finalAmount = parseFloat(val.compAmount).toFixed(2);
          return;
        }
        this.finalAmount = (
          parseFloat(val.threeAmount) + parseFloat(val.compAmount)
        ).toFixed(2);
      } else if (val.examineType.length === 2) {
        if (val.isFree) {
          if (!val.examineType.includes("综检")) {
            this.finalAmount = parseFloat(val.environmentalAmount).toFixed(2);
            return;
          } else if (!val.examineType.includes("环检")) {
            this.finalAmount = parseFloat(val.compAmount).toFixed(2);
            return;
          } else {
            this.finalAmount = (
              parseFloat(val.compAmount) + parseFloat(val.environmentalAmount)
            ).toFixed(2);
            return;
          }
        } else {
          if (!val.examineType.includes("综检")) {
            this.finalAmount = (
              parseFloat(val.environmentalAmount) + parseFloat(val.safetyAmount)
            ).toFixed(2);
            return;
          } else if (!val.examineType.includes("环检")) {
            this.finalAmount = (
              parseFloat(val.compAmount) + parseFloat(val.safetyAmount)
            ).toFixed(2);
            return;
          } else {
            this.finalAmount = (
              parseFloat(val.compAmount) + parseFloat(val.environmentalAmount)
            ).toFixed(2);
            return;
          }
        }
      } else if (val.examineType.length === 1) {
        if (val.isFree) {
          if (val.examineType.includes("综检")) {
            this.finalAmount = parseFloat(val.compAmount).toFixed(2);
            return;
          } else if (val.examineType.includes("环检")) {
            this.finalAmount = parseFloat(val.environmentalAmount).toFixed(2);
            return;
          } else {
            return;
          }
        } else {
          if (val.examineType.includes("综检")) {
            this.finalAmount = parseFloat(val.compAmount).toFixed(2);
            return;
          } else if (val.examineType.includes("环检")) {
            this.finalAmount = parseFloat(val.environmentalAmount).toFixed(2);
            return;
          } else {
            this.finalAmount = parseFloat(val.safetyAmount).toFixed(2);
            return;
          }
        }
      }
    },
    // 整理list数据方便print时查看
    organize(data) {
      this.organiData = {
        securityCheck: {
          small: [],
          medium: [],
          large: [],
          special: [],
        },
        environmentCheck: [],
        threeCheck: [],
        other: [],
      };
      data.forEach((data) => {
        if (data.first === "小型") {
          this.organiData.securityCheck.small.push(data);
        } else if (data.first === "中型") {
          this.organiData.securityCheck.medium.push(data);
        } else if (data.first === "大型") {
          this.organiData.securityCheck.large.push(data);
        } else if (data.first === "特种车辆") {
          this.organiData.securityCheck.special.push(data);
        } else if (data.first === "环检") {
          this.organiData.environmentCheck.push(data);
        } else if (data.first === "三检合一") {
          this.organiData.threeCheck.push(data);
        } else if (data.first === "过户") {
          this.organiData.other.push(data);
        }
      });
    },
    // 保存整理后的数据
    organizeData(val) {
      this.organize(val);
    },
    // 关闭payment-dialog回调函数
    handleClose() {
      this.$emit("closePaymentDialog");
      this.$emit("update:visible", false);
    },
    // 打开charge表单
    openChargeDialog() {
      this.chargeDialogVisible = true;
    },
    //关闭charge表单
    closeChargeDialog() {
      this.chargeDialogVisible = false;
    },
    // 提交登记按钮
    submit() {
      console.log("需支付金额：", this.finalAmount);
    },
  },
};
</script>

<style lang="scss">
.payment-dialog {
  .el-dialog {
    .el-dialog__body {
      padding-bottom: 0;
    }
    .el-dialog__footer {
      padding: 10px 20px;
      text-align: left;
    }
  }
}
.foot-dialog {
  font-size: 14px;
  color: #707f8d;

  .check-amount {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }
  .reduction-amount {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .remark {
      color: #0064c8;
    }
  }
  .ultimately-amount {
    display: flex;
    justify-content: space-between;
    .el-button {
      background-color: #ff6900;
      color: #fff;
    }
  }
  .amount {
    color: #ff6a00;
  }
  .reduction {
    color: #0064c8;
  }
}
</style>