<template>
  <v-layout row wrap>
    <v-flex :key="asset.token_id" xs12 md4 offset-md4>
      <Asset class="pa-2" :asset="asset"></Asset>
      <Buttons :asset="asset" :update-asset="updateAsset"></Buttons>
      <!--<AssetInfo :asset="asset"></AssetInfo>-->
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Asset from '~/components/molecules/Asset.vue'
import Buttons from '~/components/molecules/Buttons.vue'
// import AssetInfo from '~/components/molecules/details/CryptoSpellsAssetInfo.vue'

@Component({
  components: {
    Asset,
    Buttons
    // AssetInfo
  }
})
export default class Assets extends Vue {
  @Prop() asset
  @Prop() updateAsset
}
</script>
