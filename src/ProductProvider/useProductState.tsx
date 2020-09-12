/* eslint-disable no-case-declarations */
import { useReducer, useEffect } from 'react'
import { Product, Variant } from '../types'
import { useCart } from '../hooks/useCart'

export type ProductState = {
  currentVariant: Variant
  quantity: number
  isSubnav: boolean
  currentColor: {
    name: string | null
    hex: string | null
  }
}

export const initialProductState: ProductState = {
  currentVariant: (null as unknown) as Variant,
  quantity: 1,
  isSubnav: false,
  currentColor: {
    name: null,
    hex: null,
  },
}

export type Action =
  | { type: 'changeOptions'; options: any }
  | { type: 'changeQuantity'; quantity: number }
  | { type: 'resetDefault' }
  | { type: 'changeSubnav'; payload: boolean }

const useProductState = (product: Product) => {
  const { client, addToCart } = useCart()

  const defaultVariant = {
    currentVariant: product.variants[0],
  }

  const counterReducer = (
    state: ProductState,
    action: Action
  ): ProductState => {
    switch (action.type) {
      case 'changeOptions':
        return {
          ...state,
          currentVariant: client.product.helpers.variantForOptions(
            product,
            action.options
          ),
        }
      case 'resetDefault':
        return { ...state, quantity: 1, ...defaultVariant }
      case 'changeQuantity':
        return { ...state, quantity: action.quantity }
      case 'changeSubnav':
        return { ...state, isSubnav: action.payload }
      default:
        return state
    }
  }

  const [productState, dispatch] = useReducer(counterReducer, {
    ...initialProductState,
    ...defaultVariant,
  })

  // resets state on page change
  useEffect(() => {
    dispatch({ type: 'resetDefault' })
  }, [product])

  /**
   * Helpers
   */

  const setQuantity = (quantity: number) =>
    dispatch({
      type: 'changeQuantity',
      quantity,
    })

  const setOptions = (options: object) => {
    const current = productState.currentVariant.selectedOptions.reduce(
      (acc, option) => ({ ...acc, [option.name]: option.value }),
      {}
    )

    dispatch({ type: 'changeOptions', options: { ...current, ...options } })
  }

  const setSubnav = (bool: boolean) =>
    dispatch({ type: 'changeSubnav', payload: bool })

  const addProductToCart = () => {
    if (productState.currentVariant.available) {
      addToCart(productState.currentVariant.id, productState.quantity)
    }
  }

  return {
    setOptions,
    dispatch,
    productState,
    setQuantity,
    setSubnav,
    addProductToCart,
  }
}

export default useProductState
