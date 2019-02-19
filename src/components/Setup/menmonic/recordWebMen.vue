<template>

  <v-flex xs12 >

        <v-card-title primary-title class="justify-center">
          <div>
            <h3 class="headline text-xs-center" >Web Passphrase Setup</h3>
          </div>
        </v-card-title>
      <v-divider light/>
    <v-card-text class="headline font-weight-bold text-xs-center elevation-0">
      <p>Record Desktop Passphrase</p>
      <v-flex xs7 offset-xs3 >
      <v-layout align-center justify-space-around row wrap  >

        <v-flex v-for="(value, key) in webWordsObject" xs6  :key="key" class="text-sm-left">
          {{ key }}:  {{ value }}
        </v-flex>

      </v-layout>
        </v-flex>
    </v-card-text>

    <div class="text-xs-center">
      <v-btn  round :large='true' color='success' v-on:click="done"
      ><h3>Done</h3></v-btn>
    </div>

  </v-flex>

</template>

<script>
export default {
  name: 'recordWebMen',
  props: ['webWordsObject'],
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    done () {
      this.$emit('done')
    }
  }
}
</script>

<style scoped>
</style>
