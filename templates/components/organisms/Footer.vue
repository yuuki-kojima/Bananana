<template>
  <v-footer class="white">
    <v-flex text-xs-center style="color: gray;">
      &copy;2019 Bananana powerd by Satellites
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
