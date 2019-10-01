interface DappsObj {
  contract: string
  symbol: string
  name: string
  url: string
}

const dapps: { [dappName: string]: DappsObj } = {
  cryptospells: {
    contract: '0x67cbbb366a51fff9ad869d027e496ba49f5f6d55',
    symbol: 'CSPL',
    name: 'CryptoSpells',
    url: 'cryptospells'
  }
}

const dappsDev: { [dappName: string]: DappsObj } = {
  bbb: {
    contract: '0x84f6261350151dc9cbf5b33c5354fe9a82166e26',
    symbol: 'BBB',
    name: 'BB Batch',
    url: 'bbb'
  }
}

const commonSearchItem: { [searchItem: string]: string } = {
  recentlyListed: 'Recently Listed',
  lowestPrice: 'Lowest Price',
  highestPrice: 'Highest Price'
}

export const constant = {
  dapps: dapps,
  dappsDev: dappsDev,
  commonSearchItem: commonSearchItem
}
