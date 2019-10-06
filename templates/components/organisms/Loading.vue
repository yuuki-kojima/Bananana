<template>
  <v-progress-circular class="foo" indeterminate color="blue"></v-progress-circular>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
export default class Loading extends Vue {}
</script>

<style scoped>
.foo {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
}
</style>
