<template>

        <v-card>
          <v-form xs12>
            <v-container xs12 >
              <v-layout  xs12 row wrap >

                <wordBox v-bind:number="item" v-for="item in 12" :key="item">
                </wordBox>

              </v-layout>
            </v-container>
          </v-form>
        </v-card>

</template>

<script>
import wordBox from '~/components/DeviceSetup/TheMenmonic/wordBox.vue'
export default {
  name: 'TheMenmonic',
  components: {
    wordBox
  },
  computed: {
    count: function () {
      return 'The count is '
    }
  },
  methods: {
    choose (option) {
      this.$emit('pickOption', option)
    }
  }

}
</script>

<style scoped>

</style>
