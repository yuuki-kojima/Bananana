import assetView from '@/components/molecules/assets/Mycryptoheroes.vue'

const setAssetMeta = (asset) => {
  return {
    price: asset.order ? asset.order.takerAssetAmount : null,
    image: asset.image_url,
    address: asset.asset_contract.address,
    tokenId: asset.token_id,
    order: asset.order && asset.order,
    rarity: asset.traits.find((trait) => trait.trait_type === 'rarity').value,
    level: asset.traits.find((trait) => trait.trait_type === 'lv').value,
    name: asset.description
      .replace('ExtensionName: ', '')
      .replace(/Nickname:.*/, '')
      .trim(),
    ownerAddress: asset.owner.address
  }
}

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
  ],
  assetView: assetView,
  setAssetMeta: setAssetMeta
}

export default dappElement
