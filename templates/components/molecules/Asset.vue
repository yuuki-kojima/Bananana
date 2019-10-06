<template>
  <v-card v-if="asset" flat>
    <nuxt-link
      :to="{
        name: 'asset',
        query: {
          address: asset.asset_contract.address,
          id: asset.token_id
        }
      }"
    >
      <v-img class="mx-auto" :src="asset.image_url" max-width="300px">
        <v-chip class="ma-2 opacity" color="grey darken-4" label text-color="white">
          Ξ {{ computePrice(asset.order.takerAssetAmount) }}
        </v-chip>
      </v-img>
      <v-card-title class="justify-center">
        <span class="grey--text body-2">{{ asset.name }}</span>
      </v-card-title>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Asset extends Vue {
  @Prop() asset
  computePrice(price) {
    const feeRatio = this.$config.defaultRatio / this.$config.feeBase
    const fee = price.times(feeRatio)
    const amount = price.plus(fee)
    return this.$web3.utils.fromWei(amount.toString())
  }
}
</script>

<style scoped>
.opacity {
  opacity: 0.85;
}
</style>
