<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <div align="center">
        <v-btn outlined color="primary" dark v-on="on">Filter</v-btn>
      </div>
    </template>
    <v-card>
      <v-flex v-for="(filter, index) in filters" :key="index">
        <AssetFilter :filter="filter" :update-filter-state="updateFilterState" class="pa-3"></AssetFilter>
      </v-flex>
      <div align="center" class="pb-3">
        <v-btn outlined color="primary" @click="dialog = false">Close</v-btn>
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
  @Prop() filters
  @Prop() updateFilterState
  dialog = false
}
</script>
