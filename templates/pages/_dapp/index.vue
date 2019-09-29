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
    let params
    if (this.dappName) {
      params = [this.$constant.dappAddresses[this.dappName]]
    }
    await this.updateOrders(params)
  }

  async updateOrders(params) {
    this.loading = true
    const refinedOrders = await this.$satellites.getOrders(params)
    const assets = await this.getAssetDataForOrders(refinedOrders)
    this.assets = assets
    this.loading = false
  }

  async getAssetDataForOrders(refinedOrders) {
    const assets: any = []
    const promisses: any = []
    for (const tokenAddress in refinedOrders) {
      const baseURL = `${this.$config.api}assets?asset_contract_addresses=${tokenAddress}`
      for (const tokenId in refinedOrders[tokenAddress]) {
        const requestURL = `${baseURL}&token_ids=${tokenId}`
        promisses.push(this.$axios.get(requestURL))
      }
    }
    const resolves = await Promise.all(promisses)
    for (const resolve of resolves) {
      for (const asset of (resolve as any).data.assets) {
        if (refinedOrders[asset.asset_contract.address][asset.token_id]) {
          asset.order = refinedOrders[asset.asset_contract.address][asset.token_id]
        }
        assets.push(asset)
      }
    }
    return assets
  }
}
</script>
