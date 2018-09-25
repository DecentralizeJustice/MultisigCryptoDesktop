<template>
<div>
  <v-layout xs12  wrap justify-space-around row fill-height>

  <v-flex xs12 sm3 v-for="(item,index) in this.laptops" :key="index">
    <v-card color="white">
      <v-toolbar color="black" >
        <v-layout row wrap align-center>
          <v-flex headline class="text-xs-center " >
          {{getOrdinal (index[3])}}  Laptop
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-card-title>
         <div>
           <h3 style="color: black;">Number of Hardware Wallets:</h3>
         </div>
       </v-card-title>
       <v-layout row wrap class="text-xs-center" mb-5>
         <v-flex>
           <v-btn large  round v-for="n in item.length+1" :key="n"
           :color=getButtonStatus(n,sumHardwareWallets(item))
            @click.native="testchoice(n,index)">
             <h3 class="headline" >{{n-1}}</h3>
           </v-btn>
         </v-flex>
       </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 sm3 pb-5 v-for="index in this.choiceArray[2]" :key="index">
      <v-card  >
         <v-toolbar>
           <v-layout row wrap align-center>
             <v-flex headline class="text-xs-center">
               Cellphone {{index}}
             </v-flex>
           </v-layout>
         </v-toolbar>
         <v-img src="/cell.jpg" aspect-ratio="1.6"></v-img>
      </v-card>
    </v-flex>

  </v-layout>
</div>
</template>

<script>
export default {
  name: 'LaptopAndHardware',
  props: ['choiceArray'],
  methods: {
    choose (option) {
      this.$emit('pickOption',option)
    },
    sumHardwareWallets (labtop) {
      let numofTrues=0
      for (let i = 0; i < labtop.length; i++) {
        if(labtop[i]===true){++numofTrues}
      }
      return numofTrues
    },
    getButtonStatus (num,correctNum) {
      num= num-1
      if(num===correctNum){return 'success'}
      else {
        return '0'
      }
    },

    getOrdinal (num) {
      num =parseInt(num, 10);
      if(num===0){return '1st'}
      if(num===1){return '2nd'}
      if(num===2){return '3rd'}
    },
    createobjects (choiceArray){
      if(choiceArray[1]!==0){
        for (let i = 0; i < choiceArray[1]; i++) {
          this.laptops['lap'+i] =[]
          for (let x = 0; x < choiceArray[0]; x++) {
              this.laptops['lap'+i].push(false)
          }
        }
      }
      },

    fillLabtopButoons (choiceArray){
      if(choiceArray[0]!==0){
          for (let i = 0; i < choiceArray[0]; i++) {
            let assign = i % Object.keys(this.laptops).length
            this.laptops['lap'+assign][i] =true
          }
      }
    },
    testchoice (n,index){
     let currentNum=this.getNum(this.choiceArray)
     
    },
    getNum(choiceArray){
      let count=0
      count += choiceArray[2]
      count += choiceArray[0]
      for (let i = 0; i < Object.keys(this.laptops).length; i++) {
        alert(JSON.stringify(this.laptops))
      }
      return count
    }


  },
  data: function () {

    return {
      laptops: {},
      }
    },
    beforeMount(){
      this.createobjects(this.choiceArray)
      //alert(JSON.stringify(this.laptops))
      this.fillLabtopButoons(this.choiceArray)
      //alert(JSON.stringify(this.laptops))
   },


}
</script>

<style scoped>

</style>
