import { CheckoutResource, LineItem } from 'shopify-buy'
import { PriceV2 } from './'

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
  lineItems: LineItem[]
} & CheckoutResource

export type CheckoutLineItem = LineItem
