<template>
        <header class="header" v-if="$route.name !== 'login'">
          <nav class="navbar">
            <router-link class="logo" :to="{name: 'home'}">Platzi Shop</router-link>
            <div class="navbar-links">
                <router-link class="nav-link" :to="{name: 'products'}">Products</router-link>
                <router-link class="nav-link" :to="{name: 'about'}">User Profile</router-link>
            </div>
          </nav>
        </header>
</template>


<style scoped>
.header {
  background-color: lightslategray;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navbar {
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  color: #fff;
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