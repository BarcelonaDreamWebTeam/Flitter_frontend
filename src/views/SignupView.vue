<template>
  <div class="signup-form">
  <form >
    <h1>Sign up</h1>
    <div class="form-group">
      <label for="email">Email:</label>
      <input class = "form-control" id="email" v-model="email" type="email" />
    </div>
    <div class="form-group">
      <label for="password">Password:</label>
      <input class = "form-control" id="password" v-model="password" type="password" />
    </div>
    <button class="btn" @click.prevent="handleSignup">Sign Up</button>
    <div class="error">{{ errorMessage }}</div>
  </form>
</div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')

    const handleSignup = async () => {
      if (!email.value || !password.value) {
        errorMessage.value = 'Email and password are required.'
        return
      }

      try {
        const res = await axios.post('http://localhost:3015/api/users/signup', { email: email.value, password: password.value })
        // handle successful signup
      } catch (error) {
        errorMessage.value = 'An error occurred while signing up.'
      }
    }

    return {
      email,
      password,
      errorMessage,
      handleSignup
    }
  }
}
</script>

<style scoped>
  .signup-form {
    width: 400px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 40px;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: center;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }

  form {
  display: inline-block;
  text-align: left;
}

  .signup-form h2 {
    text-align: center;
    margin-bottom: 30px;
  }

label {
  font-weight: bold;
}
  .signup-form .form-control {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }

  .signup-form .form-control:focus {
    border-color: #007bff;
  }
  .signup-form .btn {
    background-color: rgb(59, 59, 225);
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
  }
  .signup-form .btn:hover {
    background-color: #0069d9;
  }
  .signup-form .error {
    color: red;
    text-align: center;
    margin-top: 20px;
  }
</style>

