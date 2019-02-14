<template>
  <div>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
    <v-btn v-on:click="back" v-if="backOption"><v-icon color="primary">arrow_back</v-icon></v-btn>
    <v-btn ><v-icon color="primary">help</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn v-on:click="moveToNext" v-if="readyToContinue" >Continue <v-icon color="success">done</v-icon></v-btn>
    </v-card-actions>
</div>
</template>

<script>
export default {
  name: 'bottomBar',
  props: {
    readyToContinue: {
      type: Boolean,
      required: true
    },
    backOption: {
      type: Boolean,
      default: false
    }
  },
  components: {

  },
  methods: {
    moveToNext: function () {
      this.$emit('moveToNext')
    },
    back: function () {
      this.$emit('back')
    }
  }
}
</script>

<style scoped>

</style>
