<template>
  <v-layout align-center >
    <v-flex xs12 sm10 offset-sm1>
      <v-card>
        <v-img
         src='https://cdn-images-1.medium.com/max/1600/1*51Kjfq6fe0mFTd8P8_Bz_A.jpeg'
         aspect-ratio="5"
       ></v-img>

       <v-layout align-center >
       <v-flex xs12 sm10 offset-sm1>
       <v-flex class="text-xs-center" ma-2>
         <h3 class="headline" >Metal Memnonic:</h3>
         <h4><slot name="metal"></slot></h4>
       </v-flex>
       <v-flex class="text-xs-center"ma-2>
         <h3 class="headline" >Web Memnonic:</h3>
         <h4><slot name="web"></slot></h4>
       </v-flex>
       </v-flex>
       </v-layout>

        <v-flex xs12 pb-2>
          <v-layout align-center justify-space-around row>
            <v-btn flat color="success" v-on:click="submit">Confirm</v-btn>
          </v-layout>
      </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  name: 'Confirm',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {

  },
  watch: {
  },
  methods: {
    submit () {
      this.$emit('confirm')
    }
  }

}
</script>

<style scoped>

</style>
