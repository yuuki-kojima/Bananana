const dappElement = {
  contract: '0xdceaf1652a131f32a821468dc03a92df0edd86ea',
  symbol: 'MCHE',
  name: 'MyCryptoHeroes:Ex',
  url: 'mycryptoheroes-ex',
  avatar: require('@/assets/img/dapp_logo/mycryptoheroes.png'),
  filters: [
    {
      key: { text: 'Rarity', value: 'rarity' },
      initialOption: { text: 'All', value: 'all' },
      options: [
        { text: 'All', value: 'all' },
        { text: 'Common', value: 'Common' },
        { text: 'Uncommon', value: 'Uncommon' },
        { text: 'Rare', value: 'Rare' },
        { text: 'Epic', value: 'Epic' },
        { text: 'Legendary', value: 'Legendary' }
      ]
    }
  ]
}

export default dappElement
