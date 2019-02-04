<template>
  <div>
    <v-divider light></v-divider>
    <v-card-actions class="pa-3">
    <v-btn ><v-icon color="orange">help</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-btn v-if="false" >Confirm <v-icon color="green">done</v-icon></v-btn>
    </v-card-actions>
</div>
</template>

<script>

export default {
  name: 'bottomBar',
  components: {

  },
  methods: {
    onDecode (decodedString) {
      console.log(decodedString)
    }
  }
}
</script>

<style scoped>

</style>
