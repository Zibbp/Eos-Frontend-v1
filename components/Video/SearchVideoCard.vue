<template>
  <div>
    <div class="flex left-0 my-4">
      <div
        v-if="hoverPreview"
        @mouseleave="hidePreview()"
        class="lg:h-72 w-80 absolute"
      >
        <hover-preview :video="video" />
      </div>
      <div class="max-w-3xl z-10 overflow-hidden relative">
        <span
          class="px-1 py-1 ml-1 mt-1 bottom-19 text-xs absolute text-white video-badge z-10"
        >
          {{
            $dayjs
              .utc(video.duration * 1000)
              .format('HH:mm:ss')
              .replace('00:', '')
          }}
        </span>
        <nuxt-link :to="'/watch/' + video.friendlyId">
          <a :href="'/watch/' + video.friendlyId" class="flex">
            <div class="lg:h-40 lg:w-72 search-card-min-w">
              <img
                @mouseover="previewVideo(video.videoPath)"
                @mouseleave="cancelTimer()"
                v-show="imageLoaded"
                class="lg:h-40 w-full"
                :src="$config.cdnUrl + video.thumbnailPath.replace(/#/g, '%23')"
                :alt="video.title + ' thumbnail'"
                @load="imageLoadedMethod"
              />
              <div
                v-show="!imageLoaded"
                class="w-full thumbnail-height relative bg-gray-200"
                data-placeholder
              ></div>
            </div>
            <div class="pl-3 text-center">
              <p
                :title="video.title"
                class="block text-sm font-bold text-gray-800 text-left video-title dark:text-gray-100 line-clamp-2"
              >
                {{ video.title }}
              </p>

              <div class="">
                <nuxt-link :to="'/channels/' + video.channel.name">
                  <a
                    :href="'/channels/' + video.channel.name"
                    class="text-sm text-gray-700 dark:text-ytd-200 text-left flex"
                  >
                    <img
                      :src="$config.cdnUrl + video.channel.profileImagePath"
                      class="w-5 h-5 rounded-full mr-1"
                    />
                    {{ video.channel.name }}
                  </a>
                </nuxt-link>
                <p class="text-sm text-gray-700 dark:text-ytd-200 text-left">
                  {{ numFormatter(video.viewCount) }} views •
                  {{ $dayjs(video.uploadDate).format('MM/DD/YYYY') }}
                </p>
              </div>
            </div>
          </a>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import HoverPreview from '~/components/Video/HoverPreview.vue'
export default {
  props: {
    video: {
      type: Object,
    },
  },
  components: {
    HoverPreview,
  },
  data() {
    return {
      imageLoaded: false,
      hoverPreview: false,
      hoverDelay: false,
      timer: null,
    }
  },
  methods: {
    imageLoadedMethod() {
      this.imageLoaded = true
    },
    previewVideo(videoPath) {
      if (window.matchMedia('(min-width: 1024px)').matches) {
        this.hoverDelay = true
        this.timer = setTimeout(() => {
          if (this.hoverDelay == true) {
            this.hoverPreview = true
          }
        }, 1000)
      }
    },
    hidePreview() {
      this.hoverPreview = false
    },
    cancelTimer() {
      this.hoverDelay = false
      clearTimeout(this.timer)
    },
    toWatch() {
      if (this.hoverPreview == false) {
        this.$router.push({ path: '/watch/' + this.video.friendlyId })
      }
    },
    numFormatter(num) {
      if (num > 999 && num < 1000000) {
        return (num / 1000).toFixed(0) + 'K' // convert to K for number from > 1000 < 1 million
      } else if (num > 1000000) {
        return (num / 1000000).toFixed(1) + 'M' // convert to M for number from > 1 million
      } else if (num < 900) {
        return num // if value < 1000, nothing to do
      }
    },
  },
}
</script>

<style scoped>
.thumbnail-height {
  height: 10rem;
  max-height: 10rem;
}
.video-badge {
  background-color: rgba(0, 0, 0, 0.6);
}
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
.video-card-disabled {
  pointer-events: none;
}
.search-card-min-w {
  min-width: 18rem;
}
</style>
