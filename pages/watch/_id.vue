<template>
  <div
    class="2xl:max-w-[90%] xl:max-w-[90%] lg:max-w-[90%] md:container sm:container mx-auto mt-2"
  >
    <div class="grid grid-cols-12 gap-1">
      <div
        :class="[
          $store.state.showRandomVideos
            ? 'col-span-10 2xl:col-span-10 xl:col-span-10 lg:col-span-12 md:col-span-12 sm:col-span-12'
            : 'col-span-12 2xl:col-span-12 xl:col-span-12 lg:col-span-12 md:col-span-12 sm:col-span-12',
        ]"
      >
        <video-player :video="video" />
        <video-title :video="video" />
        <video-description :video="video" />
        <video-comments :video="video" />
      </div>
      <div
        v-if="$store.state.showRandomVideos"
        class="col-span-2 2xl:col-span-2 xl:col-span-2 lg:col-span-12 md:col-span-12 sm:col-span-12 h-screen"
      >
        <random-videos-section />
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from '~/components/Video/VideoPlayer.vue'
import VideoTitle from '~/components/Video/VideoTitle.vue'
import VideoDescription from '~/components/Video/VideoDescription.vue'
import VideoComments from '~/components/Video/VideoComments.vue'
import RandomVideosSection from '~/components/Video/RandomVideoSection.vue'
export default {
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
    $axios,
    $config,
  }) {
    try {
      const video = await $axios.$get(`${$config.apiUrl}/videos/${params.id}`)
      return { video }
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Video not found' })
      } else {
        error({ statusCode: 500, message: 'Internal server error' })
      }
    }
  },
  components: {
    VideoPlayer,
    VideoTitle,
    VideoDescription,
    VideoComments,
    RandomVideosSection,
  },
}
</script>

<style>
.watch-max-w {
  max-width: 90vw;
}
</style>
