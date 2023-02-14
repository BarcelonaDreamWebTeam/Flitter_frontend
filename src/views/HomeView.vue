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
      <label>Tweet ID:</label>
      <input v-model="query._id" />
      <label>Text:</label>
      <input v-model="query.text" />
      <label>Hashtags:</label>
      <input v-model="query.hashtags" />
      <button @click="searchTweets">Search</button>
    </div>
    <div class="tweet" v-if="access_token">
      <textarea v-model="newTweet.text" />
      <button @click="postTweet">Tweet</button>
    </div>
    <div class="tweetlist">
      <ul v-for="tweet in tweets" :key="tweet.id">
        <li class="user">{{ tweet.user }}</li>
        <li class="testo">{{ tweet.text }}</li>
        <li class="hash">
          <span v-for="hashtag in tweet.hashtags" :key="hashtag">#{{ hashtag }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useStore } from 'vuex';

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
      filter: 'recent',
    });
    const tweets = ref([]);
    const newTweet = ref({ text: '' });

    onMounted(searchTweets);

    async function searchTweets() {
      const response = await axios.get('http://localhost:3015/api/tweets?limit=10', { params: query.value });
      tweets.value = response.data.results;
    }

    async function postTweet(tweet) {
  // Get the access token from local storage
  const access_token = localStorage.getItem('access_token');

  try {
    // Send the tweet data to the server with the access token in the headers
    const response = await axios.post('https://localhost:3015/api/protected', tweet, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
    });

    // Clear the input field and update the tweet list
    tweet.text = '';
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

button {
  margin-top: 10px;
  padding: 8px;
  background-color: indigo;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.tweetlist{
  margin-bottom: 40px;
  display: flex;
  flex-direction: column-reverse;
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

.user {
  font-weight:bold;
}

ul .hash {
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
}

#filter{
  margin: 0 10px;
  padding: 8px 55px;
  font-size: 16px;
}

  .tweet {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  textarea {
    width: 500px;
    height: 100px;
    font-size: 16px;
    padding: 10px;
    margin-bottom: 20px;
    box-shadow: 10px;
  }

  select{
    width: 188px;
    padding: 8px;

  }


</style>



