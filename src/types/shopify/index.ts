export * from './collection'
export * from './checkout'
export * from './product'

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
