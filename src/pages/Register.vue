<template>
  <div class="content" >
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <register-form :isSigned="isSigned" @signedSuccess="isSigned = $event" data-background-color="green"> </register-form>
        <sign-up-success v-bind:active="isSigned" />
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../pages/Login/RegisterForm";
import SignUpSuccess from '../components/NotificationPlugin/SignUpSuccess'

export default {
  components: {
    RegisterForm,
    SignUpSuccess
  },
  data(){
    return {
      isSigned: false
    }
  }
};
</script>