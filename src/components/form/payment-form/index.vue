<template>
  <div class="payment-form-content">
    <!-- 车辆信息 -->
    <div class="car-detailed">
      <div class="car-number-type">
        <div class="car-number">
          <div class="number">{{ carInfor.licensePlate }}</div>
        </div>
        <div class="car-type">{{ carInfor.model }}</div>
      </div>
      <div class="car-code-serial">
        <span class="car-code">
          车辆识别代号：
          <span class="code">{{ carInfor.codeName }}</span>
        </span>
        <span class="car-serial">
          检验流水号：
          <span class="serial">{{ carInfor.serialNumber }}</span>
        </span>
      </div>
    </div>
    <!-- 车辆类别 -->
    <div class="div">
      <span class="blue-label"></span>
      <span class="label">车辆类别</span>
      <div v-if="carInfor.model === '小型汽车'" class="car-category">
        <el-radio
          v-model="carInfor.carType"
          v-for="(item, index) in data.securityCheck.small"
          :key="item.code"
          :label="String(index + 1)"
          border
        >
          {{ item.second }}
        </el-radio>
      </div>
      <div v-if="carInfor.model === '中型汽车'" class="car-category">
        <el-radio
          v-model="carInfor.carType"
          v-for="(item, index) in data.securityCheck.medium"
          :key="item.code"
          :label="String(index + 1)"
          border
        >
          {{ item.second }}
        </el-radio>
      </div>
      <div v-if="carInfor.model === '大型汽车'" class="car-category">
        <el-radio
          v-model="carInfor.carType"
          v-for="(item, index) in data.securityCheck.large"
          :key="item.code"
          :label="String(index + 1)"
          border
        >
          {{ item.second }}
        </el-radio>
      </div>
      <div v-if="carInfor.model === '特种车辆'" class="car-category">
        <el-radio
          v-model="carInfor.carType"
          v-for="(item, index) in data.securityCheck.special"
          :key="item.code"
          :label="String(index + 1)"
          border
        >
          {{ item.second }}
        </el-radio>
      </div>
    </div>
    <!-- 燃油类别 -->
    <div class="div">
      <span class="span-blue-label"><span class="blue-label"></span></span>
      <span class="label">燃油类别</span>
      <div class="oil-category">
        <el-radio v-model="carInfor.oilType" label="1" border> 汽油</el-radio>
        <el-radio v-model="carInfor.oilType" label="2" border>柴油</el-radio>
      </div>
    </div>
    <div class="div">
      <span class="blue-label"></span>
      <span class="label">检验类别</span>
      <div class="examine-category">
        <el-checkbox-group v-model="carInfor.examineType">
          <el-checkbox label="安检" border disabled></el-checkbox>
          <el-checkbox label="环检" border disabled></el-checkbox>
          <el-checkbox label="综检" border disabled></el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaymentForm",
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      testCar: [
        // 0
        {
          licensePlate: "粤C12345",
          model: "中型汽车",
          codeName: "DJ21156699DSA1DA2",
          serialNumber: "4307021524082000006",
          carType: "2",
          oilType: "2",
          examineType: ["安检", "环检"],
          isFree: true,
        },
        // 1
        {
          licensePlate: "粤C67890",
          model: "小型汽车",
          codeName: "DJ28857799DSA1DA2",
          serialNumber: "4307021524082000066",
          carType: "2",
          oilType: "1",
          examineType: ["安检", "环检"],
          isFree: false,
        },
        // 2
        {
          licensePlate: "粤C25836",
          model: "小型汽车",
          codeName: "DJ28258369DSA1DA2",
          serialNumber: "4307025836482000066",
          carType: "2",
          oilType: "1",
          examineType: ["安检"],
          isFree: true,
        },
        // 3
        {
          licensePlate: "粤C77546",
          model: "大型汽车",
          codeName: "DJ28877546DSA1DA2",
          serialNumber: "4307021524082015366",
          carType: "3",
          oilType: "2",
          examineType: ["安检", "环检", "综检"],
          isFree: false,
        },
        // 4
        {
          licensePlate: "粤C75547",
          model: "大型汽车",
          codeName: "DJ28145686DSA1DA2",
          serialNumber: "4307022586982015366",
          carType: "2",
          oilType: "2",
          examineType: ["环检"],
          isFree: true,
        },
        // 5
        {
          licensePlate: "粤C25012",
          model: "特种车辆",
          codeName: "DJ28250046DSA1DA2",
          serialNumber: "4307021512345015366",
          carType: "5",
          oilType: "2",
          examineType: ["安检", "环检"],
          isFree: false,
        },
      ],
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
    };
  },
  watch: {
    carInfor: {
      handler(newVal) {
        this.onCarInforChange(newVal);
      },
      deep: true, // 深度监听，监听对象内部所有属性的变化
      immediate: false, // 是否立即执行，如果需要在初始化时执行一次，设为 true
    },
  },
  created() {
    this.test();
  },
  methods: {
    test() {
      this.carInfor = this.testCar[5];
    },
    onCarInforChange(newVal) {
      if (newVal.model === "小型汽车") {
        this.totalAmount(newVal, "small");
      } else if (newVal.model === "中型汽车") {
        this.totalAmount(newVal, "medium");
      } else if (newVal.model === "大型汽车") {
        this.totalAmount(newVal, "large");
      } else if (newVal.model === "特种车辆") {
        this.totalAmount(newVal, "special");
      }
      this.$emit("carInfor", this.carInfor);
    },
    // 统计金额
    totalAmount(newVal, model) {
      // 获取车辆类别
      const carTypeIndex = this.carInfor.carType;
      // 获取燃油类别
      const oilTypeIndex = this.carInfor.oilType;
      // 三检
      if (newVal.examineType.length === 3) {
        if (model === "small") {
          // 安检金额
          this.carInfor.safetyAmount =
            this.data.securityCheck.small[parseInt(carTypeIndex) - 1].amount;
          // 综检金额
          this.carInfor.compAmount =
            this.data.securityCheck.small[
              parseInt(carTypeIndex) - 1
            ].compAmount;
          // 环检金额
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
        } else if (model === "medium") {
          if (carTypeIndex == "2") {
            this.carInfor.threeAmount = this.data.threeCheck[2].amount;
            this.carInfor.compAmount = this.data.threeCheck[2].compAmount;
          } else {
            this.carInfor.threeAmount = this.data.threeCheck[0].amount;
            this.carInfor.compAmount = this.data.threeCheck[0].compAmount;
          }
        } else if (model === "large") {
          if (carTypeIndex == "2") {
            this.carInfor.threeAmount = this.data.threeCheck[3].amount;
            this.carInfor.compAmount = this.data.threeCheck[3].compAmount;
          } else {
            this.carInfor.threeAmount = this.data.threeCheck[0].amount;
            this.carInfor.compAmount = this.data.threeCheck[0].compAmount;
          }
        } else if (model === "special") {
          if (carTypeIndex == "1") {
            this.carInfor.threeAmount = this.data.threeCheck[1].amount;
            this.carInfor.compAmount = this.data.threeCheck[1].compAmount;
          } else if (carTypeIndex == "6") {
            this.carInfor.threeAmount = this.data.threeCheck[0].amount;
            this.carInfor.compAmount = this.data.threeCheck[0].compAmount;
          } else {
            // 安检金额
            this.carInfor.safetyAmount =
              this.data.securityCheck.special[
                parseInt(carTypeIndex) - 1
              ].amount;
            // 综检金额
            this.carInfor.compAmount =
              this.data.securityCheck.special[
                parseInt(carTypeIndex) - 1
              ].compAmount;
            // 环检金额
            this.carInfor.environmentalAmount =
              this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
          }
        }
      }
      // 双检
      else if (
        newVal.examineType.length === 2 &&
        !newVal.examineType.includes("综检")
      ) {
        // 不含综检
        if (model === "small") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.small[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
        } else if (model === "medium") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.medium[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
        } else if (model === "large") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.large[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
        } else {
          this.carInfor.safetyAmount =
            this.data.securityCheck.special[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
        }
      } else if (
        newVal.examineType.length === 2 &&
        !newVal.examineType.includes("环检")
      ) {
        // 不含环检
        if (model === "small") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.small[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.small[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else if (model === "medium") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.medium[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.medium[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else if (model === "large") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.large[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.large[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else {
          this.carInfor.safetyAmount =
            this.data.securityCheck.special[parseInt(carTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.special[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        }
      } else if (
        newVal.examineType.length === 2 &&
        !newVal.examineType.includes("安检")
      ) {
        // 不含安检
        if (model === "small") {
          // 环检金额
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.small[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else if (model === "medium") {
          // 环检金额
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.medium[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else if (model === "large") {
          // 环检金额
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.large[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else {
          // 环检金额
          this.carInfor.environmentalAmount =
            this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
          this.carInfor.compAmount =
            this.data.securityCheck.special[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        }
      }
      // 单检
      else if (
        newVal.examineType.length === 1 &&
        newVal.examineType.includes("安检")
      ) {
        if (model === "small") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.small[parseInt(carTypeIndex) - 1].amount;
        } else if (model === "medium") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.medium[parseInt(carTypeIndex) - 1].amount;
        } else if (model === "large") {
          this.carInfor.safetyAmount =
            this.data.securityCheck.large[parseInt(carTypeIndex) - 1].amount;
        } else {
          this.carInfor.safetyAmount =
            this.data.securityCheck.special[parseInt(carTypeIndex) - 1].amount;
        }
      } else if (
        newVal.examineType.length === 1 &&
        newVal.examineType.includes("环检")
      ) {
        this.carInfor.environmentalAmount =
          this.data.environmentCheck[parseInt(oilTypeIndex) - 1].amount;
      } else {
        if (model === "small") {
          this.carInfor.compAmount =
            this.data.securityCheck.small[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else if (model === "medium") {
          this.carInfor.compAmount =
            this.data.securityCheck.medium[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else if (model === "large") {
          this.carInfor.compAmount =
            this.data.securityCheck.large[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        } else {
          this.carInfor.compAmount =
            this.data.securityCheck.special[
              parseInt(carTypeIndex) - 1
            ].compAmount;
        }
      }
    },
  },
};
</script>

<style lang="scss">
.payment-form-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  .car-detailed {
    padding: 10px;
    width: 100%;
    background-color: #f5f5f7;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .blue-label {
    border: 2px solid #0870d8;
    border-radius: 25%;
    margin-right: 5px;
    display: inline-block;
    width: 0;
    height: 12px;
  }
  .label {
    font-size: 16px;
    font-family: YaHei;
    font-weight: 500;
  }
  .div {
    margin-bottom: 20px;
  }
}
.car-number-type {
  display: flex;
}
.car-code-serial {
  margin-top: 2px;
  padding: 5px;
  display: flex;
  .car-code {
    flex: 1;
    color: #555555;
    display: inline-block;
    .code {
      color: #000;
    }
  }
  .car-serial {
    flex: 1;
    color: #555555;
    display: inline-block;
    .serial {
      color: #000;
    }
  }
}
.car-number {
  background-color: #fff;
  padding: 1px;
  margin: 5px;
  border-radius: 4px;
  border: 1px solid #0045a6;
  .number {
    padding: 5px 10px;
    background-color: #0045a6;
    font-size: 16px;
    font-family: SimHei;
    color: #fff;
    border-radius: 4px;
  }
}
.car-type {
  display: flex;
  align-items: center;
  padding: 0px 5px 2px 5px;
  margin: 10px 0 5px 5px;
  font-family: YaHei;
  color: #444444;
  background-color: #f7f7f7;
  border: 1px solid #d8dade;
  text-align: center;
}
.payment-form-content {
  .el-radio {
    margin: 10px 20px 0 0;
    padding: 12px 30px;
    &:hover {
      border-color: #409eff;
    }
    .el-radio__inner {
      background: transparent;
      border: none;
      width: 0;
      height: 0;
    }
    .el-radio__label {
      padding: 0;
      color: #555555;
    }
    .el-radio__input.is-checked + .el-radio__label {
      color: #000000;
    }
    .el-radio__input.is-checked + .el-radio__label::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-top: 25px solid#1779DB; /* 蓝色三角形 */
      border-right: 25px solid transparent;
      border-radius: 3px 0 0 0;
    }
    .el-radio__input.is-checked + .el-radio__label::after {
      content: "✓";
      position: absolute;
      top: 2px;
      left: 4px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
    }
  }
  .el-radio.is-bordered + .el-radio.is-bordered {
    margin: 10px 20px 0 0;
  }
  .el-radio.is-bordered.is-checked {
    background-color: #f6fafd;
  }
  // 复选框
  .el-checkbox {
    margin: 10px 20px 0 0;
    padding: 12px 30px;
    .el-checkbox__inner {
      background: transparent;
      border: none;
      width: 0;
      height: 0;
    }
    .el-checkbox__label {
      padding: 0;
      color: #555555;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label {
      color: #000000;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 0;
      height: 0;
      border-top: 25px solid#1779DB; /* 蓝色三角形 */
      border-right: 25px solid transparent;
      border-radius: 3px 0 0 0;
    }
    .el-checkbox__input.is-checked + .el-checkbox__label::after {
      content: "✓";
      position: absolute;
      top: -1px;
      left: 4px;
      color: white;
      font-size: 12px;
      font-weight: bold;
      z-index: 1;
    }
    .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after {
      border-color: transparent;
    }
  }

  .el-checkbox.is-bordered + .el-checkbox.is-bordered {
    margin: 10px 20px 0 0;
  }
  .el-checkbox.is-bordered.is-checked {
    background-color: #f6fafd !important;
    border: 1px solid #409eff !important;
  }
  .el-checkbox.is-bordered.is-disabled {
    background-color: #f5f5f7;
    border: 1px solid #e3e4e6;
  }
  .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #777777;
  }
}
</style>
