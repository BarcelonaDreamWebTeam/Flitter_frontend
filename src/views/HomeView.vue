<template>
  <div class="container">
    <div class="filters">
      <label>Sort:</label>
      <select v-model="query.sort">
        <option value="user">User</option>
        <option value="text">Text</option>
        <option value="hashtags">Hashtags</option>
        <option value="recent">Recent</option>
        <option value="popular">Popular</option>
      </select>
      <label>Filter:</label>
      <select v-model="query.fields">
        <option value="user">User</option>
        <option value="text">Text</option>
        <option value="hashtags">Hashtags</option>
      </select>
      <label>User:</label>
      <input v-model="query.user" />
      <label>Text:</label>
      <input v-model="query.text" />
      <label>Hashtags:</label>
      <input v-model="query.hashtags" />
      <button @click="searchTweets">Search</button>
    </div>
    <div class="tweet" v-if="access_token">
      <textarea v-model="newTweet.text" placeholder="Enter your text here..." ></textarea>
      <input type="hashtags" v-model="newTweet.hashtags" placeholder="hashtags here...">
      <button @click="postTweet">Fleet</button>
    </div>
    <div class="tweetlist">
      <ul v-for="tweet in tweets" :key="tweet.id">
        <li v-if="tweet.user" class="user">@{{ tweet.user }}</li>
        <li v-if="tweet.text" class="testo">{{ tweet.text }}</li>
        <li class="hash">
          <div v-if="tweet.hashtags"><span  v-for="hashtag in tweet.hashtags" :key="hashtag">#{{ hashtag }}</span></div>
          <span v-if="tweet.likes > 0">❤️{{ tweet.likes }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

import { onMounted, ref, reactive } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';
import backend_call from '../api/backend_call';


export default {
  setup() {
    const store = useStore();
    const access_token = localStorage.getItem('access_token');
    const query = ref({
      user: '',
      tweetId: '',
      text: '',
      hashtags: '',
      skip: '',
      limit: '',
      fields: '',
      sort: '',
      likes: 0
    });

    const newTweet = reactive({
      text: '',
      hashtags: '',
      username: '',
    })

    const tweets = ref([]);


    onMounted(searchTweets);
    onMounted(getUser);

    async function searchTweets() {
      const response = await axios.get('http://localhost:3015/api/tweets?limit=10', { params: query.value });
      tweets.value = response.data.results;
    }

    async function getUser(){
      const access_token = localStorage.getItem('access_token');


      // Get the access token from local storage
      const tokenParts = access_token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const userId = payload.userId;
      const resp = await backend_call.get(`api/users/${userId}`);
        let user = resp.data.result.username;
        console.log(user);
        localStorage.setItem('user', user)

    }

    const postTweet = async () => {
      const storage = localStorage.getItem('user');

      console.log(storage);
      try {
        // Send the tweet data to the server with the access token in the headers

      
        const post = await axios.post('http://localhost:3015/api/tweets', {text : newTweet.text, user: storage, hashtags: newTweet.hashtags}, {
          // headers: {
          //   'Content-Type': 'application/json',
          //   Authorization: `Bearer ${access_token}`,
          // },
        });
        


        // Clear the input field and update the tweet list
        newTweet.text = '';
        newTweet.hashtags = '';
        searchTweets();

    } catch (error) {
      console.error(error);
    }
  }

    return {
      access_token,
      query,
      tweets,
      newTweet,
      searchTweets,
      postTweet,
      getUser
    };
  },
};
</script>


<style scoped>

.container {
  max-width: 600px;
  margin: 5px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

.filters{
  position: fixed;
  left: 20px;
  top: 85px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: left;
}

input {
  margin: 0 10px;
  padding: 8px;
  font-size: 16px;
}


.tweetlist{
  margin-bottom: 40px;
  display: flex;
  flex-direction: column-reverse;
}

ul {
  min-width: 100px;
  max-width: 550px;
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

.user {
  font-weight:bold;
}

ul .hash {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
}

#filter{
  margin: 0 10px;
  padding: 8px 55px;
  font-size: 16px;
}

  textarea {
    width: 550px;
    height: 70px;
    font-size: 16px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 10px;
    min-width: 100px;
    max-width: 550px;
  }

  select{
    width: 188px;
    padding: 8px;

  }

  .tweet {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f9f9f9;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

input{
  display: flex;
  flex-direction: column;

}

.tweet textarea {
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 18px;
  margin-bottom: 10px;
  padding: 5px;
  resize: none;
}

.tweet input[type="hashtags"] {
  border: none;
  border-bottom: 1px solid #ccc;
  font-size: 16px;
  padding: 5px;
  margin-bottom: 10px;
}

button {
  background-color: #1DA1F2;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 5px;
}

button:hover {
  background-color: #0D8DD1;
}



</style>



