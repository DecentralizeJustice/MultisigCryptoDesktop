<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat>
            <v-img
              src="plan.jpg"
              aspect-ratio="5"

            ></v-img>

            <v-card-title primary-title class="justify-center" >
              <div>
                <h1 class=" pb-3" >Confirm Final Plan</h1>
              </div>
            </v-card-title>
            <v-flex xs5>
              <v-card>
                <v-toolbar color="black" >
                  <v-toolbar-title>Labtop 1</v-toolbar-title>
                </v-toolbar>
                  <v-img
                    src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                    aspect-ratio="2.75"
                  ></v-img>



                  <v-card-actions>
                    <v-btn flat color="orange">Share</v-btn>
                    <v-btn flat color="orange">Explore</v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              </v-card>
            </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'FinalPlan',
  props: ['choiceArray'],
  methods: {
    choose (option) {
      this.$emit('pickOption',option)
    }
  },


}
</script>

<style scoped>

</style>
