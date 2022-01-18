<template>
  <div class="-mt-1 dark:bg-ytd-800 bg-gray-100">
    <div class="container mx-auto">
      <div class="flex justify-between items-center py-4 px-16">
        <div class="flex items-center">
          <div class="w-24 h-24 rounded-full relative">
            <img
              class="rounded-full"
              :src="$config.cdnUrl + channel.profileImagePath"
              alt=""
            />
          </div>
          <div class="ml-6">
            <div
              class="text-2xl font-normal flex items-center dark:text-gray-100"
            >
              <span class="mr-2">{{ channel.name }}</span>
            </div>
            <p class="mt-2 font-hairline text-sm dark:text-ytd-200">
              {{ channel.videoCount.toLocaleString() }} videos
            </p>
          </div>
        </div>
      </div>
      <div class="px-16">
        <ul class="list-reset flex">
          <li
            class="text-center py-3 px-8 border-b-2 border-solid border-grey-dark"
          >
            <a href="#" c> Videos </a>
          </li>
          <li class="text-center py-3 px-8">
            <a href="#" class="hover:text-black"> Playlists </a>
          </li>
          <li class="text-center py-3 px-8">
            <a href="#" class="hover:text-black"> Community </a>
          </li>
          <li class="text-center py-3 px-8">
            <a href="#" class="hover:text-black"> Channels </a>
          </li>
          <li class="text-center py-3 px-8">
            <a href="#" class="hover:text-black"> About </a>
          </li>
          <li class="text-center py-3 px-8">
            <i class="fa fa-search fa-lg text-grey-dark"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channel: {
      type: Object,
    },
  },
}
</script>

<style></style>
