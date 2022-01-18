<template>
  <div class="mx-auto min-w-full px-3 pt-3">
    <h1 class="text-xl font-medium text-neutral-900">
      {{ video.commentCount ? video.commentCount.toLocaleString() : '0' }}
      Comments
    </h1>
    <div>
      <div v-if="video.commentCount >= 1 && !commentsLoaded" class="mt-2 mb-2">
        <button
          v-if="!loading"
          @click="getLimitComments"
          class="px-4 py-2 font-medium tracking-wide w-48 h-10 text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          Load Top Comments
        </button>
        <button
          v-if="loading"
          @click="getLimitComments"
          class="px-4 py-2 font-medium flex justify-center items-center tracking-wide w-48 h-10 text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
        >
          <svg
            class="animate-spin -ml-1 -mr-1 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      </div>
      <!-- Comments -->
      <div v-if="commentsLoaded" class="mt-2">
        <ul>
          <li
            class="mb-4"
            v-for="(comment, index) in comments"
            :key="comment.id"
          >
            <div class="">
              <div class="flex">
                <img
                  class="rounded-full mr-3 h-10 w-10"
                  :src="comment.author_thumbnail"
                  alt=""
                />

                <div class="flex -ml-18">
                  <div>
                    <h3
                      class="text-gray-900 font-semibold text-sm text-left dark:text-gray-100"
                    >
                      {{ comment.author }}
                      <span
                        :title="$dayjs.unix(comment.timestamp)"
                        class="ml-1 text-gray-500 text-xs dark:text-true-gray-400"
                      >
                        {{
                          $dayjs.unix(comment.timestamp).format('MM/DD/YYYY')
                        }}
                      </span>
                    </h3>
                    <p
                      class="text-gray-900 text-sm text-left dark:text-gray-200"
                    >
                      {{ comment.text }}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div class="flex ml-14 text-gray-500 dark:text-true-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <p class="text-sm ml-1 dark:text-true-gray-400">
                    {{ comment.like_count.toLocaleString() }}
                  </p>
                </div>
                <div v-if="comment.replies" class="flex ml-14 w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="#3B82F6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                  <button
                    @click="showReplies(index)"
                    class="px-2 py-1 -mt-1 text-xs tracking-wide text-blue-500 capitalize transition-colors duration-200 transformrounded-md focus:outline-none"
                  >
                    View Replies
                  </button>
                </div>
              </div>
            </div>
            <!-- reply -->
            <div v-show="show[index]" class="ml-14 mt-2">
              <div
                v-for="reply in comment.replies"
                :key="reply.id"
                class="mb-2"
              >
                <div class="flex">
                  <img
                    class="rounded-full mr-3 h-10 w-10"
                    :src="reply.author_thumbnail"
                    alt=""
                  />
                  <div class="flex -ml-18">
                    <div>
                      <h3
                        class="text-gray-900 font-semibold text-sm text-left dark:text-gray-100"
                      >
                        {{ reply.author }}
                        <span
                          class="ml-1 text-gray-500 text-xs dark:text-true-gray-400"
                        >
                          {{
                            $dayjs.unix(reply.timestamp).format('MM/DD/YYYY')
                          }}
                        </span>
                      </h3>
                      <p
                        class="text-gray-900 text-sm text-left dark:text-gray-200"
                      >
                        {{ reply.text }}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="flex ml-14 text-gray-500 dark:text-true-gray-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path
                        d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                      ></path>
                    </svg>
                    <p class="text-sm ml-1">
                      {{ reply.like_count.toLocaleString() }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- Load all comments -->
        <div>
          <button
            v-if="!loading && !allLoaded"
            @click="getAllComments"
            class="px-4 py-2 font-medium tracking-wide w-48 h-10 text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Load All Comments
          </button>
          <button
            v-if="loading"
            @click="getAllComments"
            class="px-4 py-2 font-medium flex justify-center items-center tracking-wide w-48 h-10 text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            <svg
              class="animate-spin -ml-1 -mr-1 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    video: {
      type: Object,
    },
  },
  data() {
    return {
      commentsLoaded: false,
      loading: false,
      comments: [],
      show: [],
      allLoaded: false,
    }
  },
  methods: {
    async getLimitComments() {
      try {
        this.loading = true
        const commentsRes = await this.$axios.$get(
          `${this.$config.apiUrl}/videos/${this.video.friendlyId}/comments?limit=20`
        )
        this.comments = commentsRes

        this.loading = false
        this.commentsLoaded = true
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$toast.error('Error fetching comments')
      }
    },
    async getAllComments() {
      try {
        this.loading = true
        this.commentsLoaded = false
        this.comments = []

        const commentsRes = await this.$axios.$get(
          `${this.$config.apiUrl}/videos/${this.video.friendlyId}/comments`
        )
        this.comments = commentsRes

        this.loading = false
        this.commentsLoaded = true
        this.allLoaded = true
      } catch (error) {
        this.loading = false
        console.log(error)
        this.$toast.error('Error fetching comments')
      }
    },
    showReplies(index) {
      if (this.show[index] === true) {
        this.$set(this.show, index, false)
      } else {
        this.$set(this.show, index, true)
      }
    },
  },
}
</script>

<style></style>
