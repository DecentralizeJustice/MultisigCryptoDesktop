<template>

  <v-flex xs12 sm6 md3>
    <v-text-field
      :label='getRightPhrase(number)+" Word"'
      :outline='true' v-model="word" v-on:keyup="checkText (word)"
    ></v-text-field>
  </v-flex>

</template>

<script>

export default {
  name: 'wordBox',
  props: ['number'],
  computed: {

 },
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    },
    checkText (word) {

      if (word.length>=4){}

    },
    getRightPhrase (i) {
    var j = i % 10,
    k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
      }
    if (j == 3 && k != 13) {
      return i + "rd";
      }
      return i + "th";
    },
  }

}
</script>

<style scoped>

</style>
