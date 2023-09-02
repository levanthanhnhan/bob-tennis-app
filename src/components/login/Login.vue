<template>
  <div class="login-login">
    <div class="form">
      <h3 class="mb-3">Đăng nhập</h3>
      <div class="center mb-2">
        <img
          width="150"
          height="160"
          src="../../assets/img/logo.jpg"
          alt="tennis-ball"
        />
      </div>
      <div class="input-group flex-nowrap">
        <input
          v-if="isVerify"
          v-model="otpCode"
          required
          type="text"
          class="form-control"
          placeholder="Nhập mã OTP"
        />
        <span v-if="!isVerify" class="input-group-text">+84</span>
        <input
          v-if="!isVerify"
          v-model="phoneNumber"
          required
          minlength="10"
          type="tel"
          class="form-control"
          placeholder="Nhập số điện thoại"
        />
      </div>
      <div class="code">
        {{ msgError }}
      </div>
      <div
        @click="resendOTP"
        class="resend-otp"
        v-if="this.msgError == this.messages.OTPNotMatch"
      >
        Gửi lại mã OTP
      </div>
      <div class="form-group">
        <button
          class="btn btn-primary"
          @click="sendOTP"
          id="btnSendOTP"
          v-if="!isVerify"
        >
          Gửi OTP
        </button>
        <button
          class="btn btn-primary"
          @click="verifyOTP"
          id="btnVerifyOTP"
          v-if="isVerify"
        >
          Xác nhận
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { auth } from "../../firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import authService from "../../services/auth.service.js";
import http from "../../common/http.comon";
import strCommon from "../../common/string.common";
import memberService from "../../services/member.service";

export default {
  data() {
    return {
      phoneNumber: null,
      otpCode: null,
      isVerify: false,
      msgError: null,
      messages: {
        phoneEmpty: "Vui lòng nhập SĐT.",
        phoneNotExist: "SĐT không phải là thành viên.",
        OTPNotMatch: "Mã OTP không hợp lệ.",
        OTPEmpty: "Vui lòng nhập mã OTP.",
      },
    };
  },
  methods: {
    generateRecaptcha() {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "btnSendOTP", {
        size: "invisible",
        callback: (response) => {
          onSignInSubmit();
        },
      });
    },
    sendOTP() {
      this.findByPhoneNumber();
    },
    resendOTP() {
      this.otpCode = "";
      this.sendOTP();
    },
    findByPhoneNumber() {
      if (this.phoneNumber == null || this.phoneNumber == "") {
        this.msgError = this.messages.phoneEmpty;
        return false;
      }

      this.msgError = "";
      var phoneNumber = strCommon.getPhoneNumber(this.phoneNumber);

      // Check phoneNumber is exist in db
      authService
        .findByPhoneNumber(phoneNumber)
        .then((result) => {
          // Exist phone number in db
          if (result.data[0].count > 0) {
            this.signInWithPhoneNumber();
          } else {
            this.msgError = this.messages.phoneNotExist;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signInWithPhoneNumber() {
      this.generateRecaptcha();
      var phoneNumber = strCommon.getPhoneNumber(this.phoneNumber);

      // Sign in Firebase
      signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
          this.isVerify = !this.isVerify;
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
          //recaptcha.reset(window.recaptchaWidgetId);
          console.log(error);
        });
    },
    verifyOTP() {
      if (this.otpCode == null || this.otpCode == "") {
        this.msgError = this.messages.OTPEmpty;
        return false;
      }

      this.msgError = "";
      confirmationResult
        .confirm(this.otpCode)
        .then((result) => {
          // Login Success
          // Set Token
          authService.setTokenHeader(result.user.accessToken);

          // Store User Firebase
          this.$store.commit("setUser", result.user);

          // Store User Local
          this.storeUser(strCommon.getPhoneNumber(result.user.phoneNumber));
        })
        .catch((error) => {
          // Bad verification code
          this.msgError = this.messages.OTPNotMatch;
          console.log(error);
        });
    },
    storeUser(phoneNumber) {
      memberService
        .findByPhoneNumber(phoneNumber)
        .then((result) => {
          this.$store.commit("setUserLocal", result.data[0]);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    //this.$router.push("/");
    // var token = this.$store.state.user.accessToken;
    // if (token != null) {
    //   this.$router.push("/");
    // }
  },
};
</script>
<style>
.resend-otp {
  text-decoration: underline;
  color: #858585;
  cursor: pointer;
  font-size: small;
}

.code {
  font-size: 0.875em;
  color: #d63384;
  word-wrap: break-word;
}

.login-login {
  padding: 80px 0;
}

.login-login .form {
  text-align: center;
  max-width: 320px;
  width: 90%;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 40px;
  border-radius: 4px;
  color: #505e6c;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
}

.login-login .center {
  text-align: center;
  padding: 0 0 20px;
  font-size: 100px;
}

.login-login .form .btn-primary {
  width: 100%;
  border-radius: 4px;
  padding: 11px;
  margin-top: 26px;
}
</style>
