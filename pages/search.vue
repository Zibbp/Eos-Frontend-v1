<template>
  <div class="container mx-auto">
    <div class="content-center items-center justify-center flex">
      <div class="relative mt-2 max-w-xl w-full">
        <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg
            @click="submitSearch"
            class="w-5 h-5 text-gray-400"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
        </span>

        <input
          v-model="searchString"
          v-on:keyup.enter="submitSearch"
          type="text"
          class="w-full py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          placeholder="Search"
        />
      </div>
    </div>
    <!-- Videos -->
    <div class="lg:m-auto lg:w-1/2">
      <div v-if="resultsLoaded" class="mt-2">
        <span
          >Displaying {{ pagination.itemCount }} of
          {{ pagination.totalItems }} results</span
        >
      </div>
      <div v-for="video in videos" :key="video.id" class="">
        <search-video-card :video="video" />
      </div>
      <!-- Pagination -->
      <div
        v-if="resultsLoaded"
        class="mt-4 justify-center flex items-center space-x-1 mb-3"
      >
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
    </div>
  </div>
</template>

<script>
import SearchVideoCard from '~/components/Video/SearchVideoCard.vue'
export default {
  components: {
    SearchVideoCard,
  },
  data() {
    return {
      searchString: null,
      videos: [],
      pagination: {
        totalItems: 1,
        itemsPerPage: 10,
        totalPages: 1,
        currentPage: 1,
      },
      resultsLoaded: false,
    }
  },
  mounted() {
    if (this.$route.query.search) {
      this.searchString = this.$route.query.search
      this.submitSearch()
    }
  },
  methods: {
    async submitSearch() {
      if (this.searchString != null) {
        try {
          this.resultsLoaded = false
          const searchRes = await this.$axios.$get(
            `${this.$config.apiUrl}/videos`,
            {
              params: {
                search: this.searchString,
                page: this.pagination.currentPage,
                limit: this.pagination.itemsPerPage,
              },
            }
          )
          this.videos = searchRes.items
          this.pagination = searchRes.meta
          this.resultsLoaded = true
        } catch (error) {
          this.resultsLoaded = false
          console.log(error)
          this.$toast.error('Error searching videos')
        }
      }
    },
    nextPage() {
      this.pagination.currentPage += 1
      this.submitSearch()
      window.scrollTo({ top: 0 })
    },
    prevPage() {
      this.pagination.currentPage -= 1
      this.submitSearch()
      window.scrollTo({ top: 0 })
    },
    firstPage() {
      this.pagination.currentPage = 1
      this.submitSearch()
      window.scrollTo({ top: 0 })
    },
    lastPage() {
      this.pagination.currentPage = this.pagination.totalPages
      this.submitSearch()
      window.scrollTo({ top: 0 })
    },
  },
}
</script>

<style></style>
