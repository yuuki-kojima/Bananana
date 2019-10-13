<template>
  <v-content>
    <v-container>
      <Loading v-if="loading"></Loading>
      <Filters
        v-if="assets.length > 0 && !loading"
        :sort-filters="sortFilters"
        :dapp-filters="dappFilters"
        :update-filter-state="updateFilterState"
      ></Filters>
      <Assets v-if="assets && !loading" :assets="filteredAssets"></Assets>
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
  assets: any[] = []
  filteredAssets: any[] = []
  sortFilters: any[] = []
  dappFilters: any[] = []
  filterState: any[] = []
  loading = true
  async mounted() {
    // Initialize Order
    const dappName = this.$route.params.dapp
    let contractAddress
    const token = this.$config.tokens.find((token) => token.url === dappName)
    if (token) {
      contractAddress = [token.contract]
      await this.updateOrders(contractAddress)
      // Set Filter Item
      this.sortFilters = this.$constant.commonFilter
      this.dappFilters = token.filters
      this.setInitialFilterState()
    } else {
      this.$router.push('/')
    }
  }

  setInitialFilterState() {
    const filters = [...this.dappFilters, ...this.sortFilters]
    this.filterState = filters.map((filter) => {
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
              result = a.price.c[0] < b.price.c[0] ? -1 : 1
              break
            case 'highest':
              result = a.price.c[0] < b.price.c[0] ? 1 : -1
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
          if (asset[state.key]) {
            if (this.hasPlusString(state.value)) {
              const num = Number(state.value.replace('+', ''))
              return asset[state.key] >= num
            } else {
              return asset[state.key] === state.value
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
    const shapedAssets = this.$utils.setAssetsMeta(assets)
    this.assets = shapedAssets
    this.filteredAssets = shapedAssets
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
