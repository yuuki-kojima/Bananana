<template>
  <v-card v-if="asset" class="card">
    <nuxt-link
      :to="{
        name: 'asset',
        query: {
          address: asset.asset_contract.address,
          id: asset.token_id
        }
      }"
    >
      <v-layout column style="height: 100%;">
        <div class="pb-2"><v-img class="mx-auto" :src="asset.image_url" max-width="300px"></v-img></div>
        <div class="asset-main">
          <p class="name">{{ asset.name }}</p>
          <p v-if="asset.order" class="price">Ξ {{ computePrice(asset.order.takerAssetAmount) }}</p>
        </div>
      </v-layout>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
//  const opensea = require('~/assets/img/opensea-logomark-flat-colored-blue.png')

@Component
export default class Common extends Vue {
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
p {
  color: black;
  margin: 0;
}
.asset-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
.name {
  width: 70%;
}
.price {
  font-weight: bold;
  font-size: 15px;
}
.card {
  height: calc(100% - 16px);
}
</style>
