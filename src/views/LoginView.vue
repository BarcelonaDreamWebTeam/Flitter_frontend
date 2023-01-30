<template>
<div class="login-container">
  <form @submit.prevent="login">
    <h1>Login</h1>
    <div class="form-group">
      <label for="email">Email:</label>
      <input type="text" id="email" v-model="email">
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password">
    </div>
    <div class="form-group">
      <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
    </div>
    <button type="submit">Submit</button>
  </form>
</div>
</template>

<script lang="ts">
import fakeShopApi from '../api/fakeShopApi';
import { defineComponent, ref } from "vue";
import router from '../router/index'

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const response = ref("");

    async function login() {
      if (email.value === "" || password.value === "") {
        errorMessage.value = "Email and password are required.";
      } else {
        try {
          const res = await fakeShopApi.post("/auth/login", { "email": email.value, "password": password.value });
          localStorage.setItem("access_token", res.data.access_token);
          router.push({name: 'home' });

        } catch (error) {
            console.log(error);
            
          errorMessage.value = "Incorrect email or password.";
        }
      }
    }

    return {
      email,
      password,
      errorMessage,
      response,
      login
    }}

})
</script>


<style scoped>
.login-container {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

form {
  display: inline-block;
  text-align: left;
}

.form-group {
  margin: 20px 0;
  text-align: left;
}

label {
  font-weight: bold;
}

input[type="text"], input[type="password"] {
  padding: 10px;
  width: 100%;
}

button[type="submit"] {
  background-color: purple;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button[type="submit"]:hover {
  opacity: 0.8;
}

.error{
    color:red
}
</style>