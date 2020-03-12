<template>
  <div id="app">
    <Navigation v-bind:user="user" @logout="logout" />
    <router-view
      class="container"
      v-bind:user="user"
      v-bind:meetings="meetings"
      @addMeeting="addMeeting"
      @deleteMeeting="deleteMeeting"
    />
  </div>
</template>

<script lang="ts">
import Firebase from "firebase";
import Navigation from "@/components/Navigation.vue";
import db from "./db";

export default {
  name: "App",
  data: function() {
    return {
      user: null,
      meetings: []
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
    },
    addMeeting: function(payload) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .add({
          name: payload,
          createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    deleteMeeting: function(payload) {
      db.collection("users")
        .doc(this.user.uid)
        .collection("meetings")
        .doc(payload)
        .delete();
    }
  },
  mounted: function() {
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;

        db.collection("users")
          .doc(this.user.uid)
          .collection("meetings")
          .onSnapshot(snapshot => {
            const snapData = [];
            snapshot.forEach(doc => {
              snapData.push({
                id: doc.id,
                name: doc.data().name
              });
            });
            this.meetings = snapData.sort((a, b) =>
              a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1
            );
          });
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
