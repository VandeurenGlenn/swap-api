import { OneInchApi } from './1inch/api.js'

export class SwapApiRouter {
  constructor(target, key) {
    if (target === '1inch') return new OneInchApi(key)
  }
}
