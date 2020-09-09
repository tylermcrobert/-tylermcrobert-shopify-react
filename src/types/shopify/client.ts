import { Client as ShopifyBuyClient } from 'shopify-buy'

export type Client = ShopifyBuyClient & {
  product: {
    helpers: any
  }
}
