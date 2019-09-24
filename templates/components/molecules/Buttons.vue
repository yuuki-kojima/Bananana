<template>
  <v-card flat>
    <v-layout row justify-center>
      <v-card-actions class="justify-center">
        <v-btn
          v-if="asset.owner.address !== this.$store.state.address && asset.order"
          small
          color="primary"
          @click.stop="executeBuy"
          >Buy<v-icon small right>add_shopping_cart</v-icon></v-btn
        >
        <v-btn
          v-if="asset.owner.address === this.$store.state.address && asset.order"
          small
          color="primary"
          @click.stop="executeCancel"
          >Cancel<v-icon small right>money_off</v-icon></v-btn
        >
        <v-btn
          v-if="asset.owner.address === this.$store.state.address && !asset.order"
          small
          color="primary"
          @click.stop="sell"
          >Sell<v-icon small right>attach_money</v-icon></v-btn
        >
        <v-btn
          v-if="asset.owner.address === this.$store.state.address && !asset.order"
          small
          color="primary"
          @click.stop="gift"
          >Gift<v-icon small right>card_giftcard</v-icon></v-btn
        >
        <v-dialog v-model="dialogDisplay" max-width="500">
          <v-card class="pa-3">
            <div v-if="dialogKey == 1">
              <v-card-title>
                <span class="grey--text">Input Receiver Address.</span>
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="giftToAddress" label="address" placeholder="0x..."></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="closeDialog">
                  Cancel
                </v-btn>
                <v-btn color="primary" flat @click="executeGift">
                  Confirm
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="dialogKey == 2">
              <v-card-title>
                <span class="grey--text">Input Price. It will be sold with {{ computeFee() }}% fee. </span>
              </v-card-title>
              <v-card-text>
                <v-text-field v-model="takerAssetAmount" label="Amount(ETH)" placeholder="ETH"></v-text-field>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="closeDialog">
                  Cancel
                </v-btn>
                <v-btn color="primary" flat @click="executeSell">
                  Confirm
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="dialogKey == 3">
              <v-card-title>
                <p class="title mx-auto">Initialize your account first!</p>
              </v-card-title>
              <v-card-text>
                <p>
                  To approve Bananana to trade this token, you must first complete a free (plus gas) transaction.
                </p>
                <p>
                  Keep this tab open while we wait for the blockchain to confirm your action. This only needs to be done
                  once for all these items.
                </p>
              </v-card-text>
              <img class="d-block mx-auto" src="@/assets/img/loading/preloader.gif" width="100" />
              <div align="center">
                <p align="center">
                  WAITING FOR BLOCKCHAIN CONFIRMATION...
                </p>
                <v-btn v-if="etherscan" :href="etherscan" target="_blank" color="success" dark>View Transaction</v-btn>
              </div>
            </div>
            <div v-if="dialogKey == 4">
              <v-card-title>
                <span class="title mx-auto">Please Confirm Transaction on Web3 Wallet.</span>
              </v-card-title>
              <img class="d-block mx-auto" src="@/assets/img/loading/preloader.gif" width="100" />
              <div align="center">
                <p align="center">
                  WAITING FOR BLOCKCHAIN CONFIRMATION...
                </p>
                <v-btn v-if="etherscan" :href="etherscan" target="_blank" color="success" dark>View Transaction</v-btn>
              </div>
            </div>
            <div v-if="dialogKey == 5">
              <v-card-title>
                <span class="title mx-auto">Please Confirm Transaction by Signature.</span>
              </v-card-title>
              <img class="d-block mx-auto" src="@/assets/img/loading/preloader.gif" width="100" />
            </div>
            <div v-if="dialogKey == 6">
              <v-card-title>
                <span class="title mx-auto">Buying Successful!</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="reload">
                  Reload
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="dialogKey == 7">
              <v-card-title>
                <span class="title mx-auto">Listing Successful!</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="reload">
                  Reload
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="dialogKey == 8">
              <v-card-title>
                <span class="title mx-auto">Cancel Successful!</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="reload">
                  Reload
                </v-btn>
              </v-card-actions>
            </div>
            <div v-if="dialogKey == 9">
              <v-card-title>
                <span class="title mx-auto">Gift Successful!</span>
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" flat @click="reload">
                  Reload
                </v-btn>
              </v-card-actions>
            </div>
          </v-card>
        </v-dialog>
      </v-card-actions>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Buttons extends Vue {
  dialogDisplay = false
  dialogKey = 0
  giftToAddress = ''
  takerAssetAmount = 0
  etherscan = ''

  @Prop() asset
  reload() {
    location.reload()
  }
  computeFee() {
    return this.$config.defaultRatio / this.$config.feePer
  }
  openDialog(dialogKey) {
    this.dialogDisplay = true
    this.dialogKey = dialogKey
  }
  closeDialog() {
    this.dialogDisplay = false
  }
  gift() {
    this.openDialog(1)
  }
  async executeGift() {
    this.openDialog(4)
    const txhash = await this.$satellites.gift(
      this.asset.asset_contract.address,
      this.giftToAddress,
      this.$store.state.address,
      this.asset.token_id
    )
    this.etherscan = `${this.$config.etherscan}${txhash}`
    await this.$satellites.web3Wrapper.awaitTransactionSuccessAsync(txhash)
    this.openDialog(9)
  }
  async sell() {
    const approved = await this.$satellites.erc721Token.isApprovedForAllAsync(
      this.asset.asset_contract.address,
      this.$store.state.address,
      this.$satellites.contractAddresses.erc721Proxy
    )
    if (!approved) {
      await this.executeApprove()
    } else {
      this.openDialog(2)
    }
  }

  async executeSell() {
    this.openDialog(5)
    await this.$satellites.sell(
      this.$store.state.address,
      this.asset.asset_contract.address,
      this.asset.token_id,
      this.takerAssetAmount
    )
    this.openDialog(7)
  }

  async executeApprove() {
    this.openDialog(3)
    const txhash = await this.$satellites.erc721Token.setApprovalForAllAsync(
      this.asset.asset_contract.address,
      this.$store.state.address,
      this.$satellites.contractAddresses.erc721Proxy,
      true
    )
    this.etherscan = `${this.$config.etherscan}${txhash}`
    await this.$satellites.web3Wrapper.awaitTransactionSuccessAsync(txhash)
    this.openDialog(2)
  }

  async executeBuy() {
    this.openDialog(4)
    const fees: number[] = []
    const recipients: string[] = []

    for (let i = 0; i < this.$config.feeDistribution.length; i++) {
      const ratio = this.$config.feeDistribution[i].ratio / this.$config.feeBase
      const fee = this.asset.order.takerAssetAmount.times(ratio)
      fees.push(fee)
      recipients.push(this.$config.feeDistribution[i].recipient)
    }

    const txhash = await this.$satellites.buy(this.$store.state.address, this.asset.order, recipients, fees)
    this.etherscan = `${this.$config.etherscan}${txhash}`
    await this.$satellites.web3Wrapper.awaitTransactionSuccessAsync(txhash)
    this.openDialog(6)
  }

  async executeCancel() {
    this.openDialog(4)
    const txhash = await this.$satellites.cancel(this.asset.order)
    this.etherscan = `${this.$config.etherscan}${txhash}`
    await this.$satellites.web3Wrapper.awaitTransactionSuccessAsync(txhash)
    this.openDialog(8)
  }
}
</script>
