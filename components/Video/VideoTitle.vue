<template>
  <div class="mx-auto min-w-full px-3 pt-3">
    <div class="">
      <a class="title-font font-medium text-gray-900 dark:text-white">
        <span class="text-xl">{{ video.title }}</span>
      </a>
    </div>
    <div class="pb-4 flex items-center sm:flex-row flex-col">
      <p
        class="text-sm text-neutral-700 sm:py-2 sm:mt-0 mt-2 dark:text-neutral-200"
      >
        <span>
          <img
            class="inline object-cover w-8 h-8 rounded-full"
            :src="$config.cdnUrl + video.channel.profileImagePath"
            :alt="video.channel.name + ' profile image'"
          />
          <nuxt-link :to="'/channels/' + video.channel.name"
            ><a :href="'/channels/' + video.channel.name" class="font-bold">
              {{ video.channel.name }}
            </a></nuxt-link
          >
        </span>
        • {{ $dayjs(video.uploadDate).format('MM/DD/YYYY') }} •
        {{ video.viewCount.toLocaleString() }} views
        <span
          @click="showMoreInfo = true"
          v-if="!showMoreInfo"
          class="pl-1 inline-flex cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 -5 29 25"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        <span v-show="showMoreInfo" class="visible">
          • Archived on
          {{ $dayjs(video.createdAt).format('MM/DD/YYYY') }} |
          <span>
            {{ video.resolution }} • {{ video.fps }} FPS •
            <span title="Video Codec">{{ video.vcodec }} </span>•<span
              title="Audio Codec"
            >
              {{ video.acodec }}</span
            >
          </span>
        </span>
      </p>
      <span
        class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start dark:text-neutral-200"
      >
        <span v-if="video.likeCount > 0" class="flex">
          <a class="text-neutral-700 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
              ></path>
            </svg>
          </a>
          <a class="ml-2 text-neutral-700 dark:text-neutral-200">
            {{ video.likeCount.toLocaleString() }}
          </a>
        </span>

        <span v-if="video.dislikeCount > 0" class="flex">
          <a class="ml-3 text-neutral-700 dark:text-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              class="h-5 w-5"
            >
              <path
                d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17"
              ></path>
            </svg>
          </a>
          <a class="ml-2 text-neutral-700 dark:text-neutral-200">
            {{ video.dislikeCount.toLocaleString() }}
          </a>
        </span>
      </span>
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
      showMoreInfo: false,
    }
  },
}
</script>

<style></style>
