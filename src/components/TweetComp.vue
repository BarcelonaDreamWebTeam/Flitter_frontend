<template>
  <div>
    <div v-for="tweet in filteredTweets" :key="tweet.id">
      <div class="tweet">
      <p class="tweet-text">{{ tweet.text }}</p>
      <p class="tweet-author">{{ tweet.author }}</p>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tweets: {
      type: Array,
      required: true
    }
  },
  computed: {
    filteredTweets() {
      return this.tweets.filter(tweet => tweet.text.includes(this.filterText));
    }
  },
  data() {
    return {
      filterText: ""
    };
  }
};
</script>

<style>
.tweet{
  box-shadow: 2px;
  background-color: azure;
}
.tweet-text {
  font-size: 16px;
  font-weight: bold;
}

.tweet-author {
  font-size: 14px;
  font-style: italic;
}
</style>
