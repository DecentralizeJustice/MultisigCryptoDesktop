<template>
  <v-app  xs12 dark v-bind:style="styleObject" class='fullbackground'>
    <router-view/>
  </v-app>
  <!-- <v-img
:src="require('../assets/logo.png')"
class="my-3"
contain
height="200"
></v-img> -->
</template>
<script>
export default {
  data () {
    return {
      styleObject: {
        'background-image': 'url(/stars.jpg)'
      }
    }
  }
}
</script>

<style scoped>
.fullbackground {
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
}
</style>
