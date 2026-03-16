<template>
  <div class="content">
    <el-row class="login-bg">
      <el-col :span="12" class="bg-left"></el-col>
      <el-col :span="12" class="bg-right"></el-col>
    </el-row>
    <el-row class="login-main">
      <el-col :span="12" class="login-main-left">
        <div class="round-area">
          <div class="round-center">
            <img src="../../assets/images/login/login-image.svg" />
          </div>
        </div>
        <div class="logo-area">
          <img src="../../assets/images/login/login-text.svg" />
        </div>
      </el-col>
      <el-col :span="12" class="login-main-right">
        <div class="layadmin-user-login-header">
          <h3 class="text-center title">欢迎使用</h3>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
          >
            <el-form-item>
              <label>账号</label>
              <el-input
                v-model="loginForm.loginName"
                type="text"
                auto-complete="off"
                placeholder="验证码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <label>密码</label>
              <el-input
                v-model="loginForm.password"
                type="password"
                auto-complete="off"
                placeholder="验证码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <div><label>验证码</label></div>
              <el-input
                v-model="loginForm.captcha"
                type="text"
                auto-complete="off"
                placeholder="验证码"
                style="width: 63%"
                @keyup.enter.native="handleLogin"
              ></el-input>
              <div class="login-code">
                <img :src="codeUrl" @click="getCode" class="login-code-img" />
              </div>
            </el-form-item>
            <el-form-item style="width: 100%">
              <el-button
                class="login-button"
                style="width: 100%"
                :loading="loading"
                @click.native.prevent="handleLogin"
              >
                <span v-if="!loading">登 录</span>
                <span v-else>登 录 中...</span>
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getCodeImg, getKeyData } from "@/api/login";
import Cookies from "js-cookie";
export default {
  name: "Userlogin",
  data() {
    return {
      codeUrl: "",
      deviceId: "",
      uuid: "",
      publicKey: "",
      loginForm: {
        loginName: "",
        password: "",
        captcha: "",
      },
      loginRules: {
        loginName: [
          { required: true, trigger: "blur", message: "请输入您的账号" },
        ],
        password: [
          { required: true, trigger: "blur", message: "请输入您的密码" },
        ],
        captcha: [{ required: true, trigger: "blur", message: "请输入验证码" }],
      },
      loading: false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  async created() {
    const token = Cookies.get("Admin-Token");
    if (token) {
      this.$router.push("/main");
    } else {
      await this.getCode();
    }
  },
  methods: {
    // 获取公钥和验证码图片
    async getCode() {
      try {
        const codeRes = await getCodeImg();
        this.codeUrl = "data:image/gif;base64," + codeRes.data.img;
        this.deviceId = codeRes.data.deviceId;
        const keyRes = await getKeyData();
        this.uuid = keyRes.data.uuid;
        this.publicKey = keyRes.data.publicKey;
      } catch (error) {
        console.error("获取验证码失败：", error);
      }
    },

    // 登入
    handleLogin() {
      this.$refs.loginForm.validate(async (valid) => {
        if (valid) {
          this.loading = true;
          const user = {
            loginName: this.loginForm.loginName,
            password: this.loginForm.password,
            captcha: this.loginForm.captcha,
            deviceId: this.deviceId,
            uuid: this.uuid,
          };
          try {
            await this.$store.dispatch("Login", user);
            await this.$router.push({ path: this.redirect || "/main" });
          } catch (e) {
            this.loginForm.captcha = "";
            await this.getCode();
          } finally {
            this.loading = false;
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100%;
  min-width: 1600px;
}
.login-bg {
  width: 100%;
  height: 100%;
  min-width: 1600px;
  position: absolute;
  top: 0;
  left: 0;
  .bg-left {
    height: 100%;
    background: #ececec;
  }
  .bg-right {
    height: 100%;
    background: url("../../assets/images/login/bg-right.svg") no-repeat;
  }
}
.login-main {
  box-sizing: border-box;
  height: 100%;
  padding: 0 15%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-main-left {
    position: relative;
    height: 0;
    padding-bottom: 45%;
    width: 45%;
    border-radius: 20px 0px 0px 20px;
    background: #f65b23;

    .round-area {
      padding-top: 10%;
      .round-center {
        width: 50%;
        margin: 0 auto;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .logo-area {
      width: 100%;
      text-align: center;
      img {
        width: 35%;
        margin: 6% 0 4%;
      }
    }
  }
  .login-main-right {
    position: relative;
    height: 0;
    padding-bottom: 45%;
    width: 45%;
    background: #ffffff;
    border-radius: 0px 20px 20px 0px;

    .title {
      font-size: 30px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      margin-top: 8%;
      text-align: center;
    }
  }
}
.login-form {
  width: 60%;
  margin-left: 20%;
  label {
    font-size: 20px;
  }

  .login-button {
    height: 48px;
    background: #f65b23;
    border-radius: 8px;
    font-size: 22px;
    color: #ffffff;
    border: none;
  }

  .login-code {
    width: 33%;
    height: 38px;
    float: right;

    img {
      cursor: pointer;
      vertical-align: middle;
      height: 38px;
      width: 100%;
    }
  }
}
</style>
<style>
.el-input input {
  background: #fffaf9;
  border-radius: 8px;
  border: 1px solid #f75924;
}
</style>