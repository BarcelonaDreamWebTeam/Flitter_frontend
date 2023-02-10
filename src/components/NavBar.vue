<template>
  <header class="header">
    <nav class="navbar">
      <router-link class="logo" :to="{name: 'home'}">Flitter</router-link>
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
import { defineComponent, ref, watch, reactive } from 'vue';
import router from '../router/index'


export default defineComponent({
  setup() {
    const access_token = ref(localStorage.getItem('access_token'));

    const logout = () => {
      localStorage.removeItem("access_token");
      access_token.value = null;
      router.push({name: 'login' })
    };

    watch(
      () => localStorage.getItem('access_token'),
      (newValue) => {
        access_token.value = newValue;
      }
    );

    return { 
      logout,
      access_token
     };
  }
});

</script>


<style scoped>
.header {
  margin: 0;
  background-color: lightskyblue;
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

.logo {
  color: white;
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;
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
</style>