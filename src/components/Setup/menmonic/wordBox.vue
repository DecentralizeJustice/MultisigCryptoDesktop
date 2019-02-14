<template>

  <v-flex xs12 sm6 md3>
    <v-autocomplete
      v-model="model"
      :items="states"
      :readonly="!isEditing"
      :label='number'
      persistent-hint
      prepend-icon="mdi-city"
    >
    </v-autocomplete>
    <!-- <v-text-field
      :label='number'
      :outline='true' v-model="thisWord"
    > -->
    <!-- <v-fade-transition slot="append">
      <v-icon v-if="tempDone">check_circle</v-icon>
      <v-icon v-else>error</v-icon>
    </v-fade-transition>

    </v-text-field> -->
  </v-flex>

</template>

<script>
import { getWord } from '@/assets/menmonic/getWord.js'
export default {
  data () {
    return {
      thisWord: this.word,
      tempDone: false,
      isEditing: true,
      model: null,
      states: [
        'Alabama', 'Alaska', 'American Samoa', 'Arizona',
        'Arkansas', 'California', 'Colorado', 'Connecticut',
        'Delaware', 'District of Columbia', 'Federated States of Micronesia',
        'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho',
        'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
        'Louisiana', 'Maine', 'Marshall Islands', 'Maryland',
        'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
        'Missouri', 'Montana', 'Nebraska', 'Nevada',
        'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
        'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio',
        'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico',
        'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee',
        'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia',
        'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
      ]
    }
  },
  name: 'wordBox',
  props: ['number', 'word', 'done'],
  computed: {
  },
  mounted () {
    this.tempDone = this.done // I'm text inside the component.
  },
  methods: {
    updateWord (option) {
      this.$emit('updateWord', option)
    },
    checkText (thing) {
      this.updateWord(
        { number: this.number,
          whichWord: thing })
    }
  }
}
</script>

<style scoped>
</style>
