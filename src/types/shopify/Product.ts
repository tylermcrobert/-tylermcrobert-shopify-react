import { GQLType, Image } from './index'

export type Product = {
  /**
   * Product's Base 64 Product ID
   */
  id: string

  /**
   * Product's current availability
   */
  availableForSale: boolean

  /**
   * Date product was created
   */
  createdAt: string

  /**
   * Date product was updated
   */
  updatedAt: string

  /**
   * Product's description in RichText
   */
  descriptionHtml: string | null

  /**
   * Product's description string
   */
  description: string | null

  /**
   * Product's handle
   */
  handle: string

  /**
   * Product type
   */
  productType: string | null

  /**
   * The product's title
   */
  title: string

  /**
   * Product's vendor
   */
  vendor: string | null

  /**
   * Date published
   */
  publishedAt: string

  /**
   * Product URL
   */
  onlineStoreUrl: string

  /**
   * Product options
   */
  options: Option[]

  /**
   * Product Images
   */
  images?: Image[]

  /**
   * Product Variants
   */
  variants: Variant[]

  /**
   * GraphQL information
   */
  type: GQLType

  /**
   * Pagination Info
   */
  hasNextPage: { value: boolean }

  /**
   * Pagination Info
   */
  hasPreviousPage: { value: boolean }

  /**
   * Pagination Info
   */
  variableValues: { first: number }
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
  values: { value: string }[]
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
