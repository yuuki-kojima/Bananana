<template>
  <section class="container">
    <h2 class="mb-4">特定商取引法に基づく表記</h2>
    <section>
      <h3>URL</h3>
      <p>https://bananana.io</p>
      <h3>E-mail</h3>
      <p>info@bananana.io</p>
      <h3>販売価格</h3>
      <p>販売価格は各商品に表記された価格に準じます。</p>
      <h3>送料</h3>
      <p>送料はかかりません。</p>
      <h3>商品代金以外の必要経費</h3>
      <p>
        商品の購入・出品準備・出品のキャンセル時、イーサリアムのトランザクションを発生させるための手数料（Gas代）が必要です。
        手数料は一定ではなく、イーサリアムで支払われます。
      </p>
      <h3>商品引渡し時期</h3>
      <p>購入した商品は、本サービスを利用する際に使用したウォレットに送られます。</p>
      <h3>お支払い方法</h3>
      <p>購入取引完了時に直ちに仮想通貨（イーサリアム）でお支払いいただきます。</p>
      <h3>返品について</h3>
      <p>商品の特性上、返品・交換・キャンセルは一切受け付けておりません。</p>
      <h3>推奨環境</h3>
      <p>
        OS:Windows, Mac, iOS, Android<br />
        ブラウザ:Chrome
      </p>
      <p class="caution">
        ※上記以外の事項に関しましては、お取引の際に請求があれば遅延なく提示いたします。
      </p>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Commercial extends Vue {}
</script>

<style scoped>
.container {
  min-height: calc(100vh - 116px);
  margin-top: 71px;
  max-width: 600px;
}

.caution {
  font-size: 13px;
}
</style>
