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
  LineItem,
} from '../.'
import './app.css'
import './normalize.css'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import Collection from './components/Collection'
import Product from './components/Product'

const cn = (arr: (string | false | null)[]) => arr.filter(a => a).join(' ')

// Remember to clear cookies when switching values
export const client = Client.buildClient({
  domain: 'nuggslabs.myshopify.com',
  storefrontAccessToken: '7f207b024ce99ba7022fe599c442cba5',
})

const App = () => {
  return (
    <div>
      <CartProvider client={client}>
        <Router />
      </CartProvider>
    </div>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <CartUI />
      <Switch>
        <Route path="/collections/:id" exact>
          {data => {
            return <Collection handle={data.match?.params.id} />
          }}
        </Route>
        <Route path="/product/:id" exact>
          {data => {
            return <Product handle={data.match?.params.id} />
          }}
        </Route>
        <Route path="/" exact>
          <CollectionsList />
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

const CollectionsList = () => {
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
            <div key={collection.handle}>
              <Link to={`/collections/${collection.handle}`}>
                {collection.title}
              </Link>
            </div>
          ))
        : 'Loading collections...'}
    </div>
  )
}

const CartUI = () => {
  const cart = useCart()

  return (
    <div>
      {cart.cartFetchError && <div>There was an error fetching your cart</div>}
      {cart.errorAdding && (
        <div>There was an error adding that item to your cart</div>
      )}
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
  const { isCartOpen, shopifyCheckout } = useCart()

  return (
    <div className={cn(['cart', isCartOpen && '-open'])}>
      <div className="f sb">
        <h1>Cart</h1>
        <CloseCartButton />
      </div>
      <div>
        {shopifyCheckout?.lineItems.map(lineItem => (
          <LineItem.Wrapper data={lineItem} key={lineItem.id} />
        ))}
      </div>
      <CheckoutLink className="button db" />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
