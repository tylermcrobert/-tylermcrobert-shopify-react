import { Client as ShopifyBuyClient } from 'shopify-buy'
import { Collection } from './collection'

export type Client = ShopifyBuyClient & {
  product: {
    helpers: any
  }
  collection: {
    fetchByHandle(handle: string): Promise<Collection[]>
  }
}
