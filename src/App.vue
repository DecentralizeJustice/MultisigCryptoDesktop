<template>
  <v-app  xs12 dark v-bind:style="styleObject" class='fullbackground'>
    <router-view/>
  </v-app>

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
