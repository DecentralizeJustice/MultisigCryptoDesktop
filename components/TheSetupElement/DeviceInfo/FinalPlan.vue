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
                <h1 >Confirm Final Plan</h1>
              </div>
            </v-card-title>
            <v-flex xs4>
              <v-card>
                <v-toolbar color="black" >
                  <v-layout row wrap align-center>
                    <v-flex class="text-xs-center">
                      <v-toolbar-title>Laptop 1</v-toolbar-title>
                    </v-flex>
                  </v-layout>
                </v-toolbar>


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
    },
    show (){
      alert(this.choiceArray)
    }
  },
  data: function () {
    return {
      items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me 2' }
    ]
      }
    }


}
</script>

<style scoped>

</style>
