/** Shopify Checkout */
export interface ICheckout {
  id: string
  ready: boolean
  requiresShipping: boolean
  note: any
  paymentDue: string
  paymentDueV2: IPrice
  webUrl: string
  orderStatusUrl: any
  taxExempt: string
  taxesIncluded: boolean
  currencyCode: string
  totalTax: string
  totalTaxV2: IPrice
  lineItemsSubtotalPrice: IPrice
  subtotalPrice: string
  subtotalPriceV2: IPrice
  totalPrice: string
  totalPriceV2: IPrice
  completedAt: any
  createdAt: string
  updatedAt: string
  email: any
  discountApplications: []
  appliedGiftCards: []
  shippingAddress: any
  shippingLine: any
  customAttributes: []
  order: any
  lineItems: ICheckoutLineItem[]
}

/** Shopify Price */
interface IPrice {
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

export type VariantId = string

/** Options that are selected */
type SelectedOption = {
  name: string
  value: string
}

/** Shopify Checkout */
export interface ICheckoutLineItem {
  customAttributes: { key: string; value: string }[] | []
  id: string
  title: string
  quantity: number
  variant: {
    id: VariantId
    title: string
    price: string
    priceV2: IPrice
    presentmentPrices: any
    weight: number
    available: boolean
    sku: string
    compareAtPrice: any
    compareAtPriceV2: any
    image: {
      id: string
      src: string
      altText: string
    }
    selectedOptions: SelectedOption[]
  }
}

/**
 * Shopify Product
 */

export interface IProduct {
  id: string
  createdAt: string
  updatedAt: string
  descriptionHtml: string
  description: string
  handle: string
  productType: string
  title: string
  vendor: string
  tags: string
  publishedAt: string
  onlineStoreUrl: string

  options: Option[]
  images: Array<IImage>
  variants: Array<IVariant>
}

/** Shopify Product Variant */
export interface IVariant {
  id: string
  title: string
  price: string
  weight: string
  available: boolean
  compareAtPrice: string
  image?: {
    id: string
    src: string
    altText: string
  }
  selectedOptions: Array<{
    name: string
    value: string
  }>
}

export interface IImage {
  id: string
  src: string
  altText: string
}

export type Option = {
  id: number
  name: string
  values: {
    value: string
  }[]
}

export interface IProductData {
  id: string
  createdAt: string
  updatedAt: string
  descriptionHtml: string
  description: string
  handle: string
  productType: string
  title: string
  vendor: string
  tags: string
  publishedAt: string
  onlineStoreUrl: string

  options: Array<{
    name: string
    values: Array<string>
  }>

  images: {
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
    edges: Array<{
      cursor: any
      node: IImage
    }>
  }

  variants: {
    pageInfo: {
      hasNextPage: boolean
      hasPreviousPage: boolean
    }
    edges: Array<{
      cursor: any
      node: IVariant
    }>
  }
}
