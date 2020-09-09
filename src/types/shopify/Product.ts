import { Product as ShopifyBuyProduct } from 'shopify-buy'

export type Product = ShopifyBuyProduct & {
  /** The product's handle */
  handle: string
}
