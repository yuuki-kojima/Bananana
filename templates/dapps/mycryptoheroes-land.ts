const dappElement = {
  contract: '0x617913Dd43dbDf4236B85Ec7BdF9aDFD7E35b340',
  symbol: 'MCHL',
  name: 'MyCryptoHeroes:Land',
  url: 'mycryptoheroes-land',
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
