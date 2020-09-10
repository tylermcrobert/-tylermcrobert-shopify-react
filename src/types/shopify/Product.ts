import { Product as ShopifyBuyProduct, ProductVariant } from 'shopify-buy'
import { Image } from './index'

export type Product = ShopifyBuyProduct & {
  /** The product's handle */
  handle: string
  createdAt: string
  updatedAt: string
  descriptionHtml: string
  productType: string
  tags: string
  publishedAt: string
  onlineStoreUrl: string

  options: Option[]
  images: Image[]
  variants: Variant[]
}

export type Variant = ProductVariant & {
  selectedOptions: SelectedOption[]
}

type Option = {
  /** GraphQL information */
  type: { name: string; kind: string }
  // Option Value
  value: string
}

/** Options that are selected */
type SelectedOption = {
  name: string
  value: string
}

export type AttributeInput = {
  key?: string
  value?: string
  id?: string | number
  quantity?: number
  variantId?: string
}
