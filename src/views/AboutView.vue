<template>
  <div class="userprofile">
    <template v-if="userData">
      <h1>Hello, {{ userData.user }}</h1>
      <img src="../assets/avatar.webp" alt="">
      <p>Your email: {{ userData.email }}</p>
      <hr>
      <div class="tweetlist">
        <ul v-for="twee in userData.tweet" :key="twee.id">
          <li>
            <div class="user">@{{ twee.user }}</div>
            <div class="testo">{{ twee.text }}</div>
            <div class="hash">
              <span v-for="hashtag in twee.hashtags" :key="hashtag">#{{ hashtag }}</span>
            </div>
          </li>
        </ul>
      </div>
    </template>
    <template v-else>
      <p>Loading user data...</p>
    </template>
  </div>
</template>


<script>
import { ref, defineComponent, onMounted, computed } from 'vue';
import backend_call from '../api/backend_call';

export default defineComponent({
  setup() {
    const user = ref(null);
    const email = ref(null);
    const tweet = ref(null)

    async function fetchData() {
      let token = localStorage.getItem("access_token");
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.userId;


      try {
    const resp = await backend_call.get(`api/users/${userId}`);
      user.value = resp.data.result.username;
      email.value = resp.data.result.email;
    
    const tweets = await backend_call.get(`api/tweets?user=${user.value}`);
    tweet.value = tweets.data.results
        

  } catch (error) {
    console.error(error);
  }

    }

   
    onMounted(()=>{
      fetchData();
    })


    const userData = computed(() => {
  if (user.value && email.value) {
    return {
      user: user.value,
      email: email.value,
      tweet: tweet.value,
    };
  } else {
    return null;
  }
});


    return {
      userData,
    };
  },
});
</script>


<style scoped>
.userprofile{
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  flex-direction: column;
}

img{
  width: 100px;
}

.user {
  font-weight:bold;
}

ul .hash {
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

ul {
  list-style: none;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color:  lightskyblue;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
  transform: translateZ(10px);


}

ul .testo {
  background-color: white;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

.tweetlist{
  margin-bottom: 40px;
  width: 550px;
  display: flex;
  flex-direction: column-reverse;
}
</style>