<template>
  <div id="app">
    <Navigation />
    <router-view class="container" v-bind:user="user" @logout="logout" />
  </div>
</template>

<script lang="ts">
import Firebase from "firebase";
import Navigation from "@/components/Navigation.vue";
import db from "./db"; //eslint-disable-line

export default {
  name: "App",
  data: function() {
    return {
      user: null
    };
  },
  methods: {
    logout: function() {
      Firebase.auth()
        .signOut()
        .then(() => {
          this.user = null;
          this.$router.push("login");
        });
    }
  },
  mounted: function() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user.displayName;
      }
    });
  },
  components: {
    Navigation
  }
};
</script>

<style lang="scss">
$primary: #006666;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
