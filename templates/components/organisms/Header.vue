<template>
  <v-app-bar absolute clipped-left app dark color="blue">
    <v-toolbar-title class="title">
      <nuxt-link to="/">
        <span class="white--text">Bananana</span>
      </nuxt-link>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn v-if="this.$store.state.address" text color="primary" to="/mypage">
        MyPage
      </v-btn>
      <v-menu offset-y>
        <template v-slot:activator="{ on }">
          <v-btn text color="primary" v-on="on">
            Market
          </v-btn>
        </template>
        <v-list rounded>
          <v-list-item-group v-model="tokenLength" color="primary">
            <v-list-item v-for="token in tokens" :key="token.contract">
              <nuxt-link :to="`/${token.url}`">
                <v-list-item-title class="black--text" v-text="token.name"></v-list-item-title>
              </nuxt-link>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </v-toolbar-items>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Header extends Vue {
  tokens = this.$config.tokens
  tokenLength = Object.keys(this.tokens).length
}
</script>
