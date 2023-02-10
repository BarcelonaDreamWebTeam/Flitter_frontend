<template>
  <div id="app">
    <NavBar/>
    <FooterComp/>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavBar from './components/NavBar.vue';
import FooterComp from './components/FooterComp.vue';


export default defineComponent({
  name: "App",
  components: {
    NavBar,
    FooterComp,
  },
});
</script>


<style>
#app{
  margin: 0px;
  background-color: white;
}
</style>
