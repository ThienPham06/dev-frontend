<template>
  <md-card class="md-card-profile">
    <div class="md-card-avatar">
      <img alt="User Image" class="img" :src="cardUserImage" />
    </div>

    <md-card-content>
      <h6 class="category text-gray">CEO</h6>
      <h4 class="card-title">{{ this.currentUser }}</h4>
      <p class="card-description">
        Don't be scared of the truth because we need to restart the human
        foundation in truth And I love you like Kanye loves Kanye I love Rick
        Owens’ bed design but the back is...
      </p>
      <md-button class="md-round md-success">Follow</md-button>
    </md-card-content>
  </md-card>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  name: "user-card",
  props: {
    cardUserImage: {
      type: String,
      default: require("@/assets/img/faces/marc.jpg")
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'loggedUser'
    })
  },
  data() {
    return {
      
    };
  }
};
</script>
