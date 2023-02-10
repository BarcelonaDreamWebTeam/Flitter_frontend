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
import backend_call from '../api/backend_call';
import { defineComponent, ref, watch, onMounted } from "vue";
import router from '../router/index'
import { useRouter } from 'vue-router';

const access_token = ref("");

export default defineComponent({
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const response = ref("");
    const router = useRouter();


    async function login() {
      if (email.value === "" || password.value === "") {
        errorMessage.value = "Email and password are required.";
      } else {
        try {
          const res = await backend_call.post("/api/users/login", { "email": email.value, "password": password.value });
          localStorage.setItem("access_token", res.data.token);
          access_token.value = res.data.token;

        } catch (error) {
            console.log(error);
            
          errorMessage.value = "Incorrect email or password.";
        }
      }
    }

    onMounted(() => {
      if (access_token.value) {
        router.push({ name: 'home' });
      }
    });


    return {
      email,
      password,
      errorMessage,
      response,
      login,
    };
  },
});

</script>


<style scoped>
.login-container {
  width: 400px;
  margin: 0 auto;
  margin-top: 30px;
  padding: 40px;
  padding-bottom: 60px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);

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
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;

}

button[type="submit"] {
  background-color: rgb(59, 59, 225);
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
    color:red;
}
</style>