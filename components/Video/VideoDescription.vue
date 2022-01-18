<template>
  <div
    class="max-w-4xl px-8 whitespace-pre-wrap dark:text-gray-100"
    ref="mydiv"
    v-html="formattedDescription"
  ></div>
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
      formattedDescription: null,
    }
  },
  mounted() {
    const linkRegex = /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi
    const timestampRegex = /(?:(?:([01]?\d):)?([0-5]?\d))?:([0-5]?\d)/gi
    this.formattedDescription = this.video.description
      .replace(linkRegex, (match, space, url) => {
        return (
          space +
          '<a href="' +
          url +
          '" target="_blank" class="description-link">' +
          url +
          '</a>'
        )
      })
      .replace(timestampRegex, (match, space, time) => {
        return (
          '<span totimestamp="' +
          match +
          '" href="#" class="description-timestamp">' +
          match +
          '</span>'
        )
      })
    if (this.formattedDescription) {
      this.$el.addEventListener('click', function (event) {
        event.preventDefault()
        let timestamp
        let link
        if (event.target.getAttribute('totimestamp')) {
          timestamp = event.target.getAttribute('totimestamp')
        }
        if (event.target.tagName.toLowerCase() === 'a') {
          link = event.target.href
        }
        console.log(event.target)
        if (timestamp) {
          function hmsToSecondsOnly(str) {
            /* eslint-disable */
            var p = str.split(':'),
              s = 0,
              m = 1

            while (p.length > 0) {
              s += m * parseInt(p.pop(), 10)
              m *= 60
            }

            return s
            /* eslint-enable */
          }
          $nuxt.$emit('toTimestamp', hmsToSecondsOnly(timestamp))
          window.scrollTo({ top: 0 })
        }
        if (link) {
          window.open(link, '_blank')
        }
      })
    }
  },
  methods: {},
}
</script>

<style>
.description-link {
  color: #3ea6ff;
}
.description-timestamp {
  color: #3ea6ff;
  cursor: pointer;
}
</style>
