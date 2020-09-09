import React, { createContext } from 'react'
import { Cart, ICheckout, ICheckoutLineItem, ShopifyClient } from '../types'
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
  domain: string
  accessToken: string
  fetch: any
}> = ({ children, domain, accessToken, fetch }) => {
  const client: ShopifyClient = (shopifyClient as any).buildClient(
    {
      domain: domain,
      storefrontAccessToken: accessToken,
    },
    fetch
  ) as shopifyClient.Client

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
