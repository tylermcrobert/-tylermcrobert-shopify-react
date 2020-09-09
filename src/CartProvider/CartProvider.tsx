import React, { createContext } from 'react'
import { Cart, ICheckout, ICheckoutLineItem } from '../types'
import useCartControls, { initialCart } from './useCartControls'
import shopifyClient from 'shopify-buy'

type CartCtx = {
  addToCart: (variantId: string, qty: number) => void
  updateLineItem: (id: string, payload: Partial<ICheckoutLineItem>) => void
  openCart: () => void
  closeCart: () => void
  shopifyCheckout: ICheckout | null
}

export const CartCtx = createContext<CartCtx & Cart>({
  addToCart: () => null,
  updateLineItem: () => null,
  openCart: () => null,
  closeCart: () => null,
  ...initialCart,
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
