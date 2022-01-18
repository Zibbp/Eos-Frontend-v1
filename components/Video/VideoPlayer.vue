<template>
  <div
    :class="
      $store.state.showRandomVideos
        ? 'video-player'
        : 'video-player full-height-width'
    "
  >
    <video id="player" class="" playsinline controls crossorigin=""></video>
  </div>
</template>

<script>
import Plyr from 'plyr'
export default {
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      options: {
        controls: [
          'rewind',
          'play-large',
          'play',
          'fast-forward',
          'progress',
          'current-time',
          'mute',
          'volume',
          'captions',
          'settings',
          'download',
          'pip',
          'airplay',
          'fullscreen',
        ],
        settings: ['captions', 'quality', 'speed', 'loop'],
        autoplay: false,
        keyboard: { focused: true, global: false },
        speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2] },
      },
      playerSources: {
        type: 'video',
        title: 'Eos',
        sources: [],
        poster: '',
        tracks: [],
      },
    }
  },
  async mounted() {
    this.player = new Plyr('#player', this.options)
    // Set sources
    this.playerSources.title = this.video.title
    this.playerSources.sources.push({
      src: this.$config.cdnUrl + encodeURIComponent(this.video.videoPath),
      type: 'video/webm',
    })
    this.playerSources.poster =
      this.$config.cdnUrl + encodeURIComponent(this.video.thumbnailPath)
    if (this.video.subtitlesPath) {
      this.playerSources.tracks.push({
        kind: 'captions',
        label: 'Captions',
        src: `${this.$config.cdnUrl}${encodeURIComponent(
          this.video.subtitlesPath
        )}`,
        srclang: 'en',
        default: true,
      })
    }
    if (this.video.generatedSubtitlesPath) {
      this.playerSources.tracks.push({
        kind: 'captions',
        label: 'Auto Generated Captions',
        src: `${this.$config.cdnUrl}${encodeURIComponent(
          this.video.generatedSubtitlesPath
        )}`,
        srclang: 'en',
        default: false,
      })
    }
    // Set player sources
    this.player.source = this.playerSources
    // Listen for timestamps
    this.$nuxt.$on('toTimestamp', (timestamp) => {
      this.player.currentTime = timestamp
    })
  },
}
</script>

<style>
.video-player {
  width: 100% !important;
  height: auto !important;
  max-height: calc(100vh - 5.1rem) !important;
}
.full-height-width .plyr {
  height: calc(100vh - 5.1rem) !important;
}
</style>
