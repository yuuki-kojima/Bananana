export const state = () => ({
  address: '',
  balance: 0
})

export const getters = {
  account: state => {
    const account = {
      address:state.address,
      balance:state.balance,
    }
    return account
  }
}

export const mutations = {
  setAccount(state, account) {
    state.address = account.address
    state.balance = account.balance
  }
}

export const actions = {
  async setAccount({ state, commit }, account) {
    commit('setAccount', account)
  }
}