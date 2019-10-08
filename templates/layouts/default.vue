<template>
  <v-app class="white">
    <v-system-bar absolute app height="7px" color="primary"></v-system-bar>
    <Header></Header>
    <nuxt />
    <Footer v-if="this.$route.path === '/' || this.$route.path === '/commercial'"></Footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '~/components/organisms/Header.vue'
import Footer from '~/components/organisms/Footer.vue'

@Component({
  components: {
    Header,
    Footer
  }
})
export default class DefaultLayout extends Vue {}
</script>

<style>
a {
  text-decoration: none;
}

a:link {
  color: black;
}

a:visted {
  color: black;
}

li {
  list-style: none;
}
.application--wrap {
  background-color: #f9f9f9;
}
</style>
