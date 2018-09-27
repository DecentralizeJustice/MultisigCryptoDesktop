<template>
<v-content>
   <v-container  fluid fill-height>
      <v-layout>
        <v-flex xs12 fluid>
          <v-card flat >
            <v-img
              src="/setup.jpeg"
              aspect-ratio="3"
            ></v-img>

            <div v-if="isThereAChoice ()">
            <v-card-title primary-title class="justify-center" >
              <div>
                <h3 class="headline pb-3" >Number of Phone Devices:</h3>
              </div>
            </v-card-title>
            <v-container grid-list-md text-xs-center>
              <v-layout row wrap align-center justify-space-around>
                <v-flex v-for="nums in correctNumberofButtons" v-bind:key="nums" xs2>
                  <v-btn large flat round color='secondary' @click.native="choose(nums)">
                    <h3 class="headline" >{{nums}}</h3>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </div>

          <div v-if="!(isThereAChoice ())" layout  class="text-xs-center">
          <v-card-title primary-title class="justify-center" >
            <div>
              <h3 class="headline pb-3" >{{getCorrectString}}</h3>
            </div>
          </v-card-title>
          <v-btn color="info" @click.native="choose(phonenum)" large
            class="justify-center">Continue</v-btn>
          </div>

          </v-card>
        </v-flex>
      </v-layout>
   </v-container>
</v-content>
</template>

<script>
export default {
  name: 'ThePhoneNumber',
  props: ['choiceArray'],
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    },
    isThereAChoice () {
      //3 hardware
      if (this.choiceArray[0]===3) {
        this.phonenum=0
        return false
      }
      //3 laptops
      if (this.choiceArray[1]===3 ) {
        this.phonenum=0
        return false
      }
      //No other devices
      if (this.choiceArray[0]===0 && this.choiceArray[1]===0) {
        this.phonenum=3
        return false
      }
      return true
    },
  },
  computed: {
    correctNumberofButtons: function () {
      //0 hardware
      if (this.choiceArray[0]===0){return [0,1,2,3]}
      //1 hardware & 1 labtop
      if (this.choiceArray[0]===1&&this.choiceArray[1]===1){return [1,2,3]}
      //2 hardware
      if (this.choiceArray[1]===2){return [0,1]}
      //2 laptops
      if (this.choiceArray[0]===2){return [0,1]}
      //1 hardware and 1 laptop
      if (this.choiceArray[0]===1&&this.choiceArray[1]===1){return [1,2]}
      else { return [1,2,3]}
    },
    getCorrectString: function(){
      if(this.phonenum===3){
        return this.require3
      }
      else {
        return this.nophones
      }
    }
  },
  data: function () {
    return {
      phonenum: 0,
      require3: 'Your plan requires the use of 3 phones.',
      nophones: 'Your plan does not allow for the use of phones.',
      }
    }

}
</script>

<style scoped>

</style>
