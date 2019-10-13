<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <div class="d-flex align-center justify-center" align="center">
        <v-flex xs6 md2>
          <v-btn outlined color="primary" dark xs6 md2 v-on="on">Share Text</v-btn>
        </v-flex>
        <v-flex xs6 md2>
          <TwitterButton></TwitterButton>
        </v-flex>
      </div>
    </template>
    <v-card class="pa-3" style="position: relative">
      <v-snackbar v-model="snackbar" color="info" class="ma-2 text-center" timeout="2000" absolute top>
        Copied
      </v-snackbar>
      <v-textarea v-if="shopOwner" :value="shareText" rows="15"></v-textarea>
      <div align="center" class="pb-3">
        <v-btn outlined color="primary" @click="execCopy()">Copy Text</v-btn>
        <v-btn outlined color="primary" @click="dialog = false">Close</v-btn>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import TwitterButton from '~/components/organisms/TwitterButtons.vue'

@Component({
  components: {
    TwitterButton
  }
})
export default class ShareShop extends Vue {
  @Prop() shopOwner
  @Prop() shareText
  dialog = false
  snackbar = false

  execCopy() {
    const textarea = document.getElementsByTagName('textarea')[0]
    textarea.select()
    document.execCommand('copy')
    this.snackbar = true
  }
}
</script>
