<template>
  <section class="container">
    <div>
      <h1 class="title mb-3">
        Bananana
      </h1>
      <h2 class="sub mb-5">
        NFT exchange with 0% commission
      </h2>
      <div class="mb-4">
        Currently, the following NFT transactions are supported.
      </div>
      <ul class="dapps">
        <li v-for="token in tokens" :key="token.contract">
          <nuxt-link class="flex" :to="`/${token.url}`">
            <div class="dapp-logo mr-3">
              <img :src="token.avatar" width="100%" />
            </div>
            <p class="dapp-name black--text" light>{{ token.name }}</p>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component
export default class Index extends Vue {
  tokens = this.$config.tokens
  head() {
    return {
      titleTemplate: ''
    }
  }
}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 90px;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 65px !important;
  color: #35495e;
  letter-spacing: 1px;
}

.sub {
  color: #35495e;
  font-size: 18px;
}

ul {
  padding: 0;
}

.dapps .flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.dapp-logo {
  width: 80px;
}

.dapp-name {
  font-size: 30px;
}
</style>
