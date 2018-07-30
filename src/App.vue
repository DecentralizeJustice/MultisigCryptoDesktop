<template>
  <b-card no-body>
    <b-tabs pill card vertical>
      <b-tab title="Create" active>
        Tab Contents 1
      </b-tab>
      <b-tab title="Spend">
        Tab Contents 2
      </b-tab>
      <b-tab title="Sign">
        Tab Contents 3
      </b-tab>
      <b-tab title="Settings">
        Tab Contents 3
      </b-tab>
    </b-tabs>
  </b-card>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
