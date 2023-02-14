<template>
  <div id="app">
    <NavBar/>
    <router-view />
    <FooterComp/>

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
  padding: 0px;

  
}

body{
  margin: 0px;

}
</style>
