// interface DappsObj {
//   contract: string,
//   symbol: string,
//   name: string,
//   url: string
// }

// const dapps: {[dappName: string]: DappsObj} = {
//   cryptospells: {
//     contract: '0x67cbbb366a51fff9ad869d027e496ba49f5f6d55',
//     symbol: 'CSPL',
//     name: 'CryptoSpells',
//     url: 'cryptospells'
//   }
// }

const dappAddresses: { [dappName: string]: string } = {
  cryptospells: '0x67cbbb366a51fff9ad869d027e496ba49f5f6d55',
  bbb: '0x84f6261350151dc9cbf5b33c5354fe9a82166e26'
}

export const constant = {
  // dapps: dapps
  dappAddresses: dappAddresses
}
