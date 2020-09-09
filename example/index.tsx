import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {
  CartProvider,
  useCart,
  Client,
  CheckoutLink,
  CloseCartButton,
  Collection as CollectionType,
} from '../.'
import './app.css'
import './normalize.css'

import Collection from './components/Collection'

const cn = (arr: (string | false | null)[]) => arr.filter(a => a).join(' ')

// Remember to clear cookies when switching values
const client = Client.buildClient({
  domain: 'pistils-nursery.myshopify.com',
  storefrontAccessToken: 'ffb71a0587c96b47c38e04c33d5b5dd2',
})

const App = () => {
  return (
    <div>
      <CartProvider client={client}>
        <CartConsumer />
        <ProductGrid />
      </CartProvider>
    </div>
  )
}

const ProductGrid = () => {
  const [collections, setCollections] = React.useState<CollectionType[] | null>(
    null
  )

  React.useEffect(() => {
    client.collection
      .fetchAllWithProducts()
      .then((res: CollectionType[]) => setCollections(res))
  }, [])

  return (
    <div>
      <h2>Collections</h2>
      {collections
        ? collections.map(collection => (
            <Collection key={collection.handle} data={collection} />
          ))
        : 'Loading collections...'}
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
