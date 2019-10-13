<template>
  <v-content>
    <v-container>
      <Loading v-if="loading"></Loading>
      <ShareShop v-if="assets" :shop-owner="shopOwner" :share-text="shareText"></ShareShop>
      <Assets v-if="assets" :assets="assets"></Assets>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Assets from '~/components/organisms/Assets.vue'
import Loading from '~/components/organisms/Loading.vue'
import ShareShop from '~/components/organisms/ShareShop.vue'

@Component({
  components: {
    Assets,
    Loading,
    ShareShop
  }
})
export default class Index extends Vue {
  head() {
    return {
      title: 'Mypage',
      titleTemplate: '%s | Bananana'
    }
  }
  assets = null
  loading = true
  shopOwnerAddress = ''
  shareText = 'aaaa'
  shopOwner = false
  async mounted() {
    this.shopOwnerAddress = this.$route.params.shopOwnerAddress
    const shopOwnerAssets = await this.getOnSaleAssetDataForShopOwner(this.shopOwnerAddress as string)
    const refinedOrders = await this.$satellites.getOrders()
    const onsaleShopOwnerAssets = shopOwnerAssets.filter((asset) => {
      if (refinedOrders[asset.asset_contract.address]) {
        if (refinedOrders[asset.asset_contract.address][asset.token_id]) {
          asset.order = refinedOrders[asset.asset_contract.address][asset.token_id]
          return true
        }
      }
    })
    this.assets = this.$utils.setAssetsMeta(onsaleShopOwnerAssets)
    this.buildText(this.assets)
    this.shopOwner = this.isShopOwner()
    this.loading = false
  }
  async getOnSaleAssetDataForShopOwner(owner: string) {
    let assetContractAddressesQuery = ''
    if (this.$config.whitelists) {
      const base = '&asset_contract_addresses='
      for (const assetContractAddress of this.$config.whitelists) {
        assetContractAddressesQuery = assetContractAddressesQuery + base + assetContractAddress
      }
    }
    const assets = await this.$axios.get(
      `${this.$config.api}assets?owner=${owner}&asset_contract_address=${assetContractAddressesQuery}`
    )
    return assets.data.assets
  }

  isShopOwner() {
    return this.shopOwnerAddress === this.$store.state.address
  }

  buildText(assets) {
    let text = ''
    assets.map((asset) => {
      text += `\n出）${asset.name}\n求）${this.$utils.computePrice(asset.order.takerAssetAmount)}ETH\n`
    })
    text += `\nhttps://bananana.io${this.$route.path}`
    this.shareText = text
  }
}
</script>
