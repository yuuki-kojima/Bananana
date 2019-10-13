import cryptospellsElement from '@/dapps/cryptospells'
import mycryptoheroesHeroElement from '@/dapps/mycryptoheroes-hero'
import mycryptoheroesExElement from '@/dapps/mycryptoheroes-ex'
import mycryptoheroesLandElement from '@/dapps/mycryptoheroes-land'
import commonViewLayout from '@/components/molecules/assets/Common.vue'

interface DappsObj {
  contract: string
  symbol: string
  name: string
  url: string
  avatar?: string
  filters: object
}

const dapps: DappsObj[] = [
  cryptospellsElement,
  mycryptoheroesHeroElement,
  mycryptoheroesExElement,
  mycryptoheroesLandElement
]

const dappsDev: DappsObj[] = [
  {
    contract: '0x84f6261350151dc9cbf5b33c5354fe9a82166e26',
    symbol: 'BBB',
    name: 'BB Batch',
    url: 'bbb',
    filters: []
  }
]

const commonFilter = [
  {
    key: { text: 'Sort', value: 'sort' },
    initialOption: { text: 'Recently Listed', value: 'recently' },
    options: [
      { text: 'Recently Listed', value: 'recently' },
      { text: 'Lowest Price', value: 'lowest' },
      { text: 'Highest Price', value: 'highest' }
    ]
  }
]

const setAssetMeta = (asset) => {
  return {
    name: asset.name,
    price: asset.order ? asset.order.takerAssetAmount : null,
    image: asset.image_url,
    address: asset.asset_contract.address,
    tokenId: asset.token_id,
    order: asset.order && asset.order,
    ownerAddress: asset.owner.address
  }
}

const commonView = commonViewLayout

export const constant = {
  dapps: dapps,
  dappsDev: dappsDev,
  commonFilter: commonFilter,
  commonView: commonView,
  setAssetMeta: setAssetMeta
}
