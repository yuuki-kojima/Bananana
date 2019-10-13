<template>
  <v-card v-if="asset" class="card">
    <nuxt-link
      :to="{
        name: 'asset',
        query: {
          address: asset.address,
          id: asset.tokenId
        }
      }"
    >
      <v-layout column style="height: 100%;">
        <div class="image pb-2"><v-img class="mx-auto" :src="asset.image" max-width="300px"></v-img></div>
        <div class="asset-main">
          <div class="asset-main-left">
            <p>{{ asset.name }}</p>
            <p class="token-id grey--text">#{{ asset.tokenId }}</p>
          </div>
          <p v-if="asset.order" class="price">Ξ {{ this.$utils.computePrice(asset.price) }}</p>
        </div>
      </v-layout>
    </nuxt-link>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Cryptospells extends Vue {
  @Prop() asset
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
}
.asset-main-left {
  width: 65%;
}
.price {
  font-weight: bold;
  font-size: 15px;
}
.card {
  height: calc(100% - 16px);
}
</style>
