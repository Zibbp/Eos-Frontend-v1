<template>
  <div>
    <div v-for="video in videos" :key="video.id">
      <random-video-card :video="video" />
    </div>
  </div>
</template>

<script>
import RandomVideoCard from '~/components/Video/RandomVideoCard.vue'
export default {
  components: {
    RandomVideoCard,
  },
  data() {
    return {
      videos: [],
    }
  },
  mounted() {
    this.getRandomVideos()
  },
  methods: {
    async getRandomVideos() {
      const randomVideosRes = await this.$axios.$get(
        `${this.$config.apiUrl}/videos/random?limit=20`
      )
      this.videos = randomVideosRes.items
    },
  },
}
</script>

<style></style>
