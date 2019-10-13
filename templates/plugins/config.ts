import { constant } from './constant'

const networkId = 1
const ga = 'UA-120397644-6'
const feeBase = 10000
const feePer = 100
const satellitesAddress = '0x764Fe0b6dF8575b30bCfd0c9Bb2A7ADb390b5359'
const satellitesFeeRatio = 0
const ownerAddress = '0x4e66c8fea449D7aC5C2a55061c0FCf24C4106A9c'
const ownerFeeRatio = 0

const networkIdToInfura: { [networkId: number]: string } = {
  1: 'https://mainnet.infura.io/',
  4: 'https://rinkeby.infura.io/'
}

const networkIdToEtherscan: { [networkId: number]: string } = {
  1: 'https://etherscan.io/tx/',
  4: 'https://rinkeby.etherscan.io/tx/'
}

const networkIdToRelayer: { [networkId: number]: string } = {
  1: 'https://relayer-mainnet.nftsatellites.com/v2/',
  4: 'https://zerox-relayer-test.herokuapp.com/v2/'
}

const networkIdToAPI: { [networkId: number]: string } = {
  1: `https://api.opensea.io/api/v1/`,
  4: `https://rinkeby-api.opensea.io/api/v1/`
}

const networkIdToTokens: { [networkId: number]: any } = {
  1: constant.dapps,
  4: constant.dappsDev
}

const feeDistribution = [
  // first fee recipient is satellites address. This Fee goes to issueHunt and is returned to the developer.
  {
    recipient: satellitesAddress,
    ratio: satellitesFeeRatio
  },
  {
    recipient: ownerAddress,
    ratio: ownerFeeRatio
  }
]

let defaultRatio = 0

for (let i = 0; i < feeDistribution.length; i++) {
  defaultRatio += Number(feeDistribution[i].ratio)
}

const whitelists: any[] = []
for (let i = 0; i < Object.keys(networkIdToTokens[networkId]).length; i++) {
  whitelists.push(Object.entries(networkIdToTokens[networkId])[i][1].contract)
}

export const config = {
  networkId: networkId,
  relayer: networkIdToRelayer[networkId],
  ga: ga,
  infura: networkIdToInfura[networkId],
  etherscan: networkIdToEtherscan[networkId],
  api: networkIdToAPI[networkId],
  tokens: networkIdToTokens[networkId],
  whitelists: whitelists,
  feeDistribution: feeDistribution,
  defaultRatio: defaultRatio,
  feeBase: feeBase,
  feePer: feePer
}
