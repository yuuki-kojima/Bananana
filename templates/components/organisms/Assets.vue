<template>
  <v-layout v-if="assets.length !== 0" row wrap>
    <v-flex v-for="asset in assets" :key="asset.id" xs6 md2>
      <Asset :asset="asset" class="pa-2 ma-2"></Asset>
    </v-flex>
  </v-layout>
  <v-layout v-else justify-center align-center>
    <p>There is no order or there is no asset supported by Bananana.</p>
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
