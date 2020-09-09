import { Image as ShopifyBuyImage } from 'shopify-buy'

export * from './collection'
export * from './checkout'
export * from './product'
export * from './client'

/** Shopify Price */
export type PriceV2 = {
  amount: string
  currencyCode: string
  type: {
    name: string
    kind: string
    fieldBaseTypes: {
      amount: string
      currencyCode: string
    }
    implementsNode: boolean
  }
}

export type Image = ShopifyBuyImage
