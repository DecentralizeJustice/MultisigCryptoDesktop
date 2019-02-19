<template>
<div>
  <v-flex sm12 >

        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline text-xs-center" >Web Menmonic Setup</h3>
          </div>
        </v-card-title>
      <v-divider light/>

    <v-card-text class="headline font-weight-bold text-xs-center elevation-0">

    </v-card-text>

    <v-flex xs12 mb-3>
      <v-layout align-center justify-space-around row>
        <v-btn round :large='true' color='success' v-on:click="done"
        ><h3>Done</h3></v-btn>
      </v-layout>
    </v-flex>
  </v-flex>
</div>
</template>

<script>
import { createWebWordlist } from '@/assets/menmonic/createWebWordlist.js'
import { convertStringToObject } from '@/assets/menmonic/convertStringToObject.js'
export default {
  name: 'recordWebMen',
  components: {
  },
  data () {
    return {
      webWord: {}
    }
  },
  methods: {
    done () {
      // this.$emit('passedTests', { passedMetalCheck: true })
    }
  },
  mounted: function () {
    const webWordString = createWebWordlist()
    let test = convertStringToObject(webWordString)
    console.log(test)
  }
}
</script>

<style scoped>
</style>
