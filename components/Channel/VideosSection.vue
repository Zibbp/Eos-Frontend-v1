<template>
  <div ref="videosContainer" class="container mx-auto">
    <div class="mt-4 justify-center flex items-center space-x-1">
      <button
        @click="prevPage()"
        :disabled="pagination.currentPage == 1"
        class="disabled:opacity-50 disabled:hover:bg-gray-300 disabled:hover:text-gray-500 px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M11 17l-5-5m0 0l5-5m-5 5h12"
          />
        </svg>
      </button>

      <button
        @click="firstPage()"
        v-if="pagination.currentPage > 2"
        class="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
      >
        1
      </button>

      <button
        @click="prevPage()"
        v-if="pagination.currentPage > 1"
        class="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
      >
        {{ pagination.currentPage - 1 }}
      </button>

      <button
        v-if="pagination.currentPage < pagination.totalPages"
        class="px-4 py-2 text-gray-700 bg-blue-500 rounded-md hover:bg-blue-400 hover:text-white"
      >
        {{ pagination.currentPage }}
      </button>

      <button
        v-if="pagination.currentPage < pagination.totalPages"
        @click="nextPage()"
        class="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
      >
        {{ pagination.currentPage + 1 }}
      </button>

      <button
        @click="lastPage()"
        class="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
      >
        {{ pagination.totalPages }}
      </button>

      <button
        @click="nextPage()"
        :disabled="pagination.currentPage == pagination.totalPages"
        class="disabled:opacity-50 disabled:hover:bg-gray-300 disabled:hover:text-gray-500 px-4 py-2 text-gray-500 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </button>
    </div>
    <div class="justify-end flex items-end">
      <span class="mb-3 pr-2 text-xs"
        >Displaying {{ pagination.itemsPerPage }} of
        {{ pagination.totalItems }}</span
      >
      <select
        v-model="pagination.itemsPerPage"
        @change="changeLimit()"
        class="block w-auto px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-neutral-800 dark:text-gray-300 dark:border-gray-600 focus:border-dark-purple-500 ring-dark-purple-600 dark:focus:border-dark-purple-600 focus:outline-none focus:ring"
        aria-label="downloading"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.text }}
        </option>
      </select>
    </div>
    <div class="flex flex-wrap -mx-1 lg:-mx-4">
      <div
        v-for="video in videos"
        :key="video.id"
        class="my-1 w-full md:w-1/2 lg:my-4 lg:px-2 lg:w-1/4 xl:w-1/6"
      >
        <video-card :video="video" />
      </div>
    </div>
  </div>
</template>

<script>
import VideoCard from '~/components/Video/VideoCard.vue'
export default {
  props: {
    channel: {
      type: Object,
    },
  },
  components: {
    VideoCard,
  },
  data() {
    return {
      pagination: {
        totalItems: 1,
        itemsPerPage: 50,
        totalPages: 1,
        currentPage: 1,
      },
      videos: [],
      options: [
        {
          text: '20',
          value: 20,
        },
        {
          text: '50',
          value: 50,
        },
        {
          text: '100',
          value: 100,
        },
      ],
      loader: null,
    }
  },
  mounted() {
    this.getVideos()
    console.log(this.videos)
  },
  methods: {
    async getVideos() {
      try {
        // this.loader = this.$loading.show({
        //   container: this.$refs.videosContainer,
        //   canCancel: false,
        //   fullPage: false,
        // })
        const videosResponse = await this.$axios.get(
          `${this.$config.apiUrl}/videos?channel=${this.channel.id}&page=${this.pagination.currentPage}&limit=${this.pagination.itemsPerPage}`
        )
        this.videos = videosResponse.data.items
        this.pagination = videosResponse.data.meta
        // this.loader.hide()
      } catch (error) {
        // this.loader.hide()
        this.$toast.error('Error fetching videos')
        console.log(error)
      }
    },
    nextPage() {
      this.pagination.currentPage += 1
      this.getVideos()
    },
    prevPage() {
      this.pagination.currentPage -= 1
      this.getVideos()
    },
    firstPage() {
      this.pagination.currentPage = 1
      this.getVideos()
    },
    lastPage() {
      this.pagination.currentPage = this.pagination.totalPages
      this.getVideos()
    },
    changeLimit() {
      this.getVideos()
    },
  },
}
</script>

<style></style>
