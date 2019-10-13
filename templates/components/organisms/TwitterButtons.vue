<template>
  <a :href="href" target="_blank">
    <v-btn dark color="#00b0ed">Tweet</v-btn>
  </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class DefaultLayout extends Vue {
  href = ''
  mounted() {
    const shareUrl = `https://bananana.io${this.$route.path}`
    this.href = `https://twitter.com/intent/tweet?url=${shareUrl}&hashtags=bananana`
  }
}
</script>
