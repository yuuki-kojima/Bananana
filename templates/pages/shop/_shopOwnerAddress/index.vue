<template>
  <v-content>
    <v-container>
      <Loading v-if="loading"></Loading>
      <TwitterButton v-if="assets"></TwitterButton>
      <Assets v-if="assets" :assets="assets"></Assets>
      <v-textarea v-if="assets && shopOwner" label="For Trade Comunity" :value="forTradeComunityText"></v-textarea>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Assets from '~/components/organisms/Assets.vue'
import Loading from '~/components/organisms/Loading.vue'
import TwitterButton from '~/components/organisms/TwitterButtons.vue'

@Component({
  components: {
    Assets,
    Loading,
    TwitterButton
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
  forTradeComunityText = 'aaaa'
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
    this.assets = onsaleShopOwnerAssets
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
      text += `\n出）${asset.name}\n求）${this.computePrice(asset.order.takerAssetAmount)}ETH\n`
    })
    this.forTradeComunityText = text
  }

  computePrice(price) {
    const feeRatio = this.$config.defaultRatio / this.$config.feeBase
    const fee = price.times(feeRatio)
    const amount = price.plus(fee)
    return this.$web3.utils.fromWei(amount.toString())
  }
}
</script>
