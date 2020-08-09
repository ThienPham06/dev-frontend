<template>
  <div class="content" >
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <register-form data-background-color="green"> </register-form>
      </div>
    </div>
  </div>
</template>

<script>
import RegisterForm from "../pages/Login/RegisterForm";

export default {
  components: {
    RegisterForm,
  },
};
</script>