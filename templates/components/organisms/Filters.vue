<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center justify-center" align="center">
        <v-flex xs6 md2>
          <v-btn rounded color="blue" dark xs6 md2 v-on="on">Filter</v-btn>
        </v-flex>
        <v-flex v-for="(filter, index) in sortFilters" :key="index" xs6 md2>
          <AssetFilter :filter="filter" :update-filter-state="updateFilterState" class="pa-3"></AssetFilter>
        </v-flex>
      </div>
    </template>
    <v-card class="pa-3">
      <v-flex v-for="(filter, index) in dappFilters" :key="index">
        <AssetFilter :filter="filter" :update-filter-state="updateFilterState" class="mx-3"></AssetFilter>
      </v-flex>
      <div align="center" class="pb-3">
        <v-btn outlined color="blue" @click="dialog = false">Close</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import AssetFilter from '~/components/molecules/AssetFilter.vue'

@Component({
  components: {
    AssetFilter
  }
})
export default class Filters extends Vue {
  @Prop() dappFilters
  @Prop() sortFilters
  @Prop() updateFilterState
  dialog = false
}
</script>
