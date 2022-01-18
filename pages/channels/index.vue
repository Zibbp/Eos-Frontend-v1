<template>
  <div>
    <div
      ref="channelsContainer"
      class="container relative my-12 min-h-32 mx-auto px-4 md:px-12"
    >
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div
          v-for="channel in channels"
          :key="channel.id"
          class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/4 xl:w-1/6"
        >
          <channel-card :channel="channel" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChannelCard from '~/components/Channel/ChannelCard.vue'
export default {
  components: {
    ChannelCard,
  },
  data() {
    return {
      channels: [],
      loader: null,
    }
  },
  mounted() {
    this.getChannels()
  },
  methods: {
    async getChannels() {
      try {
        this.loader = this.$loading.show({
          container: this.$refs.channelsContainer,
          canCancel: false,
          fullPage: false,
        })
        const channelsRes = await this.$axios.get(
          `${this.$config.apiUrl}/channels?limit=999`
        )
        this.channels = channelsRes.data.items
        this.loader.hide()
      } catch (error) {
        this.$toast.error('Error fetching channels')
        console.log(error)
      }
    },
  },
}
</script>

<style></style>
