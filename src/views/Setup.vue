<template>
  <v-app   xs12 dark v-bind:style="styleObject" class='fullbackground'>
    <v-container justify-center fill-height fluid>
      <v-layout row wrap align-center>
        <UsageKey fill-height/>
      </v-layout>

    </v-container>
  </v-app>
</template>

<script>
// @ is an alias to /src

import UsageKey from '@/components/Setup/UsageKey.vue'
export default {
  name: 'setup',
  components: {
    UsageKey
  },
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
