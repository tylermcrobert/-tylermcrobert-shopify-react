# Shopify React

A data controller for Shopify Storefront data.

## Initialization

To use the Shopify React plugin, start by wrapping your app in the `<CartProvider />`. This provider requires two props — `domain`, and `accessToken`.

```tsx
import { CartProvider } from '@tylermcrobert/shopify-react'
const App = ({ children }) => (
  <div>
    <CartProvider
      domain="my-store.myshopify.com"
      accessToken="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    >
      {children}
    </CartProvider>
  </div>
)
```
