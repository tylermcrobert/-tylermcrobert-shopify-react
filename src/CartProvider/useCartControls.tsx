/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-case-declarations */
import { useEffect } from 'react'
import { Cart, Checkout, CheckoutLineItem, ShopifyClient } from '../types'
import { useReducer } from 'reinspect'

const LOCAL_STORAGE_CHECKOUT_TOKEN = 'checkoutToken'

export const initialCart: Cart = {
  isCartOpen: false,
  errorAdding: false,
  isLoading: false,
  cartFetchError: false,
  shopifyCheckout: null,
}

type Action =
  | { type: 'updateCheckout'; checkout: Checkout }
  | { type: 'setCartErr'; err: any }
  | { type: 'setLoading' }
  | { type: 'setIsCartOpen'; payload: boolean }

function reducer(state: Cart, action: Action): Cart {
  switch (action.type) {
    case 'updateCheckout':
      return {
        ...state,
        shopifyCheckout: action.checkout,
        cartFetchError: false,
        isLoading: false,
      }
    case 'setCartErr':
      return { ...state, cartFetchError: true }
    case 'setLoading':
      return { ...state, isLoading: true }
    case 'setIsCartOpen':
      return { ...state, isCartOpen: action.payload }
    default:
      return state
  }
}

type HookReturn = {
  cart: Cart
  addToCart: (variantId: string, qty: number) => void
  openCart: () => void
  closeCart: () => void
  updateLineItem: (id: string, payload: Partial<CheckoutLineItem>) => void
}

const useCartControls = (client: ShopifyClient): HookReturn => {
  const [cart, dispatch] = useReducer(
    reducer,
    initialCart,
    state => state,
    'Cart'
  )

  /** Helpers */
  const updateCheckout = (checkout: Checkout) =>
    dispatch({ type: 'updateCheckout', checkout })
  const setCartErr = (err: any) => dispatch({ type: 'setCartErr', err })

  /** Mount cart on load */
  useEffect(() => {
    const localStorageToken = localStorage.getItem(LOCAL_STORAGE_CHECKOUT_TOKEN)
    dispatch({ type: 'setLoading' })

    const createNewCheckout = () => {
      client.checkout
        .create()
        .then((checkout: Checkout) => {
          updateCheckout(checkout)
          localStorage.setItem(LOCAL_STORAGE_CHECKOUT_TOKEN, checkout.id)
        })
        .catch((err: any) => setCartErr(err))
    }

    if (localStorageToken) {
      client.checkout
        .fetch(localStorageToken)
        .then((checkout: Checkout) => updateCheckout(checkout))
        .catch((err: any) => {
          setCartErr(err)
          createNewCheckout()
        })
    } else {
      createNewCheckout()
    }
  }, [client.checkout])

  /** Functions */

  const addToCart = (variantId: string, qty: number) => {
    dispatch({ type: 'setLoading' })

    if (cart.shopifyCheckout) {
      client.checkout
        .addLineItems(cart.shopifyCheckout.id, [
          {
            variantId,
            quantity: qty,
          },
        ])
        .then((checkout: Checkout) => {
          updateCheckout(checkout)
          dispatch({ type: 'setIsCartOpen', payload: true })
        })
        .catch((err: any) => setCartErr(err))
    } else {
      dispatch({ type: 'setCartErr', err: 'No shopify cart loaded' })
    }
  }

  const openCart = () => dispatch({ type: 'setIsCartOpen', payload: true })
  const closeCart = () => dispatch({ type: 'setIsCartOpen', payload: false })

  const updateLineItem = (id: string, payload: Partial<CheckoutLineItem>) => {
    // TODO: set 'is loading true' and block new interactions in here
    if (cart.shopifyCheckout) {
      client.checkout
        .updateLineItems(cart.shopifyCheckout.id, { id, ...payload })
        .then((newCheckout: Checkout) => updateCheckout(newCheckout))
    }
  }

  return {
    cart,
    addToCart,
    openCart,
    closeCart,
    updateLineItem,
  }
}

export default useCartControls
