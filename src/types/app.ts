import { Checkout } from './shopify/checkout'

export type ShopifyClient = any

export type Cart = {
  isCartOpen: boolean
  errorAdding: boolean
  cartFetchError: boolean
  isLoading: boolean

  // shopify
  shopifyCheckout: Checkout | null
}
