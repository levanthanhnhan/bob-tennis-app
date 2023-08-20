<template>
  <div>
    <button @click="login" className="btn btn-primary" id="sign-in-button">Login</button>
  </div>
</template>

<script>
import { auth } from "../../firebase/firebase";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
// window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
//https://firebase.google.com/docs/auth/web/phone-auth?hl=en&authuser=0&_gl=1*13uqcsh*_ga*OTg5NTYxMzg1LjE2NjQ3MjIxMjA.*_ga_CW55HF8NVT*MTY5MjUzOTUwNy40LjEuMTY5MjU0MzcxNy4wLjAuMA..#integration-testing

export default {
  name: "FirebaseAuthentication",
  methods: {
    generateRecaptcha() {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      });
    },
    login() {
      this.generateRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, "+84906444231", appVerifier)
        .then((confirmationResult) => {
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          // ...
        })
        .catch((error) => {
          console.log(error);
          // Error; SMS not sent
          // ...
        });
    },
  },
  mounted() {},
};
</script>
