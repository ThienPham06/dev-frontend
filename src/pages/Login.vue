<template>
  <div class="content" >
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <login-form data-background-color="green"> </login-form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from "../pages/Login/LoginForm";
// import fb from '../components/FacebookLogin/Button'
export default {
  components: {
    LoginForm
  },
};
</script>
