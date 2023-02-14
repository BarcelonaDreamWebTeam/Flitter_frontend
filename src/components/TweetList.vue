<template>
  <div>
    <twitter-component :tweets="filteredTweets"/>
  </div>
</template>

<script>
import TwitterComponent from "./TweetComp.vue";
import axios from 'axios'

export default {
  components: {
    TwitterComponent
  },
  data() {
    return {
      tweets: [],
      filterText: ""
    };
  },
  mounted() {
    this.getTweets();
  },
  computed: {
    filteredTweets() {
      return this.tweets.filter(tweet =>
        tweet.text.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  },
  methods: {
    async getTweets() {
      try {
        const response = await axios.get("http://localhost:3015/api/tweets");
        this.tweets = response.data;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>



