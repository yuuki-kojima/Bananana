<template>
  <section class="section">
    <a :href="href" target="_blank">
      <v-btn dark color="#00b0ed">Tweet</v-btn>
    </a>
  </section>
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

<style scoped>
section {
  text-align: center;
}
</style>
