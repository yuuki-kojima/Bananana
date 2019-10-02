<template>
  <v-content>
    <v-container>
      <Loading v-if="loading"></Loading>
      <Filters
        v-if="assets"
        :sort-filters="sortFilters"
        :dapp-filters="dappFilters"
        :update-filter-state="updateFilterState"
      ></Filters>
      <Assets v-if="assets" :assets="filteredAssets"></Assets>
    </v-container>
  </v-content>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Assets from '~/components/organisms/Assets.vue'
import Loading from '~/components/organisms/Loading.vue'
import Filters from '~/components/organisms/Filters.vue'

@Component({
  components: {
    Assets,
    Loading,
    Filters
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
  assets = null
  filteredAssets: any[] = []
  sortFilters: any[] = []
  dappFilters: any[] = []
  filterState: any[] = []
  loading = true
  async mounted() {
    // Initialize Order
    const dappName = this.$route.params.dapp
    let contractAddress
    if (dappName) {
      contractAddress = [this.$config.tokens[dappName].contract]
    }
    await this.updateOrders(contractAddress)
    // Set Filter Item
    this.sortFilters = this.$constant.commonFilter
    this.dappFilters = this.$config.tokens[this.$route.params.dapp].filters
    this.setInitialFilterState()
  }

  setInitialFilterState() {
    const filters = [...this.dappFilters, ...this.sortFilters]
    this.filterState = filters.map((filter) => {
      console.log(filter)
      return { key: filter.key.value, value: filter.initialOption.value }
    })
  }

  updateFilterState(payload) {
    this.filterState.map((state) => {
      state.key === payload.key && (state.value = payload.value)
    })
    this.filterAsset()
  }

  filterAsset() {
    const baseAssets = [...this.assets]
    // Sorting Commmon Options
    let sortedAssets
    const otherOption = this.filterState.find((state) => state.key === 'sort')
    otherOption.value === 'recently'
      ? (sortedAssets = this.assets)
      : (sortedAssets = baseAssets.sort((a, b) => {
          const otherOption = this.filterState.find((state) => state.key === 'sort')
          let result
          switch (otherOption.value) {
            case 'lowest':
              result = a.order.takerAssetAmount.c[0] < b.order.takerAssetAmount.c[0] ? -1 : 1
              break
            case 'highest':
              result = a.order.takerAssetAmount.c[0] < b.order.takerAssetAmount.c[0] ? 1 : -1
              break
            default:
              break
          }
          return result
        }))
    // Filtering Unique Options
    const filteredAssets = sortedAssets.filter((asset) => {
      const state = this.filterState.map((state) => {
        if (state.key !== 'sort' && state.value !== 'all') {
          const traits = asset.traits.filter((trait) => trait.trait_type === state.key)
          if (traits.length > 0) {
            if (this.hasPlusString(state.value)) {
              const num = Number(state.value.replace('+', ''))
              return traits[0].value >= num
            } else {
              return traits[0].value === state.value
            }
          } else {
            return false
          }
        } else {
          return true
        }
      })
      return !state.includes(false)
    })
    this.filteredAssets = filteredAssets
  }

  hasPlusString(string) {
    return isNaN(string) ? string.indexOf('+') !== -1 : false
  }

  async updateOrders(contractAddress) {
    this.loading = true
    const refinedOrders = await this.$satellites.getOrders(contractAddress)
    const assets = await this.getAssetDataForOrders(refinedOrders, contractAddress)
    this.assets = assets
    this.filteredAssets = assets
    this.loading = false
  }

  async getAssetDataForOrders(refinedOrders, contractAddress) {
    const assets: any = []
    if (Object.keys(refinedOrders).length !== 0) {
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
    }
    return assets
  }
}
</script>
