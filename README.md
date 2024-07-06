# swap-api

## examples

### 1inch

```js
const api = new Api('1inch', API_KEY)

api.supportedChains // 1, 56, 137

await api.tokens(api.supportedChains.binance)

const quoteResult = await api.quote(tokenIn, tokenOut, amount)

const swapResult = await api.swap(tokenIn, tokenOut, amount, from)

signer.sign(swapResult.tx)

const addressToApprove = await apit.routerAddress() // note: not needed to perform approve
```
