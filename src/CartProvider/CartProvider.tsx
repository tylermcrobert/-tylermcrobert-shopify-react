import React, { createContext } from 'react'
import { Cart, Client, CheckoutLineItem, Checkout } from '../types'
import useCartControls, { initialCart } from './useCartControls'
import shopifyClient from 'shopify-buy'

type CartCtx = {
  addToCart: (variantId: string, qty: number) => void
  updateLineItem: (id: string, payload: Partial<CheckoutLineItem>) => void
  openCart: () => void
  closeCart: () => void
  shopifyCheckout: Checkout | null
  client: Client
}

export const CartCtx = createContext<CartCtx & Cart>({
  addToCart: () => null,
  updateLineItem: () => null,
  openCart: () => null,
  closeCart: () => null,
  ...initialCart,
  client: (null as unknown) as Client,
})

export const CartProvider: React.FC<{
  client: shopifyClient.Client
}> = ({ children, client }) => {
  const {
    cart,
    addToCart,
    openCart,
    closeCart,
    updateLineItem,
  } = useCartControls(client)

  return (
    <CartCtx.Provider
      value={{
        client: client as Client,
        addToCart,
        updateLineItem,
        openCart,
        closeCart,
        ...cart,
      }}
    >
      {children}
    </CartCtx.Provider>
  )
}
