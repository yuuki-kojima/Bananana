import { config } from './config'
import { constant } from './constant'
const Web3 = require('web3')

const setAssetsMeta = (assets) => {
  return assets.map((asset) => {
    let assetMeta = null
    const address = asset.asset_contract.address
    const token = config.tokens.find((token) => token.contract === address)
    token.setAssetMeta ? (assetMeta = token.setAssetMeta(asset)) : (assetMeta = constant.setAssetMeta(asset))
    return assetMeta
  })
}

const computePrice = (price) => {
  const feeRatio = config.defaultRatio / config.feeBase
  const fee = price.times(feeRatio)
  const amount = price.plus(fee)
  return Web3.utils.fromWei(amount.toString())
}

export const utils = {
  setAssetsMeta: setAssetsMeta,
  computePrice: computePrice
}
