<template>
  <div class="chargeForm">
    <el-row :gutter="10" class="header-row">
      <el-col :span="3">检测车辆</el-col>
      <el-col :span="6"> 类别</el-col>
      <el-col :span="2"> 收费标准</el-col>
      <el-col :span="2"> 综检</el-col>
      <el-col :span="11"> 备注</el-col>
    </el-row>
    <!-- 安检 -->
    <el-row :gutter="10">
      <el-col :span="3">
        <div class="jccl">
          <!-- 安检：占左侧的一半宽度，高度自适应 -->
          <div class="left">
            <div class="detection" style="flex: 1">安检</div>
          </div>

          <!-- 车型列表：占左侧的一半宽度 -->
          <div class="right">
            <div class="type x">小型</div>
            <div class="type z">中型</div>
            <div class="type d">大型</div>
            <div class="type t" style="margin-bottom: 0px">特种车辆</div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <!-- 小型车 -->
        <div>
          <div class="label-input">小型轿车</div>
          <div class="label-input">面包车</div>
          <div class="label-input">小型货车</div>
          <div class="label-input">小型营运车辆</div>
          <div class="label-input">小型（非营运）车辆</div>
        </div>
        <!-- 中型车 -->
        <div>
          <div class="label-input">中型电动车(货车、客车)</div>
          <div class="label-input">中型客车、中型校车</div>
          <div class="label-input">中型货车、专项作业车</div>
        </div>
        <!-- 大型车 -->
        <div>
          <div class="label-input">大型电动车(货车、客车)</div>
          <div class="label-input">大型客车、大型校车</div>
          <div class="label-input">重型货车、专项作业车</div>
        </div>
        <!-- 特种车辆 -->
        <div>
          <div class="label-input">危险品运输车</div>
          <div class="label-input">危险品运输挂车</div>
          <div class="label-input">路试车</div>
          <div class="label-input">挂车</div>
          <div class="label-input">沙罐车</div>
          <div class="label-input">重型自卸货车</div>
        </div>
      </el-col>
      <!-- 收费标准 -->
      <el-col :span="2">
        <el-form :model="sfbz.aj" :rules="rules" ref="ruleForm" class="sfbz">
          <!-- 小型车收费标准 -->
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.xx.xxjc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.xx.mbc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.xx.xxhc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.xx.xxyycl">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.xx.xxfyycl">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
          <!-- 中型收费标准 -->
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.zx.zxddc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.zx.zxkczxxc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.zx.zxhczyzyc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
          <!-- 大型收费标准 -->
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.dx.dxddc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.dx.dxkcdxxc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.dx.zxhczyzyc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
          <!-- 特种车辆收费标准 -->
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.tzcl.wxpysc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.tzcl.wxpysgc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.tzcl.lsc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.tzcl.gc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.tzcl.sgc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.aj.tzcl.zxzxhc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 综检 -->
      <el-col :span="2">
        <el-form :model="zj.aj" :rules="zjRules" ref="ruleForm" class="sfbz">
          <!-- 小型车综检 -->
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.xx.xxjc"
                :class="zj.aj.xx.xxjc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.xx.xxjc ? false : true"
              >
                <template v-if="zj.aj.xx.xxjc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.xx.mbc"
                :class="zj.aj.xx.mbc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.xx.mbc ? false : true"
              >
                <template v-if="zj.aj.xx.mbc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.xx.xxhc"
                :class="zj.aj.xx.xxhc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.xx.xxhc ? false : true"
              >
                <template v-if="zj.aj.xx.xxhc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.xx.xxyycl"
                :class="zj.aj.xx.xxyycl ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.xx.xxyycl ? false : true"
              >
                <template v-if="zj.aj.xx.xxyycl ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.xx.xxfyycl"
                :class="zj.aj.xx.xxfyycl ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.xx.xxfyycl ? false : true"
              >
                <template v-if="zj.aj.xx.xxfyycl ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
          <!-- 中型综检 -->
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.zx.zxddc"
                :class="zj.aj.zx.zxddc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.zx.zxddc ? false : true"
              >
                <template v-if="zj.aj.zx.zxddc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.zx.zxkczxxc"
                :class="zj.aj.zx.zxkczxxc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.zx.zxkczxxc ? false : true"
              >
                <template v-if="zj.aj.zx.zxkczxxc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.zx.zxhczyzyc"
                :class="zj.aj.zx.zxhczyzyc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.zx.zxhczyzyc ? false : true"
              >
                <template
                  v-if="zj.aj.zx.zxhczyzyc ? true : false"
                  slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
          <!-- 大型综检 -->
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.dx.dxddc"
                :class="zj.aj.dx.dxddc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.dx.dxddc ? false : true"
              >
                <template v-if="zj.aj.dx.dxddc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.dx.dxkcdxxc"
                :class="zj.aj.dx.dxkcdxxc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.dx.dxkcdxxc ? false : true"
              >
                <template v-if="zj.aj.dx.dxkcdxxc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.dx.zxhczyzyc"
                :class="zj.aj.dx.zxhczyzyc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.dx.zxhczyzyc ? false : true"
              >
                <template
                  v-if="zj.aj.dx.zxhczyzyc ? true : false"
                  slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
          <!-- 特种车辆综检 -->
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.tzcl.wxpysc"
                :class="zj.aj.tzcl.wxpysc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.tzcl.wxpysc ? false : true"
              >
                <template v-if="zj.aj.tzcl.wxpysc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.tzcl.wxpysgc"
                :class="zj.aj.tzcl.wxpysgc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.tzcl.wxpysgc ? false : true"
              >
                <template
                  v-if="zj.aj.tzcl.wxpysgc ? true : false"
                  slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.tzcl.lsc"
                :class="zj.aj.tzcl.lsc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.tzcl.lsc ? false : true"
              >
                <template v-if="zj.aj.tzcl.lsc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.tzcl.gc"
                :class="zj.aj.tzcl.gc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.tzcl.gc ? false : true"
              >
                <template v-if="zj.aj.tzcl.gc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.tzcl.sgc"
                :class="zj.aj.tzcl.sgc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.tzcl.sgc ? false : true"
              >
                <template v-if="zj.aj.tzcl.sgc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.aj.tzcl.zxzxhc"
                :class="zj.aj.tzcl.zxzxhc ? 'notDisabled' : 'disabled'"
                :disabled="zj.aj.tzcl.zxzxhc ? false : true"
              >
                <template v-if="zj.aj.tzcl.zxzxhc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 安检备注 -->
      <el-col :span="11">
        <!-- 小型车 -->
        <div>
          <div class="label-input">不含面包车</div>
          <div class="label-input"></div>
          <div class="label-input">行驶证上总质量3.5吨以下（不含3.5吨）</div>
          <div class="label-input">
            行驶证上为：营运性质，出租客运，教练车，网约车，租赁，专用
          </div>
          <div class="label-input"></div>
        </div>
        <!-- 中型车 -->
        <div>
          <div class="label-input"></div>
          <div class="label-input">10座-19座以内(含19座)</div>
          <div class="label-input">
            行驶证上总质量3.5吨(含3.5吨)至12吨(不含12吨)
          </div>
        </div>
        <!-- 大型车 -->
        <div>
          <div class="label-input"></div>
          <div class="label-input">20座以上 (含20座)</div>
          <div class="label-input">总质量12吨以上</div>
        </div>
        <!-- 特种车辆 -->
        <div>
          <div class="label-input">所有危货危险品运输车(除挂车)</div>
          <div class="label-input"></div>
          <div class="label-input"></div>
          <div class="label-input">所有挂车</div>
          <div class="label-input"></div>
          <div class="label-input">25吨以上(含25吨)</div>
        </div>
      </el-col>
    </el-row>
    <!-- 单环检 -->
    <el-row :gutter="10">
      <el-col :span="3"><div class="detection dhj">单环检</div></el-col>
      <el-col :span="6">
        <div>
          <div class="label-input">汽油车</div>
          <div class="label-input">柴油车</div>
        </div>
      </el-col>
      <!-- 单环检收费标准 -->
      <el-col :span="2">
        <el-form :model="sfbz.dhj" :rules="rules" ref="ruleForm" class="sfbz">
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.dhj.qyc" class="dhjInputStyle">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.dhj.cyc" class="dhjInputStyle">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 单环检综检 -->
      <el-col :span="2">
        <el-form :model="zj.dhj" :rules="zjRules" ref="ruleForm" class="sfbz">
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.dhj.qyc"
                :class="zj.dhj.qyc ? 'notDisabled' : 'disabled'"
                :disabled="zj.dhj.qyc ? false : true"
              >
                <template v-if="zj.dhj.qyc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.dhj.cyc"
                :class="zj.dhj.cyc ? 'notDisabled' : 'disabled'"
                :disabled="zj.dhj.cyc ? false : true"
              >
                <template v-if="zj.dhj.cyc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 单环检备注 -->
      <el-col :span="11">
        <div>
          <div class="label-input"></div>
          <div class="label-input">20座以上(含20座)</div>
        </div>
      </el-col>
    </el-row>
    <!-- 三检合一 -->
    <el-row :gutter="10">
      <el-col :span="3"><div class="detection sjhy">三检合一</div></el-col>
      <el-col :span="6">
        <div>
          <div class="label-input">货车</div>
          <div class="label-input">危险车危险品运输车</div>
          <div class="label-input">客车19座以下</div>
          <div class="label-input">客车19座以上</div>
        </div>
      </el-col>
      <!-- 三检合一收费标准 -->
      <el-col :span="2">
        <el-form :model="sfbz.sjhy" :rules="rules" ref="ruleForm" class="sfbz">
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.sjhy.hc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.sjhy.wxcwxpysc">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.sjhy.kc19zyx">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.sjhy.kc19zys">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 三检合一综检 -->
      <el-col :span="2">
        <el-form :model="zj.sjhy" :rules="zjRules" ref="ruleForm" class="sfbz">
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.sjhy.hc"
                :class="zj.sjhy.hc ? 'notDisabled' : 'disabled'"
                :disabled="zj.sjhy.hc ? false : true"
              >
                <template v-if="zj.sjhy.hc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.sjhy.wxcwxpysc"
                :class="zj.sjhy.wxcwxpysc ? 'notDisabled' : 'disabled'"
                :disabled="zj.sjhy.wxcwxpysc ? false : true"
              >
                <template v-if="zj.sjhy.wxcwxpysc ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.sjhy.kc19zyx"
                :class="zj.sjhy.kc19zyx ? 'notDisabled' : 'disabled'"
                :disabled="zj.sjhy.kc19zyx ? false : true"
              >
                <template v-if="zj.sjhy.kc19zyx ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.sjhy.kc19zys"
                :class="zj.sjhy.kc19zys ? 'notDisabled' : 'disabled'"
                :disabled="zj.sjhy.kc19zys ? false : true"
              >
                <template v-if="zj.sjhy.kc19zys ? true : false" slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="11">
        <div>
          <div class="label-input"></div>
          <div class="label-input"></div>
          <div class="label-input">含19座</div>
          <div class="label-input"></div>
        </div>
      </el-col>
    </el-row>
    <!-- 过户、外廓办变更 -->
    <el-row :gutter="10">
      <el-col :span="3"
        ><div class="detection dhj">过户、外廓办变更</div></el-col
      >
      <el-col :span="6">
        <div>
          <div class="label-input">小型货车4.5吨一下</div>
          <div class="label-input">5吨以上大中型货车</div>
        </div>
      </el-col>
      <!-- 过户、外廓办变更收费标准 -->
      <el-col :span="2">
        <el-form
          :model="sfbz.ghwkbbg"
          :rules="rules"
          ref="ruleForm"
          class="sfbz"
        >
          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.ghwkbbg.xxhc45dyx">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input v-model="sfbz.ghwkbbg.dzxhc5dys">
                <template slot="prepend">¥</template>
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 过户、外廓办变更综检 -->
      <el-col :span="2">
        <el-form
          :model="zj.ghwkbbg"
          :rules="zjRules"
          ref="ruleForm"
          class="sfbz"
        >
          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.ghwkbbg.xxhc45dyx"
                :class="zj.ghwkbbg.xxhc45dyx ? 'notDisabled' : 'disabled'"
                :disabled="zj.ghwkbbg.xxhc45dyx ? false : true"
              >
                <template
                  v-if="zj.ghwkbbg.xxhc45dyx ? true : false"
                  slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>

          <el-form-item>
            <div class="input">
              <el-input
                v-model="zj.ghwkbbg.dzxhc5dys"
                :class="zj.ghwkbbg.dzxhc5dys ? 'notDisabled' : 'disabled'"
                :disabled="zj.ghwkbbg.dzxhc5dys ? false : true"
              >
                <template
                  v-if="zj.ghwkbbg.dzxhc5dys ? true : false"
                  slot="prepend"
                  >¥</template
                >
              </el-input>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
      <!-- 过户、外廓办变更 -->
      <el-col :span="11">
        <div>
          <div class="label-input">不含4.5吨</div>
          <div class="label-input">含4.5吨以上</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "chargeForm",
  props: {
    lastSave: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      sfbz: {
        aj: {
          xx: {
            xxjc: "350",
            mbc: "400",
            xxhc: "400",
            xxyycl: "400",
            xxfyycl: "250",
          },
          zx: {
            zxddc: "350",
            zxkczxxc: "450",
            zxhczyzyc: "450",
          },
          dx: {
            dxddc: "500",
            dxkcdxxc: "600",
            zxhczyzyc: "535",
          },
          tzcl: {
            wxpysc: "600",
            wxpysgc: "1000",
            lsc: "1000",
            gc: "880",
            sgc: "600",
            zxzxhc: "550",
          },
        },
        dhj: {
          qyc: "200",
          cyc: "250",
        },
        sjhy: {
          hc: "850",
          wxcwxpysc: "1100",
          kc19zyx: "785",
          kc19zys: "985",
        },
        ghwkbbg: {
          xxhc45dyx: "300",
          dzxhc5dys: "500",
        },
      },
      zj: {
        aj: {
          xx: {
            xxjc: "",
            mbc: "",
            xxhc: "",
            xxyycl: "200",
            xxfyycl: "",
          },
          zx: {
            zxddc: "",
            zxkczxxc: "450",
            zxhczyzyc: "350",
          },
          dx: {
            dxddc: "",
            dxkcdxxc: "450",
            zxhczyzyc: "350",
          },
          tzcl: {
            wxpysc: "500",
            wxpysgc: "",
            lsc: "",
            gc: "",
            sgc: "450",
            zxzxhc: "450",
          },
        },
        dhj: {
          qyc: "",
          cyc: "",
        },
        sjhy: {
          hc: "",
          wxcwxpysc: "450",
          kc19zyx: "350",
          kc19zys: "350",
        },
        ghwkbbg: {
          xxhc45dyx: "",
          dzxhc5dys: "",
        },
      },
      lastSfbz: {},
      lastZj: {},
      rules: {},
      zjRules: {},
    };
  },
  mounted() {
    this.isSave();
  },
  methods: {
    isSave() {
      console.log("lastSave", this.lastSave);
    },
  },
};
</script>

<style lang="scss">
.el-row {
  margin-bottom: 0px;
}
.header-row {
  font-size: 16px;
  margin-bottom: 10px;
}
.jccl {
  display: flex;
  height: 100%;
  .left {
    flex: 1;
    display: flex;
    margin-right: 5px;
  }
  .right {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5px;
    .x {
      height: 185px;
    }
    .z {
      height: 107px;
    }
    .d {
      height: 107px;
    }
    .t {
      height: 224px;
    }
  }
}
.dhj {
  height: 68px;
}
.sjhy {
  height: 146px;
}
.detection {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5ebf7;
  text-align: center;
  padding: 0px 15px;
}
.type {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f3f7ff;
  padding: 15px 10px;
  margin-bottom: 10px;
  text-align: center;
}
.label-input {
  height: 29px;
  padding: 4px 4px 4px 10px;
  margin-bottom: 10px;
  background-color: #f5f5f7;
  border: 1px solid #ececec;
  color: #555555;
}
.input {
  height: 29px;
  margin-bottom: 10px;
  cursor: pointer;
  .el-input__inner {
    height: 29px;
    color: #ff6900;
    text-align: right;
    border-left: none;
    padding: 0px 10px 0px 0px;
    cursor: pointer;
  }
  .dhjInputStyle {
    .el-input__inner {
      color: #098837;
    }
  }
  .el-input-group__prepend {
    background-color: #fff;
    border-right: none;
    padding: 0px 0px 0px 10px;
  }
  // 使用父级选择器，当 input 聚焦时，改变其父级下的 prepend
  &:focus-within {
    .el-input-group__prepend {
      border-color: #ff8c00 !important;
      border-right-color: #ff8c00 !important;
    }
    .el-input__inner {
      border-color: #ff8c00 !important;
    }
  }
  .disabled {
    .el-input__inner {
      border: 1px solid #ececec;
    }
  }
  .notDisabled {
    .el-input__inner {
      color: #0062c7;
    }
  }
}
.sfbz {
  .el-form-item {
    margin: 0;
    .el-form-item__content {
      line-height: 29px;
    }
  }
}
</style>