import { Image } from './index'

export type Product = {
  /** The product's title */
  title: string

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
  images: Image[] | null
  variants: Variant[]
}

export type Variant = {
  selectedOptions: SelectedOption[]
  id: string
  title: string
  price: string
  weight: string
  available: boolean
  compareAtPrice: string
  image?: Image
}

export type Option = {
  /** GraphQL information */
  type: { name: string; kind: string }
  // Option Value
  value: string
  /** Option name */
  name: string
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
