<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="login">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
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
            </div>
          </div>

          <md-field :class="getValidationClass('passWord')">
            <label for="pass-word">Password</label>
            <md-input
              type="password"
              name="pass-word"
              id="pass-word"
              v-model="form.passWord"
              :disabled="sending"
            />
            <span class="md-error" v-if="!$v.form.passWord.required"
              >Password is required!</span
            >
            <span class="md-error" v-else-if="!$v.form.passWord.minlength"
              >Invalid Password!</span
            >
          </md-field>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Login</md-button
          >
        </md-card-actions>
        <router-link to="/register">Or sign up a new account...</router-link>
      </md-card>
      <!-- <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar> -->
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  password,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  mixins: [validationMixin],
  data () {
    return {
      form: {
        userName: '',
        passWord: '',
      },
      logged: false,
      sending: false
    }
  },
  validations: {
    form: {
      userName: {
        required,
        minlength: minLength(5),
      },
      passWord: {
        required,
        minlength: minLength(6),
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
    },
    login: function() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        let x = this.form.userName;
        let y = this.form.passWord;

        this.$store.dispatch('login', {username:x, password: y})
          .then(() => this.$router.push('/layout'))
          .catch(err => {
            console.log(err)
        })
      }
    }
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
  top: 50%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
</style>
