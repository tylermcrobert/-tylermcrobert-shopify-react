# Shopify React

A data controller for Shopify Storefront data.

## Initialization

To use the Shopify React plugin, start by wrapping your app in the `<CartProvider />`. This provider requires two props — `domain`, and `accessToken`.

```tsx
import { CartProvider } from '@tylermcrobert/shopify-react'

const App = ({ children }) => (
  <CartProvider
    domain="my-store.myshopify.com"
    accessToken="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  >
    <Cart />
    {children}
  </CartProvider>
)
```

# Using the Cart

use the `useCart` hook to

```tsx
import { useCart } from '@tylermcrobert/shopify-react'

const Cart = ({ children }) => {
  const { shopifyCheckout } = useCart()
  return <div>Subtotal: ${shopifyCheckout.subtotalPrice}</div>
}
```
