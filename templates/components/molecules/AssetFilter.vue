<template>
  <v-layout row wrap>
    <v-select
      v-model="filter.initialOption"
      :items="filter.options"
      item-text="text"
      item-value="value"
      :label="filter.key.text"
      return-object
      @change="changeFilter(filter.key.value, $event)"
    ></v-select>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class AssetFilter extends Vue {
  @Prop() filter
  @Prop() updateFilterState

  changeFilter(key, event) {
    const payload = { key: key, value: event.value }
    this.updateFilterState(payload)
  }
}
</script>
