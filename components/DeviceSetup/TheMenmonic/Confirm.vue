<template>

      <v-card fluid>


          <v-img
           src='https://cdn-images-1.medium.com/max/1600/1*51Kjfq6fe0mFTd8P8_Bz_A.jpeg'
           aspect-ratio="5"
         ></v-img>


         <v-container grid-list-md text-xs-center  fluid xs12>

         <h1 >Metal Memnonic:</h1>
         <h1><slot name="metal"></slot></h1>


         <h1 >Web Memnonic:</h1>
         <h1><slot name="web"></slot></h1>

            <v-btn flat color="success" v-on:click="submit">Confirm</v-btn>

      </v-container>
      <v-flex  text-xs-center xs1 align-center pb-2>
      <v-layout justify-space-around>
      <v-icon large color='secondary' @click.native="back()">arrow_back</v-icon>
      <v-icon large color='secondary'>help</v-icon>
      </v-layout>
      </v-flex>
        </v-card>
      </v-flex>
      </v-card>

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
    },
    back () {
      this.$emit('back')
    }
  }

}
</script>

<style scoped>

</style>
