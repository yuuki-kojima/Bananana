declare module '*.vue' {
  module 'vue/types/vue' {
    interface Vue {
      $config: any
      $constant: any
      $utils: any
      $satellites: any
      $web3: any
      $exceptions: any
    }
  }
}
