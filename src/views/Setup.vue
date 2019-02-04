<template>

  <v-container justify-center fill-height fluid>
    <v-layout row wrap align-center>
      <UsageKey v-if="currentComponent == 0" fill-height/>
    </v-layout>
  </v-container>

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
      },
      currentComponent: 0,
      information: {}
    }
  }
}
</script>

<style scoped>

</style>
