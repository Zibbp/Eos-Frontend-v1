<template>
  <nuxt-link :to="'/channels/' + channel.name"
    ><div class="max-w-sm rounded overflow-hidden">
      <img
        v-show="imageLoaded"
        class="w-auto rounded-lg h-52"
        :src="$config.cdnUrl + channel.profileImagePath"
        :alt="channel.name + ' profile image'"
        @load="imageLoadedMethod"
      />
      <div
        v-show="!imageLoaded"
        class="w-full rounded-lg h-52 relative bg-gray-200"
        data-placeholder
      ></div>
      <div class="py-2">
        <div class="font-bold text-2xl text-center">{{ channel.name }}</div>
      </div>
    </div></nuxt-link
  >
</template>

<script>
export default {
  props: {
    channel: {
      type: Object,
    },
  },
  data() {
    return {
      imageLoaded: false,
    }
  },
  methods: {
    imageLoadedMethod() {
      this.imageLoaded = true
    },
  },
}
</script>

<style>
[data-placeholder]::after {
  content: ' ';
  box-shadow: 0 0 50px 9px rgba(254, 254, 254);
  position: absolute;
  top: 0;
  left: -100%;
  height: 100%;
  animation: load 1s infinite;
}
@keyframes load {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}
</style>
