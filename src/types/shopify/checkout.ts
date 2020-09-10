import { PriceV2 } from './'
import { Variant } from './product'

/** Shopify Checkout */
export type Checkout = {
  id: string
  ready: boolean
  requiresShipping: boolean
  note: any
  paymentDue: string
  paymentDueV2: PriceV2
  webUrl: string
  orderStatusUrl: any
  taxExempt: string
  taxesIncluded: boolean
  currencyCode: string
  totalTax: string
  totalTaxV2: PriceV2
  lineItemsSubtotalPrice: PriceV2
  subtotalPrice: string
  subtotalPriceV2: PriceV2
  totalPrice: string
  totalPriceV2: PriceV2
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
  lineItems: CheckoutLineItem[]
}

export type CheckoutLineItem = {
  /** Product variant */
  variant: Variant

  // /** Line item's custom attributes */
  // customAttributes: LineItem

  /** Line item's discount allocations (?) */
  discountAllocations: unknown[]

  /** GraphQL Pagination */
  hasNextPage: boolean

  /** GraphQL Pagination */
  hasPreviousPage: boolean

  /** Line item's Base 64 line item */
  id: string

  /** GraphQL Pagination query */
  nextPageQueryAndPath: () => void

  /** Line item's quantitiy */
  quantity: number

  refetchQuery: () => void

  /** Line item's title */
  title: string

  /** GraphQL Type */
  type: object
}
