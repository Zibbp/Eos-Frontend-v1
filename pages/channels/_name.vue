<template>
  <div ref="channelPageContainer">
    <channel-header :channel="channel" />
    <videos-section :channel="channel" />
  </div>
</template>

<script>
import ChannelHeader from '~/components/Channel/ChannelHeader.vue'
import VideosSection from '~/components/Channel/VideosSection.vue'
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
      const channel = await $axios.$get(
        `${$config.apiUrl}/channels/1?name=${params.name}`
      )
      return { channel }
    } catch (err) {
      if (err.response.status === 404) {
        error({ statusCode: 404, message: 'Channel not found' })
      } else {
        error({ statusCode: 500, message: 'Internal server error' })
      }
    }
  },
  components: {
    ChannelHeader,
    VideosSection,
  },
  data() {
    return {}
  },
}
</script>

<style></style>
