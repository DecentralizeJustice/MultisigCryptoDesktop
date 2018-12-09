<template>

<FirstSync v-if ="shouldThisShow(0)"></FirstSync >
</template>

<script>
import FirstSync from '~/components/SyncAccounts/GeneratePasswords.vue'
export default {
  name: 'SyncMain',
  components: {
    FirstSync
  },
  props: [],
  methods: {
    shouldThisShow (index) {
      if (index === this.choiceIndex) {
        return true
      } else {
        return false
      }
    }

  },
  computed: {

  },
  data () {
    return {
      choiceIndex: 0
    }
  }
}
</script>

<style scoped>

</style>
