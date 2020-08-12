<template>
  <div class="md-box" id="md-box">
    <form novalidate class="md-layout" @submit.prevent="register">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Sign-up</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="user-name">Email</label>
                <md-input
                  name="email"
                  id="email"
                  autocomplete="given-name"
                  v-model="form.email"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.email.required"
                  >Email is required!</span
                >
                <span class="md-error" v-else-if="!$v.form.email.minlength"
                  >Invalid email!</span
                >
              </md-field>
            </div>
          </div>

          <md-field :class="getValidationClass('userName')">
            <label for="user-name">Username</label>
            <md-input
              name="user-name"
              id="user-name"
              autocomplete="given-name"
              v-model="form.userName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.userName.required"
              >Username is required!</span
            >
        
            <span class="md-error" v-else-if="!$v.form.userName.minlength"
              >Invalid Username!</span
            >
          </md-field>

          <md-field :class="getValidationClass('fullName')">
            <label for="user-name">Fullname</label>
            <md-input
              name="full-name"
              id="full-name"
              autocomplete="given-name"
              v-model="form.fullName"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.fullName.required"
              >Fullname is required!</span
            >
            <span class="md-error" v-else-if="!$v.form.fullName.minlength"
              >Invalid Fullname!</span
            >
          </md-field>

          <md-field :class="getValidationClass('passWord')">
            <label for="pass-word">Password</label>
            <md-input
              type="password"
              name="pass-word"
              id="pass-word"
              v-model="form.passWord"
        
            />
            <span class="md-error" v-if="!$v.form.passWord.required"
              >Password is required!</span
            >
            <span class="md-error" v-else-if="!$v.form.passWord.minlength"
              >Invalid Password!</span
            >
          </md-field>

          <md-field :class="getValidationClass('rePassword')">
            <label for="repass-word">Re-enter Password</label>
            <md-input
              type="password"
              name="repass-word"
              id="repass-word"
              v-model="form.rePassword"
         
            />
            <span class="md-error" v-if="!$v.form.rePassword.required"
              >Re-enter password is required!</span
            >
            <span
              class="md-error"
              v-else-if="!$v.form.rePassword.sameAsPassword"
              >Passwords must match!</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary"
            >Sign up</md-button
          >
        </md-card-actions>

        <router-link to="/">Or login with your account</router-link>

      </md-card>
      <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  password,
  minLength,
  maxLength,
  sameAs,
} from "vuelidate/lib/validators";

export default {
  name: "RegisterForm",
  mixins: [validationMixin],
  data: () => ({
    form: {
      userName: null,
      email: null,
      passWord: null,
      rePassword: null,
      fullName: null
    },      
    isAdmin: null,
    sending: false,
    isSigned: false
  }),
  validations: {
    form: {
      email: {
        required,
        email,
      },
      userName: {
        required,
        minlength: minLength(6)
      },
      fullName: {
        required,
        minlength: minLength(10)
      },
      passWord: {
        required,
        minlength: minLength(6),
      },
      rePassword: {
        required,
        sameAsPassword: sameAs("passWord"),
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.userName = null;
      this.form.passWord = null;
      this.form.rePassword = null;
      this.form.fullName = null;
      this.form.email = null;
    },
    register() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        let data = {
          username: this.form.userName,
          fullname: this.form.fullName,
          email: this.form.email,
          password: this.form.passWord,
          isadmin: this.isAdmin
        };
        this.$store.dispatch('register', data)
          .then(() => {
            //this.$router.push('/')
            this.isSigned = !this.isSigned
            this.$emit('signedSuccess', this.isSigned)
          })
          .catch(err => console.log(err))
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
.md-card {
  position: fixed;
  top: 40%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-40%, -50%);
  height: 75%;
}
</style>
