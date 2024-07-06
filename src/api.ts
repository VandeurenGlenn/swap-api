import { OneInchApi } from './1inch/api.js'

export default class SwapApiRouter {
  api: OneInchApi
  constructor(target, key) {
    if (target === '1inch') this.api = new OneInchApi(key)
  }

  get tokens() {
    return this.api.tokens
  }
  get quote() {
    return this.api.quote
  }

  get swap() {
    return this.api.swap
  }

  get routerAddres() {
    return this.api.routerAddres
  }
  get approve() {
    return this.api.approve
  }
  get allowance() {
    return this.api.allowance
  }
}
