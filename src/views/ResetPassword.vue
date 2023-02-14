<template>
    <div>
      <h1>Reset Password</h1>
      <form @submit.prevent="handlePasswordReset">
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <div>
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" />
        </div>
        <div v-if="errorMessage">
          <p style="color: red">{{ errorMessage }}</p>
        </div>
        <div v-if="successMessage">
          <p style="color: green">{{ successMessage }}</p>
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  </template>
  
  
  

<script lang="ts">
import { ref, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    const password = ref('')
    const confirmPassword = ref('')
    const errorMessage = ref('')
    const successMessage = ref('')

    const handlePasswordReset = async () => {
      if (!password.value || !confirmPassword.value) {
        errorMessage.value = 'Password and confirmation are required.'
        return
      }

      if (password.value !== confirmPassword.value) {
        errorMessage.value = 'Passwords do not match.'
        return
      }

      try {
        const res = await axios.post('http://localhost:3015/api/users/reset-password', { 
          password: password.value, 
          // passwordResetToken: this.params.token 
        });
        successMessage.value = 'Password reset successfully.'
        // handle successful password reset
      } catch (error) {
        errorMessage.value = 'An error occurred while resetting the password.'
      }
    }

    return {
      password,
      confirmPassword,
      errorMessage,
      successMessage,
      handlePasswordReset
    }
  }
}

</script>