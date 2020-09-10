export * from './collection'
export * from './checkout'
export * from './product'
export * from './client'

export type GQLType = {
  name: string
  kind: string
  fieldBaseTypes: {
    amount: string
    currencyCode: string
  }
  implementsNode: boolean
}

/** Shopify Price */
export type PriceV2 = {
  amount: string
  currencyCode: string
  type: GQLType
}

export type Image = {
  altText: string | null
  id: string
  src: string
  type: GQLType
} | null
