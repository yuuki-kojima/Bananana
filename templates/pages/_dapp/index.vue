<template>
  <v-content>
    <v-container>
      <Loading v-if="loading"></Loading>
      <Assets v-if="assets" :assets="assets"></Assets>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Assets from '~/components/organisms/Assets.vue'
import Loading from '~/components/organisms/Loading.vue'

@Component({
  components: {
    Assets,
    Loading
  }
})
export default class Index extends Vue {
  head() {
    const dappName = this.$route.params.dapp
    return {
      title: dappName,
      titleTemplate: '%s | Bananana'
    }
  }
  dappName = ''
  assets = null
  loading = true
  async mounted() {
    this.dappName = this.$route.params.dapp
    let contractAddress
    if (this.dappName) {
      contractAddress = [this.$constant.dappAddresses[this.dappName]]
    }
    await this.updateOrders(contractAddress)
  }

  async updateOrders(contractAddress) {
    this.loading = true
    const refinedOrders = await this.$satellites.getOrders(contractAddress)
    const assets = await this.getAssetDataForOrders(refinedOrders, contractAddress)
    this.assets = assets
    this.loading = false
  }

  async getAssetDataForOrders(refinedOrders, contractAddress) {
    const assets: any = []
    const tokenIds = Object.keys(refinedOrders[contractAddress])
    const tokenIdsQueryParam = tokenIds.map((id: string) => `token_ids=${id}`).join('&')
    const requestURL = `${this.$config.api}assets?asset_contract_address=${contractAddress}&${tokenIdsQueryParam}`
    const response = await this.$axios.get(requestURL)
    response.data.assets.map((asset) => {
      if (refinedOrders[asset.asset_contract.address][asset.token_id]) {
        asset.order = refinedOrders[asset.asset_contract.address][asset.token_id]
      }
      assets.push(asset)
    })
    return assets
  }
}
</script>
