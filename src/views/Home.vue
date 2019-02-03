<template>
  <v-app  xs12 dark v-bind:style="styleObject" class='fullbackground'>
    <HelloWorld msg="Hot"/>
  </v-app>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      styleObject: {
        'background-image': 'url("https://images.pexels.com/photos/733475/pexels-photo-733475.jpeg?cs=srgb&dl=astronomy-cosmos-dark-733475.jpg&fm=jpg")'
      }
    }
  }
}
</script>

<style scoped>
.fullbackground {
   background-position: center;
   background-repeat: no-repeat;
   background-size: cover;
}
</style>
