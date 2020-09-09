import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CartProvider, useCart, shopifyClient } from '../.'

const client = shopifyClient.buildClient({
  domain: 'airsign-co.myshopify.com',
  storefrontAccessToken: '84aaa88f572f6ffabb3c83b0bfbc7365',
})

const App = () => {
  return (
    <div>
      <CartProvider client={client}>
        <CartConsumer />
      </CartProvider>
    </div>
  )
}

const CartConsumer = () => {
  const cart = useCart()

  return (
    <div>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
