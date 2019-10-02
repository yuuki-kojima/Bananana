<template>
  <v-layout row wrap>
    <NoAssets v-if="Object.keys(assets).length === 0 && loading === false"></NoAssets>
    <v-flex v-for="asset in assets" :key="asset.id" xs6 md2>
      <Asset :asset="asset" class="pa-3"></Asset>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Asset from '~/components/molecules/Asset.vue'
import NoAssets from '~/components/molecules/NoAssets.vue'

@Component({
  components: {
    Asset,
    NoAssets
  }
})
export default class Assets extends Vue {
  @Prop() assets
  @Prop() loading
}
</script>
