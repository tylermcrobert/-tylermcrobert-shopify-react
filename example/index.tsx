import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  CartProvider,
  useCart,
  Client,
  CheckoutLink,
  CloseCartButton,
} from '../.'
import './app.css'
import './normalize.css'

const cn = (arr: (string | false | null)[]) => arr.filter(a => a).join(' ')

const client = Client.buildClient({
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
      <button
        className="button"
        onClick={cart.isCartOpen ? cart.closeCart : cart.openCart}
      >
        Cart
      </button>
      <CartPanel />
    </div>
  )
}

const CartPanel = () => {
  const { isCartOpen } = useCart()
  return (
    <div className={cn(['cart', isCartOpen && '-open'])}>
      <div className="f sb">
        <h1>Cart</h1>
        <CloseCartButton />
      </div>
      <CheckoutLink className="button" />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
