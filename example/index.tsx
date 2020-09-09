import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CartProvider, useCart } from '../.'

const App = () => {
  return (
    <div>
      <CartProvider
        domain="airsign-co.myshopify.com"
        accessToken="84aaa88f572f6ffabb3c83b0bfbc7365"
        fetch={null}
      >
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
