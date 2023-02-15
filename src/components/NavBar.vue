<template>
  <header class="header">
    <nav class="navbar">
      <div class="logo">
        <img src="../assets/logo.png" alt="">
        <router-link class="flitter" :to="{name: 'home'}">Flitter</router-link>
      </div>
      <div class="navbar-links" v-if="access_token === null">
          <router-link class="nav-link" :to="{name: 'login'}">Login</router-link>
          <router-link class="nav-link" :to="{name: 'signup'}">Signup</router-link>
      </div>
      <div class="navbar-links" v-else>
          <router-link class="nav-link" :to="{name: 'about'}">User Profile</router-link>
          <router-link @click="logout" class="nav-link" :to="{name: 'login'}">Logout</router-link>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import router from '../router/index'
import { useStore } from 'vuex';

export default defineComponent({
  setup() {
    const store = useStore();
    const access_token = computed(() => store.state.access_token);

    const logout = () => {
      localStorage.removeItem("access_token");
      store.commit('setAccessToken', null);
      router.push({name: 'login' })    
    };


    return { 
      logout,
      access_token
     };
  }
});

</script>


<style scoped>
.header {
  background-color: rgb(65, 164, 226);;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo{
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.logo .flitter{
  text-decoration: none;
  color: white;
  font-size: 22px;
  font-weight: bold;
  font-family:  'Lucida Grande';
  background-image: linear-gradient(to right, 
  rgb(51, 137, 157), indigo, rgb(51, 137, 157), indigo, rgb(51, 137, 157));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

}

.navbar-links {
  display: flex;
  align-items: center;
  justify-items: center;
}

.nav-link {
  color: #fff;
  font-size: 18px;
  text-decoration: none;
  margin: 0 20px;
}

.nav-link:hover {
  color: #fff;
  text-decoration: underline;
}

.logo img{
  width: 55px;
}
</style>