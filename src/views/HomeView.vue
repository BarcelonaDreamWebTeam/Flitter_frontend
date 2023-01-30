<template>
  <div class="home">
    <HelloWorld msg="Welcome to Platzi Shop"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '../components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
});
</script>

<style scoped>
  .home{
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>