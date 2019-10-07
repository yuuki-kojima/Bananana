import cryptospellsElement from '@/dapps/cryptospells'
import mycryptoheroesHeroElement from '@/dapps/mycryptoheroes-hero'
import mycryptoheroesExElement from '@/dapps/mycryptoheroes-ex'
import mycryptoheroesLandElement from '@/dapps/mycryptoheroes-land'

interface DappsObj {
  contract: string
  symbol: string
  name: string
  url: string
  avatar?: string
  filters: object
}

const dapps: { [dappName: string]: DappsObj } = {
  cryptospells: cryptospellsElement,
  'mycryptoheroes-hero': mycryptoheroesHeroElement,
  'mycryptoheroes-ex': mycryptoheroesExElement,
  'mycryptoheroes-land': mycryptoheroesLandElement
}

const dappsDev: { [dappName: string]: DappsObj } = {
  bbb: {
    contract: '0x84f6261350151dc9cbf5b33c5354fe9a82166e26',
    symbol: 'BBB',
    name: 'BB Batch',
    url: 'bbb',
    filters: {}
  }
}

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

export const constant = {
  dapps: dapps,
  dappsDev: dappsDev,
  commonFilter: commonFilter
}
