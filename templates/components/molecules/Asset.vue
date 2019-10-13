<template>
  <component :is="assetView" :asset="asset"></component>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Asset extends Vue {
  @Prop() asset
  assetView = null
  mounted() {
    const address = this.asset.address
    this.contractAddressToAssetView(address)
  }
  contractAddressToAssetView(address: string) {
    const token = this.$config.tokens.find((token) => token.contract === address)
    const assetViewComponent = token.assetView ? token.assetView : this.$constant.commonView
    this.assetView = assetViewComponent
  }
}
</script>
