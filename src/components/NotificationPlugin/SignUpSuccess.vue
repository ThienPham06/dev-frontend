<template>
    <md-dialog
      :md-active.sync="this.active"
      >
        <md-dialog-title>Sign up successfully! Now login to get started :)</md-dialog-title>
        <md-dialog-actions>
            <md-button class="md-primary" @click="redirectToLogin">Go to login...</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<script>
export default {
    name: "SignUpSuccess",
    props: ['active'],
    methods: {
        redirectToLogin(){
            this.$router.push("/")
        }
    }
}
</script>