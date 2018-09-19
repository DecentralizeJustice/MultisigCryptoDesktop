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
