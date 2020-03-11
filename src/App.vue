<template>
  <div id="app">
    <Navigation />
    <router-view class="container" v-bind:user="user"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
import Firebase from "firebase"
import Navigation from "@/components/Navigation.vue";

export default Vue.extend({
  name: "App",
  components: {
    Navigation
  },
  data: function() {
    return {
      user: null
    }
  },
  mounted: function(){
    Firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.user = user.email
      }
    })
  },
})
</script>

<style lang="scss">
$primary: #006666;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
