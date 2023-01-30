<template>
  <div>
    <h1>{{ name }}</h1>
    <p>{{ email }}</p>
    <img :src="avatar" alt="">
    <p>Role: {{ role }}</p>
  </div>
</template>

<script>
import { ref, defineComponent, nextTick } from 'vue';
import fakeShopApi from '../api/fakeShopApi';

export default defineComponent({
  setup() {
    const name = ref(null);
    const email = ref(null);
    const avatar = ref(null);
    const role = ref(null);

    async function fetchData() {
      let token = localStorage.getItem("access_token");
      const resp = await fakeShopApi.get('auth/profile', {headers: {Authorization: `Bearer ${token}`}});
      nextTick(() => {
        name.value = resp.data.name;
        email.value = resp.data.email;
        avatar.value = resp.data.avatar;
        role.value = resp.data.role;
      });
    }

    fetchData();

    return {
      name,
      email,
      avatar,
      role
    };
  }
});
</script>


<style scoped>
div{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

img{
  width: 200px;
  border: 2px solid black;
  border-radius: 30px;
}
</style>
