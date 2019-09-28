<template>
  <v-footer class="white">
    <v-flex text-xs-center style="color: gray;">
      <nuxt-link to="/commercial">特定商取引法に基づく表記</nuxt-link>
      <span class="ml-3">&copy;2019 Bananana powerd by Satellites</span>
    </v-flex>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Footer extends Vue {}
</script>

<style scoped>
a {
  text-decoration: none;
  color: gray;
}
</style>
