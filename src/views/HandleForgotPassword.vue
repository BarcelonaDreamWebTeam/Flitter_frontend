<template>
    <div class="forgotpassword-container">
      <form @submit.prevent="handleForgotPassword">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="text" id="email" v-model="email">
        </div>
        <div class="form-group">
          <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
          <p class="success" v-if="successMessage">{{ successMessage }}</p>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const email = ref('')
      const errorMessage = ref('')
      const successMessage = ref('')
  
      const handleForgotPassword = async () => {
        if (!email.value) {
          errorMessage.value = 'Email is required.'
          return
        }
  
        try {
          await axios.post('http://localhost:3015/api/users/forgot-password', { email: email.value })
          .then(() => {
              errorMessage.value = ''
              successMessage.value = 'You received an email with a link to reset the password. Please check your inbox.'
            });     
        } catch (error) {
          errorMessage.value = "The email doesn't exist or it's wrongly formatted."
          successMessage.value = ''
        }
      }
  
      return {
        email,
        errorMessage,
        successMessage,
        handleForgotPassword
      }
    }
  }
  </script>

<style scoped>
.forgotpassword-container {
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

.success{
  color: green;
}
</style>

