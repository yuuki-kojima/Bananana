const dappElement = {
  contract: '0x67cbbb366a51fff9ad869d027e496ba49f5f6d55',
  symbol: 'CSPL',
  name: 'CryptoSpells',
  url: 'cryptospells',
  avatar: require('@/assets/img/dapp_logo/cryptospells.png'),
  filters: [
    {
      key: { text: 'Rarity', value: 'rarity' },
      initialOption: { text: 'All', value: 'all' },
      options: [
        { text: 'All', value: 'all' },
        { text: 'Gold', value: 'gold' },
        { text: 'Legendary', value: 'legendary' }
      ]
    },
    {
      key: { text: 'Color', value: 'color' },
      initialOption: { text: 'All', value: 'all' },
      options: [
        { text: 'All', value: 'all' },
        { text: 'Neutral', value: 'neutral' },
        { text: 'Red', value: 'red' },
        { text: 'Blue', value: 'blue' },
        { text: 'Green', value: 'green' },
        { text: 'White', value: 'white' },
        { text: 'Black', value: 'black' }
      ]
    },
    {
      key: { text: 'Cost', value: 'cost' },
      initialOption: { text: 'All', value: 'all' },
      options: [
        { text: 'All', value: 'all' },
        { text: '1', value: 1 },
        { text: '2', value: 2 },
        { text: '3', value: 3 },
        { text: '4', value: 4 },
        { text: '5', value: 5 },
        { text: '6', value: 6 },
        { text: '7', value: 7 },
        { text: '8', value: 8 },
        { text: '9+', value: '9+' }
      ]
    }
  ]
}

export default dappElement