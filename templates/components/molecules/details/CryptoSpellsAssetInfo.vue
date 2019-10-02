<template>
  <v-card v-if="asset" flat></v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
//  const opensea = require('~/assets/img/opensea-logomark-flat-colored-blue.png')

@Component
export default class Asset extends Vue {
  @Prop() asset
}
</script>

<style scoped>
.opacity {
  opacity: 0.85;
}
</style>
