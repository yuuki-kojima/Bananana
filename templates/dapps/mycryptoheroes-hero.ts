import assetView from '@/components/molecules/assets/Mycryptoheroes.vue'

const dappElement = {
  contract: '0x273f7f8e6489682df756151f5525576e322d51a3',
  symbol: 'MCHH',
  name: 'MyCryptoHeroes:Hero',
  url: 'mycryptoheroes-hero',
  avatar: require('@/assets/img/dapp_logo/mycryptoheroes.png'),
  filters: [
    {
      key: { text: 'Rarity', value: 'rarity' },
      initialOption: { text: 'All', value: 'all' },
      options: [
        { text: 'All', value: 'all' },
        { text: 'Uncommon', value: 'Uncommon' },
        { text: 'Rare', value: 'Rare' },
        { text: 'Epic', value: 'Epic' },
        { text: 'Legendary', value: 'Legendary' }
      ]
    }
  ],
  assetView: assetView
}

export default dappElement
