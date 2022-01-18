<template>
  <div class="h-full w-96 bg-white z-50 absolute -top-10 shadow-xl">
    <video
      ref="previewVideoPlayer"
      class="video-js vjs-theme-city preview-video-player vjs-static-controls"
      :poster="$config.cdnUrl + encodeURIComponent(video.thumbnailPath)"
      muted
    >
      <source
        :src="$config.cdnUrl + encodeURIComponent(video.videoPath)"
        type="video/webm"
      />
    </video>

    <div class="flex">
      <div class="w-14 h-14 relative py-4 px-2">
        <img
          class="rounded-full"
          :src="$config.cdnUrl + video.channel.profileImagePath"
          alt=""
        />
      </div>
      <div>
        <div class="py-1 text-center">
          <nuxt-link :to="'/watch/' + video.friendlyId">
            <a
              :href="'/watch/' + video.friendlyId"
              :title="video.title"
              class="block text-sm font-bold text-gray-800 text-left video-title dark:text-gray-100 line-clamp-1"
            >
              {{ video.title }}
            </a>
          </nuxt-link>
          <p class="text-sm text-gray-700 dark:text-ytd-200 text-left">
            {{ video.channel.name }}
          </p>
          <p class="text-sm text-gray-700 dark:text-ytd-200 text-left">
            {{ numFormatter(video.viewCount) }} views •
            {{ $dayjs(video.uploadDate).format('MM/DD/YYYY') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import videojs, { log } from 'video.js'
export default {
  props: {
    video: {
      type: Object,
    },
  },
  data() {
    return {
      player: null,
      options: {
        autoplay: true,
        controls: true,
        controlBar: {
          playToggle: false,
          captionsButton: false,
          chaptersButton: false,
          subtitlesButton: false,
          remainingTimeDisplay: false,
          progressControl: {
            seekBar: true,
          },
          fullscreenToggle: false,
          playbackRateMenuButton: false,
          pictureInPictureToggle: false,
        },
      },
    }
  },
  mounted() {
    this.player = videojs(this.$refs.previewVideoPlayer, this.options)
    this.player.volume(0)
  },
  methods: {
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

<style>
.preview-video-player {
  width: 100% !important;
  height: 75% !important;
}
.vjs-theme-city .vjs-big-play-button {
  display: none;
}
.vjs-theme-city .vjs-progress-control {
  display: flex;
  top: calc(64% + 0rem);
}
.vjs-theme-city .vjs-control-bar {
  background-image: none;
}
.vjs-theme-city .vjs-play-progress {
  background-color: #700b97;
}
.vjs-theme-city .vjs-progress-control .vjs-progress-holder {
  height: 6px;
  background: rgba(255, 255, 255, 0.4);
}
.video-js .vjs-volume-panel .vjs-volume-control.vjs-volume-horizontal {
  padding-top: 0.1rem;
}

/* .video-js .vjs-big-play-button {
  display: none !important;
}
.video-js .vjs-big-play-button {
  display: none;
}
.video-js .vjs-control-bar {
  display: flex;
  top: calc(75% + 3.4rem);
} */
.vjs-theme-city.vjs-static-controls.vjs-has-started.vjs-user-inactive.vjs-playing
  .vjs-control-bar {
  opacity: 1;
  visibility: visible;
}
</style>
