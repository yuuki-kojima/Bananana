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
      <v-layout column>
        <div class="asset-meta">
          <p class="rarity">{{ rarity }}</p>
          <p class="lv">lv {{ lv }}</p>
        </div>
        <div class="image pb-2"><v-img class="mx-auto" :src="asset.image_url" max-width="300px"></v-img></div>
        <div class="asset-main">
          <p>{{ name }}</p>
          <p class="token-id grey--text">#{{ asset.name.replace(/.*#/, '') }}</p>
          <p v-if="asset.order">Ξ {{ computePrice(asset.order.takerAssetAmount) }}</p>
        </div>
      </v-layout>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Common extends Vue {
  @Prop() asset
  rarity = this.asset.traits.find((trait) => trait.trait_type === 'rarity').value
  lv = this.asset.traits.find((trait) => trait.trait_type === 'level').value
  name = this.asset.name.replace(/#.*/, '')
  mounted() {
    console.log(this.asset)
  }
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
.token-id {
  font-size: 13px;
}
.asset-meta {
  display: flex;
  justify-content: space-between;
}
.asset-main {
  margin-top: auto;
}
.card {
  box-sizing: border-box;
}
</style>
