export declare type TokenInfo = {
  address: string
  symbol: string
  name: string
  decimals: number
  logoURI: string
  domainVersion: string
  eip2612: boolean
  isFoT: boolean
  tags: string[]
}

export declare type SwapResult = {
  dstAmount: string
  protocols: { name: string; part: number; fromToken: string; toToken: string }[]
  tx: {
    from: string
    to: string
    data: string
    value: string
    gas: number
    gasPrice: string
  }
}

export declare type QuoteResult = {
  dstAmount: string
  protocols: { name: string; part: number; fromToken: string; toToken: string }[]
}

export class OneInchApi {
  referrer = '0x43dc92966581F9Af14E4aE886A892DE4Aa53c19A'

  feeAmount = 1

  defaultSlippage = 5

  supportedChains = {
    ethereum: 1,
    binance: 56,
    polygon: 137
  }

  BASE_URL = 'https://api.1inch.dev/swap/v6.0'

  API_KEY

  constructor(key) {
    this.API_KEY = key
  }

  _fetch = async (URL, init?: RequestInit) => {
    if (!init?.headers?.['Authorization']) {
      init = init ?? {}
      init.headers = init.headers ?? {}
      init.headers['Authorization'] = `Bearer ${this.API_KEY}`
    }
    try {
      const response = await fetch(URL, init)
      if (response.status === 200) {
        return response.json()
      } else {
        return new Error(await response.text())
      }
    } catch (error) {
      console.warn(error)
    }
  }

  tokens = async (chainId: number): Promise<{ [index: string]: TokenInfo }> => {
    const URL = `${this.BASE_URL}/${chainId}/tokens`
    return (await this._fetch(URL)).tokens
  }

  quote = async (chainId: number, tokenIn, tokenOut, amount, fee?): Promise<QuoteResult> => {
    const URL = `${this.BASE_URL}/${chainId}/quote`
    if (fee && Number(fee) < this.feeAmount) {
      fee = this.feeAmount
    }
    return this._fetch(
      `${URL}?src=${tokenIn}&dst=${tokenOut}&amount=${amount}&fee=${fee}&includeProtocols=true&includeGas=true`
    )
  }

  swap = async (
    chainId: number,
    tokenIn: string,
    tokenOut: string,
    amount: string,
    from: string,
    slippage?: number,
    fee?: number
  ): Promise<SwapResult> => {
    const URL = `${this.BASE_URL}/${chainId}/swap`
    if (fee && Number(fee) < this.feeAmount) {
      fee = this.feeAmount
    }
    return this._fetch(
      `${URL}?src=${tokenIn}&dst=${tokenOut}&amount=${amount}&from=${from}&origin=${from}&fee=${fee}&slippage=${
        slippage ?? this.defaultSlippage
      }&referrer=${this.referrer}&includeProtocols=true&includeGas=true`
    )
  }

  routerAddres = async (chainId) => {
    const URL = `${this.BASE_URL}/${chainId}/approve/spender`
    return this._fetch(URL)
  }

  approve = async (chainId, tokenAddress, amount?) => {
    if (!amount) amount = '100000000000'
    const URL = `${this.BASE_URL}/${chainId}/approve/transaction?tokenAddress=${tokenAddress}&amount=${amount}`
    return this._fetch(URL)
  }

  allowance = async (chainId, tokenAddress, spender) => {
    const URL = `${this.BASE_URL}/${chainId}/approve/allowance?tokenAddress=${tokenAddress}&walletAddress=${spender}`
    return this._fetch(URL)
  }
}

// console.log(await tokens(56))

// console.log(
//   await quote(
//     56,
//     '0x8FFfED722C699848d0c0dA9ECfEde20e8ACEf7cE',
//     '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
//     '10000000000'
//   )
// )

// console.log(
//   await swap(
//     56,
//     '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
//     '0x8FFfED722C699848d0c0dA9ECfEde20e8ACEf7cE',
//     '10000000000',
//     '0xF52D485Eceba4049e92b66df0Ce60fE19589a0C1'
//   )
// )
