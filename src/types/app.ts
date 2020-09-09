import { ICheckout } from './shopify'

export type ShopifyClient = any

export type Cart = {
  isCartOpen: boolean
  errorAdding: boolean
  cartFetchError: boolean
  isLoading: boolean

  // shopify
  shopifyCheckout: ICheckout | null
}
