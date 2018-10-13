<template>
<div style="padding-bottom: 2%;">
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
       <v-layout row wrap class="text-xs-center" >
         <v-flex>
           <v-btn large  color='success' round v-for="n in item.length+1" :key="n"
           v-if=getButtonStatus(n,sumHardwareWallets(item))
            >
             <h3 class="headline" >{{n-1}}</h3>
           </v-btn>
         </v-flex>
       </v-layout>
      </v-card>
    </v-flex>

    <v-flex xs12 sm3 v-for="index in this.choiceArray[2]" :key="index">
      <v-card  >
         <v-toolbar>
           <v-layout row wrap align-center>
             <v-flex headline class="text-xs-center">
              {{getOrdinal(index-1)}} Cellphone
             </v-flex>
           </v-layout>
         </v-toolbar>
         <v-img src="/cell.jpg" aspect-ratio="1.6"></v-img>
      </v-card>
    </v-flex>
  </v-layout>
  <div class="text-xs-center" style="margin-top:1%;">
    <v-btn color="info" @click.native="submit()" large >Confirm</v-btn>
  </div>

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
    submit(){

      for (let i = 0; i < this.choiceArray[2]; i++) {
        this.finalDevicePlan['device'+i] ={type:'cell',privatekey:1}
      }

      for (let i = 0; i < this.choiceArray[1]; i++) {
        let offset= i+this.choiceArray[2]
        this.finalDevicePlan['device'+offset] ={type:'lap',
        hardwarewallets:this.sumHardwareWallets(this.laptops['lap'+i]),privatekey:0}
        if(this.sumHardwareWallets(this.laptops['lap'+i])===0){
          this.finalDevicePlan['device'+offset].privatekey=1        }
      }
      if(this.getNum(this.choiceArray)<3){
        let index =this.choiceArray[2]
        this.finalDevicePlan['device'+index].privatekey+=1
      }
      this.$store.dispatch('updateDevicePlan', this.finalDevicePlan)
      this.$store.dispatch('hideDevicePlan')
      this.$store.dispatch('showDeviceSetup')
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
      if(num===correctNum){return true}
      else {
        return false
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
     alert(currentNum)

    },
    getNum(choiceArray){
      let count=0
      count += choiceArray[2]
      //sum all keys to ensure that they arent over 3, under by uncounted laptops are ok
      for (let i = 0; i < Object.keys(this.laptops).length; i++) {
        let num =0
        for (let x = 0; x < choiceArray[0]; x++) {
          if(this.laptops['lap'+i][x] ===true){
            num +=1
          }
        }
        if(num===0){count+=1}
        else { count+=num}
      }


      return count
    }


  },
  data: function () {

    return {
      laptops: {},
      finalDevicePlan:{}
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
