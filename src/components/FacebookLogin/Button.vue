<template>
  <div>
    <button class="buttonFacebook" @click="facebookAuthentication">
      Login with Facebook</button>
  </div>
</template>
<script>
export default {
  name: "FacebookLoginButton",
  data() {
    return {
      
    }
  },
  methods: {
    async facebookAuthentication() {
      await this.loadFacebookSDK(document, "script", "facebook-jssdk");
      await this.initFacebook();
      var ref = this;
      window.FB.login(function(response) {
        if (response.authResponse) {
          ref.loginWithFacebook(response.authResponse.userID)
        } else {
          alert("User cancelled login or did not fully authorize.");
        }
      },{scope: 'email',
        return_scopes: true
      });
      return false;
    },
    async initFacebook() {
      window.fbAsyncInit = function() {
         window.FB.init({
          appId: "2777562892525389", 
          cookie: true, // This is important, it's not enabled by default
          xfbml: true,
          version: "v13.0"
        });
       // this.loginWithFacebook()
      };
    },
    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    },
    loginWithFacebook (fbID) {
      this.facebookId = fbID
      this.$store.dispatch("loginWithFacebook", {facebookId: this.facebookId}).then(()=>{
        this.$router.push("/layout/dashboard")
        .catch(err=>{
          console.log(err)
        })
      })
    }
  }
};
</script>
<style>
.buttonFacebook{
  color:white;
  min-width: 150px;
  background-color: #3b5998;
  height: 2.5rem;
  border-radius: 1rem;
  font-weight: 400;
  font-size: 0.8rem;
}
</style>