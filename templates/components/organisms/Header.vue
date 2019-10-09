<template>
  <v-toolbar absolute clipped-left app class="white">
    <nuxt-link :to="`/`"><v-btn flat color="primary">Bananana</v-btn></nuxt-link>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="this.$store.state.address" flat color="primary" to="/mypage">
        MyPage
      </v-btn>
      <v-btn v-if="this.$store.state.address" flat color="primary" :to="`/shop/${this.$store.state.address}`">
        MyShop
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn flat color="primary" v-on="on">
            Market
          </v-btn>
        </template>
        <v-list>
          <v-list-tile v-for="token in this.$config.tokens" :key="token.contract">
            <nuxt-link :to="`/${token.url}`">
              <v-btn flat color="primary">{{ token.name }}</v-btn>
            </nuxt-link>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {}
</script>
