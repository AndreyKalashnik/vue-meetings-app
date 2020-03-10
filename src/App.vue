<template>
  <div id="app">
    <Navigation />
    <router-view class="container" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Navigation from "@/components/Navigation.vue";
export default Vue.extend({
  name: "App",
  components: {
    Navigation
  }
})
</script>

<style lang="scss">
$primary: #006666;
@import "node_modules/bootstrap/scss/bootstrap";
</style>
